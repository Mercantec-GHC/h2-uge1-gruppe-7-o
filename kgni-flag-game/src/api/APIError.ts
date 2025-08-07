// export default class APIError extends Error {
//   status: number;
//   constructor(message: string, status: number) {
//     super(message);
//     this.name = "FetchError";
//     this.status = status;
//   }
// }
//

interface APIErrorOptions {
  message?: string;
  status: number;
}

export default class APIError extends Error {
  public status: number;

  constructor({ message, status }: APIErrorOptions) {
    let defaultMessage: string;
    switch (status) {
      case 400:
        defaultMessage = "Bad Request";
        break;
      case 401:
        defaultMessage = "Unauthorized";
        break;
      case 404:
        defaultMessage = "Not Found";
        break;
      case 500:
        defaultMessage = "Internal Server Error";
        break;
      default:
        defaultMessage = "Unknown Error";
    }
    super(message || defaultMessage);

    this.name = "APIError";
    this.status = status;
  }
}
