import React from 'react';
import { Link } from 'react-router-dom';
import Waveform from './Waveform';

function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ocean-bg text-foam px-6">
      <Waveform animated size="lg" className="mb-8" />

      <div className="text-center space-y-4 max-w-xl">
        <h1 className="font-display text-6xl text-foam tracking-wide">
          Tarang
        </h1>
        <p className="text-lg text-mist">
          An AI chatbot that finds its rhythm with you. Sign in to start a conversation.
        </p>
      </div>

      <div className="mt-12 flex gap-4">
        <Link to="/user/signup">
          <button className="rounded-full bg-wave-gradient text-ocean-bg text-lg px-7 py-3 font-semibold shadow-lg hover:opacity-90 transition-opacity">
            Sign up
          </button>
        </Link>
        <Link to="/user/login">
          <button className="rounded-full border border-ocean-border text-foam text-lg px-7 py-3 font-semibold hover:border-wave-teal hover:text-wave-teal transition-colors">
            Log in
          </button>
        </Link>
      </div>

      <footer className="absolute bottom-6 text-center text-sm text-mist">
        Made with care by <span className="text-wave-teal font-medium">Parth Sauguny</span>
      </footer>
    </div>
  );
}

export default Homepage;
