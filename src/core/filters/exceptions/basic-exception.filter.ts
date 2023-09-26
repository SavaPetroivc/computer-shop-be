import { BaseExceptionFilter } from "@nestjs/core";
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class BasicExceptionFilter extends BaseExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    console.log(exception);
    const message = exception.getResponse()["message"];

    response.status(exception.getResponse()["statusCode"]).json({
      message,
      statusCode: exception.getResponse()["statusCode"],
      time: new Date().toISOString(),
    });
  }
}
