"use client"
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated based on cookie
    const token = Cookies.get('auth');
    setIsAuthenticated(!!token); // Update state based on the presence of the token
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          {isAuthenticated && <Navbar className="w-full fixed top-0" />}
          <main className="flex-1 p-4 mt-20">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
