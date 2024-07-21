"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [scrollDepth, setScrollDepth] = useState(0);

  const units = [
    {
      title: "UNIT 1:",
      description: "David bro when are you gonna even tell me what this is on",
    },
    {
      title: "UNIT 2:",
      description: "Unit 2 description goes here.",
    },
    {
      title: "UNIT 3:",
      description: "Unit 3 description goes here.",
    },
    {
      title: "UNIT 4:",
      description: "Unit 4 description goes here.",
    },
    {
      title: "UNIT 5:",
      description: "Unit 5 description goes here.",
    },
    {
      title: "UNIT 6:",
      description: "Unit 6 description goes here.",
    },
    {
      title: "UNIT 7:",
      description: "Unit 7 description goes here.",
    },
    {
      title: "UNIT 8:",
      description: "Unit 8 description goes here.",
    },
    {
      title: "UNIT 9:",
      description: "Unit 9 description goes here.",
    },
    {
      title: "UNIT 10:",
      description: "Unit 10 description goes here.",
    },
    {
      title: "UNIT 11:",
      description: "Unit 11 description goes here.",
    },
    {
      title: "UNIT 12:",
      description: "Unit 12 description goes here.",
    },
  ];

  const buttonPositionsLeft = [
    { top: '40px', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '160px', left: '45%', transform: 'translate(-50%, 0)' },
    { top: '280px', left: '50%', transform: 'translate(-50%, 0)' },
  ];

  const buttonPositionsRight = [
    { top: '45px', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '160px', left: '55%', transform: 'translate(-50%, 0)' },
    { top: '280px', left: '50%', transform: 'translate(-50%, 0)' },
  ];

  const starIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const handleStarClick = (unitIndex, starIndex) => {
    router.push(`/learn/units/unit${unitIndex + 1}/quiz${starIndex + 1}`);
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setScrollDepth(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getParallaxStyle = (depth) => ({
    transform: `translateY(${scrollDepth * depth}px)`,
  });

  return (
    <div className="relative flex flex-col items-center h-screen pt-8">
      <div className="parallax-background absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url(/path/to/your/background1.png)', ...getParallaxStyle(0.1) }} />
      <div className="parallax-background absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url(/path/to/your/background2.png)', ...getParallaxStyle(0.2) }} />
      <div className="parallax-background absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url(/path/to/your/background3.png)', ...getParallaxStyle(0.3) }} />
      {units.map((unit, unitIndex) => (
        <div key={unitIndex} className="relative w-full mb-16 z-10">
          <div className="relative w-full flex justify-center">
            <a href={`/learn/units/unit${unitIndex + 1}`} className="block w-3/4 p-10 bg-blue-400 text-white border border-blue-400 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="mb-4 text-3xl font-bold tracking-tight">{unit.title}</h5>
                  <p className="font-normal mb-4">{unit.description}</p>
                </div>
                <div className='button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
                  active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                  active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                  border-b-[1px] border-blue-400'>
                  <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Learn</span>
                </div>
              </div>
            </a>
          </div>

          <div className="relative w-full h-[400px] mt-8">
            {(unitIndex % 2 === 0 ? buttonPositionsLeft : buttonPositionsRight).map((pos, starIndex) => (
              <div 
                key={starIndex} 
                style={{ position: 'absolute', top: pos.top, left: pos.left, transform: pos.transform }} 
                className='button w-24 h-24 bg-blue-500 rounded-full cursor-pointer select-none
                active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                active:border-b-[0px] transition-all duration-150 [box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841]
                border-[1px] border-blue-400 flex justify-center items-center text-white font-bold text-lg'
                onClick={() => handleStarClick(unitIndex, starIndex)}
              >
                {starIcon}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
