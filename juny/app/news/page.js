"use client"
import React, { useEffect, useState } from 'react';
import StockNews from '../components/StockNews';
import Navbar from "../components/Navbar"

const Page = () => {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Stock News</h1>
      <StockNews />
    </div>
  );
};

export default Page;
