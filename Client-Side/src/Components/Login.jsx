import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';

function Login() {
  const [logindata,setLogindata] = useState({email:"" , password:""});
  const navigate = useNavigate();

  function changehandler(event){
    setLogindata((prevdata)=>{
      return {
        ...prevdata,
        [event.target.name] : event.target.value
      }
    })
  }

  async function submitHandler(event){
    event.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/user/login` , logindata, {
        withCredentials: true,  // Ensure cookies are sent with the request
      });

      if(res.status === 200){
        navigate('/dashboard');
        toast.success("logged in successfully !!!!!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning("Please fill all details");
      }
      else if(error.response && error.response.status === 401){
        toast.warning("Invalid Credentials");
      }else {
        toast.error("Something went wrong, please try again!");
      }
    }
  }

  return (
  <div className="flex justify-center items-center h-screen bg-gradient-to-tl from-sky-900 via-purple-900 to-gray-800">
  <div className="w-full max-w-md p-8 mx-auto bg-blue-900 shadow-lg rounded-xl my-16">
    <h1 className="text-center text-5xl font-bold text-pink-700 mb-6">Login</h1>
    <form action="" method="post" className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-red-400">Enter your email</label>
        <input
          type="email"
          placeholder="enter email"
          name="email"
          onChange={changehandler}
          value={logindata.email}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-red-400">Enter your password</label>
        <input
          type="password"
          placeholder="enter password"
          name="password"
          onChange={changehandler}
          value={logindata.password}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <button
          type="submit"
          onClick={submitHandler}
          className="w-full py-3 bg-black text-white border-2 border-black rounded-xl transition-colors duration-200 hover:bg-slate-100 hover:text-black hover:border-black"
        >
          Login
        </button>
      </div>
    </form>

    <h1 className="text-center mt-6">
      New User?{" "}
      <Link className="text-red-300 hover:underline" to="/user/signup">
        Register here
      </Link>
    </h1>
  </div>
  </div>
  )
}

export default Login