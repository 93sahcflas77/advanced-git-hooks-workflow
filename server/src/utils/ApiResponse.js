class ApiResponse {
  constructor({ stateCode = 200, success = true, message = 'Success', data = null, meta = null }) {
    this.stateCode = stateCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  send(res) {
    res.status(this.stateCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
      meta: this.meta,
    });
  }
}

module.exports = ApiResponse;
