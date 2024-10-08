"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alpacaKey, setAlpacaKey] = useState("");
  const [alpacaSecret, setAlpacaSecret] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sea-lion-app-dckh3.ondigitalocean.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "works") {
        Cookies.set("username", username);
        console.log(username);
        Cookies.set("auth", "your-auth-token"); 
        setMessage("Login successful");
        window.location.reload(); 
      } else if (data.status === "nouser") {
        setMessage("User does not exist");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sea-lion-app-dckh3.ondigitalocean.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          alpaca_key: alpacaKey,
          alpaca_secret: alpacaSecret,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        Cookies.set("username", username);
        Cookies.set("auth", "your-auth-token"); 
        setMessage("Signup successful");
        setIsSignup(false); 
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("An error occurred");
    }
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    Cookies.remove("username");
    window.location.reload();
  };

  useEffect(() => {
    const usernameFromCookies = Cookies.get("username");
    if (usernameFromCookies) {
      setUsername(usernameFromCookies);
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center relative overflow-hidden">
      {Cookies.get("auth") ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to JUNY, {Cookies.get("username")}!</h1>
          <button
            className="bg-indigo-600 hover:bg-indigo-800 py-2 px-4 rounded transition duration-300 text-white font-semibold mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="flex w-full max-w-2xl justify-center items-center bg-white space-y-8 rounded-lg shadow-2xl p-10 relative z-10">
            <div className="w-full max-w-xs">
              <form onSubmit={isSignup ? handleSignup : handleLogin}>
                <h1 className="text-gray-800 font-bold text-3xl mb-1 text-center">
                  {isSignup ? "Sign Up" : "Hello Again!"}
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-8 text-center">
                  {isSignup ? "Create your account" : "Welcome Back"}
                </p>
                <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  {isSignup ? "Sign Up" : "Login"}
                </button>
                <div className="flex justify-between mt-4">
                  {!isSignup && (
                    <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                      Forgot Password?
                    </span>
                  )}
                  <a
                    href="#"
                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    onClick={() => setIsSignup(!isSignup)}
                  >
                    {isSignup
                      ? "Already have an account?"
                      : "Don't have an account yet?"}
                  </a>
                </div>
                {message && <p className="text-red-500 mt-4">{message}</p>}
              </form>
            </div>

            {/* Image Container */}
            <div className="w-1/3 ml-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/logo/image.png"
                  alt="Logo"
                  className="h-auto w-full"
                />
              </div>
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
