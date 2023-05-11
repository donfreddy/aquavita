import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { configService } from 'src/config/config.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: configService.getMailConfig().host,
        secure: false,
        auth: {
          user: configService.getMailConfig().user,
          pass: configService.getMailConfig().password,
        },
      },
      defaults: {
        from: `Aquavita <${configService.getMailConfig().from}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}