import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_PORT, APP_NAME } from './common/environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription('API for NFT Loan Wizard')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(APP_PORT);
  console.log(`
    Server run at: http://localhost:${APP_PORT}\n
    API document: http://localhost:${APP_PORT}/api          
  `);
}
bootstrap();
