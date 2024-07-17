import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Overview = () => {
  const navigate = useNavigate(); // Initialize the hook

  const units = [
    {
      title: "UNIT 1:",
      description: "David bro when are you gonna even tell me what this is on",
    },
    {
      title: "UNIT 2:",
      description: "Overview of Investing",
    },
    {
      title: "UNIT 3:",
      description: "Unit 2 description goes here.",
    },
    {
      title: "UNIT 4:",
      description: "Unit 2 description goes here.",
    },
    {
      title: "UNIT 5:",
      description: "Unit 2 description goes here.",
    },
    {
      title: "UNIT 6:",
      description: "Unit 2 description goes here.",
    },
    {
      title: "UNIT 7:",
      description: "Unit 2 description goes here.",
    },
    {
      title: "UNIT 8:",
      description: "Unit 2 description goes here.",
    },
  ];

  const buttonPositionsLeft = [
    { top: '45px', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '145px', left: '45%', transform: 'translate(-50%, 0)' },
    { top: '245px', left: '40%', transform: 'translate(-50%, 0)' },
    { top: '345px', left: '45%', transform: 'translate(-50%, 0)' },
    { top: '445px', left: '50%', transform: 'translate(-50%, 0)' },
  ];

  const buttonPositionsRight = [
    { top: '45px', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '145px', left: '55%', transform: 'translate(-50%, 0)' },
    { top: '245px', left: '60%', transform: 'translate(-50%, 0)' },
    { top: '345px', left: '55%', transform: 'translate(-50%, 0)' },
    { top: '445px', left: '50%', transform: 'translate(-50%, 0)' },
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

  return (
    <div className="relative flex flex-col items-center h-screen pt-8">
      {units.map((unit, unitIndex) => (
        <div key={unitIndex} className="relative w-full mb-16">
          <div className="relative w-full flex justify-center">
            <a href="#" className="block w-3/4 p-10 bg-blue-400 text-white border border-blue-400 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="mb-4 text-3xl font-bold tracking-tight">{unit.title}</h5>
                  <p className="font-normal mb-4">{unit.description}</p>
                </div>
                <div 
                  className='button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
                  active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                  active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                  border-b-[1px] border-blue-400'
                  onClick={() => navigate(`/learn/unit${unitIndex + 1}`)} // Navigate to the unit page
                >
                  <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Learn</span>
                </div>
              </div>
            </a>
          </div>

          <div className="relative w-full h-[600px] mt-8">
            {(unitIndex % 2 === 0 ? buttonPositionsLeft : buttonPositionsRight).map((pos, starIndex) => (
              <div 
                key={starIndex} 
                style={{ position: 'absolute', top: pos.top, left: pos.left, transform: pos.transform }} 
                className='button w-24 h-24 bg-blue-500 rounded-full cursor-pointer select-none
                active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                active:border-b-[0px] transition-all duration-150 [box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841]
                border-[1px] border-blue-400 flex justify-center items-center text-white font-bold text-lg'>
                {starIcon}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overview;
