"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const QuizPage = () => {
  const [stepsComplete, setStepsComplete] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [selectedDescription, setSelectedDescription] = useState(null);
  const numSteps = 3; // Adjust based on number of questions
  const isPremium = true; // Change this to dynamically check for premium status

  const questions = [
    {
      type: "trueFalse",
      question: "Insider trading is fair and encouraged by regulators.",
      options: ["True", "False"],
      answer: "False",
    },
    {
      type: "matching",
      question: "Match the concept with its description.",
      options: {
        "Regulatory Environment": "b. System of rules governing financial markets",
        "Investor Protection": "c. Safeguarding investors from fraud",
        "Market Integrity": "d. Maintaining trust in the market system",
        "Fair Trading Practices": "a. Ensuring trades are transparent and fair"
      },
      answer: {
        "Regulatory Environment": "b. System of rules governing financial markets",
        "Investor Protection": "c. Safeguarding investors from fraud",
        "Market Integrity": "d. Maintaining trust in the market system",
        "Fair Trading Practices": "a. Ensuring trades are transparent and fair"
      }
    },
    {
      type: "multipleChoice",
      question: "Juny the Octopus learns about a hidden treasure and buys it before the information is public. What is this?",
      options: ["a. Transparent Trading", "b. Insider Trading", "c. Market Regulation", "d. Fair Trading"],
      answer: "b. Insider Trading",
    }
  ];

  const handleSetStep = (num) => {
    if ((stepsComplete === 0 && num === -1) || (stepsComplete === numSteps && num === 1)) {
      return;
    }
    setStepsComplete((prev) => prev + num);
  };

  const handleSelectAnswer = (step, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [step]: answer }));
  };

  const handleMatchAnswer = (step, type, description) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [step]: { ...prev[step], [type]: description }
    }));
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
          model: "gpt-3.5-turbo",
          prompt: `Generate a personalized feedback report for the following quiz answers: ${JSON.stringify(
            selectedAnswers
          )}. Questions: ${JSON.stringify(questions)}`,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual API key
            "Content-Type": "application/json",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <Steps numSteps={numSteps} stepsComplete={stepsComplete} />
        {!isSubmitted ? (
          <>
            <Question
              step={stepsComplete}
              questions={questions}
              selectedAnswer={selectedAnswers[stepsComplete]}
              onSelectAnswer={handleSelectAnswer}
              onMatchAnswer={handleMatchAnswer}
              selectedDescription={selectedDescription}
              setSelectedDescription={setSelectedDescription}
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleSetStep(-1)}
                disabled={stepsComplete === 0}
                className="px-4 py-2 text-white bg-gray-400 rounded-lg disabled:bg-gray-300"
              >
                Previous
              </button>
              {stepsComplete === numSteps - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-white bg-indigo-600 rounded-lg"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => handleSetStep(1)}
                  className="px-4 py-2 text-white bg-indigo-600 rounded-lg"
                >
                  Next
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
    <div className="flex items-center justify-between gap-3 mb-6">
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

const Question = ({
  step,
  questions,
  selectedAnswer,
  onSelectAnswer,
  onMatchAnswer,
  selectedDescription,
  setSelectedDescription
}) => {
  const question = questions[step];
  if (!question) return null;

  if (question.type === "matching") {
    return (
      <div>
        <h3 className="mb-4 font-semibold text-lg">{question.question}</h3>
        <ClickSelectMatch
          question={question}
          selectedAnswer={selectedAnswer}
          onMatchAnswer={onMatchAnswer}
          selectedDescription={selectedDescription}
          setSelectedDescription={setSelectedDescription}
        />
      </div>
    );
  }

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

const ClickSelectMatch = ({
  question,
  selectedAnswer,
  onMatchAnswer,
  selectedDescription,
  setSelectedDescription
}) => {
  const [descriptions, setDescriptions] = useState(Object.values(question.options));

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
  };

  const handleBoxClick = (type) => {
    if (selectedDescription) {
      const updatedDescriptions = descriptions.filter((desc) => desc !== selectedDescription);
      const existingDescription = selectedAnswer?.[type];

      if (existingDescription) {
        updatedDescriptions.push(existingDescription);
      }

      setDescriptions(updatedDescriptions);
      onMatchAnswer(1, type, selectedDescription); // Assuming the matching question is the second one
      setSelectedDescription(null);
    }
  };

  return (
    <div className="overflow-y-auto max-h-96">
      {Object.keys(question.options).map((type) => (
        <div key={type} className="flex flex-col mb-4">
          <span className="font-semibold">{type}</span>
          <div
            onClick={() => handleBoxClick(type)}
            className={`mt-2 p-4 border rounded h-auto min-h-[50px] cursor-pointer ${selectedDescription ? "border-blue-500" : "border-gray-300"}`}
          >
            {selectedAnswer?.[type] || "Click to place description here"}
          </div>
        </div>
      ))}
      <div className="flex flex-col">
        {descriptions.map((description, index) => (
          <div
            key={index}
            onClick={() => handleDescriptionClick(description)}
            className={`p-2 border rounded mb-2 cursor-pointer ${selectedDescription === description ? "bg-blue-200 border-blue-500" : "bg-gray-200 border-gray-300"}`}
          >
            {description}
          </div>
        ))}
      </div>
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
          {question.type === "matching" ? (
            <>
              <p className="mb-2">
                <strong>Your Answers:</strong>
              </p>
              <ul className="list-disc pl-5">
                {Object.keys(question.options).map((type) => (
                  <li key={type} className="mb-2">
                    {type}: {selectedAnswers[1]?.[type]} -{" "}
                    {selectedAnswers[1]?.[type] === question.answer[type] ? (
                      <span className="text-green-600 font-semibold">Correct</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Wrong</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      ))}
      {isPremium && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
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

export default QuizPage;
