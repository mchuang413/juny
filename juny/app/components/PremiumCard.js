import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PremiumCard = () => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if the user already has premium status
    const checkPremiumStatus = async () => {
      try {
        const response = await fetch("https://michaelape.site/get_premium_status");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIsPremium(data.status);
      } catch (error) {
        console.error("Error fetching premium status:", error);
      }
    };

    checkPremiumStatus();
  }, []);

  const handleUpgrade = () => {
    // Redirect to Stripe checkout page
    const stripeUrl = "https://buy.stripe.com/test_dR6eWf1M8bXj9q0fYY";
    window.location.href = stripeUrl;
  };

  const handlePostPayment = async () => {
    try {
      const response = await fetch("https://michaelape.site/upgrade_premium", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to upgrade premium status");
      }
      const data = await response.json();
      console.log("Upgrade successful:", data);
    } catch (error) {
      console.error("Error upgrading premium status:", error);
    }
  };

  return (
    <section className="px-4 py-12">
      <div className="mx-auto">
        {isPremium ? (
          <div className="p-4 text-center text-white bg-green-500 rounded">
            Thank you for already supporting the Juny team. Your account already has Juny+.
          </div>
        ) : (
          <Card onUpgrade={handleUpgrade} />
        )}
      </div>
    </section>
  );
};

const Card = ({ onUpgrade }) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-auto w-96 shrink-0 overflow-hidden rounded-xl bg-indigo-500 p-8 pb-20" // Add padding to the bottom
    >
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
          JUNY+
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-mono text-6xl font-black leading-[1.2]"
        >
          $10/
          <br />
          Month
        </motion.span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center">
            <CheckIcon /> Unlimited Learning
          </li>
          <li className="flex items-center">
            <CheckIcon /> Unlimited Paper Trading Simulator Access
          </li>
          <li className="flex items-center">
            <CheckIcon /> Exclusive Portfolios
          </li>
          <li className="flex items-center">
            <CheckIcon /> Live Stock News
          </li>
          <li className="flex items-center">
            <CheckIcon /> AI - Powered Feedback
          </li>
        </ul>
      </div>
      <button
        onClick={onUpgrade}
        className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white"
      >
        Reveal the Secrets
      </button>
      <Background />
    </motion.div>
  );
};

const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-green-500 mr-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
  </svg>
);

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};

export default PremiumCard;
