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
      title: "Investment Accounts",
      content: "Understanding investment accounts is crucial for your financial journey, much like Juny the Octopus needs the right tools to explore the ocean depths. These accounts are the vehicles that allow you to invest in various assets and grow your wealth over time. Let's dive into the different types of investment accounts and how they can help you reach your financial goals! 🐙💰",
      image: "/unit5Assets/1.png",
      juny: "/unit5Assets/gifs/1.gif"
    },
    {
      title: "Brokerage Accounts",
      content: "A brokerage account is like a treasure chest that holds all your investments. 🗃️ These accounts are offered by brokerage firms and allow you to buy and sell a wide range of investments, such as stocks, bonds, mutual funds, ETFs, and more. Imagine Juny opening a special underwater vault where she keeps her valuable treasures, from shiny pearls to rare seaweed. 💎🌿",
      image: "/unit5Assets/2.png",
      juny: "/unit5Assets/gifs/2.gif"
    },
    {
      title: "Brokerage Accounts",
      content: "Standard brokerage accounts offer great flexibility and access to a broad array of investments. However, you will need to pay taxes on any gains or income you earn each year. It's like Juny having to give a small pearl to the sea king each time she finds a treasure. 💸👑",
      image: "/unit5Assets/3.png",
      juny: "/unit5Assets/gifs/3.gif"
    },
    {
      title: "Brokerage Accounts",
      content: "Margin accounts allow you to borrow money from the brokerage to buy more investments than you could with your own money alone. While this can amplify your gains, it also increases your risk, similar to Juny borrowing pearls to buy a larger section of coral reef—if the reef thrives, she profits more, but if it doesn't, she owes more pearls. 📈⚠️",
      image: "/unit5Assets/4.png",
      juny: "/unit5Assets/gifs/4.gif"
    },
    {
      title: "Retirement Accounts",
      content: "Retirement accounts are designed to help you save for your golden years, ensuring you have enough treasure stored away to live comfortably. These accounts offer special tax advantages to encourage long-term savings. Think of them as enchanted chests that protect and grow Juny's pearls over the years. 🌟🧳",
      image: "/unit5Assets/5.png",
      juny: "/unit5Assets/gifs/5.gif"
    },
    {
      title: "Retirement Accounts",
      content: "401(k) accounts are offered by many employers and allow you to save and invest a portion of your paycheck before taxes are taken out. Some employers even match a portion of your contributions, giving you free pearls to add to your treasure chest! 🏦💸 However, there are penalties for withdrawing money before reaching retirement age, so it's best to let these pearls stay hidden until you're ready to retire. 🚫🐚",
      image: "/unit5Assets/6.png",
      juny: "/unit5Assets/gifs/6.gif"
    },
    {
      title: "Retirement Accounts",
      content: "Individual Retirement Accounts (IRAs) come in two main types—Traditional and Roth. Traditional IRAs allow you to contribute pre-tax dollars, reducing your taxable income now, but you'll pay taxes when you withdraw the money in retirement. It's like Juny storing pearls in a cave that protects them from the sea king's taxes until she takes them out. 🏞️💎",
      image: "/unit5Assets/7.png",
      juny: "/unit5Assets/gifs/7.png"
    },
    {
      title: "Retirement Accounts",
      content: "Roth IRAs, on the other hand, use after-tax dollars for contributions, but the money grows tax-free, and you won't owe any taxes when you withdraw it in retirement. This is akin to Juny paying a small tax to the sea king now but ensuring her future treasures are completely tax-free. 🌞🌟",
      image: "/unit5Assets/8.png",
      juny: "/unit5Assets/gifs/8.png"
    },
    {
      title: "Education Savings Accounts",
      content: "Education savings accounts are special accounts designed to help you save for future education expenses, offering tax advantages to make saving easier. Juny might use these accounts to ensure her little octopus friends have enough pearls to attend the best underwater schools. 🐙📚",
      image: "/unit5Assets/9.png",
      juny: "/unit5Assets/gifs/9.gif"
    },
    {
      title: "Education Savings Accounts",
      content: "529 Plans are state-sponsored plans that allow you to save for education expenses with tax-free growth and tax-free withdrawals for qualified expenses. It's like an enchanted coral garden that grows without the sea king's taxes, as long as Juny uses the funds for schooling. 🏫🌺",
      image: "/unit5Assets/10.png",
      juny: "/unit5Assets/gifs/10.gif"
    },
    {
      title: "Education Savings Accounts",
      content: "Coverdell Education Savings Accounts (ESAs) are similar to 529 plans but offer more flexibility in investment choices and contribution limits. Juny can use these funds for a wider range of educational expenses, from elementary to college. 📖🏛️",
      image: "/unit5Assets/11.png",
      juny: "/unit5Assets/gifs/11.gif"
    },
    {
      title: "Education Savings Accounts",
      content: "By understanding and using the right investment accounts, you can ensure your money is working as hard as possible to achieve your financial goals. With the right accounts, Juny the Octopus can confidently navigate her underwater adventures, knowing her treasures are well-managed and growing over time. 🐙💎📈",
      image: "/unit5Assets/12.png",
      juny: "/unit5Assets/gifs/12.gif"
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
