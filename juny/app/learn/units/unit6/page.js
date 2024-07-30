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
      title: "Market Participants",
      content: "The financial markets are like a bustling underwater city where various sea creatures come together, each playing a unique role. 🐙🏙️ Let's dive deep into who these participants are and what roles they play in making the financial markets function smoothly!",
      image: "/unit6Assets/1.png",
      juny: "/unit6Assets/gifs/1.gif"
    },
    {
      title: "Retail Investors",
      content: "Retail investors are individual investors who buy and sell securities for their personal accounts. They are like individual fish in the ocean, each making their own decisions based on personal financial goals. 🐠",
      image: "/unit6Assets/2.png",
      juny: "/unit6Assets/gifs/2.gif"
    },
    {
      title: "Retail Investors",
      content: "Retail investors typically use brokerage accounts to execute their trades and may invest in stocks, bonds, mutual funds, and other assets. 📈 Imagine Juny the Octopus deciding to buy shares of a seaweed farm for her future. She checks market news, does some research, and makes decisions based on her financial goals, hoping to grow her savings over time. 🐙",
      image: "/unit6Assets/3.png",
      juny: "/unit6Assets/gifs/3.gif"
    },
    {
      title: "Retail Investors",
      content: "Retail investors usually have smaller amounts of money to invest compared to other investors. They often seek to build a diversified portfolio to reduce risk. Diversification means spreading investments across different assets to avoid putting all their money into one type of investment. For instance, Juny might invest in a mix of technology stocks, government bonds, and real estate to balance her portfolio. 📉🏠",
      image: "/unit6Assets/4.png",
      juny: "/unit6Assets/gifs/4.gif"
    },
    {
      title: "Brokers",
      content: "Brokers are intermediaries who facilitate transactions between buyers and sellers. They are like navigators of the underwater city, helping sea creatures find the best trading partners. Brokers earn a commission or fee for their services. Imagine Juny the Octopus using a broker to find the best deal on a new coral bed. 🐙💼",
      image: "/unit6Assets/5.png",
      juny: "/unit6Assets/gifs/5.gif"
    },
    {
      title: "Brokers",
      content: "Companies like Charles Schwab help individuals buy and sell stocks, bonds, and other securities. Brokers provide their clients with market insights, research, and advice to help them make informed investment decisions.",
      image: "/unit6Assets/6.png",
      juny: "/unit6Assets/gifs/6.gif"
    },
    {
      title: "Brokers",
      content: "Full-service brokers offer a wide range of services, including investment advice, research, and financial planning. They charge higher fees for their services but provide personalized support and detailed market analysis. 💼",
      image: "/unit6Assets/7.png",
      juny: "/unit6Assets/gifs/7.gif"
    },
    {
      title: "Brokers",
      content: "Discount brokers offer fewer services but charge lower fees, focusing primarily on executing trades. Online platforms like Robinhood and E*TRADE have made it easier for retail investors to trade stocks, often with minimal fees and user-friendly interfaces. 🖥️📉",
      image: "/unit6Assets/8.png",
      juny: "/unit6Assets/gifs/8.gif"
    },
    {
      title: "Institutional Investors",
      content: "Institutional investors are organizations that invest large sums of money on behalf of their members or clients. These include pension funds, insurance companies, mutual funds, and hedge funds. They are like the giant whales of the ocean, capable of moving vast amounts of resources and having a significant impact on the market. 🐋💼",
      image: "/unit6Assets/9.png",
      juny: "/unit6Assets/gifs/9.gif"
    },
    {
      title: "Institutional Investors",
      content: "An institutional investor might buy or sell large quantities of assets, influencing prices more than individual retail investors. Imagine a whale buying a whole coral reef, affecting the surrounding sea life! 🌊",
      image: "/unit6Assets/10.png",
      juny: "/unit6Assets/gifs/10.png"
    },
    {
      title: "Institutional Investors",
      content: "Think of a large university endowment fund managing billions of dollars to support scholarships, research, and campus facilities. These funds invest in a diversified portfolio, including stocks, bonds, and real estate, to ensure long-term financial stability. 🌐📚",
      image: "/unit6Assets/11.png",
      juny: "/unit6Assets/gifs/11.png"
    },
    {
      title: "Institutional Investors",
      content: "Institutional investors often have a team of professionals who conduct extensive research and analysis before making investment decisions. They use sophisticated tools and strategies to maximize returns and manage risk.",
      image: "/unit6Assets/12.png",
      juny: "/unit6Assets/gifs/12.gif"
    },
    {
      title: "Institutional Investors",
      content: "For example, a pension fund might employ analysts to evaluate the economic outlook, sector trends, and individual company performance to determine the best investment opportunities. 📊 By investing large sums of money, institutional investors can influence market trends and prices due to the sheer volume of their trades. 🐢📈",
      image: "/unit6Assets/13.png",
      juny: "/unit6Assets/gifs/13.gif"
    },
    {
      title: "Market Makers",
      content: "Market makers are essential players in financial markets. Think of them as the busy bees in an underwater world, always buzzing around to keep the market lively and active. 🐟🔄 They constantly buy and sell securities to ensure there's always someone available to trade with. This helps keep the market flowing smoothly, much like how bees keep a garden thriving by pollinating flowers. 🌸",
      image: "/unit6Assets/14.png",
      juny: "/unit6Assets/gifs/14.gif"
    },
    {
      title: "Market Makers",
      content: "Market makers post buy prices (bid) and sell prices (ask) for the securities they handle. The bid price is the highest amount they are willing to pay, while the ask price is the lowest amount they will accept.",
      image: "/unit6Assets/15.png",
      juny: "/unit6Assets/gifs/15.gif"
    },
    {
      title: "Market Makers",
      content: "The difference between these prices is called the spread, which is where they make their profit. Imagine small fish always ready to trade shells. If one fish wants to buy a shell and another wants to sell, the small fish in the middle makes sure the trade happens by offering to buy from the seller and sell to the buyer, earning a tiny bit from each trade. 🐠💱",
      image: "/unit6Assets/16.png",
      juny: "/unit6Assets/gifs/16.png"
    },
    {
      title: "Market Makers",
      content: "Companies like Goldman Sachs act as market makers, ensuring there are always buyers and sellers for stocks. They help keep the market fluid by constantly trading, earning profits from the small differences in bid and ask prices. 🌊🔄",
      image: "/unit6Assets/17.png",
      juny: "/unit6Assets/gifs/17.png"
    },
    {
      title: "Traders",
      content: "Traders buy and sell securities frequently, aiming to profit from short-term price movements. They are like nimble dolphins, quickly darting in and out of trades to capitalize on market fluctuations. 🐬📊",
      image: "/unit6Assets/18.png",
      juny: "/unit6Assets/gifs/18.gif"
    },
    {
      title: "Traders",
      content: "Traders can be individuals or professionals working for financial institutions. They often use technical analysis and market trends to make their trading decisions. For instance, a day trader might buy and sell shares of Tesla multiple times within a single day, looking to profit from short-term price movements. 📈",
      image: "/unit6Assets/19.png",
      juny: "/unit6Assets/gifs/19.gif"
    },
    {
      title: "Traders",
      content: "There are different types of traders. Day traders buy and sell securities within the same trading day, aiming to profit from small price movements and usually do not hold positions overnight. 🌅 Swing traders hold positions for several days to weeks, aiming to profit from short- to medium-term price movements. 📅",
      image: "/unit6Assets/20.png",
      juny: "/unit6Assets/gifs/20.gif"
    },
    {
      title: "Traders",
      content: "Position traders hold positions for months to years, focusing on long-term trends and fundamental analysis. These traders rely on real-time market data and quick decision-making to achieve their financial goals. They often use advanced trading platforms that provide charts, technical indicators, and market news to help them make informed decisions. 🐬📉",
      image: "/unit6Assets/21.png",
      juny: "/unit6Assets/gifs/21.gif"
    },
    {
      title: "Market Participants",
      content: "Each of these participants plays a crucial role in the functioning of financial markets, much like how different sea creatures contribute to the balance of an underwater ecosystem. By understanding who they are and what they do, you can better navigate the world of investing, just like Juny the Octopus exploring her vibrant ocean home! 🌊🐙",
      image: "/unit6Assets/22.png",
      juny: "/unit6Assets/gifs/22.gif"
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
