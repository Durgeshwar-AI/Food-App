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

  const URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handelRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = { name, email, password, phone };
      const res = await axios.post(`${URL}/user/register`, user, {
        withCredentials: true,
      });
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Registration failed");
      } else {
        toast.error("Something went wrong");
      }
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
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
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
              className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition cursor-pointer"
              type="submit"
            >
              Register
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
