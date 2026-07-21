import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { ProductAlreadyExistsException } from "../../../models/product/exceptions/product-already-exists.exception";

@Catch(ProductAlreadyExistsException)
export class ProductAlreadyExistsFilter implements ExceptionFilter {
  catch(exception: ProductAlreadyExistsException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(exception.getStatus()).send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
