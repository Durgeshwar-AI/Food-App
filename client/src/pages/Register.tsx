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
      <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 cursor-default">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
            Register for Foodie
          </h2>
          <form className="space-y-4" onSubmit={handelRegister}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="userName"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={sendOtp}
                disabled={isSendingOtp || !email}
                className={`flex-1 border rounded-xl py-2 cursor-pointer ${
                  isSendingOtp ? "opacity-60" : "hover:bg-orange-50"
                }`}
              >
                {isSendingOtp
                  ? "Sending OTP…"
                  : otpSent
                  ? "Resend OTP"
                  : "Send OTP"}
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter OTP"
                className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                aria-label="OTP"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-800"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Eye outline (closed path for full shape) */}
                    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12Z" />
                    {/* Pupil */}
                    <circle cx="12" cy="12" r="3" />
                    {/* Slash */}
                    <path d="M3 3L21 21" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <input
              type="phone"
              placeholder="Phone number"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="phone-number"
              required
            />
            <button
              className={`w-full bg-orange-500 text-white py-2 rounded-xl transition cursor-pointer ${
                isSubmitting ? "opacity-60" : "hover:bg-orange-600"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering…" : "Register"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
