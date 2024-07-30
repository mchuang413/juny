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
      title: "Stock Exchanges",
      content: "Stock exchanges are like bustling marketplaces where buyers and sellers come together to trade stocks and other securities. Imagine a vibrant coral reef where sea creatures from all around gather to trade their treasures. 🐙🌊",
      image: "/unit7Assets/1.png",
      juny: "/unit7Assets/gifs/1.gif"
    },
    {
      title: "Stock Exchanges",
      content: "A stock exchange is a centralized location, either physical or digital, where securities like stocks, bonds, and other financial instruments are bought and sold. It's like an underwater marketplace where sea creatures come to trade their goods. The main function of a stock exchange is to make trading easy and fair for everyone, providing a transparent and regulated environment for transactions. 🏛️💼",
      image: "/unit7Assets/2.png",
      juny: "/unit7Assets/gifs/2.gif"
    },
    {
      title: "Major Stock Exchanges Around the World",
      content: "Several major stock exchanges play a crucial role in the global financial system. The New York Stock Exchange (NYSE) is one of the largest and most famous stock exchanges in the world, located on Wall Street in New York City. Known for its iconic trading floor and the ringing of the opening bell, the NYSE lists companies such as Coca-Cola and IBM. 🏢🔔",
      image: "/unit7Assets/3.png",
      juny: "/unit7Assets/gifs/3.png"
    },
    {
      title: "Major Stock Exchanges Around the World",
      content: "Nasdaq, also based in New York City, operates electronically without a physical trading floor. It is known for high-tech and innovative companies like Apple, Microsoft, and Amazon. Think of Nasdaq as an advanced underwater trading network where the latest tech treasures are exchanged. 💻📈",
      image: "/unit7Assets/4.png",
      juny: "/unit7Assets/gifs/4.png"
    },
    {
      title: "Major Stock Exchanges Around the World",
      content: "The London Stock Exchange (LSE), located in the heart of London, is one of the oldest stock exchanges in the world, serving as a hub for European and international companies. The LSE is like a historic underwater market where sea creatures have been trading their treasures for centuries. 🏛️🌍",
      image: "/unit7Assets/5.png",
      juny: "/unit7Assets/gifs/5.png"
    },
    {
      title: "Major Stock Exchanges Around the World",
      content: "The Tokyo Stock Exchange (TSE) in Japan is the largest stock exchange in Asia and home to leading companies such as Toyota and Sony. The TSE is a bustling underwater marketplace where traders from all over Asia come to exchange valuable securities. 🗾🚗",
      image: "/unit7Assets/6.png",
      juny: "/unit7Assets/gifs/6.png"
    },
    {
      title: "Functions of Stock Exchanges",
      content: "Stock exchanges serve several important functions in the financial markets. They provide a platform for buyers and sellers to trade securities, ensuring that transactions are conducted efficiently and transparently. It's like an organized underwater market where sea creatures can easily find trading partners. 🐟🤝",
      image: "/unit7Assets/7.png",
      juny: "/unit7Assets/gifs/7.gif"
    },
    {
      title: "Functions of Stock Exchanges",
      content: "Stock exchanges also play a crucial role in determining the prices of securities through supply and demand. The prices of stocks fluctuate based on how much buyers are willing to pay and sellers are willing to accept. Imagine an auction where sea creatures bid on valuable treasures, setting the price based on competition. 🐠💰",
      image: "/unit7Assets/8.png",
      juny: "/unit7Assets/gifs/8.gif"
    },
    {
      title: "Liquidity",
      content: "Liquidity refers to how easily an asset can be bought or sold in the market without affecting its price. High liquidity means you can quickly trade an asset at a price close to its current value. Stock exchanges provide liquidity by making it easy for investors to buy and sell securities at any time. This is like having a bustling underwater market where sea creatures can trade their treasures at any time, ensuring the market remains active and prices stay stable. 🌊🔄",
      image: "/unit7Assets/9.png",
      juny: "/unit7Assets/gifs/9.gif"
    },
    {
      title: "Regulation",
      content: "Stock exchanges are regulated by government agencies to ensure that trading is fair and transparent. In the U.S., the Securities and Exchange Commission (SEC) oversees the stock exchanges. Think of this as the sea guardians making sure that all trades are conducted fairly and that everyone follows the rules. 🛡️📜",
      image: "/unit7Assets/10.png",
      juny: "/unit7Assets/gifs/10.gif"
    },
    {
      title: "Raising Capital",
      content: "Companies can raise capital by issuing stocks and bonds on a stock exchange. This allows them to fund new projects, expand their businesses, and innovate. It's like a seaweed farm selling shares to raise pearls for growing more seaweed. When a company wants to raise money, it can issue new shares of stock to the public through an initial public offering (IPO). The company sells these shares on a stock exchange, and investors who buy them become part-owners of the company. This process helps companies get the funds they need to grow and develop new products or services. 🌱💸",
      image: "/unit7Assets/11.png",
      juny: "/unit7Assets/gifs/11.gif"
    },
    {
      title: "Example: Initial Public Offering (IPO)",
      content: "When a popular coffee shop chain decides to expand globally, it may need a large amount of capital. By going public and listing on a stock exchange, it can raise the necessary funds. Investors who believe in the coffee shop's potential buy shares, providing the company with the money it needs to open new locations and reach more customers. ☕📈",
      image: "/unit7Assets/12.png",
      juny: "/unit7Assets/gifs/12.png"
    },
    {
      title: "Stock Exchanges",
      content: "Stock exchanges are the beating heart of the financial markets, providing a regulated and efficient environment for trading securities. By understanding how stock exchanges work, you can navigate the world of investing with confidence, just like Juny the Octopus exploring her vibrant ocean marketplace. 🌊🐙",
      image: "/unit7Assets/13.png",
      juny: "/unit7Assets/gifs/13.gif"
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
