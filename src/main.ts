import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder().addBearerAuth()
    .setTitle('Find my rep')
    .setDescription('This are all currently available endpoints')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  await app.listen(3000);
}
bootstrap();
