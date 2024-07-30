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
      title: "Setting Investment Goals",
      content: "Setting investment goals is like planning an underwater expedition with Juny the Octopus. 🐙🌊 You need a clear destination and a map to guide your journey.",
      image: "/unit4Assets/1.png",
      juny: "/unit4Assets/gifs/1.gif"
    },
    {
      title: "Setting Investment Goals",
      content: "Having well-defined investment goals helps you stay focused and make informed decisions that align with your financial dreams.",
      image: "/unit4Assets/2.png",
      juny: "/unit4Assets/gifs/2.gif"
    },
    {
      title: "Short-term vs. Long-term Goals",
      content: "Investment goals can be categorized into short-term and long-term objectives. Short-term goals are those you want to achieve within a few months to a couple of years.",
      image: "/unit4Assets/3.png",
      juny: "/unit4Assets/gifs/3.gif"
    },
    {
      title: "Short-term vs. Long-term Goals",
      content: "For example, Juny might want to save up for a new coral bed within the next year. These goals typically involve lower-risk investments because you don’t have much time to recover from potential losses.",
      image: "/unit4Assets/4.png",
      juny: "/unit4Assets/gifs/4.gif"
    },
    {
      title: "Short-term vs. Long-term Goals",
      content: "Think of short-term investments like a secure little underwater nook, such as savings accounts and short-term bonds. 🌟On the other hand, long-term goals are those that take several years to decades to achieve. Juny might be planning to save for a grand underwater palace for her retirement, which is 20 years away.",
      image: "/unit4Assets/5.png",
      juny: "/unit4Assets/gifs/5.gif"
    },
    {
      title: "Short-term vs. Long-term Goals",
      content: "Long-term goals allow you to take on more risk because you have more time to ride out market fluctuations. Picture Juny dreaming of a magnificent coral castle, investing in stocks, mutual funds, and real estate. These are often suitable for long-term growth. 🏰",
      image: "/unit4Assets/6.png",
      juny: "/unit4Assets/gifs/6.png"
    },
    {
      title: "Risk Tolerance Assessment",
      content: "Assessing your risk tolerance is another crucial step. Risk tolerance refers to your ability and willingness to endure fluctuations in the value of your investments.",
      image: "/unit4Assets/7.png",
      juny: "/unit4Assets/gifs/7.gif"
    },
    {
      title: "Risk Tolerance Assessment",
      content: "It’s like determining how deep Juny is willing to dive into the ocean. Everyone has a different level of comfort with risk, influenced by factors such as age, income, and financial responsibilities.",
      image: "/unit4Assets/8.png",
      juny: "/unit4Assets/gifs/8.gif"
    },
    {
      title: "Risk Tolerance Assessment",
      content: "If Juny is comfortable with deep-sea diving and seeking high rewards, she might invest in more volatile assets like stocks and cryptocurrencies. 📈 Conversely, if Juny prefers to stay in shallow waters, she might choose safer investments like bonds and savings accounts. 📉",
      image: "/unit4Assets/9.png",
      juny: "/unit4Assets/gifs/9.png"
    },
    {
      title: "Risk Tolerance Assessment",
      content: "Assessing your risk tolerance helps you select investments that match your comfort level and financial situation.",
      image: "/unit4Assets/10.png",
      juny: "/unit4Assets/gifs/10.png"
    },
    {
      title: "Time Horizon",
      content: "Your time horizon, or the amount of time you plan to hold an investment before you need to use the money, is also essential. It’s like Juny knowing how long she has to prepare for her big underwater party.",
      image: "/unit4Assets/11.png",
      juny: "/unit4Assets/gifs/11.gif"
    },
    {
      title: "Time Horizon",
      content: "If Juny needs the money soon, she’ll choose safer investments with less potential for high returns but lower risk. If she has decades before she needs the money, she can invest in riskier assets. These offer higher returns over time.",
      image: "/unit4Assets/12.png",
      juny: "/unit4Assets/gifs/12.gif"
    },
    {
      title: "Creating SMART Goals",
      content: "Creating SMART goals is a great way to make your investment objectives clear and achievable. SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound.",
      image: "/unit4Assets/13.png",
      juny: "/unit4Assets/gifs/13.gif"
    },
    {
      title: "Creating SMART Goals",
      content: "For instance, Juny might want to save $5,000 for a new coral bed. This goal is specific and measurable, as Juny will check her savings every month. It’s achievable because she knows she can save $200 a month from her pearl trading.",
      image: "/unit4Assets/14.png",
      juny: "/unit4Assets/gifs/14.gif"
    },
    {
      title: "Creating SMART Goals",
      content: "The goal is relevant since a new coral bed is essential for Juny's comfort, and it’s time-bound because she plans to have it within two years.",
      image: "/unit4Assets/15.png",
      juny: "/unit4Assets/gifs/15.gif"
    },
    {
      title: "Creating SMART Goals",
      content: "By understanding the importance of setting clear investment goals, you can embark on your investment journey with confidence and purpose, just like Juny the Octopus planning her underwater adventures! 🐙🌊",
      image: "/unit4Assets/16.png",
      juny: "/unit4Assets/gifs/16.gif"
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
