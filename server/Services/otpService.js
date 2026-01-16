// services/otpService.js
import { Resend } from "resend";

const otpStore = {}; // In-memory storage (use Redis or DB for production)

let resend;

function initializeResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email) {
  try {
    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore[email] = { otp, expiresAt };

    const resendClient = initializeResend();
    const result = await resendClient.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.OTP_MAIL_ID,
      subject: "Your OTP Code",
      html: `<p id='receiver-id'>${email}</p><p>Your OTP for Foodie. Your OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    });

    if (result.error) {
      console.error("Error sending OTP:", result.error);
      delete otpStore[email];
      throw new Error(result.error);
    }

    console.log(
      "OTP sent successfully to",
      email,
      "Message ID:",
      result.data.id
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
