import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a transporter object using Mailjet's SMTP server
const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com', // Mailjet SMTP server
  port: 587, // Port number for Mailjet
  secure: false, // Use false for TLS
  auth: {
    user: process.env.MAILJET_API_KEY, // Your Mailjet API Key
    pass: process.env.MAILJET_API_SECRET, // Your Mailjet API Secret
  },
});

// Function to send email
export const sendEmail = async ({ to, subject, message }) => {
  try {
    const info = await transporter.sendMail({
      from: 'stickermarket9@gmail.com', // Verified sender email in Mailjet
      to,
      subject,
      text: message, // Plain text body
      html: `<p>${message}</p>`, // HTML body
    });

    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
