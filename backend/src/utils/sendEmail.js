import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // Ethereal SMTP host
      port: 587, // Ethereal uses port 587
      secure: false, // Use `true` for port 465
      auth: {
        user: process.env.ADMIN_EMAIL, // Ethereal email
        pass: process.env.ADMIN_EMAIL_PASSWORD, // Ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: `"Admin" <${process.env.ADMIN_EMAIL}>`, // Sender address
      to, // Recipient
      subject,
      text,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export default sendEmail;
