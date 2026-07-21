import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionMessageEnum } from "../../../helpers/exception-messages/exception-message.enum";

export class ProductAlreadyExistsException extends HttpException {
  constructor() {
    super(ExceptionMessageEnum.PRODUCT_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
  }
}
