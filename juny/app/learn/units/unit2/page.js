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
      title: "Unit 1 Lesson 3: Types of Investments",
      content: "Investing is like exploring a vibrant coral reef with Juny the Octopus, where each type of investment is a different kind of sea creature, each with its own unique characteristics. Let's dive in and discover the different types of investments! 🐙🌊",
      image: "/unit2Assets/1.png",
      juny: "/unit2Assets/gifs/1.gif"
    },
    {
      title: "Stocks",
      content: "When you buy a stock, you’re purchasing a small piece of ownership in a company. If the company does well, the value of your stock can increase, and you might also receive dividends, which are a share of the company's profits.",
      image: "/unit2Assets/2.png",
      juny: "/unit2Assets/gifs/2.gif"
    },
    {
      title: "Stocks",
      content: "Imagine owning a little part of Juny's favorite seaweed farm. If the farm thrives, so does your investment! 📈 For instance, Apple Inc. is a well-known company whose stock has grown significantly over the years. If you had bought Apple stock in 2000, its value would have increased dramatically, reflecting the company’s success and growth.",
      image: "/unit2Assets/3.png",
      juny: "/unit2Assets/gifs/3.png"
    },
    {
      title: "Bonds",
      content: "Bonds are like lending money to a company or government. In return, they promise to pay you back with interest after a certain period. It’s similar to Juny lending her shiny pearl to a friend, who returns it later with an extra pearl as thanks!",
      image: "/unit2Assets/4.png",
      juny: "/unit2Assets/gifs/4.gif"
    },
    {
      title: "Bonds",
      content: "Bonds are generally considered safer than stocks but usually offer lower returns. 💎 U.S. Treasury Bonds are considered very safe investments. When you buy a Treasury bond, you’re lending money to the U.S. government, which promises to pay you back with interest. These bonds are often used to save for long-term goals with minimal risk.",
      image: "/unit2Assets/5.png",
      juny: "/unit2Assets/gifs/5.gif"
    },
    {
      title: "Mutual Funds",
      content: "Mutual funds are collections of stocks, bonds, or other assets managed by professionals. When you invest in a mutual fund, you're pooling your money with other investors to buy a diversified portfolio.",
      image: "/unit2Assets/6.png",
      juny: "/unit2Assets/gifs/6.gif"
    },
    {
      title: "Mutual Funds",
      content: "It's like Juny putting her pearls together with her friends to buy a variety of underwater treasures, spreading out the risk. 🗃️ The Vanguard 500 Index Fund is a popular mutual fund that includes stocks from the 500 largest companies in the U.S. By investing in this fund, you own a small piece of each company, reducing your risk compared to investing in a single stock.",
      image: "/unit2Assets/7.png",
      juny: "/unit2Assets/gifs/7.gif"
    },
    {
      title: "Exchange-Traded Funds (ETFs)",
      content: "ETFs are similar to mutual funds but are traded on stock exchanges like individual stocks. They offer the benefits of diversification and professional management but can be bought and sold throughout the trading day.",
      image: "/unit2Assets/8.png",
      juny: "/unit2Assets/gifs/8.gif"
    },
    {
      title: "Exchange-Traded Funds (ETFs)",
      content: "Think of them as baskets of different sea treasures that Juny can trade whenever she wants! 🧺 The SPDR S&P 500 ETF (SPY) is one of the most well-known ETFs. It tracks the performance of the S&P 500 Index, giving you exposure to 500 of the largest U.S. companies. You can buy and sell shares of SPY just like you would a stock.",
      image: "/unit2Assets/9.png",
      juny: "/unit2Assets/gifs/9.png"
    },
    {
      title: "Real Estate Investment Trusts (REITs)",
      content: "REITs are companies that own, operate, or finance income-producing real estate. When you invest in REITs, you're essentially buying shares in large-scale properties, like shopping malls or office buildings.",
      image: "/unit2Assets/10.png",
      juny: "/unit2Assets/gifs/10.gif"
    },
    {
      title: "Real Estate Investment Trusts (REITs)",
      content: "Imagine Juny owning a piece of a luxurious underwater castle and earning rent from the creatures living there! 🏰 Public Storage is a well-known REIT that owns and operates self-storage facilities. By investing in Public Storage, you can earn income from the rents paid by people who use their storage units, without having to manage any properties yourself.",
      image: "/unit2Assets/11.png",
      juny: "/unit2Assets/gifs/11.gif"
    },
    {
      title: "Commodities",
      content: "Commodities are raw materials like gold, silver, oil, or agricultural products. Investing in commodities can protect against inflation and diversify your portfolio. It's like Juny collecting rare and valuable shells that can be traded or sold later. 🌾 Gold is a popular commodity that people invest in, especially during times of economic uncertainty.",
      image: "/unit2Assets/12.png",
      juny: "/unit2Assets/gifs/12.gif"
    },
    {
      title: "Commodities",
      content: "You can invest in gold directly by buying physical gold or indirectly by purchasing shares in a gold ETF like the SPDR Gold Trust (GLD). Each type of investment has its own risks and rewards, just like the diverse creatures in the ocean.",
      image: "/unit2Assets/13.png",
      juny: "/unit2Assets/gifs/13.gif"
    },
    {
      title: "Commodities",
      content: "By understanding these different options, you can make informed decisions and build a balanced investment portfolio with Juny the Octopus by your side! 🐙💰",
      image: "/unit2Assets/14.png",
      juny: "/unit2Assets/gifs/14.gif"
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
