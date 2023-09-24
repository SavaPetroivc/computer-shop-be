import { HttpException, HttpStatus } from '@nestjs/common';
import {ExceptionMessageEnum} from "../../../helpers/exception-messages/exception-message.enum";

export class PasswordNotValidException extends HttpException {
  constructor() {
    super(ExceptionMessageEnum.PASSWORD_NOT_VALID, HttpStatus.NOT_ACCEPTABLE);
  }
}
