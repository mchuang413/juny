"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar } from "react-icons/fi";

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alpacaKey, setAlpacaKey] = useState('');
  const [alpacaSecret, setAlpacaSecret] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8134/login', {
        username,
        password,
        alpaca_key: alpacaKey,
        alpaca_secret: alpacaSecret,
      });

      if (response.data.status === 'works') {
        Cookies.set('auth', 'your-auth-token');
        setMessage('Login successful');
        window.location.reload();
      } else if (response.data.status === 'nouser') {
        setMessage('User does not exist');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8134/signup', {
        username,
        password,
        alpaca_key: alpacaKey,
        alpaca_secret: alpacaSecret,
      });

      if (response.data.status === 'success') {
        setMessage('Signup successful');
        setIsSignup(false);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred');
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload();
  };

  return (
    <section className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      <Logo />
      <Form
        isSignup={isSignup}
        setIsSignup={setIsSignup}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        alpacaKey={alpacaKey}
        setAlpacaKey={setAlpacaKey}
        alpacaSecret={alpacaSecret}
        setAlpacaSecret={setAlpacaSecret}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        message={message}
      />
      <SupplementalContent />
    </section>
  );
};

const Form = ({
  isSignup,
  setIsSignup,
  username,
  setUsername,
  password,
  setPassword,
  alpacaKey,
  setAlpacaKey,
  alpacaSecret,
  setAlpacaSecret,
  handleLogin,
  handleSignup,
  message,
}) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center pb-4 pt-20 md:py-20"
    >
      <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-4xl font-semibold"
        >
          {isSignup ? 'Create your account' : 'Login'}
        </motion.h1>
        {isSignup && (
          <motion.p variants={primaryVariants} className="mb-8 text-center">
            
          </motion.p>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="username-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Username<span className="text-red-600">*</span>
            </label>
            <input
              id="username-input"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="password-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <input
              id="password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          {isSignup && (
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="rt-password-input"
                className="mb-1 inline-block text-sm font-medium"
              >
                Re-type Password<span className="text-red-600">*</span>
              </label>
              <input
                id="rt-password-input"
                type="password"
                placeholder="Re-type your password"
                className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
              />
            </motion.div>
          )}

          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="alpaca-key-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Alpaca API Key<span className="text-red-600">*</span>
            </label>
            <input
              id="alpaca-key-input"
              type="text"
              placeholder="Enter your Alpaca API Key"
              value={alpacaKey}
              onChange={(e) => setAlpacaKey(e.target.value)}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-4 w-full">
            <label
              htmlFor="alpaca-secret-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Alpaca API Secret<span className="text-red-600">*</span>
            </label>
            <input
              id="alpaca-secret-input"
              type="text"
              placeholder="Enter your Alpaca API Secret"
              value={alpacaSecret}
              onChange={(e) => setAlpacaSecret(e.target.value)}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          {isSignup && (
            <motion.div
              variants={primaryVariants}
              className="mb-4 flex w-full items-start gap-1.5"
            >
              <input
                type="checkbox"
                id="terms-checkbox"
                className="h-4 w-4 accent-indigo-600"
                required
              />
              <label htmlFor="terms-checkbox" className="text-xs">
                By signing up, I agree to the terms and conditions, privacy
                policy, and cookie policy
              </label>
            </motion.div>
          )}

          <motion.button
            variants={primaryVariants}
            whileTap={{
              scale: 0.985,
            }}
            type="submit"
            className="mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700"
            onClick={isSignup ? handleSignup : handleLogin}
          >
            {isSignup ? 'Sign up' : 'Login'}
          </motion.button>
          <motion.p variants={primaryVariants} className="text-xs">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <a className="text-indigo-600 underline" href="#" onClick={() => setIsSignup(false)}>
                  Sign in
                </a>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <a className="text-indigo-600 underline" href="#" onClick={() => setIsSignup(true)}>
                  Sign up
                </a>
              </>
            )}
          </motion.p>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </motion.div>
  );
};

const SupplementalContent = () => {
  return (
    <div className="group sticky top-4 m-4 h-80 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-slate-950 md:h-[calc(100vh_-_2rem)]">
      <img
        alt="An example image"
        src="/imgs/abstract/18.jpg"
        className="h-full w-full bg-white object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
      />

      <div className="absolute right-2 top-4 z-10">
        <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-slate-950/90 to-slate-950/0 p-8"
      >
        <motion.h2
          className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl"
          variants={primaryVariants}
        >
          The Best Way to Invest in Stocks is to Invest in Yourself
          <br />
          with Juny
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="mb-6 max-w-md text-sm text-slate-300"
        >
          Juny is here to teach you the secrets to become a millionare in the stock market.
        </motion.p>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
          </div>
          <div>
            <motion.div variants={primaryVariants} className="flex gap-0.5">
              <span className="ml-2 text-sm text-white"></span>
            </motion.div>
            <motion.p
              variants={primaryVariants}
              className="text-xs text-slate-300"
            >
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="50"
      height="39"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[50%] top-4 -translate-x-[50%] fill-slate-950 md:left-4 md:-translate-x-0"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const avatarVariants = {
  initial: {
    x: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

export default Page;
