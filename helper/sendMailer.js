import nodemailer from "nodemailer";
import ErrorHandler from "../errorHandler/errorHandler.js";

const sendMail = async (mailObs) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASS,
      },
    });

    const { to, subject, text, html } = mailObs;

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error(
      `error occurred while sending mail to ${mailObs.to}: `,
      error
    );
    throw new ErrorHandler("mail cannot be sent", 500);
  }
};

export default sendMail;
