import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionMessageEnum } from "../../../helpers/exception-messages/exception-message.enum";

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(ExceptionMessageEnum.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
  }
}
