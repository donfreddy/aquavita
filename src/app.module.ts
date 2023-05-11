import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { CarboyModule } from './models/carboy/carboy.module';
import { PurchaseModule } from './models/purchase/purchase.module';
import { FountainModule } from './models/fountain/fountain.module';
import { StockModule } from './models/stock/stock.module';
import { PlanningModule } from './models/planning/planning.module';
import { TaskModule } from './models/task/task.module';
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
import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';
import { MailModule } from './mail/mail.module';
import { LocalFileModule } from './models/local-file/local-file.module';
import { QuarterTimeModule } from './models/quater-time/quarter-time.module';
import { BreakdownModule } from './models/breakdown/breakdown.module';
import { PurchaseOrderModule } from './models/purchase-order/purchase-order.module';
import { PayslipModule } from './models/payslip/payslip.module';
import { MaterialModule } from './models/material/material.module';
import { PresenceModule } from './models/presence/presence.module';
import { CustomerModule } from './models/customer/customer.module';
import { PermissionModule } from './permission/permission.module';
import { DelivererActivityModule } from './models/deliverer-activity/deliverer-activity.module';
import { UpkeepModule } from './models/upkeep/upkeep.module';
import { InvoiceModule } from './models/invoice/invoice.module';

@Module({
  imports: [
    // Internal module
    AuthModule,
    LocalFileModule,
    OtpModule,
    UserModule,
    CarboyModule,
    PurchaseModule,
    FountainModule,
    PayslipModule,
    MaterialModule,
    StockModule,
    PurchaseOrderModule,
    BreakdownModule,
    PlanningModule,
    TaskModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([LocalFile]),
    QuarterTimeModule,
    PdfModule,
    MailModule,
    PresenceModule,
    CustomerModule,
    DelivererActivityModule,
    PermissionModule,
    UpkeepModule,
    InvoiceModule
  ],
  controllers: [AppController],
  providers: [
    PdfService,
    LocalFileService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
