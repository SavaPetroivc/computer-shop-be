import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { UserNotFoundException } from "../../../models/user/exceptions/user-not-found.exception";

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
