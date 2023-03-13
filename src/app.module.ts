import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';
import { MailModule } from './mail/mail.module';
import { LocalFileModule } from './models/local-file/local-file.module';
import { ClassSerializerInterceptor, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './models/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { PdfService } from './pdf/pdf.service';
import { OtpModule } from './models/otp/otp.module';
import { LocalFileService } from './models/local-file/local-file.service';
import { LocalFile } from './models/local-file/entities/local-file.entity';
import { LogsMiddleware } from './common/middlewares/logs.meddleware';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    PdfModule,
    MailModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([LocalFile ]),

    // Internal module
    AuthModule,
    LocalFileModule,
    OtpModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [PdfService, LocalFileService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
