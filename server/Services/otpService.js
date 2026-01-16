// services/otpService.js
import nodemailer from "nodemailer";

const otpStore = {}; // In-memory storage (use Redis or DB for production)

let transporter;

function initializeTransporter() {
  if (!transporter) {
    if (!process.env.OTP_MAIL_ID || !process.env.APP_PASSWORD) {
      console.error("Missing email credentials in .env file");
      console.error(
        "OTP_MAIL_ID:",
        process.env.OTP_MAIL_ID ? "set" : "NOT SET"
      );
      console.error(
        "APP_PASSWORD:",
        process.env.APP_PASSWORD ? "set" : "NOT SET"
      );
    }

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OTP_MAIL_ID,
        pass: process.env.APP_PASSWORD,
      },
    });
  }
  return transporter;
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email) {
  try {
    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore[email] = { otp, expiresAt };

    const mailOptions = {
      from: process.env.OTP_MAIL_ID,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<h2>Your OTP for Foodie</h2><p>Your OTP is <strong>${otp}</strong></p><p>It will expire in 5 minutes.</p>`,
    };

    const mailTransporter = initializeTransporter();
    const result = await mailTransporter.sendMail(mailOptions);
    console.log(
      "OTP sent successfully to",
      email,
      "Message ID:",
      result.messageId
    );
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    delete otpStore[email];
    throw error;
  }
}

export function verifyOtp(email, inputOtp) {
  const record = otpStore[email];
  if (!record) return { success: false, message: "OTP not found" };

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return { success: false, message: "OTP expired" };
  }

  if (record.otp === inputOtp) {
    delete otpStore[email];
    return { success: true, message: "OTP verified" };
  }

  return { success: false, message: "Invalid OTP" };
}
