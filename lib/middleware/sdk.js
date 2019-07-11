const EnvoyPluginSDK = require('../EnvoyPluginSDK');

function sdk() {

  return (req, res, next) => {

    req.envoy = new EnvoyPluginSDK(req.body);
    next();
  };
}

module.exports = sdk;
