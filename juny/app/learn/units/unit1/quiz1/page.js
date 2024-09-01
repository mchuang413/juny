"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from 'js-cookie';

const MAX_USER_LEVEL = 1;

const Page = () => {
  const [stepsComplete, setStepsComplete] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [userLevel, setUserLevel] = useState(1); // State to store user level
  const numSteps = 3;
  const isPremium = true; // Change this to dynamically check for premium status

  const questions = [
    {
      question: "What is the main purpose of investing?",
      options: [
        "a. To buy and sell assets quickly",
        "b. To build wealth and reach financial goals",
        "c. To keep money in a savings account",
        "d. To avoid financial markets"
      ],
      answer: "b. To build wealth and reach financial goals"
    },
    {
      question: "Which of the following is an example of an asset you can invest in?",
      options: [
        "a. Groceries",
        "b. Clothes",
        "c. Stocks",
        "d. Vacations"
      ],
      answer: "c. Stocks"
    },
    {
      question: "Where was the first modern stock market established?",
      options: [
        "a. New York",
        "b. London",
        "c. Amsterdam",
        "d. Tokyo"
      ],
      answer: "c. Amsterdam"
    }
  ];

  useEffect(() => {
    const fetchUserLevel = async () => {
      try {
        const username = Cookies.get('username');
        if (!username) {
          console.error('Username not found in cookies');
          return;
        }
        const response = await fetch(`https://sea-lion-app-dckh3.ondigitalocean.app/get_user_level?username=${username}`);
        const data = await response.json();
        if (response.ok) {
          setUserLevel(data.level);
        } else {
          console.error('Failed to fetch user level:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user level:', error);
      }
    };

    fetchUserLevel();
  }, []);

  const handleSetStep = (num) => {
    if ((stepsComplete === 0 && num === -1) || (stepsComplete === numSteps && num === 1)) {
      return;
    }
    setStepsComplete((pv) => pv + num);
  };

  const handleSelectAnswer = (step, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [step]: answer }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctAnswers = questions.filter(
      (question, index) => question.answer === selectedAnswers[index]
    ).length;
    setCorrectAnswersCount(correctAnswers);

    if (correctAnswers === questions.length) {
      incrementUserLevel();
    }

    if (isPremium) {
      generatePersonalizedFeedback();
    }
  };

  const incrementUserLevel = async () => {
    try {
      const username = Cookies.get('username');
      if (!username) {
        console.error('Username not found in cookies');
        return;
      }
      if (userLevel < MAX_USER_LEVEL) {
        const response = await fetch(`https://sea-lion-app-dckh3.ondigitalocean.app/increment_level?username=${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username })
        });
        if (response.ok) {
          setUserLevel((prevLevel) => prevLevel + 1);
        } else {
          console.error('Failed to increment user level');
        }
      }
    } catch (error) {
      console.error('Error incrementing user level:', error);
    }
  };

  const generatePersonalizedFeedback = async () => {
    setIsLoading(true);
    setAiFeedback("");
    try {
      const response = await fetch("https://sea-lion-app-dckh3.ondigitalocean.app/generate_feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          selected_answers: selectedAnswers,
          questions: questions
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Failed to generate feedback");
      }

      setAiFeedback(data.feedback);
    } catch (error) {
      console.error("Error generating personalized feedback:", error);
      setAiFeedback("There was an error generating the feedback. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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
            correctAnswersCount={correctAnswersCount}
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
    <div className="relative">
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 ${
          isActive
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-300 text-gray-300"
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.6em"
              width="1.6em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
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

const Report = ({ questions, selectedAnswers, correctAnswersCount, isLoading, aiFeedback, isPremium }) => {
  return (
    <div className="mb-4 w-full max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <img src="/report.png" width={200} height={200} alt="Report" className="mx-auto mb-4" />
        <h3 className="font-semibold text-xl">
          You got {correctAnswersCount} out of {questions.length} correct!
        </h3>
      </div>
      <div className="text-left">
        {questions.map((question, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="mr-4">
              {selectedAnswers[index] === question.answer ? (
                <span className="text-green-600 font-semibold">✔️</span>
              ) : (
                <span className="text-red-600 font-semibold">❌</span>
              )}
            </div>
            <div>
              <p>
                <strong>Question {index + 1}:</strong> {question.question}
              </p>
              <p>
                <strong>Your Answer:</strong> {selectedAnswers[index]}
              </p>
              <p>
                <strong>Correct Answer:</strong> {question.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
      {isPremium && (
        <div className="mt-6">
          <h4 className="mb-4 font-semibold text-lg">Personalized Feedback</h4>
          {isLoading ? (
            <p>Loading personalized feedback...</p>
          ) : (
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
