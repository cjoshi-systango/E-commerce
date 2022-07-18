import dotenv from "dotenv"
dotenv.config();
import nodemailer from "nodemailer"
import { pugEngine }    from "nodemailer-pug-engine";
import pug from "pug"
import Mail from "../constants/mailConstants";

class Mailsender{
    sendMail(sendTo:string,dataToSend:string|number)
    {
        let templatePath = '../E-commerce/views/'

        let transporter = nodemailer.createTransport({
            service: Mail.SERVICE,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            }
        });

        let data = {
            password:dataToSend,
        }

        transporter.use('compile', pugEngine({
            templateDir: templatePath,
        }))

        let mailOptions = {
            from: process.env.EMAIL_ID,
            to: sendTo,
            subject: Mail.SUBJECT,
            text: Mail.TEXT + dataToSend,
            html: pug.renderFile("../E-commerce/views/mail.pug", { password:dataToSend})
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

let mailSender = new Mailsender;
export default mailSender;