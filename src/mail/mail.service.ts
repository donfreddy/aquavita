import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailPayload } from 'src/common/dtos/mail-payload';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {
  }

  async sendEmail(inputs: MailPayload) {
    return await this.mailer.sendMail({
      to: inputs.to,
      subject: inputs.subject,
      template: `./${inputs.template}`,
      context: inputs.props,
    });
  }
}
