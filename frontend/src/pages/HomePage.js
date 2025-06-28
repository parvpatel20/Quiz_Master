import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import Loading from "../components/Loading";
import { Trophy, Search, TrendingUp, Star, Sparkles, BookOpen, Target, Award, Zap, Users, Crown, Lightbulb } from "lucide-react";

const tips = [
  "Stay calm and focus when attempting a quiz.",
  "Read each question carefully before answering.",
  "Time management is key, don't spend too long on any one question.",
  "Take educated guesses if you don't know the answer.",
  "Review your answers if time allows before submitting.",
];

const HomePage = () => {
  const [hoveredTip, setHoveredTip] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Local state for login status

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://quiz-master-backend-1a1s.onrender.com/api/check-login-status",
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

  // Auto-rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredTip((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
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

  const featureCards = [
    {
      key: "leaderboard",
      icon: Trophy,
      title: "Leaderboard",
      description: "Compete with others and climb to the top by excelling in quizzes!",
      gradient: "from-[#FFD700]/20 via-[#FF9100]/15 to-[#FFD700]/20",
      iconColor: "text-[#FFD700]",
      borderColor: "border-[#FFD700]/30",
      glowColor: "from-[#FFD700]/20 to-[#FF9100]/20",
      size: "sm",
      delay: 0.2,
    },
    {
      key: "explore",
      icon: Search,
      title: "Explore Quizzes",
      description: "Discover quizzes across categories like Science, Math, and more.",
      gradient: "from-[#FF9100]/20 via-[#FF6B35]/15 to-[#FF9100]/20",
      iconColor: "text-[#FF9100]",
      borderColor: "border-[#FF9100]/30",
      glowColor: "from-[#FF9100]/20 to-[#FFD700]/20",
      size: "lg",
      delay: 0.3,
    },
    {
      key: "growth",
      icon: TrendingUp,
      title: "Check Your Growth",
      description: "Track your progress and see how you've improved over time.",
      gradient: "from-[#32CD32]/20 via-[#228B22]/15 to-[#32CD32]/20",
      iconColor: "text-[#32CD32]",
      borderColor: "border-[#32CD32]/30",
      glowColor: "from-[#32CD32]/20 to-[#228B22]/20",
      size: "sm",
      delay: 0.4,
    },
  ];

  console.log(isLoggedIn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2C4A75]/30 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-[#FFD700]/10 to-[#FF6B35]/10 rounded-full blur-2xl animate-pulse delay-2000"></div>

      <Loading isLoading={isLoggedIn === null} />

      {isLoggedIn ? <HeaderAfterSignup /> : <Header />}

      {/* Hero Section */}
      <section
        id="signUpLogin"
        className="relative flex items-center justify-center pb-10 pt-10 px-6 text-center z-10"
        ref={heroRef}
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: heroInView ? 1 : 0, scale: heroInView ? 1 : 0.9 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Spectacular Hero Icon */}
          {/* <motion.div
            className="relative inline-block mb-10"
            initial={{ y: -100, rotate: -180, opacity: 0 }}
            animate={{ 
              y: heroInView ? 0 : -100, 
              rotate: heroInView ? 0 : -180, 
              opacity: heroInView ? 1 : 0 
            }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          > */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-60 animate-pulse"></div> */}
            {/* <div className="relative p-8 rounded-full">
              <img
            src="../../assets/logo.png" // Replace with your logo path
            alt="Quiz Master Logo"
            className="h-20 w-20 object-contain animate-bounce"
          />
            </div>
          </motion.div> */}

          {/* Animated Gradient Heading */}
          <motion.h1
            className="text-7xl font-black mt-8 mb-8 leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: heroInView ? 0 : -50, opacity: heroInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-[#FF9100] via-[#FFD700] via-[#FF6B35] to-[#FF9100] bg-clip-text text-transparent animate-gradient-x">
              Welcome to Quiz Master!
            </span>
            {/* <br />
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-[#FF6B35] bg-clip-text text-transparent">
              
            </span> */}
          </motion.h1>

          {/* Decorative elements */}
          <motion.div
            className="flex justify-center items-center gap-6 mb-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: heroInView ? 1 : 0, opacity: heroInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-transparent rounded-full"></div>
            <Star className="w-10 h-10 text-[#FFD700] animate-spin-slow" />
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full"></div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-3xl text-gray-300 mb-16 font-light max-w-4xl mx-auto leading-relaxed"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: heroInView ? 0 : 100, opacity: heroInView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            Test your knowledge with quizzes across multiple categories. Track your progress and become a champion!
          </motion.p>
        </motion.div>
      </section>

      {/* Quiz Tips Section */}
      <section
        className="relative w-full py-10 z-10"
        ref={tipsRef}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: tipsInView ? 1 : 0, y: tipsInView ? 0 : 50 }}
            transition={{ duration: 1 }}
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-lg opacity-60"></div>
              <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                <Lightbulb className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent">
              Quiz Tips
            </h2>
            
            <div className="flex justify-center items-center gap-4">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-[#FFD700] rounded-full"></div>
              <Sparkles className="w-8 h-8 text-[#FFD700] animate-spin-slow" />
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-transparent rounded-full"></div>
            </div>
          </motion.div>

          {/* Tips Display */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: tipsInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative p-12 bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#FF9100]/30">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 via-transparent to-[#FFD700]/10 rounded-3xl"></div>
              
              <div className="relative text-center min-h-[120px] flex items-center justify-center">
                <motion.p
                  key={hoveredTip}
                  className="text-4xl font-bold text-white leading-relaxed max-w-4xl"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  💡 {tips[hoveredTip]}
                </motion.p>
              </div>

              {/* Tip Navigation Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {tips.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === hoveredTip 
                        ? 'bg-gradient-to-r from-[#FF9100] to-[#FFD700] scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => setHoveredTip(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 z-10" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: featuresInView ? 0 : -50, opacity: featuresInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-lg opacity-60"></div>
              <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent">
              Features Highlights
            </h2>
            
            <div className="flex justify-center items-center gap-4">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-[#FFD700] rounded-full"></div>
              <Target className="w-8 h-8 text-[#FFD700] animate-spin-slow" />
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-transparent rounded-full"></div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="flex flex-wrap justify-center items-stretch gap-12">
            {featureCards.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  className={`group relative ${
                    feature.size === "lg" ? "w-96 h-[480px]" : "w-80 h-[420px]"
                  }`}
                  initial={{ opacity: 0, y: feature.size === "lg" ? 50 : 70 }}
                  animate={{
                    opacity: featuresInView ? 1 : 0,
                    y: featuresInView ? 0 : 50,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: feature.delay,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 1.02 }}
                >
                  {/* Glowing background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.glowColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className={`relative h-full bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border ${feature.borderColor} transition-all duration-500 flex flex-col`}>
                    
                    {/* Feature Icon */}
                    <div className="text-center mb-8">
                      <div className="relative inline-block">
                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.glowColor} rounded-3xl blur-md opacity-60`}></div>
                        <div className={`relative p-6 bg-gradient-to-r ${feature.gradient} rounded-3xl border ${feature.borderColor}`}>
                          <IconComponent className={`w-16 h-16 ${feature.iconColor} ${feature.size === "lg" ? "w-20 h-20" : ""}`} />
                        </div>
                      </div>
                    </div>

                    {/* Feature Content */}
                    <div className="flex-1 flex flex-col justify-center text-center">
                      <h3 className={`font-bold ${feature.size === "lg" ? "text-4xl mb-6" : "text-3xl mb-4"} bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent`}>
                        {feature.title}
                      </h3>
                      
                      <div className="w-16 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full mb-6"></div>
                      
                      <p className={`text-gray-300 leading-relaxed ${feature.size === "lg" ? "text-xl" : "text-lg"} font-light`}>
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/5 via-transparent to-[#FFD700]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
