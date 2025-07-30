const cypressRequest = require('@cypress/request');

// RequestError class based on request-promise-native's
function RequestError(cause, options, response) {
  this.name = 'RequestError';
  this.message = String(cause);
  this.cause = cause;
  this.error = cause; // legacy attribute
  this.options = options;
  this.response = response;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this);
  }
}
RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

// StatusCodeError class for non-2xx HTTP responses
function StatusCodeError(statusCode, body, options, response) {
  this.name = 'StatusCodeError';
  this.statusCode = statusCode;
  this.message = `${statusCode} - ${JSON && JSON.stringify ? JSON.stringify(body) : body}`;
  this.error = body; // legacy attribute
  this.options = options;
  this.response = response;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this);
  }
}
StatusCodeError.prototype = Object.create(Error.prototype);
StatusCodeError.prototype.constructor = StatusCodeError;

function normalizeRequestParams(options, callback) {
  if (typeof options === 'string' && typeof callback === 'object') {
    return Object.assign({ url: options }, callback);
  }
  if (typeof options === 'string') {
    return { url: options };
  }
  return options;
}

function createErrorWithOptions(err, options, response) {
  return new RequestError(err, options, response);
}

function resolveResponse(resolve, reject, response, body, options) {
  // Check for non-2xx status codes (request-promise-native's simple: true behavior)
  const simple = options.simple !== false;
  const is2xx = response && /^2/.test(String(response.statusCode));
  
  if (simple && !is2xx && response) {
    reject(new StatusCodeError(response.statusCode, body, options, response));
    return;
  }
  
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
          reject(createErrorWithOptions(err, requestOptions, response));
          return;
        }
        resolveResponse(resolve, reject, response, body, requestOptions);
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
    
    // Merge default options with request options for the error.options property
    const mergedOptions = Object.assign({}, defaultOptions, requestOptions);
    
    // Maintain compatibility with request-promise-native:
    const isFullUrl = requestOptions.url 
      && (requestOptions.url.startsWith('http://') || requestOptions.url.startsWith('https://'));
    
    if (defaultOptions.baseUrl && isFullUrl) {
      const error = new Error('options.uri must be a path when using options.baseUrl');
      return Promise.reject(createErrorWithOptions(error, mergedOptions));
    }
    
    return new Promise((resolve, reject) => {
      requestWithDefaults(requestOptions, (err, response, body) => {
        if (err) {
          reject(createErrorWithOptions(err, mergedOptions, response));
          return;
        }
        resolveResponse(resolve, reject, response, body, mergedOptions);
      });
    });
  };
  
  // Copy the defaults method to the new promisified version
  promisifiedWithDefaults.defaults = promisifiedRequest.defaults;
  
  return promisifiedWithDefaults;
};

module.exports = promisifiedRequest;
