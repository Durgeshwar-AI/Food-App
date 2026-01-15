import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { loginSuccess } from "../reducers/authReducer";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handelRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!otpSent) {
        return toast.warn("Please request and enter OTP first");
      }
      if (!otp || otp.trim().length === 0) {
        return toast.warn("Enter the OTP sent to your email");
      }

      setIsSubmitting(true);
      const user = { name, email, password, phone, otp };
      const res = await axios.post(`${URL}/user/register`, user, {
        withCredentials: true,
      });
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      console.log(isAuthenticated);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setOtp("");
      setOtpSent(false);
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      if (err) {
        console.log(err);
        const msg =
          err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Registration failed";
        toast.error(msg);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendOtp = async () => {
    try {
      if (!email) return toast.warn("Enter your email first");
      setIsSendingOtp(true);
      await axios.post(`${URL}/user/send-otp`, { email });
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      toast.error(msg);
    } finally {
      setIsSendingOtp(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Already logged in");
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 cursor-default relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -mr-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -ml-48"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl rounded-3xl p-10 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all">
            {/* Brand */}
            <div className="text-center mb-10">
              <div className="text-5xl mb-4">🍕</div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                Join Us
              </h2>
              <p className="text-gray-400 text-lg">Create your account</p>
            </div>
            <form className="space-y-6" onSubmit={handelRegister}>
              {/* Full Name Input */}
              <div className="group">
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-500/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="userName"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-500/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              {/* OTP Section */}
              <div className="group">
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">
                  Email Verification
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={isSendingOtp || !email}
                    className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl transition-all transform ${
                      isSendingOtp
                        ? "opacity-60"
                        : "hover:scale-105 hover:shadow-lg"
                    }`}
                  >
                    {isSendingOtp
                      ? "Sending…"
                      : otpSent
                      ? "Resend OTP"
                      : "Send OTP"}
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="OTP"
                    className="flex-1 px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    aria-label="OTP"
                  />
                </div>
              </div>
              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 pr-14 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-500/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M3 3L21 21" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Input */}
              <div className="group">
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">
                  Phone Number
                </label>
                <input
                  type="phone"
                  placeholder="+91 xxxxxxxxxx"
                  className="w-full px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all group-hover:border-orange-500/50"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="phone-number"
                  required
                />
              </div>
              {/* Submit Button */}
              <button
                className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 text-lg mt-8 cursor-pointer ${
                  isSubmitting ? "opacity-60" : ""
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account…" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link to="/login">
              <button
                type="button"
                className="w-full border-2 border-orange-500/50 text-orange-400 font-bold py-4 rounded-xl hover:bg-orange-500/10 hover:border-orange-500 transition-all text-lg cursor-pointer"
              >
                Sign In
              </button>
            </Link>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-500">
              By registering, you agree to our <br />
              <Link
                to="/about"
                className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
