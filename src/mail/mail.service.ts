import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(user: User) {
    const url = `${process.env.API_URL}:${process.env.PORT}/api/users/activate/${user.activation_link}`;
    // console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to stadium app",
      template: "./confirm",  
      context: {
        full_name: user.f_name,
        url,
      },
    });
  }
}
