// services/otpService.js
import nodemailer from "nodemailer";

const otpStore = {}; // In-memory storage (use Redis or DB for production)

let transporter;

function initializeTransporter() {
  if (!transporter) {
    // 2. Configure for Render + Gmail
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",  // Use specific host
      port: 465,               // Use 465 (SSL) - Render allows this port
      secure: true,            // True for 465
      auth: {
        user: process.env.OTP_MAIL_ID,
        pass: process.env.APP_PASSWORD,
      },
      // 3. CRITICAL: Force IPv4
      // Cloud providers often timeout when trying to connect to Gmail via IPv6
      tls: {
        servername: "smtp.gmail.com",
      },
      family: 4, // Forces IPv4 connection (fixes many timeout issues)
    });

    // 4. Verify connection immediately (Optional but helpful for debugging)
    transporter.verify((error, success) => {
      if (error) {
        console.error("Transporter verification failed:", error);
      } else {
        console.log("Server is ready to take our messages");
      }
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
