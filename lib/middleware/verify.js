const crypto = require('crypto');

const defaultOptions = {
  algorithm: 'sha256',
  encoding: 'base64',
  secret: process.env.ENVOY_CLIENT_SECRET,
  header: 'x-envoy-signature',
};


function verify(suppliedOptions = defaultOptions) {

  const options = Object.assign({}, defaultOptions, suppliedOptions);
  const {
    algorithm,
    encoding,
    secret,
    header,
  } = options;

  if (!secret) {
    throw new Error('No client secret found in the ENVOY_CLIENT_SECRET environment variable.');
  }

  return (req, res, next) => {

    const receivedDigest = req.headers[header];
    const computedHmac = crypto.createHmac(algorithm, secret);

    req.on('data', chunk => computedHmac.update(chunk));
    req.on('end', () => {

      try {
        if (
          crypto.timingSafeEqual(
            Buffer.from(receivedDigest),
            Buffer.from(computedHmac.digest(encoding)),
          )
        ) {
          return next();
        }
      } catch (err) {
      }
      res.statusCode = 403;
      res.end();
    });
  };
}

module.exports = verify;
