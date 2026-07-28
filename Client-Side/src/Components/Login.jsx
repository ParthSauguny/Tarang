import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';
import Waveform from './Waveform';

function Login() {
  const [logindata,setLogindata] = useState({email:"" , password:""});
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/user/login` , logindata, {
        withCredentials: true,
      });

      if(res.status === 200){
        toast.success("Logged in successfully");
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning("Please fill all details");
      }
      else if(error.response && error.response.status === 401){
        toast.warning("Invalid credentials");
      }else {
        toast.error("Something went wrong, please try again!");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
  <div className="flex justify-center items-center min-h-screen bg-ocean-bg px-4">
  <div className="w-full max-w-md p-8 bg-ocean-surface border border-ocean-border shadow-2xl rounded-2xl">
    <div className="flex justify-center mb-4">
      <Waveform size="sm" />
    </div>
    <h1 className="text-center font-display text-4xl text-foam mb-8">Log in</h1>
    <form onSubmit={submitHandler} className="space-y-5">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-mist">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          name="email"
          onChange={changehandler}
          value={logindata.email}
          className="w-full p-3 bg-ocean-bg border border-ocean-border rounded-lg text-foam placeholder-mist focus:outline-none focus:border-wave-teal transition-colors"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-mist">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          name="password"
          onChange={changehandler}
          value={logindata.password}
          className="w-full p-3 bg-ocean-bg border border-ocean-border rounded-lg text-foam placeholder-mist focus:outline-none focus:border-wave-teal transition-colors"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-wave-gradient text-ocean-bg font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </div>
    </form>

    <p className="text-center mt-6 text-mist text-sm">
      New here?{" "}
      <Link className="text-wave-teal hover:underline" to="/user/signup">
        Create an account
      </Link>
    </p>
  </div>
  </div>
  )
}

export default Login
