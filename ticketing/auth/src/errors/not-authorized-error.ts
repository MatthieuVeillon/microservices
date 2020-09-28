import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authorized");

    //because we're extending a base built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
