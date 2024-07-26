"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Page = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');

  // Alpaca OAuth2 details
  const clientId = 'dcd9816d13f11fb6b7d63366b844216a';
  const clientSecret = 'cc3f314b13ef1a016dbaf7815ec6255544166f4e'; // replace with your actual client secret
  const redirectUri = 'https://www.junyapp.com/';
  const authEndpoint = 'https://app.alpaca.markets/oauth/authorize';
  const tokenEndpoint = 'https://api.alpaca.markets/oauth/token';

  const handleOAuthLogin = () => {
    const authUrl = `${authEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=dfasdff13f3122343df&scope=account:write%20trading`;
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        Cookies.set('auth', data.access_token);
        setMessage('Login successful');
        window.location.reload(); // Refresh the page to update the authentication state
      } else {
        setMessage('Failed to exchange code for token');
      }
    } catch (error) {
      console.error('Token exchange error:', error);
      setMessage('An error occurred');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload(); // Refresh the page to update the authentication state
  };

  // Check if there's an authorization code in the URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        exchangeCodeForToken(code);
      }
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center relative overflow-hidden">
      {Cookies.get('auth') ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to JUNY!</h1>
          <p className="text-xl mt-4">Client ID: {clientId}</p>
          <p className="text-xl">Client Secret: {clientSecret}</p>
          <button
            className="bg-indigo-600 hover:bg-indigo-800 py-2 px-4 rounded transition duration-300 text-white font-semibold mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="flex w-full max-w-md justify-center items-center bg-white space-y-8 rounded-lg shadow-2xl p-10 relative z-10">
            <div className="w-full">
              <h1 className="text-gray-800 font-bold text-3xl mb-1 text-center">{isSignup ? 'Sign Up' : 'Hello Again!'}</h1>
              <p className="text-sm font-normal text-gray-600 mb-8 text-center">{isSignup ? 'Create your account' : 'Welcome Back'}</p>
              <button
                onClick={handleOAuthLogin}
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                {isSignup ? 'Sign Up with Alpaca' : 'Login with Alpaca'}
              </button>
              <div className="flex justify-between mt-4">
                {!isSignup && (
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password?</span>
                )}
                <a
                  href="#"
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup ? 'Already have an account?' : "Don't have an account yet?"}
                </a>
              </div>
              {message && <p className="text-red-500 mt-4">{message}</p>}
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <img src="/wave.svg" alt="Wave" className="w-full rounded-b-lg" />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
