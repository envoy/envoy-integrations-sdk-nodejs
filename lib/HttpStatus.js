class HttpStatus {

  static get ONGOING() {
    return 202;
  }

  static get IGNORED() {
    return 400;
  }

  static get FAILED() {
    return 412;
  }

  static get UNEXPECTED_FAILURE() {
    return 500;
  }
}

module.exports = HttpStatus;
