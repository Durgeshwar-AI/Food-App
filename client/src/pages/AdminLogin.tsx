import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { loginSuccess } from "../reducers/authReducer";
import { toast } from "react-toastify";

const AdminLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/admin/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("adminToken", res.data.token);
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      setEmail("");
      setPassword("");
      toast.success("Admin login successful");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Something went wrong"
      );
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Already logged in as admin");
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 cursor-default relative overflow-hidden mt-16">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -mr-48 mt-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -ml-48 mb-10"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.05)] rounded-3xl p-10 border border-gray-100 hover:border-orange-500/30 transition-all">
            {/* Brand */}
            <div className="text-center mb-10">
              <div className="text-5xl mb-4">🔐</div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                Admin Access
              </h2>
              <p className="text-gray-600 text-lg">
                Restricted access for administrators
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">
                  Admin Email
                </label>
                <input
                  type="email"
                  placeholder="admin@email.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all group-hover:border-orange-500/50"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 pr-14 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all group-hover:border-orange-500/50"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
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

              {/* Submit Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 text-lg mt-8 cursor-pointer">
                Access Dashboard
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Not an admin?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link to="/login">
              <button
                type="button"
                className="w-full border border-orange-500 text-orange-500 font-bold py-4 rounded-xl hover:bg-orange-50 transition-all text-lg cursor-pointer hover:shadow-sm"
              >
                User Login
              </button>
            </Link>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-500">
              For authorized administrators only
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
