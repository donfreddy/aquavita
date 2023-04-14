import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as basicAuth from 'express-basic-auth';
import { HttpExceptionFilter } from './common/exceptions/filters/exception.filter';
import { ValidationPipe } from './common/pipes/validatetion.pipe';
import { setupSwagger } from './setup-swagger';
import { configService } from './config/config.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Set global path
  app.setGlobalPrefix('/api');

  // Check if app is running on production and set basic auth
  if (configService.isProduction()) {
    app.use(['/api/docs'],
      basicAuth({
        challenge: true,
        users: {
          admin: '1234',
          aquavita: '1234',
        },
      }));
  }

  // Swagger
  setupSwagger(app);

  await app.listen(configService.getPort());
}

void bootstrap();