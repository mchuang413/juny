"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const Page = () => {
  const [stepsComplete, setStepsComplete] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const numSteps = 10; // Updated to 10 steps for the new questions
  const isPremium = true; // Change this to dynamically check for premium status

  const questions = [
    {
      question: "What does the principle of risk vs. reward mean in investing?",
      options: [
        "a. Higher risk always guarantees higher returns",
        "b. Higher risk comes with the potential for higher returns",
        "c. Lower risk always guarantees higher returns",
        "d. Lower risk comes with the potential for higher returns"
      ],
      answer: "b. Higher risk comes with the potential for higher returns"
    },
    {
      question: "What is diversification in investing?",
      options: [
        "a. Putting all your money into one stock",
        "b. Spreading your investments across different types of assets",
        "c. Investing only in low-risk assets",
        "d. Avoiding investments in stocks"
      ],
      answer: "b. Spreading your investments across different types of assets"
    },
    {
      question: "What is the benefit of diversification?",
      options: [
        "a. It guarantees higher returns",
        "b. It eliminates all investment risk",
        "c. It reduces the risk of significant losses",
        "d. It ensures all investments grow at the same rate"
      ],
      answer: "c. It reduces the risk of significant losses"
    },
    {
      question: "What is compounding in the context of investing?",
      options: [
        "a. The process of spreading investments across various assets",
        "b. Reinvesting earnings to generate more earnings over time",
        "c. The impact of inflation on investments",
        "d. Balancing risk and reward in a portfolio"
      ],
      answer: "b. Reinvesting earnings to generate more earnings over time"
    },
    {
      question: "Juny the Octopus wants to protect her investments from significant losses. Which principle should she apply?",
      options: [
        "a. Compounding",
        "b. Risk vs. Reward",
        "c. Diversification",
        "d. Inflation"
      ],
      answer: "c. Diversification"
    },
    {
      question: "Juny is concerned that the value of her savings will decrease over time due to rising prices. What should she consider to combat this?",
      options: [
        "a. Investing in assets that outpace inflation",
        "b. Keeping all her money in a savings account",
        "c. Avoiding all investments",
        "d. Investing in low-risk bonds only"
      ],
      answer: "a. Investing in assets that outpace inflation"
    },
    {
      question: "Stocks generally offer higher returns than bonds but also come with higher risks.",
      options: [
        "a. True",
        "b. False"
      ],
      answer: "a. True"
    },
    {
      question: "Inflation increases the purchasing power of your money over time.",
      options: [
        "a. True",
        "b. False"
      ],
      answer: "b. False"
    },
    {
      question: "Compounding can significantly increase your wealth over time by reinvesting your earnings.",
      options: [
        "a. True",
        "b. False"
      ],
      answer: "a. True"
    },
    {
      question: "Diversification involves putting all your money into a single stock to maximize returns.",
      options: [
        "a. True",
        "b. False"
      ],
      answer: "b. False"
    },
    {
      question: "Match the concept with its description.",
      options: [
        "a. Spreading your investments across different types of assets to reduce risk",
        "b. The process where your investment earnings generate more earnings over time",
        "c. The chance of losing money versus the potential to make money",
        "d. The increase in prices over time, reducing purchasing power"
      ],
      matches: {
        "Risk vs. Reward": "c. The chance of losing money versus the potential to make money",
        "Diversification": "a. Spreading your investments across different types of assets to reduce risk",
        "Compounding": "b. The process where your investment earnings generate more earnings over time",
        "Inflation": "d. The increase in prices over time, reducing purchasing power"
      }
    }
  ];

  const handleSetStep = (num) => {
    if (
      (stepsComplete === 0 && num === -1) ||
      (stepsComplete === numSteps && num === 1)
    ) {
      return;
    }

    setStepsComplete((pv) => pv + num);
  };

  const handleSelectAnswer = (step, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [step]: answer }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isPremium) {
      generatePersonalizedFeedback();
    }
  };

  const generatePersonalizedFeedback = async () => {
    setIsLoading(true);
    setAiFeedback("");
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-4o",
          prompt: `Generate a personalized feedback report for the following quiz answers: ${JSON.stringify(selectedAnswers)}. Questions: ${JSON.stringify(questions)}`,
        },
        {
          headers: {
            Authorization: `Bearer `,
            "Content-Type": "application/json"
          },
        }
      );
      setAiFeedback(response.data.choices[0].text);
    } catch (error) {
      console.error("Error generating personalized feedback:", error);
      setAiFeedback("There was an error generating the feedback. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const TypewriterEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, [text]);

    return <p>{displayedText}</p>;
  };

  return (
    <div className="px-4 py-14 bg-white">
      <div className="p-8 bg-white shadow-lg rounded-md w-full max-w-2xl mx-auto">
        {!isSubmitted ? (
          <>
            <Steps numSteps={numSteps} stepsComplete={stepsComplete} />
            <div className="p-2 my-6 h-auto bg-gray-100 border-2 border-dashed border-gray-200 rounded-lg">
              <Question
                step={stepsComplete}
                questions={questions}
                selectedAnswer={selectedAnswers[stepsComplete]}
                onSelectAnswer={handleSelectAnswer}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                className="px-4 py-1 rounded hover:bg-gray-100 text-black"
                onClick={() => handleSetStep(-1)}
              >
                Prev
              </button>
              {stepsComplete < numSteps - 1 ? (
                <button
                  className="px-4 py-1 rounded bg-black text-white"
                  onClick={() => handleSetStep(1)}
                >
                  Next
                </button>
              ) : (
                <button
                  className="px-4 py-1 rounded bg-black text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </>
        ) : (
          <Report
            questions={questions}
            selectedAnswers={selectedAnswers}
            isLoading={isLoading}
            aiFeedback={aiFeedback}
            isPremium={isPremium}
          />
        )}
      </div>
    </div>
  );
};

const Steps = ({ numSteps, stepsComplete }) => {
  const stepArray = Array.from(Array(numSteps).keys());

  return (
    <div className="flex items-center justify-between gap-3">
      {stepArray.map((num) => {
        const stepNum = num + 1;
        const isActive = stepNum <= stepsComplete;
        return (
          <React.Fragment key={stepNum}>
            <Step num={stepNum} isActive={isActive} />
            {stepNum !== stepArray.length && (
              <div className="w-full h-1 rounded-full bg-gray-200 relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-indigo-600 rounded-full"
                  animate={{ width: isActive ? "100%" : 0 }}
                  transition={{ ease: "easeIn", duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Step = ({ num, isActive }) => {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
          isActive ? "border-indigo-600 bg-indigo-100" : "border-gray-300"
        }`}
      >
        <AnimatePresence>
          {isActive ? (
            <motion.svg
              key="icon-marker"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.125 }}
              className="w-5 h-5 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12l2 2 4-4m6 6l2 2 4-4m-6-6l-4 4L6 8" />
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && (
        <div className="absolute z-0 -inset-1.5 bg-indigo-100 rounded-full animate-pulse" />
      )}
    </div>
  );
};

const Question = ({ step, questions, selectedAnswer, onSelectAnswer }) => {
  const question = questions[step];
  if (!question) return null;
  return (
    <div>
      <h3 className="mb-4 font-semibold text-lg">{question.question}</h3>
      <ul className="list-disc pl-5">
        {question.options.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`question-${step}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onSelectAnswer(step, option)}
                className="mr-2"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Report = ({ questions, selectedAnswers, isLoading, aiFeedback, isPremium }) => {
  return (
    <div className="mb-4 p-4 rounded-lg border-4 border-blue-400 w-full max-w-3xl mx-auto">
      <h3 className="mb-6 font-semibold text-xl text-center">Quiz Report</h3>
      {questions.map((question, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-2">
            <strong>Question {index + 1}:</strong> {question.question}
          </p>
          <p className="mb-2">
            <strong>Your Answer:</strong> {selectedAnswers[index]}
          </p>
          <p className="mb-2">
            <strong>Correct Answer:</strong> {question.answer} -{" "}
            {selectedAnswers[index] === question.answer ? (
              <span className="text-green-600 font-semibold">Correct</span>
            ) : (
              <span className="text-red-600 font-semibold">Wrong</span>
            )}
          </p>
        </div>
      ))}
      {isPremium && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h4 className="mb-4 font-semibold text-lg">Personalized Feedback</h4>
          {isLoading ? (
            <p>Loading personalized feedback...</p>
          ) : 
            <TypewriterEffect text={aiFeedback} />
          )}
        </div>
      )}
    </div>
  );
};

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <p>{displayedText}</p>;
};

export default Page;
