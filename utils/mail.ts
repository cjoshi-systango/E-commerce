import dotenv from "dotenv"
dotenv.config();
import nodemailer from "nodemailer"
import { pugEngine } from "nodemailer-pug-engine";
import Mail from "../constants/mailConstants";

class Mailsender{
    sendMail(sendTo:string,dataToSend:string|number)
    {
        let templatePath = '../e-commerce/views/'

        let transporter = nodemailer.createTransport({
            service: Mail.SERVICE,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            }
        });

        transporter.use('compile', pugEngine({
            templateDir: templatePath,

        }))

        let mailOptions = {
            from: process.env.EMAIL_ID,
            to: sendTo,
            subject: Mail.SUBJECT,
            text: Mail.TEXT + dataToSend,
            template: 'mail'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}