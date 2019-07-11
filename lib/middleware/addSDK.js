const EnvoyPluginSDK = require('../EnvoyPluginSDK');

function addSDK() {

  return (req, res, next) => {

    req.envoy = new EnvoyPluginSDK(req.body);
    next();
  };
}

module.exports = addSDK;
