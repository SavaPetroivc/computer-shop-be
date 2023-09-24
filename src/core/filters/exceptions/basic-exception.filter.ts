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
    const message = exception.getResponse()["message"];

    response.status(HttpStatus.BAD_REQUEST).json({
      message,
      statusCode: HttpStatus.BAD_REQUEST,
      time: new Date().toISOString(),
    });
  }
}
