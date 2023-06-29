require('dotenv').config();
const EnvoyAPI = require('./lib/EnvoyAPI');
const EnvoyJWT = require('./lib/EnvoyJWT');
const EnvoyPluginJob = require('./lib/EnvoyPluginJob');
const EnvoyPluginSDK = require('./lib/EnvoyPluginSDK');
const EnvoyPluginStorage = require('./lib/EnvoyPluginStorage');
const EnvoyPluginStoragePipeline = require('./lib/EnvoyPluginStoragePipeline');
const EnvoyResponseError = require('./lib/EnvoyResponseError');
const EnvoySignatureVerifier = require('./lib/EnvoySignatureVerifier');
const HttpStatus = require('./lib/HttpStatus');
const middleware = require('./lib/middleware');
const errorMiddleware = require('./lib/errorMiddleware');
const asyncHandler = require('./lib/asyncHandler');
const createAxiosClient = require('./lib/axios');

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
 * @property {HttpStatus} HttpStatus
 * @property {Function} middleware
 * @property {Function} errorMiddleware
 * @property {Function} asyncHandler
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
  HttpStatus,
  middleware,
  errorMiddleware,
  asyncHandler,
  createAxiosClient,
};
