import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import chalk from 'chalk';
import util from 'util';

function envoyAxiosRequestLogger(config: AxiosRequestConfig) {
  const log = console.log;
  log('---------------- Axios Request ----------------\n');
  if (config?.method) {
    const boldMethodText = chalk.bold('Method:');
    const method = config.method.toUpperCase();
    switch (method) {
      case 'GET':
        log(`${boldMethodText} ${chalk.green(method)}\n`);
        break;
      case 'PUT':
        log(`${boldMethodText} ${chalk.yellow(method)}\n`);
        break;
      case 'PATCH':
        log(`${boldMethodText} ${chalk.yellow(method)}\n`);
        break;
      case 'POST':
        log(`${boldMethodText} ${chalk.blue(method)}\n`);
        break;
      case 'DELETE':
        log(`${boldMethodText} ${chalk.red(method)}\n`);
        break;
      default:
        log(`${boldMethodText} ${method}\n`);
        break;
    };
  }
  if (config?.baseURL && config?.url) {
    log(`${chalk.bold('URL')}: ${config.baseURL}/${config.url}\n`);
  }

  if (config?.headers) {
    log(`${chalk.bold('Headers:')} ${util.inspect(config?.headers)}\n`);
  }

  if (config?.auth) {
    log(`${chalk.bold('Auth:')} ${util.inspect(config?.auth)}\n`);
  }

  if (config?.params) {
    log(`${chalk.bold('Params:')} ${util.inspect(config?.params)}\n`);
  }

  if (config?.data) {
    log(`${chalk.bold('Request Data:')} ${util.inspect(config?.data)}\n`);
  }

  log('------------ End Of Axios Request ------------\n');

  return config;
}

function envoyAxiosResponseLogger(response: AxiosResponse) {
  const log = console.log;
  log('---------------- Axios Response ----------------\n');
  if (response?.request?.method) {
    const boldMethodText = chalk.bold('Method:');
    const method = response.request.method;
    switch (method) {
      case 'GET':
        log(`${boldMethodText} ${chalk.green(method)}\n`);
        break;
      case 'PUT':
        log(`${boldMethodText} ${chalk.yellow(method)}\n`);
        break;
      case 'PATCH':
        log(`${boldMethodText} ${chalk.yellow(method)}\n`);
        break;
      case 'POST':
        log(`${boldMethodText} ${chalk.blue(method)}\n`);
        break;
      case 'DELETE':
        log(`${boldMethodText} ${chalk.red(method)}\n`);
        break;
      default:
        log(`${boldMethodText} ${method}\n`);
        break;
    };
  }
  if (response?.request?.baseURL && response?.request?.url) {
    log(`${chalk.bold('Request URL')}: ${response.request.baseURL}/${response.request.url}\n`);
  }

  if (response?.status && response?.statusText) {
    const boldStatusTitle = chalk.bold('Status:');
    const boldStatusTextTitle = chalk.bold('Status Text:');
    const status = response.status;
    const statusText = response.statusText;
    if (199 < status && status < 300) {
      log(`${boldStatusTitle} ${chalk.green(status)}\n`);
      log(`${boldStatusTextTitle} ${chalk.green(statusText)}\n`);
    } else {
      log(`${boldStatusTitle} ${chalk.red(status)}\n`);
      log(`${boldStatusTextTitle} ${chalk.red(statusText)}\n`);
    }
  }

  if (response?.data) {
    log(`${chalk.bold('Response Data:')} ${util.inspect(response?.data)}\n`);
  }

  log('------------ End Of Axios Response ------------\n');

  return response;
}

function envoyAxiosErrorLogger(error: AxiosError) {
  const log = console.log;
  log('---------------- Axios Error ----------------\n');
  if (error?.request?.method) {
    const boldMethodText = chalk.bold('Method:');
    const method = error.request.method;
    switch (method) {
      case 'GET':
        log(`${boldMethodText} ${chalk.green(method)}\n`);
        break;
      case 'PUT':
        log(`${boldMethodText} ${chalk.yellow(method)}\n`);
        break;
      case 'PATCH':
        log(`${boldMethodText} ${chalk.yellow(method)}\n`);
        break;
      case 'POST':
        log(`${boldMethodText} ${chalk.blue(method)}\n`);
        break;
      case 'DELETE':
        log(`${boldMethodText} ${chalk.red(method)}\n`);
        break;
      default:
        log(`${boldMethodText} ${method}\n`);
        break;
    };
  }
  if (error?.request?.baseURL && error?.request?.url) {
    log(`${chalk.bold('Request URL')}: ${error.request.baseURL}/${error.request.url}\n`);
  }

  if (error?.response?.status && error?.response?.statusText) {
    const boldStatusTitle = chalk.bold('Status:');
    const boldStatusTextTitle = chalk.bold('Status Text:');
    const status = error.response.status;
    const statusText = error.response.statusText;
    if (199 < status && status < 300) {
      log(`${boldStatusTitle} ${chalk.green(status)}\n`);
      log(`${boldStatusTextTitle} ${chalk.green(statusText)}\n`);
    } else {
      log(`${boldStatusTitle} ${chalk.red(status)}\n`);
      log(`${boldStatusTextTitle} ${chalk.red(statusText)}\n`);
    }
  }

  if (error.response?.data) {
    log(`${chalk.bold('Response Data:')} ${util.inspect(error.response.data)}\n`);
  }

  log('------------ End Of Axios Error ------------\n');

  throw error;
}

export { envoyAxiosRequestLogger, envoyAxiosResponseLogger, envoyAxiosErrorLogger };