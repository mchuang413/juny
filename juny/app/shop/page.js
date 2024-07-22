"use client";
import React from "react";
import PremiumCard from "../components/PremiumCard";

const Slogan = () => {
  return (
    <div className="border-4 border-blue-400 text-black p-4 rounded-lg shadow-md mb-8">
      <h1 className="text-2xl font-bold text-center">
        Join JUNY+ to learn about Juny&apos;s stock secrets 📈🐙
      </h1>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Slogan />
      <div className="flex items-center justify-center bg-gradient-to-b from-blue-400 to-black rounded-xl shadow-lg p-8" style={{ width: '60%', height: '60%' }}>
        <PremiumCard />
      </div>
    </div>
  );
};

export default Page;
