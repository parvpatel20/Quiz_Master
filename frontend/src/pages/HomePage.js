import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import Loading from "../components/Loading";
import { useEffect } from "react";

const tips = [
  "Stay calm and focus when attempting a quiz.",
  "Read each question carefully before answering.",
  "Time management is key, don't spend too long on any one question.",
  "Take educated guesses if you don’t know the answer.",
  "Review your answers if time allows before submitting.",
];

const HomePage = () => {
  const [hoveredTip, setHoveredTip] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Local state for login status

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/check-login-status",
          {
            method: "GET",
            credentials: "include", // Include cookies if using them for authentication
          }
        );

        console.log("check login ok");

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn); // Update login status based on server response
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  console.log(isLoggedIn);

  // Intersection Observer hooks for each section
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: tipsRef, inView: tipsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  console.log(isLoggedIn);

  return (
    <div className="h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-[#ffffff] font-sans scrollbar-hide">
      <Loading isLoading={isLoggedIn === null} />

      {isLoggedIn ? <HeaderAfterSignup /> : <Header />}

      {/* Hero Section */}
      <section
        id="signUpLogin"
        className="flex items-center justify-center pb-10 pt-24 px-6 text-center"
        ref={heroRef}
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: heroInView ? 1 : 0, scale: heroInView ? 1 : 0.9 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Animated Gradient Heading */}
          <motion.h1
            className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: heroInView ? 0 : -50, opacity: heroInView ? 1 : 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            Welcome to Quiz Master!
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-2xl text-[#F9F7F7] mb-10 font-semibold"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: heroInView ? 0 : 100, opacity: heroInView ? 1 : 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4,
            }}
          >
            Test your knowledge with quizzes across multiple categories. Track
            your progress and become a champion!
          </motion.p>
        </motion.div>
      </section>

      {/* Quiz Tips Section */}
      <section
        className="relative w-full bg-gradient-to-r from-[#112D4E] to-[#0F1A36] py-20"
        ref={tipsRef}
      >
        <motion.h1
          className="text-5xl text-center font-extrabold mb-12 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: tipsInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          Quiz Tips
        </motion.h1>

        {/* Tips Section */}
        <div className="w-full flex justify-center items-center">
          <motion.div
            className="relative w-full max-w-5xl px-8 py-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: tipsInView ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            {/* Tips Slider */}
            <motion.div
              className="absolute inset-0 flex justify-center items-center text-center text-white"
              key={hoveredTip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setHoveredTip((hoveredTip + 1) % tips.length)} // Loop through the tips
            >
              <div className="tip-content absolute inset-0 flex justify-center items-center pt-3 pb-10 max-w-full max-h-full overflow-hidden cursor-pointer">
                <motion.p
                  className="text-3xl md:text-3xl font-bold text-[#FFFFFF] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {tips[hoveredTip]}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-8" ref={featuresRef}>
        <motion.h1
          className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-center mb-16 drop-shadow-lg leading-normal"
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: featuresInView ? 0 : 50,
            opacity: featuresInView ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.1 }} // Shortened duration for faster loading
        >
          Features Highlights
        </motion.h1>

        <div className="flex flex-wrap justify-center items-center gap-12">
          {/* Feature Cards */}
          {[
            {
              key: "leaderboard",
              icon: "fas fa-trophy",
              title: "Leaderboard",
              description:
                "Compete with others and climb to the top by excelling in quizzes!",
              color: "#FFD700",
              size: "sm",
              zIndex: 1,
              delay: 0.2, // Reduced delay
            },
            {
              key: "explore",
              icon: "fas fa-search",
              title: "Explore Quizzes",
              description:
                "Discover quizzes across categories like Science, Math, and more.",
              color: "#FF7F00",
              size: "lg",
              zIndex: 1,
              delay: 0.3, // Reduced delay
            },
            {
              key: "growth",
              icon: "fas fa-chart-line",
              title: "Check Your Growth",
              description:
                "Track your progress and see how you've improved over time.",
              color: "#32CD32",
              size: "sm",
              zIndex: 1,
              delay: 0.4, // Reduced delay
            },
          ].map((feature) => (
            <motion.div
              key={feature.key}
              className={`${
                feature.size === "lg" ? "w-80 h-96" : "w-64 h-80"
              } bg-gradient-to-b from-[#112D4E] to-[#0F1A36] p-6 rounded-3xl shadow-lg flex flex-col items-center relative transition-transform duration-300`}
              style={{ zIndex: feature.zIndex }}
              initial={{ opacity: 0, y: feature.size === "lg" ? 50 : 70 }}
              animate={{
                opacity: featuresInView ? 1 : 0,
                y: featuresInView ? 0 : 50,
              }}
              transition={{
                duration: 0.5, // Reduced duration for faster entrance
                delay: feature.delay,
              }}
              whileHover={{
                scale: 1.1, // Immediate hover scale
                boxShadow: `0px 0px 15px 3px ${feature.color}`,
                transition: { duration: 0 }, // Instant hover effect
              }}
              whileTap={{ scale: 1.05 }} // Slight shrink effect on click
            >
              <div
                className={`text-6xl my-8 ${
                  feature.size === "lg" ? "text-7xl" : "text-5xl"
                }`}
                style={{ color: feature.color }}
              >
                <i className={feature.icon}></i>
              </div>
              <h3
                className={`text-center font-bold ${
                  feature.size === "lg" ? "text-3xl" : "text-2xl"
                } text-[#FF9100] mb-4`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-center ${
                  feature.size === "lg" ? "text-lg" : "text-sm"
                } text-[#F0F0F0]`}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
