const EnvoyAPI = require('./lib/EnvoyAPI');
const EnvoyJWT = require('./lib/EnvoyJWT');
const EnvoyPluginJob = require('./lib/EnvoyPluginJob');
const EnvoyPluginSDK = require('./lib/EnvoyPluginSDK');
const EnvoyPluginStorage = require('./lib/EnvoyPluginStorage');
const EnvoyPluginStoragePipeline = require('./lib/EnvoyPluginStoragePipeline');
const EnvoyResponseError = require('./lib/EnvoyResponseError');
const EnvoySignatureVerifier = require('./lib/EnvoySignatureVerifier');
const middleware = require('./lib/middleware');

/**
 * @typedef {Object} Envoy
 * @property {EnvoyAPI} EnvoyAPI
 * @property {EnvoyJWT} EnvoyJWT
 * @property {EnvoyPluginJob} EnvoyPluginJob
 * @property {EnvoyPluginSDK} EnvoyPluginSDK
 * @property {EnvoyPluginStorage} EnvoyPluginStorage
 * @property {EnvoyPluginStoragePipeline} EnvoyPluginStoragePipeline
 * @property {EnvoyResponseError} EnvoyResponseError
 * @property {EnvoySignatureVerifier} EnvoySignatureVerifier
 * @property {Function} middleware
 */

/**
 * @type {Envoy}
 */
module.exports = {
  EnvoyAPI,
  EnvoyJWT,
  EnvoyPluginJob,
  EnvoyPluginSDK,
  EnvoyPluginStorage,
  EnvoyPluginStoragePipeline,
  EnvoyResponseError,
  EnvoySignatureVerifier,
  middleware,
};
