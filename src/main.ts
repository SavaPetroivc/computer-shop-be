import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BasicExceptionFilter } from "./core/filters/exceptions/basic-exception.filter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "http://localhost:4200", credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Demo Application")
    .setDescription("Demo API Application")
    .setVersion("v1")
    .build();

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new BasicExceptionFilter(httpAdapter));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
