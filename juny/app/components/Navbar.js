import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed h-full w-60 bg-blue-200 flex flex-col items-center py-4 border-black border-2 rounded-xl">
      <div className="flex flex-col items-center mb-8 bg-white p-4 rounded-xl border-black border-2">
        <Image src="/logo/logo.png" alt="Logo" width={50} height={50} />
        <span className="font-bold text-lg mt-2">JUNY</span>
      </div>
      <div className="flex flex-col justify-center flex-grow space-y-4">
        <Link href="/learn" legacyBehavior>
          <a className="button w-40 h-16 bg-blue-300 rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-sky-300 flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">Learn</span>
          </a>
        </Link>
        <Link href="/simulator" legacyBehavior>
          <a className="button w-40 h-16 bg-blue-300 rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-sky-300 flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">Simulator</span>
          </a>
        </Link>
        <Link href="/shop" legacyBehavior>
          <a className="button w-40 h-16 bg-blue-300 rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-sky-300 flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">Shop</span>
          </a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a className="button w-40 h-16 bg-blue-300 rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-sky-300 flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">Sign Up</span>
          </a>
        </Link>
        <Link href="/signin" legacyBehavior>
          <a className="button w-40 h-16 bg-blue-300 rounded-lg cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
            border-b-[1px] border-sky-300 flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">Sign In</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
