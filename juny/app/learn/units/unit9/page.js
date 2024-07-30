"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  const slides = [
    {
      title: "Work in Progress",
      content: "Units 9-49 are still undergoing development and will be released soon. Stay tuned!",
      image: "/unit1Assets/1.png",
      juny: "service-tools.gif"
    },
  ];

  useEffect(() => {
    let currentText = '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < slides[currentSlide].content.length) {
        currentText += slides[currentSlide].content[index];
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setDisplayedText('');
    } else {
      router.push('/learn');
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setDisplayedText('');
    }
  };

  return (
    <div className="relative min-h-screen p-8 overflow-hidden bg-white">
      <div className="flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 300px)' }}>
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg h-full overflow-y-auto text-center border-4 border-blue-400">
          <h3 className="text-4xl font-semibold mb-4">{slides[currentSlide].title}</h3>
          <Image src={slides[currentSlide].image} width={100} height={100} alt="Top Image" className="mb-4 mx-auto"/>
          <motion.div
            className="relative bg-blue-100 p-4 rounded-lg inline-block max-w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-medium mb-8">{displayedText}</p>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-100 rotate-45" style={{ marginTop: '-0.5rem' }}></div>
          </motion.div>
          <Image src={slides[currentSlide].juny} width={300} height={300} alt="Bottom Image" className="mt-4 mx-auto"/>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        {currentSlide > 0 && (
          <button
            className={`button w-40 h-16 bg-blue-500 cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] rounded-full border-[1px] border-blue-400 flex justify-center items-center`}
            onClick={handlePrevious}
          >
            <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Previous</span>
          </button>
        )}
        <button
          className={`button w-40 h-16 ${currentSlide === slides.length - 1 ? 'bg-green-500' : 'bg-blue-500'} cursor-pointer select-none active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-[0px] transition-all duration-150 ${currentSlide === slides.length - 1 ? '[box-shadow:0_10px_0_0_#28a745,0_15px_0_0_#28a74541]' : '[box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]'} rounded-full border-[1px] ${currentSlide === slides.length - 1 ? 'border-green-400' : 'border-blue-400'} flex justify-center items-center`}
          onClick={handleNext}
        >
          <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>
            {currentSlide === slides.length - 1 ? 'Done' : 'Next'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Page;
