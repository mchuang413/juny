"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const clientId = 'dcd9816d13f11fb6b7d63366b844216a';
const clientSecret = 'cc3f314b13ef1a016dbaf7815ec6255544166f4e';
const redirectUri = 'https://www.junyapp.com/';
const alpacaAuthUrl = `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

const Page = () => {
  const [message, setMessage] = useState('');

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload(); // Refresh the page to update the authentication state
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Exchange the authorization code for an access token
      const fetchToken = async () => {
        try {
          const response = await fetch('https://api.alpaca.markets/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            window.location.href = redirectUri; // Remove the code query parameter
          } else {
            setMessage('Authentication failed');
          }
        } catch (error) {
          console.error('Token fetch error:', error);
          setMessage('An error occurred');
        }
      };

      fetchToken();
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center relative overflow-hidden">
      {Cookies.get('auth') ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to JUNY!</h1>
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
            <div className="w-full text-center">
              <h1 className="text-gray-800 font-bold text-3xl mb-1">Hello Again!</h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
              <a
                href={alpacaAuthUrl}
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login with Alpaca
              </a>
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
