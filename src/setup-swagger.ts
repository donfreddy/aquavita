import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Aquavita API')
      .setDescription('Aquavita API Specification')
      .setVersion('1.0.0')
      .setContact('Aquavita', '', 'info@aquavita.com')
      .setLicense(
        'Apache 2.0',
        'https://www.apache.org/licenses/LICENSE-2.0.html',
      )
      .setTermsOfService('https://swagger.io/terms/')
      .addTag('health', 'API health check: Pinging the server')
      .addTag('auth', 'Authentication to DB')
      .addBearerAuth()
      .build(),
  );

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Aquavita API',
    useGlobalPrefix: true,
  };
  SwaggerModule.setup('/docs', app, document, customOptions);
}
