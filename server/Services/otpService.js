// services/otpService.js
import nodemailer from 'nodemailer'

const otpStore = {}; // In-memory storage (use Redis or DB for production)

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OTP_MAIL_ID,
    pass: process.env.APP_PASSWORD, // Use app password
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email) {
  const otp = generateOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore[email] = { otp, expiresAt };

  const mailOptions = {
    from: process.env.OTP_MAIL_ID,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  return true;
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

