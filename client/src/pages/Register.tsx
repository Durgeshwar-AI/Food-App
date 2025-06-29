import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name,setName] = useState<string | null>(); 
  const [email,setEmail] = useState<string | null>(); 
  const [password,setPassword] = useState<string | null>(); 
  const [phone,setPhone] = useState<string | null>(); 

  const URL = import.meta.env.VITE_API_URL

  const handelRegister = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const user = {name,email,password,phone}
      const res = axios.post(`${URL}/user/register`,user)
      console.log(res)
    }catch(err){
      alert(err)
    }
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 cursor-default">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Register for Foodie</h2>
        <form className="space-y-4" onSubmit={handelRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input
            type="phone"
            placeholder="Phone number"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e)=>setPhone(e.target.value)}
          />
          <button className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition">
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
