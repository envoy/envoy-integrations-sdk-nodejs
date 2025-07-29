const cypressRequest = require('@cypress/request');

function normalizeRequestParams(options, callback) {
  if (typeof options === 'string' && typeof callback === 'object') {
    return Object.assign({ url: options }, callback);
  }
  if (typeof options === 'string') {
    return { url: options };
  }
  return options;
}

function createErrorWithOptions(err, options) {
  const errorWithOptions = err;
  errorWithOptions.options = options;
  return errorWithOptions;
}

function resolveResponse(resolve, response, body, options) {
  if (options.resolveWithFullResponse) {
    resolve(response);
    return;
  }
  resolve(body);
}

// A wrapper that mimics request-promise-native behavior
function createRequestWrapper(requestFn) {
  return function requestWrapper(options, callback) {
    const requestOptions = normalizeRequestParams(options, callback);
    
    return new Promise((resolve, reject) => {
      requestFn(requestOptions, (err, response, body) => {
        if (err) {
          reject(createErrorWithOptions(err, requestOptions));
          return;
        }
        resolveResponse(resolve, response, body, requestOptions);
      });
    });
  };
}

const promisifiedRequest = createRequestWrapper(cypressRequest);

// Add defaults method to maintain compatibility with request-promise-native
promisifiedRequest.defaults = function defaultHandler(defaultOptions) {
  const requestWithDefaults = cypressRequest.defaults(defaultOptions);
  
  // A wrapper that also merges the default options for error handling
  const promisifiedWithDefaults = function promisifiedWithDefaults(options, callback) {
    const requestOptions = normalizeRequestParams(options, callback);
    
    return new Promise((resolve, reject) => {
      // Merge default options with request options for the error.options property
      const mergedOptions = Object.assign({}, defaultOptions, requestOptions);
      
      // Handle external URLs when using defaults with baseUrl
      // cypress-request doesn't allow full URLs when baseUrl is set,
      // so we bypass defaults for external URLs
      const isExternalUrl = defaultOptions.baseUrl && requestOptions.url
        && (requestOptions.url.startsWith('http://') || requestOptions.url.startsWith('https://'));
      
      if (isExternalUrl) {
        // For external URLs, create a new request client without baseUrl
        const externalDefaults = Object.assign({}, defaultOptions);
        delete externalDefaults.baseUrl; // Remove baseUrl to allow full URLs
        
        // Create a new client with external defaults and use it
        const externalClient = cypressRequest.defaults(externalDefaults);
        
        return new Promise((resolve, reject) => {
          externalClient(requestOptions, (err, response, body) => {
            if (err) {
              reject(createErrorWithOptions(err, mergedOptions));
              return;
            }
            resolveResponse(resolve, response, body, mergedOptions);
          });
        });
      }
      
      requestWithDefaults(requestOptions, (err, response, body) => {
        if (err) {
          reject(createErrorWithOptions(err, mergedOptions));
          return;
        }
        resolveResponse(resolve, response, body, mergedOptions);
      });
    });
  };
  
  // Copy the defaults method to the new promisified version
  promisifiedWithDefaults.defaults = promisifiedRequest.defaults;
  
  return promisifiedWithDefaults;
};

module.exports = promisifiedRequest;
