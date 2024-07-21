"use client"
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alpacaKey, setAlpacaKey] = useState('');
  const [alpacaSecret, setAlpacaSecret] = useState(''); // New state for Alpaca secret
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8134/login', {
        username,
        password,
      });

      if (response.data.status === 'works') {
        Cookies.set('auth', 'your-auth-token'); // Replace with actual token if available
        setMessage('Login successful');
        window.location.reload(); // Refresh the page to update the authentication state
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

  // Function to handle signup
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8134/signup', {
        username,
        password,
        alpaca_key: alpacaKey,
        alpaca_secret: alpacaSecret, // Include Alpaca secret in the signup request
      });

      if (response.data.status === 'success') {
        setMessage('Signup successful');
        setIsSignup(false); // Redirect or handle post-signup logic here
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('auth');
    window.location.reload(); // Refresh the page to update the authentication state
  };

  return (
    <div>
      {Cookies.get('auth') ? (
        <>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {isSignup ? (
            <>
              <h2>Sign Up</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Alpaca API Key"
                value={alpacaKey}
                onChange={(e) => setAlpacaKey(e.target.value)}
              />
              <input
                type="text"
                placeholder="Alpaca API Secret"
                value={alpacaSecret}
                onChange={(e) => setAlpacaSecret(e.target.value)}
              />
              <button onClick={handleSignup}>Sign Up</button>
              <button onClick={() => setIsSignup(false)}>Back to Login</button>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setIsSignup(true)}>Sign Up</button>
            </>
          )}
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default Page;
