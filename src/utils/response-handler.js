export class ResponseHandler {
  constructor({
    status = false,
    responseCode,
    responseMessage = "",
    responseData = null,
  }) {
    this.status = status;
    this.responseCode = responseCode;
    this.responseMessage = responseMessage;
    this.responseData = responseData;
  }

  response(res) {
    return res.status(this.responseCode).json(this);
  }

  // For all responses
  static send(res, status, responseData, responseMessage, responseCode) {
    return new ResponseHandler({
      status,
      responseCode,
      responseMessage,
      responseData,
    }).response(res);
  }
}
