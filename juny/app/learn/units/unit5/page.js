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
      title: "Overview of Investing",
      content: "Investing is like embarking on an adventure with Juny the Octopus in the vast ocean! 🌊 It means putting your money into various assets, such as stocks, bonds, or real estate, with the expectation that these assets will grow in value over time.",
      image: "/unit1Assets/1.png",
      juny: "/unit1Assets/gifs/1.gif"
    },
    {
      title: "Overview of Investing",
      content: "The main purpose of investing is to build wealth and reach financial goals, whether it's buying a home, funding education, or saving for retirement. Imagine Juny planting tiny seaweed seeds in her garden, hoping they will grow into a lush underwater forest! 🌱💰",
      image: "/unit1Assets/2.png",
      juny: "/unit1Assets/gifs/2.gif"
    },
    {
      title: "History of Investing",
      content: "The history of investing is as rich and diverse as the ocean itself. Imagine Juny's ancestors trading precious shells long ago to build their wealth! 🐚 In ancient times, people invested in tangible assets like land, livestock, and trade goods.",
      image: "/unit1Assets/3.png",
      juny: "/unit1Assets/gifs/3.gif"
    },
    {
      title: "History of Investing",
      content: "The concept was simple: put resources into something valuable that could grow over time. The first modern stock market, the Amsterdam Stock Exchange, was established in the early 1600s, allowing people to buy and sell shares of companies.",
      image: "/unit1Assets/3.png",
      juny: "/unit1Assets/gifs/4.gif"
    },
    {
      title: "History of Investing",
      content: "This innovation marked the beginning of modern investing. Fast forward to today, investing has become more diverse and accessible than ever before. From the bustling floors of stock exchanges to the convenience of online trading platforms, anyone can invest with just a few clicks.",
      image: "/unit1Assets/5.png",
      juny: "/unit1Assets/gifs/5.gif"
    },
    {
      title: "History of Investing",
      content: "Juny might use her underwater tablet to keep track of her investments in various coral reefs and seaweed farms, showing how technology has made investing easier for everyone. 📱🌿By understanding what investing is and exploring its fascinating history, you are now ready to join Juny the Octopus on an exciting journey to grow your wealth! 🐙💸",
      image: "/unit1Assets/6.png",
      juny: "/unit1Assets/gifs/6.gif"
    }
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
