import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyLogger } from './common/middlewares/logger.middleware.js';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  const config = new DocumentBuilder().setTitle('LoLog').setDescription('라이엇 api').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app
    .listen(PORT, () => {
      Logger.log(
        `
      ################################################
          🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
      `,
      );
    })
    .catch((error) => {
      Logger.error(error);
    });
}
bootstrap();
