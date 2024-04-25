import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { interfaceGenerateEmail } from "../../entity/services/emailServices";

export class NodeMailer implements interfaceGenerateEmail {
  private transporter: nodemailer.Transporter;

  constructor() {
    dotenv.config();
    console.log(process.env.SMTP_HOST,process.env.SMTP_SERVICE, 'process.env.SMTP_HOST,process.env.SMTP_SERVICE')
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, 
      port: parseInt(process.env.SMTP_PORT || "587"), // if we dont do this the host will show warning
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmailVerification(
    name: string,
    email: string,
    verificationCode: string
  ): Promise<{ success: boolean }> {
    return new Promise((resolve, reject) => {
      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Mangrow Email Verification",
        text: `Hi ${name},\n\n Your Mangrow Verification Code is ${verificationCode}. Do not share this code with anyone.`,
      };
      
       this.transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error(err.message);
          reject({
            success: false,
          });
        } else {
          resolve({
            success: true,
          });
        }
      });
    });
  }
}
