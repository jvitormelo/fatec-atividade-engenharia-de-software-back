interface ICreateResponse {
  message: string,
  response: {} | []
}

export default class ResponseFactory {
  static createResponse (message: string, response: {} | []): ICreateResponse {
    return {
      message,
      response
    }
  }
}
