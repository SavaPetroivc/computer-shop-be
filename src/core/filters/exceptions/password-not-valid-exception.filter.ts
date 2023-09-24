import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {PasswordNotValidException} from "../../../models/user/exceptions/password-not-valid.exception";

@Catch(PasswordNotValidException)
export class PasswordNotValidExceptionFilter implements ExceptionFilter {
  catch(exception: PasswordNotValidException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
