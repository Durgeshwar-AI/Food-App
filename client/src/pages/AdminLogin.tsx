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
        `${URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("token", res.data.token);
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
      <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 cursor-default">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">
            Admin Login
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Restricted access. For administrators only.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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
                    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
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
            <button className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition cursor-pointer">
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Not an admin?{" "}
            <Link
              to="/login"
              className="text-orange-600 hover:underline cursor-pointer"
            >
              Go to user login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
