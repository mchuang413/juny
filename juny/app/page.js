"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const generateAuthUrl = () => {
  const clientId = 'dcd9816d13f11fb6b7d63366b844216a';
  const redirectUri = 'https://www.junyapp.com/oauth/callback';
  const state = 'lxsquidofficial';
  const scope = 'account:write%20trading';

  return `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
};

const exchangeCodeForToken = async (code) => {
  const clientId = 'dcd9816d13f11fb6b7d63366b844216a';
  const clientSecret = 'cc3f314b13ef1a016dbaf7815ec6255544166f4e';
  const redirectUri = 'https://www.junyapp.com/oauth/callback';

  const response = await fetch('https://api.alpaca.markets/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }).toString(),
  });

  const data = await response.json();
  return data.access_token;
};

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alpacaKey, setAlpacaKey] = useState('');
  const [alpacaSecret, setAlpacaSecret] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');

  const handleOAuthLogin = () => {
    window.location.href = generateAuthUrl();
  };

  const handleOAuthCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      try {
        const accessToken = await exchangeCodeForToken(code);
        Cookies.set('alpaca_token', accessToken);
        setMessage('Login successful');
        window.location.href = '/'; // Redirect to home or dashboard
      } catch (error) {
        setMessage('OAuth login failed');
      }
    }
  };

  // Call handleOAuthCallback if the URL contains an authorization code
  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleLogout = () => {
    Cookies.remove('auth');
    Cookies.remove('alpaca_token');
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col justify-center items-center relative overflow-hidden">
      {Cookies.get('alpaca_token') ? (
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
            <div className="w-full">
              <form onSubmit={isSignup ? handleSignup : handleLogin}>
                <h1 className="text-gray-800 font-bold text-3xl mb-1 text-center">{isSignup ? 'Sign Up' : 'Hello Again!'}</h1>
                <p className="text-sm font-normal text-gray-600 mb-8 text-center">{isSignup ? 'Create your account' : 'Welcome Back'}</p>
                <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                  <input
                    id="username"
                    className="pl-2 w-full outline-none border-none"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl">
                  <input
                    className="pl-2 w-full outline-none border-none"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {isSignup && (
                  <>
                    <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                      <input
                        className="pl-2 w-full outline-none border-none"
                        type="text"
                        name="alpacaKey"
                        placeholder="Alpaca API Key"
                        value={alpacaKey}
                        onChange={(e) => setAlpacaKey(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                      <input
                        className="pl-2 w-full outline-none border-none"
                        type="text"
                        name="alpacaSecret"
                        placeholder="Alpaca API Secret"
                        value={alpacaSecret}
                        onChange={(e) => setAlpacaSecret(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
                <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                  {isSignup ? 'Sign Up' : 'Login'}
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
              </form>
              {!isSignup && (
                <button
                  className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                  onClick={handleOAuthLogin}
                >
                  Login with Alpaca
                </button>
              )}
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
