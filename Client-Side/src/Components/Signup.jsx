import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Waveform from './Waveform';

function Signup() {
  const [signupData , setsignupData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/user/signup`,
        signupData
      );

      if(response.status === 200){
        toast.success("Signed up successfully");
        navigate("/user/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warning("Username or email already exists");
      } else {
        toast.error("Something went wrong, please try again!");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
  <div className='flex justify-center items-center min-h-screen bg-ocean-bg px-4'>
    <div className="w-full max-w-md p-8 bg-ocean-surface border border-ocean-border shadow-2xl rounded-2xl">
      <div className="flex justify-center mb-4">
        <Waveform size="sm" />
      </div>
      <h1 className="text-center font-display text-4xl text-foam mb-8">Sign up</h1>
      <form onSubmit={submitHandler} className="space-y-5">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-mist">Username</label>
          <input
            type="text"
            onChange={changeHandler}
            placeholder="username"
            name="username"
            className="w-full p-3 bg-ocean-bg border border-ocean-border rounded-lg text-foam placeholder-mist focus:outline-none focus:border-wave-teal transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-mist">Email</label>
          <input
            type="email"
            onChange={changeHandler}
            placeholder="you@example.com"
            name="email"
            className="w-full p-3 bg-ocean-bg border border-ocean-border rounded-lg text-foam placeholder-mist focus:outline-none focus:border-wave-teal transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-mist">Password</label>
          <input
            type="password"
            onChange={changeHandler}
            placeholder="••••••••"
            name="password"
            className="w-full p-3 bg-ocean-bg border border-ocean-border rounded-lg text-foam placeholder-mist focus:outline-none focus:border-wave-teal transition-colors"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-wave-gradient text-ocean-bg font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? "Signing up…" : "Sign up"}
          </button>
        </div>
      </form>

      <p className="text-center mt-6 text-mist text-sm">
        Already have an account?{" "}
        <Link className="text-wave-teal hover:underline" to="/user/login">
          Log in
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Signup
