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
      title: "Regulatory Environment",
      content: "The regulatory environment in financial markets is like a set of rules and guidelines that ensure the market operates smoothly and fairly. Imagine a vast underwater world where sea creatures abide by certain rules to maintain harmony and prevent chaos. 🐙🌊 These regulations are designed to protect investors, ensure fair trading practices, and maintain the integrity of the financial system. Let's dive in and explore how this regulatory environment works!",
      image: "/unit8Assets/1.png",
      juny: "/unit8Assets/gifs/1.gif"
    },
    {
      title: "What is the Regulatory Environment?",
      content: "The regulatory environment consists of laws, regulations, and oversight mechanisms that govern financial markets and institutions. Think of it as the sea guardians who watch over the ocean, making sure everyone plays by the rules and no one cheats. These rules help create a safe and transparent market where all participants can trade with confidence. 🛡️📜",
      image: "/unit8Assets/2.png",
      juny: "/unit8Assets/gifs/2.gif"
    },
    {
      title: "Key Regulatory Bodies",
      content: "Different countries have their own regulatory bodies responsible for overseeing financial markets. Here are some of the major ones:",
      image: "/unit8Assets/3.png",
      juny: "/unit8Assets/gifs/3.gif"
    },
    {
      title: "Key Regulatory Bodies",
      content: "In the United States, the Securities and Exchange Commission (SEC) is the primary regulatory body overseeing securities markets. The SEC enforces laws related to securities trading, monitors corporate disclosures, and protects investors from fraud. Imagine the SEC as a team of diligent sea guardians ensuring that all trades are fair and transparent. 🛡️",
      image: "/unit8Assets/4.png",
      juny: "/unit8Assets/gifs/4.gif"
    },
    {
      title: "Key Regulatory Bodies",
      content: "In the United Kingdom, the Financial Conduct Authority (FCA) regulates financial markets and firms. The FCA aims to protect consumers, enhance market integrity, and promote competition. It's like a council of wise ocean elders guiding and regulating the behavior of all sea creatures in the market. 🌐🗞️",
      image: "/unit8Assets/5.png",
      juny: "/unit8Assets/gifs/5.gif"
    },
    {
      title: "Key Regulatory Bodies",
      content: "The European Securities and Markets Authority (ESMA) oversees the financial markets across the European Union. ESMA works to ensure investor protection and stable financial markets. Think of ESMA as a group of experienced sea explorers coordinating efforts to maintain harmony across different underwater territories. 🌍⚖️",
      image: "/unit8Assets/6.png",
      juny: "/unit8Assets/gifs/6.gif"
    },
    {
      title: "Key Regulatory Bodies",
      content: "In Japan, the Financial Services Agency (FSA) is responsible for overseeing the financial system, ensuring its stability, and protecting investors. The FSA supervises financial institutions, enforces regulations, and monitors market activities. Imagine the FSA as vigilant sea wardens patrolling the ocean to ensure everything runs smoothly. 🏯🔍",
      image: "/unit8Assets/7.png",
      juny: "/unit8Assets/gifs/7.gif"
    },
    {
      title: "Key Regulations and Acts",
      content: "Various regulations and acts are implemented to govern financial markets. Some important ones include:",
      image: "/unit8Assets/8.png",
      juny: "/unit8Assets/gifs/8.gif"
    },
    {
      title: "Key Regulations and Acts",
      content: "The Securities Act of 1933 in the U.S. requires companies to provide full and fair disclosure of information when issuing securities to the public. It's like requiring sea creatures to be transparent about the treasures they are trading to ensure everyone knows what they're getting. 📜💼",
      image: "/unit8Assets/9.png",
      juny: "/unit8Assets/gifs/9.gif"
    },
    {
      title: "Key Regulations and Acts",
      content: "The Securities Exchange Act of 1934 established the SEC and gave it the authority to regulate securities markets and participants. It aims to ensure fair trading practices and prevent market manipulation. Imagine setting up a council of sea guardians with the power to enforce rules and keep the ocean orderly. 🛡️⚖️",
      image: "/unit8Assets/10.png",
      juny: "/unit8Assets/gifs/10.gif"
    },
    {
      title: "Key Regulations and Acts",
      content: "The Sarbanes-Oxley Act of 2002 was enacted to protect investors from fraudulent financial reporting by corporations. It requires strict disclosure practices and increases penalties for fraudulent activities. Think of it as a set of strict guidelines that sea creatures must follow to ensure they report their treasures accurately and honestly. 📊🔍",
      image: "/unit8Assets/11.png",
      juny: "/unit8Assets/gifs/11.gif"
    },
    {
      title: "Key Regulations and Acts",
      content: "The Markets in Financial Instruments Directive (MiFID) in Europe aims to increase transparency and protect investors in the financial markets. It establishes rules for investment services and activities. It's like creating a detailed map of the ocean to ensure all trades are visible and transparent. 🌐📈",
      image: "/unit8Assets/12.png",
      juny: "/unit8Assets/gifs/12.gif"
    },
    {
      title: "Importance of the Regulatory Environment",
      content: "The regulatory environment plays a crucial role in maintaining the stability and integrity of financial markets. Regulations are designed to protect investors from fraud, abuse, and unfair practices, ensuring that everyone, from small fish to giant whales, can trade in a safe and secure environment. Regulatory bodies work to ensure that all market participants play by the same rules, promoting a level playing field and preventing any single entity from having an unfair advantage. 📜🏛️",
      image: "/unit8Assets/13.png",
      juny: "/unit8Assets/gifs/13.gif"
    },
    {
      title: "Importance of the Regulatory Environment",
      content: "Regulations require companies to disclose accurate and timely information, helping investors make informed decisions. This transparency is like a clear, open ocean where all treasures are visible to everyone. By enforcing rules and monitoring market activities, regulatory bodies help maintain the overall integrity and stability of financial markets, ensuring that the market operates smoothly, like a well-coordinated underwater city. 🌊🛡️",
      image: "/unit8Assets/14.png",
      juny: "/unit8Assets/gifs/14.gif"
    },
    {
      title: "Example: Insider Trading",
      content: "One of the key areas regulated by these bodies is insider trading. Insider trading occurs when someone with non-public, material information about a company uses that information to make a profit or avoid a loss in the stock market.",
      image: "/unit8Assets/15.png",
      juny: "/unit8Assets/gifs/15.gif"
    },
    {
      title: "Example: Insider Trading",
      content: "This is considered unfair and illegal. Imagine a fish who knows about a hidden treasure before anyone else and uses that knowledge to gather all the pearls for themselves, leaving other sea creatures at a disadvantage. Regulatory bodies like the SEC enforce rules against insider trading to keep the market fair for everyone. 🐠⚖️",
      image: "/unit8Assets/16.png",
      juny: "/unit8Assets/gifs/16.gif"
    },
    {
      title: "Regulatory Environment",
      content: "The regulatory environment is vital for the smooth functioning of financial markets, ensuring that all participants follow the rules and trade fairly. By understanding the regulatory framework, you can navigate the world of investing with confidence, just like Juny the Octopus exploring her harmonious underwater realm. 🌊🐙",
      image: "/unit8Assets/17.png",
      juny: "/unit8Assets/gifs/17.gif"
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
