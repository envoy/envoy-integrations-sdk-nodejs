const crypto = require('crypto');

const defaultOptions = {
  algorithm: 'sha256',
  encoding: 'base64',
  secret: process.env.ENVOY_CLIENT_SECRET,
  header: 'X-Envoy-Signature',
};


function verify(options = defaultOptions) {

  return (req, res, next) => {

    const {
      algorithm,
      encoding,
      secret,
      header,
    } = options;

    if (!secret) {
      throw new Error('No Envoy client secret found.');
    }

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
