import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionMessageEnum } from "../../../helpers/exception-messages/exception-message.enum";
export class UserNotFoundException extends HttpException {
  constructor() {
    super(ExceptionMessageEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
