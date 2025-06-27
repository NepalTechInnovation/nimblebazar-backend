class ApiResponse {
  constructor(statusCode, message, data = null, dataName = 'data') {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this[dataName] = data;  
  }
}

module.exports = ApiResponse;
