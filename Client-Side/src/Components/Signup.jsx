import React from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [signupData , setsignupData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const changeHandler = (event)=> {
    setsignupData((prevData) => {
      return {
        ...prevData,
        [event.target.name] : event.target.value
      }
    })
  }

  async function submitHandler(e){
    e.preventDefault();
    try {
      const response = await axios.post("/user/signup",
        signupData
      );
  
      if(response.status === 200){
        navigate("/");
        toast.success("signed up successfully!!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warning("Username or email exists");
      } else {
        toast.error("Something went wrong, please try again!");
      }
    }
  }

  return (
  <div className="w-full max-w-md p-8 mx-auto bg-slate-400 shadow-lg rounded-xl my-2.5">
    <h1 className="text-center text-5xl font-bold text-gray-900 mb-6">Sign Up</h1>
    <form action="/" method="post" className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-sky-900">Enter your username</label>
        <input
          type="text"
          onChange={changeHandler}
          placeholder="username"
          name="username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-sky-900">Enter your email</label>
        <input
          type="email"
          onChange={changeHandler}
          placeholder="email"
          name="email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-sky-900">Enter your password</label>
        <input
          type="password"
          onChange={changeHandler}
          placeholder="password"
          name="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <button
          onClick={submitHandler}
          className="w-full py-3 bg-black text-white border-2 border-black rounded-xl transition-colors duration-200 hover:bg-slate-100 hover:text-black"
        >
          Sign Up
        </button>
      </div>
    </form>

    <h1 className="text-center mt-6">
      Already have an Account?{" "}{" "}
      <Link className="text-blue-600 hover:underline" to="/user/login">
        Click to login
      </Link>
    </h1>
  </div>

  )
}

export default Signup