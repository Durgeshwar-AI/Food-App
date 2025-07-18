// Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { loginSuccess } from "../reducers/authReducer";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });
      console.log(res.data);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userName", res.data.name); 
      dispatch(loginSuccess({ user: res.data.user}));
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) {
    const notify = () => {
      toast("Already logged in");
    };
    notify();
    setTimeout(() => {}, 1000);
    navigate("/");
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 cursor-default">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
            Login to Foodie
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition cursor-pointer">
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
