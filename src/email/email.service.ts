import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { Admin } from '../admin/entities/admin.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

   async sendMail(user: User) {
    const url = `${process.env.API_URL}:${process.env.PORT}/user/activate/${user.activation_link}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: user.activation_link,
        template: join('./confirm'), // Adjusted to use relative path
        context: {
          name: user.f_name,
          url,
        },
      });
      this.logger.log(`Mail sent successfully to ${user.email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${user.email}`, error.stack);
      throw new Error(`Error sending email: ${error.message}`);
    }
  }

  // async sendMailToAdmin(admin: Admin) {
  //   const url = `${process.env.API_URL}:${process.env.PORT}/admin/activate/${admin.activation_link}`;
  //   const name = `${admin.f_name} ${admin.l_name}`;
  //   const subject = "Activate your account";
  //   await this.sendMail(admin.email, name, url, subject);
  // }

  // async sendMailToUser(user: User) {
  //   const url = `${process.env.API_URL}:${process.env.PORT}/user/activate/${user.activation_link}`;
  //   const name = `${user.f_name} ${user.l_name}`;
  //   const subject = "Activate your account";
  //   await this.sendMail(user.email, name, url, subject);
  // }
}
