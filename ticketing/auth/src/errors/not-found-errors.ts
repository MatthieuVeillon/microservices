import { CustomError } from "./custom-error";

export class NotFoundErrors extends CustomError {
  statusCode = 400;

  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundErrors.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
