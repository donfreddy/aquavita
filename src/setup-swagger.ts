import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { configService } from './config/config.service';

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
      .addTag('users', 'Users management')
      .addTag('profile', 'User\'s profile management')
      .addTag('quarter times', 'Quarter time management')
      .addTag('tasks', 'Tasks management')
      .addTag('planning', 'Planning management')
      .addTag('breakdowns', 'Breakdowns management')
      .addTag('purchase orders', 'Purchase order management')
      .addTag('stocks', 'Stocks management')
      .addTag('fountains', 'Fountains management')
      .addTag('materials', 'Materials management')
      .addTag('payslips', 'Payslips management')
      .addTag('presences', 'Presences management')
      .addTag('customers', 'Customer management')
      .addTag('delivery slips', 'Delivery slips management')
      .addTag('invoices', 'Invoices management')
      .addServer(configService.getServer().url, configService.getServer().desc)
      .addServer('http://192.168.100.164:3000', configService.getServer().desc)
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
