/** @format */

import React, {useState} from "react";
import {login} from "../redux/slice/auth.slice";
import {useDispatch} from "react-redux";
import {showSuccess} from "../../utils/config";

import {Eye, EyeOff} from "lucide-react"; // 👈 replace react-icons with this

const Login = () => {
  const dispatch = useDispatch();

  // Inside the component
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(formData));
    console.log("data", data);
    if (data?.payload?.status == 1) {
      showSuccess("Login Successful");
      localStorage.setItem("token", data?.payload?.result?.authToken);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(data?.payload?.result?.user)
      );
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='you@example.com'
              className='w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='••••••••'
                className='w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200'
          >
            Sign In
          </button>
        </form>
        <p className='mt-6 text-sm text-center text-gray-600'>
          Powered by Nowgray ❤️{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
