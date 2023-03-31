import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { HttpExceptionFilter } from './common/exceptions/filters/exception.filter';
import { ValidationPipe } from './common/pipes/validatetion.pipe';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  // Set global path
  app.setGlobalPrefix('/api');

  // Swagger
  setupSwagger(app);

  await app.listen(3000);
}

void bootstrap();
