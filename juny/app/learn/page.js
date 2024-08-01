"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Page = () => {
  const router = useRouter();
  const [scrollDepth, setScrollDepth] = useState(0);
  const [userLevel, setUserLevel] = useState(0);  // State to store user level

  useEffect(() => {
    const fetchUserLevel = async () => {
      try {
        const username = Cookies.get('username'); 
        const response = await fetch(`https://michaelape.site/get_user_level?username=${username}`);
        const data = await response.json();
        setUserLevel(data.level);
      } catch (error) {
        console.error('Error fetching user level:', error);
      }
    };

    fetchUserLevel();
  }, []);

  const units = [
    {
      title: "UNIT 1: Overview of Investing",
      description: "Learn the basics of investing, including its definition and purpose. Discover the history of investing and why people invest their money. This lesson sets the foundation for understanding how investments can grow your wealth over time. 📈📚",
      requiredLevel: 0,  // No level requirement for Unit 1
    },
    {
      title: "UNIT 2: Types of Investments",
      description: "Explore various types of investments, including stocks, bonds, mutual funds, ETFs, REITs, and commodities. You'll learn the characteristics of each investment type, how they work, and their potential benefits and risks. 📊💼",
      requiredLevel: 3,  // Level 4 required for Unit 2
    },
    {
      title: "UNIT 3: Basic Investment Principles",
      description: "Understand fundamental investment principles such as risk vs. reward, diversification, compounding, and the impact of inflation on investments. These core concepts will help you make informed investment decisions and build a robust portfolio. 📉🏦",
      requiredLevel: 6,  // Level 7 required for Unit 3
    },
    {
      title: "UNIT 4: Setting Investment Goals",
      description: "Learn how to set and achieve your investment goals. This lesson covers the differences between short-term and long-term goals, assessing your risk tolerance, and determining your investment time horizon. 🏁🎯",
      requiredLevel: 9,  // Level 11 required for Unit 4
    },
    {
      title: "UNIT 5: Investment Accounts",
      description: "Discover different types of investment accounts, including brokerage accounts and retirement accounts like 401(k) and IRA. Understand their features, benefits, and how to choose the right account for your investment needs. 💼💡",
      requiredLevel: 12,
    },
    {
      title: "UNIT 6: Market Participants",
      description: "Meet the key players in the financial markets, including retail investors, institutional investors, and market makers. Learn their roles and how they contribute to the market's functionality. 🐟🐋🐠",
      requiredLevel: 15,
    },
    {
      title: "UNIT 7: Stock Exchanges",
      description: "Explore major global stock exchanges such as the NYSE, NASDAQ, and more. Understand how stock exchanges operate and facilitate the buying and selling of securities, ensuring market liquidity and efficiency. 🏛️📈",
      requiredLevel: 18,
    },
    {
      title: "UNIT 8: Regulatory Environment",
      description: "Dive into the regulatory environment of financial markets. Learn about the role of regulatory bodies like the SEC and FINRA, insider trading laws, and market ethics. Understand how regulations protect investors and maintain market integrity. 🛡️⚖️",
      requiredLevel: 21,
    },
    {
      title: "UNIT 9: Financial Statements",
      description: "Understand the three main financial statements: the Balance Sheet, Income Statement, and Cash Flow Statement. Learn how to read and analyze these documents to assess a company's financial health. 📑📊",
      requiredLevel: 24,
    },
    {
      title: "UNIT 10: Financial Ratios",
      description: "Discover key financial ratios such as the Price-to-Earnings (P/E) Ratio, Debt-to-Equity Ratio, and Return on Equity (ROE). Learn how these ratios help evaluate a company's performance and compare it to others in the industry. 📈🔍",
      requiredLevel: 27,
    },
    {
      title: "UNIT 11: Company Valuation",
      description: "Learn methods to determine a company's intrinsic value, including Discounted Cash Flow (DCF) analysis. Understand the importance of valuation in making investment decisions. 💰🔍",
      requiredLevel: 30,
    },
    {
      title: "UNIT 12: Industry and Sector Analysis",
      description: "Explore techniques for analyzing industries and sectors. Understand how competitive analysis and market trends impact investment decisions and company performance. 🌐📊",
      requiredLevel: 33,
    },
    {
      title: "UNIT 13: Economic Indicators",
      description: "Discover key economic indicators such as GDP, employment data, and inflation rates. Learn how these indicators influence the market and help investors make informed decisions. 📈📉",
      requiredLevel: 36,
    },
    {
      title: "UNIT 14: Chart Patterns",
      description: "Learn about different chart patterns, including trends (uptrend, downtrend, sideways), support and resistance levels, and common patterns like head and shoulders and double top/bottom. 📈🔍",
      requiredLevel: 39,
    },
    {
      title: "UNIT 15: Technical Indicators",
      description: "Understand technical indicators such as Moving Averages (SMA, EMA), Relative Strength Index (RSI), and Bollinger Bands. Learn how to use these tools to analyze market trends and make trading decisions. 📉📊",
      requiredLevel: 42,
    },
    {
      title: "UNIT 16: Volume Analysis",
      description: "Explore the importance of trading volume and volume patterns in technical analysis. Understand how volume confirms trends and signals potential market reversals. 📊🔍",
      requiredLevel: 45,
    },
    {
      title: "UNIT 17: Technical Analysis Tools",
      description: "Discover various technical analysis tools, including trendlines and Fibonacci retracement. Learn how these tools help identify potential entry and exit points in the market. 📉📈",
      requiredLevel: 48,
    },
    {
      title: "UNIT 18: Building a Portfolio",
      description: "Learn the principles of asset allocation and diversification strategies. Understand how to build a balanced and diversified investment portfolio tailored to your financial goals. 📊💼",
      requiredLevel: 51,
    },
    {
      title: "UNIT 19: Risk Management",
      description: "Explore techniques for identifying and mitigating investment risks, including the use of stop-loss orders and hedging strategies. Understand how to protect your portfolio from significant losses. 📉🛡️",
      requiredLevel: 54,
    },
    {
      title: "UNIT 20: Performance Measurement",
      description: "Discover metrics for measuring portfolio performance and the importance of benchmarking. Learn how to evaluate your portfolio's success and make necessary adjustments. 📈📉",
      requiredLevel: 57,
    },
    {
      title: "UNIT 21: Rebalancing",
      description: "Understand why and when to rebalance your portfolio. Learn techniques for rebalancing to maintain your desired asset allocation and risk level. 🔄📊",
      requiredLevel: 60,
    },
    {
      title: "UNIT 22: Investment Strategies",
      description: "Explore different investment strategies such as value investing, growth investing, and income investing. Learn how to apply these strategies to achieve your financial goals. 📈📚",
      requiredLevel: 63,
    },
    {
      title: "UNIT 23: Options Trading",
      description: "Understand the basics of options trading, including calls and puts. Learn about various option strategies such as covered calls and protective puts. 📈📉",
      requiredLevel: 66,
    },
    {
      title: "UNIT 24: Futures and Commodities",
      description: "Explore futures trading and commodity markets. Learn how to use futures for hedging and speculative purposes. 📊🌾",
      requiredLevel: 69,
    },
    {
      title: "UNIT 25: Forex Trading",
      description: "Discover the basics of the foreign exchange market, including currency pairs and trading strategies. Understand how to trade forex and manage currency risk. 🌍💱",
      requiredLevel: 72,
    },
    {
      title: "UNIT 26: Short Selling",
      description: "Learn the mechanics of short selling, including its risks and benefits. Understand how to profit from declining stock prices. 📉💡",
      requiredLevel: 75,
    },
    {
      title: "UNIT 27: Leverage and Margin Trading",
      description: "Understand leverage and margin trading, including margin requirements and associated risks. Learn how to use leverage to amplify returns and the potential pitfalls. 📈💸",
      requiredLevel: 78,
    },
    {
      title: "UNIT 28: Psychology of Investing",
      description: "Explore common biases such as overconfidence and herd behavior. Understand how emotional influences can affect investment decisions and strategies to mitigate these biases. 🧠📊",
      requiredLevel: 81,
    },
    {
      title: "UNIT 29: Market Sentiment",
      description: "Learn how to measure market sentiment and its impact on financial markets. Understand how investor sentiment drives market trends and how to use it in your investment strategy. 📈📉",
      requiredLevel: 84,
    },
    {
      title: "UNIT 30: Behavioral Strategies",
      description: "Discover techniques to mitigate biases and maintain a long-term perspective. Learn strategies to improve decision-making and enhance investment performance. 🧠📈",
      requiredLevel: 87,
    },
    {
      title: "UNIT 31: Socially Responsible Investing (SRI)",
      description: "Understand the definition and importance of SRI. Learn about SRI strategies and how to incorporate them into your investment portfolio. 🌱📈",
      requiredLevel: 90,
    },
    {
      title: "UNIT 32: Environmental, Social, and Governance (ESG) Investing",
      description: "Explore ESG criteria and the impact of ESG investing. Learn how to evaluate investments based on their environmental, social, and governance practices. 🌍💼",
      requiredLevel: 93,
    },
    {
      title: "UNIT 33: Ethical Dilemmas in Investing",
      description: "Discover how to balance profit and principles. Explore ethical case studies to understand the challenges and opportunities of ethical investing. 🛡️📊",
      requiredLevel: 96,
    },
    {
      title: "UNIT 34: Types of Real Estate Investments",
      description: "Learn about different types of real estate investments, including residential and commercial properties, as well as Real Estate Investment Trusts (REITs). 🏠🏢",
      requiredLevel: 99,
    },
    {
      title: "UNIT 35: Real Estate Valuation",
      description: "Discover methods of real estate valuation and market analysis. Understand how to determine the value of real estate investments. 🏘️📊",
      requiredLevel: 102,
    },
    {
      title: "UNIT 36: Financing Real Estate",
      description: "Understand the basics of mortgage financing and leveraging property. Learn how to finance your real estate investments effectively. 💰🏡",
      requiredLevel: 105,
    },
    {
      title: "UNIT 37: Property Management",
      description: "Explore the pros and cons of renting vs. selling properties. Learn how to manage rental properties and maximize returns. 🏠🔑",
      requiredLevel: 108,
    },
    {
      title: "UNIT 38: Tax Basics",
      description: "Understand capital gains tax and dividend tax. Learn how taxes impact your investment returns and strategies to manage them. 💸📊",
      requiredLevel: 111,
    },
    {
      title: "UNIT 39: Tax-Advantaged Accounts",
      description: "Discover the benefits of tax-advantaged accounts such as retirement accounts and education savings accounts. Learn how to use these accounts to maximize tax efficiency. 📈💼",
      requiredLevel: 114,
    },
    {
      title: "UNIT 40: Tax Strategies",
      description: "Learn about tax-loss harvesting and tax deferral strategies. Understand how to optimize your investment portfolio for tax savings. 💡📊",
      requiredLevel: 117,
    },
    {
      title: "UNIT 41: International Tax Considerations",
      description: "Explore the challenges of investing in foreign markets, including double taxation. Learn strategies to manage international tax implications. 🌍📈",
      requiredLevel: 120,
    },
    {
      title: "UNIT 42: Introduction to Algorithmic Trading",
      description: "Understand the basics of algorithmic trading and different types of algorithms used in the market. 📊🤖",
      requiredLevel: 123,
    },
    {
      title: "UNIT 43: Developing Trading Algorithms",
      description: "Learn coding basics (Python, R) and strategies for backtesting trading algorithms. Discover how to develop and test your own trading strategies. 💻📉",
      requiredLevel: 126,
    },
    {
      title: "UNIT 44: High-Frequency Trading",
      description: "Explore the mechanics, risks, and challenges of high-frequency trading. Understand how high-frequency traders operate in the market. ⚡📈",
      requiredLevel: 129,
    },
    {
      title: "UNIT 45: Machine Learning in Trading",
      description: "Discover the applications of machine learning in trading strategies. Learn how machine learning algorithms can enhance trading performance. 🧠📊",
      requiredLevel: 132,
    },
    {
      title: "UNIT 46: Cryptocurrency Investing",
      description: "Understand the basics of cryptocurrencies and blockchain technology. Learn about the risks and opportunities in cryptocurrency investing. 🪙📈",
      requiredLevel: 135,
    },
    {
      title: "UNIT 47: Robo-Advisors",
      description: "Explore what robo-advisors are, their benefits, and drawbacks. Understand how robo-advisors are changing the landscape of investing. 🤖💼",
      requiredLevel: 138,
    },
    {
      title: "UNIT 48: Sustainable Investing",
      description: "Learn about green investments and how to measure their impact. Discover the importance of sustainable investing for the future. 🌍💚",
      requiredLevel: 141,
    },
    {
      title: "UNIT 49: Fintech Innovations",
      description: "Explore new financial technologies and their impact on traditional investing. Understand how fintech innovations are disrupting the financial industry. 📈💼",
      requiredLevel: 144,
    },
  ];

  const buttonPositionsLeft = [
    { top: '40px', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '160px', left: '45%', transform: 'translate(-50%, 0)' },
    { top: '280px', left: '50%', transform: 'translate(-50%, 0)' },
  ];

  const buttonPositionsRight = [
    { top: '45px', left: '50%', transform: 'translate(-50%, 0)' },
    { top: '160px', left: '55%', transform: 'translate(-50%, 0)' },
    { top: '280px', left: '50%', transform: 'translate(-50%, 0)' },
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

  const lockIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const handleStarClick = (unitIndex, starIndex) => {
    if (userLevel >= units[unitIndex].requiredLevel + starIndex) {
      router.push(`/learn/units/unit${unitIndex + 1}/quiz${starIndex + 1}`);
    } else {
      alert("You do not have the required level to access this quiz.");
    }
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setScrollDepth(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getParallaxStyle = (depth) => ({
    transform: `translateY(${scrollDepth * depth}px)`,
  });

  const getQuizButtonStyle = (unitIndex, quizIndex) => {
    const isLocked = userLevel < units[unitIndex].requiredLevel + quizIndex;
    const isBlue = userLevel === units[unitIndex].requiredLevel + quizIndex;
    const isGreen = userLevel > units[unitIndex].requiredLevel + quizIndex;

    if (isLocked) {
      return 'bg-gray-500';
    } else if (isBlue) {
      return 'bg-blue-500';
    } else if (isGreen) {
      return 'bg-green-500';
    }
  };

  return (
    <div className="relative flex flex-col items-center h-screen pt-8">
      <div className="parallax-background absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url(/path/to/your/background1.png)', ...getParallaxStyle(0.1) }} />
      <div className="parallax-background absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url(/path/to/your/background2.png)', ...getParallaxStyle(0.2) }} />
      <div className="parallax-background absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url(/path/to/your/background3.png)', ...getParallaxStyle(0.3) }} />
      {units.map((unit, unitIndex) => (
        <div key={unitIndex} className="relative w-full mb-16 z-10">
          <div className="relative w-full flex justify-center">
            <a href={userLevel >= unit.requiredLevel ? `/learn/units/unit${unitIndex + 1}` : "#"} className={`block w-3/4 p-10 ${userLevel >= unit.requiredLevel ? 'bg-blue-400' : 'bg-gray-400'} text-white border ${userLevel >= unit.requiredLevel ? 'border-blue-400' : 'border-gray-400'} rounded-lg shadow-lg`}>
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="mb-4 text-3xl font-bold tracking-tight">{unit.title}</h5>
                  <p className={`font-normal mb-4 ${userLevel < unit.requiredLevel ? 'blur' : ''}`}>{unit.description}</p>
                </div>
                <div className={`button w-40 h-16 ${userLevel >= unit.requiredLevel ? 'bg-blue-500' : 'bg-gray-500'} rounded-lg cursor-pointer select-none
                  active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                  active:border-b-[0px] transition-all duration-150 ${userLevel >= unit.requiredLevel ? '[box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400' : '[box-shadow:0_10px_0_0_#888888,0_15px_0_0_#888888] border-b-[1px] border-gray-400'}`}>
                  <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg'>
                    {userLevel < unit.requiredLevel ? <img src="/lock.png" alt="locked" className="h-8 w-8" /> : "Learn"}
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="relative w-full h-[400px] mt-8">
          {(unitIndex % 2 === 0 ? buttonPositionsLeft : buttonPositionsRight).map((pos, starIndex) => (
            <div 
              key={starIndex} 
              style={{ position: 'absolute', top: pos.top, left: pos.left, transform: pos.transform }} 
              className={`button w-24 h-24 ${getQuizButtonStyle(unitIndex, starIndex)} rounded-full cursor-pointer select-none
              active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
              active:border-b-[0px] transition-all duration-150 ${userLevel >= units[unitIndex].requiredLevel ? '[box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841] border-[1px] border-blue-400' : '[box-shadow:0_8px_0_0_#888888,0_13px_0_0_#888888] border-[1px] border-gray-400'} flex justify-center items-center text-white font-bold text-lg`}
              onClick={() => handleStarClick(unitIndex, starIndex)}
            >
              {userLevel < units[unitIndex].requiredLevel + starIndex
                ? <img src="/lock.png" alt="locked" className="h-6 w-6" />
                : userLevel === units[unitIndex].requiredLevel + starIndex
                ? starIcon
                : starIcon /* Replace with a green checkmark icon for passed quizzes */}
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
