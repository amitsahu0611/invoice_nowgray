/** @format */

import React, {useState} from "react";
import {login} from "../redux/slice/auth.slice";
import {useDispatch} from "react-redux";
import {showSuccess} from "../../utils/config";

const Login = () => {
  const dispatch = useDispatch();

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
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              placeholder='••••••••'
              className='w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200'
          >
            Sign In
          </button>
        </form>
        <p className='mt-6 text-sm text-center text-gray-600'>
          Don't have an account?{" "}
          <a href='#' className='text-indigo-600 font-semibold hover:underline'>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
