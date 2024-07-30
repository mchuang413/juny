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
      title: "Basic Investment Principles",
      content: "Let's explore the basic principles of investing with Juny the Octopus! These principles are like the rules of the ocean, helping you navigate the vast sea of investment opportunities safely and successfully. 🌊🐙",
      image: "/unit3Assets/1.png",
      juny: "/unit3Assets/gifs/1.gif"
    },
    {
      title: "Risk vs. Reward",
      content: "Every investment comes with a level of risk, which is the chance that you might lose money. However, with risk comes the potential for reward, which is the chance to make money.",
      image: "/unit3Assets/2.png",
      juny: "/unit3Assets/gifs/2.gif"
    },
    {
      title: "Risk vs. Reward",
      content: "It's like Juny venturing into deeper waters to find rare pearls. The deeper she goes, the more valuable the pearls, but the journey also becomes more dangerous. Balancing risk and reward is crucial in investing. For example, stocks generally offer higher returns than bonds but also come with higher risks. 📈⚖️",
      image: "/unit3Assets/3.png",
      juny: "/unit3Assets/gifs/3.png"
    },
    {
      title: "Diversification",
      content: "Diversification is the practice of spreading your investments across different types of assets to reduce risk. Imagine Juny planting various types of seaweed in her garden. If one type doesn't grow well, the others might still thrive, ensuring she always has a beautiful garden. In investing, this means not putting all your money into one stock or asset.",
      image: "/unit3Assets/4.png",
      juny: "/unit3Assets/gifs/4.gif"
    },
    {
      title: "Diversification",
      content: "By diversifying, you can protect your portfolio from significant losses. For instance, if you invest in both technology stocks and government bonds, a downturn in the tech industry won’t wipe out your entire portfolio. 🌱📊",
      image: "/unit3Assets/5.png",
      juny: "/unit3Assets/gifs/5.gif"
    },
    {
      title: "Compounding",
      content: "Compounding is the process where your investment earnings generate even more earnings over time. It's like Juny finding a magical coral that grows faster and faster each year!",
      image: "/unit3Assets/6.png",
      juny: "/unit3Assets/gifs/6.png"
    },
    {
      title: "Compounding",
      content: "The interest or returns you earn on your investments are reinvested, leading to exponential growth. For example, if you invest $1,000 at an annual return of 5%, you’ll have $1,050 after one year. If you leave that money invested, you'll earn 5% on $1,050 the next year, and so on. Over time, this can significantly increase your wealth. 💸🌟",
      image: "/unit3Assets/7.png",
      juny: "/unit3Assets/gifs/7.png"
    },
    {
      title: "Inflation and its Impact on Investments",
      content: "Inflation is the increase in prices over time, which reduces the purchasing power of your money. Think of inflation as a sneaky current that slowly erodes the sandcastle Juny builds. If your investments don’t grow at least as fast as inflation, you’re effectively losing money. This is why it’s essential to choose investments that can outpace inflation.",
      image: "/unit3Assets/8.png",
      juny: "/unit3Assets/gifs/8.gif"
    },
    {
      title: "Inflation and its Impact on Investments",
      content: "For instance, while savings accounts offer low risk, their returns are often lower than the inflation rate. Stocks, on the other hand, have historically provided higher returns that can help combat inflation. 📉💰By understanding these basic principles, you can make smarter investment decisions and navigate the investing ocean with confidence, just like Juny the Octopus! 🐙💡",
      image: "/unit3Assets/9.png",
      juny: "/unit3Assets/gifs/9.png"
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
