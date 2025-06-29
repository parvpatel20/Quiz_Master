import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import Loading from "../components/Loading";
import {
  Trophy,
  Search,
  TrendingUp,
  Star,
  Sparkles,
  BookOpen,
  Target,
  Award,
  Zap,
  Users,
  Crown,
  Lightbulb,
  Flame,
  Rocket,
  Brain,
  ChevronRight,
  Play,
  Shield,
  Clock,
  Gift,
  Gamepad2,
  Medal,
  Timer,
  Globe,
  CheckCircle,
  ArrowRight,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tips = [
  "Stay calm and focus when attempting a quiz.",
  "Read each question carefully before answering.",
  "Time management is key, don't spend too long on any one question.",
  "Take educated guesses if you don't know the answer.",
  "Review your answers if time allows before submitting.",
  "Practice regularly to improve your quiz performance.",
  "Learn from your mistakes and keep track of weak areas.",
];

const testimonials = [
  {
    name: "Sanjay Jha",
    rating: 5,
    text: "Quiz Master helped me ace my entrance exams! The variety of questions is amazing.",
    avatar: "SJ",
    subject: "Class 12 Science Student",
  },
  {
    name: "Amit Verma",
    rating: 5,
    text: "The leaderboard feature keeps me motivated. I've improved so much!",
    avatar: "AV",
    subject: "Class 10 Student",
  },
  {
    name: "Rohit kumar",
    rating: 4,
    text: "Perfect for quick practice sessions. Love the progress tracking feature.",
    avatar: "RK",
    subject: "Class 9 Student",
  },
];

const HomePage = () => {
  const [hoveredTip, setHoveredTip] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isLoggedIn === true ? "/quiz-search" : "/quiz-search-before-signup");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://quiz-master-backend-1a1s.onrender.com/api/check-login-status",
          {
            method: "GET",
            credentials: "include",
          }
        );

        console.log("check login ok");

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredTip((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer hooks
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
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

  const { ref: categoriesRef, inView: categoriesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featureCards = [
    {
      key: "leaderboard",
      icon: Trophy,
      title: "Leaderboard",
      description:
        "Compete with others and climb to the top by excelling in quizzes!",
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
      description:
        "Discover quizzes across categories like Science, Math, and more.",
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

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2C4A75]/30 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-[#FFD700]/10 to-[#FF6B35]/10 rounded-full blur-2xl animate-pulse delay-2000"></div>

      {/* Interactive cursor glow effect */}
      <motion.div
        className="fixed w-96 h-96 bg-gradient-to-r from-[#FF9100]/5 to-[#FFD700]/5 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      />

      <FloatingParticles />

      <Loading isLoading={isLoggedIn === null} />

      {isLoggedIn ? <HeaderAfterSignup /> : <Header />}

      {/* Enhanced Hero Section */}
      <section
        id="signUpLogin"
        className="relative flex items-center justify-center pb-10 pt-10 px-6 text-center z-10 min-h-[600px]"
        ref={heroRef}
        style={{
          backgroundImage: 'url("bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between w-full">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-left pr-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: heroInView ? 1 : 0,
              scale: heroInView ? 1 : 0.9,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Animated Gradient Heading */}
            <motion.h1
              className="text-6xl font-black mb-6 leading-tight"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: heroInView ? 0 : -50, opacity: heroInView ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-[#FF9100] via-[#FFD700] via-[#FF6B35] to-[#FF9100] bg-clip-text text-transparent animate-gradient-x">
                Welcome to
                <br />
                Quiz Master !
              </span>
            </motion.h1>

            {/* Decorative elements */}
            <motion.div
              className="flex justify-left items-center gap-6 mb-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: heroInView ? 1 : 0,
                opacity: heroInView ? 1 : 0,
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-transparent rounded-full"></div>
              <Star className="w-10 h-10 text-[#FFD700] animate-spin-slow" />
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent rounded-full"></div>
            </motion.div>

            {/* Enhanced Subheading */}
            <motion.p
              className="text-xl text-gray-300 mb-8 font-light max-w-2xl leading-relaxed"
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: heroInView ? 0 : -100,
                opacity: heroInView ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              Test your knowledge with quizzes across multiple categories. Track
              your progress and become a champion!
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex gap-6 items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                className="group px-8 py-4 bg-[#FF9100] hover:bg-[#FF9100]/90 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
              >
                <div className="flex items-center gap-3">
                  <Play className="w-6 h-6" />
                  START NOW
                </div>
              </motion.button>

              <motion.button
      className="group px-8 py-4 bg-transparent border-2 border-[#FF9100]/50 rounded-2xl font-bold text-lg text-[#FF9100] hover:bg-[#FF9100]/10 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6" />
        Browse Categories
      </div>
    </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Trophy Card */}
          <motion.div
            className="flex-1 flex justify-center items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: heroInView ? 1 : 0, opacity: heroInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative">
                {/* Background glow effects */}
                <div className="absolute inset-0 rounded-full blur-2xl scale-150"></div>
                <div
                  className="absolute inset-0 rounded-full blur-xl scale-125 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Image */}
                <div className="relative z-10 w-100 h-100 overflow-hidden">
                  <img
                    src="../../assets/Home_2.png"
                    alt="Hero Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Quiz Tips Section */}
      <section className="relative w-full py-10 z-10" ref={tipsRef}>
        <div className="max-w-7xl mx-auto px-6">
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

            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent leading-tight pb-2">
          Quiz Tips & Strategies
        </h2>

            <div className="flex justify-center items-center gap-4">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-[#FFD700] rounded-full"></div>
              <Sparkles className="w-8 h-8 text-[#FFD700] animate-spin-slow" />
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-transparent rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: tipsInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative p-12 bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#FF9100]/30">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 via-transparent to-[#FFD700]/10 rounded-3xl"></div>

              <div className="relative text-center min-h-[120px] flex items-center justify-center">
                <motion.div
                  key={hoveredTip}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white leading-relaxed max-w-4xl">
                    {tips[hoveredTip]}
                  </p>
                </motion.div>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {tips.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === hoveredTip
                        ? "bg-gradient-to-r from-[#FF9100] to-[#FFD700] scale-125"
                        : "bg-white/30 hover:bg-white/50"
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

      {/* Enhanced Features Section */}
      <section className="relative py-10 px-6 z-10" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: featuresInView ? 0 : -50,
              opacity: featuresInView ? 1 : 0,
            }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-lg opacity-60"></div>
              <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent leading-tight pb-2">
              Features Highlights
            </h2>

            <div className="flex justify-center items-center gap-4">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FF9100] to-[#FFD700] rounded-full"></div>
              <Target className="w-8 h-8 text-[#FFD700] animate-spin-slow" />
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-transparent rounded-full"></div>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center items-stretch gap-12">
            {featureCards.map((feature, index) => {
              // Get the correct image name based on index
              const getImageName = (index) => {
                if (index === 0) return "../../assets/first_feature.png";
                if (index === 1) return "../../assets/second_feature.png";
                if (index === 2) return "../../assets/third_feature.png";
                return "../../assets/Home_page_pic.png";
              };

              return (
                <motion.div
                  key={feature.key}
                  className={`group relative ${
                    feature.size === "lg" ? "w-96 h-[500px]" : "w-80 h-[460px]"
                  }`}
                  initial={{ opacity: 0, y: feature.size === "lg" ? 50 : 70 }}
                  animate={{
                    opacity: featuresInView ? 1 : 0,
                    y: featuresInView ? 0 : 50,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: feature.delay,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 1.02 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.glowColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`relative h-full bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg rounded-3xl shadow-2xl border ${feature.borderColor} transition-all duration-500 flex flex-col overflow-hidden`}
                  >
                    <div className="w-full">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${feature.glowColor} blur-md opacity-60`}
                        ></div>
                        <img
                          src={getImageName(index)}
                          alt={feature.title}
                          className="w-full object-cover relative z-10"
                          style={{
                            height: feature.size === "lg" ? "240px" : "200px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center text-center p-8">
                      <h3
                        className={`font-bold ${
                          feature.size === "lg"
                            ? "text-4xl mb-6"
                            : "text-3xl mb-4"
                        } bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent`}
                      >
                        {feature.title}
                      </h3>

                      <div className="w-16 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full mb-6"></div>

                      <p
                        className={`text-gray-300 leading-relaxed ${
                          feature.size === "lg" ? "text-xl" : "text-lg"
                        } font-light`}
                      >
                        {feature.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/5 via-transparent to-[#FFD700]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-6 z-10" ref={testimonialsRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: testimonialsInView ? 1 : 0,
              y: testimonialsInView ? 0 : 50,
            }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-lg opacity-60"></div>
              <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent leading-tight pb-2">
              What Our Users Say
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied learners who've improved their
              knowledge with Quiz Master
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: testimonialsInView ? 1 : 0,
              y: testimonialsInView ? 0 : 50,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative p-8 bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#FF9100]/30">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/5 via-transparent to-[#FFD700]/5 rounded-3xl"></div>

              <motion.div
                key={currentTestimonial}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* User Avatar */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#32CD32] to-[#228B22] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-[#FFD700] fill-current"
                      />
                    )
                  )}
                </div>

                {/* Testimonial Text */}
                <p className="text-2xl text-white font-medium mb-6 leading-relaxed max-w-3xl mx-auto">
                  "{testimonials[currentTestimonial].text}"
                </p>

                {/* User Info */}
                <div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-400">
                    {testimonials[currentTestimonial].subject}
                  </p>
                </div>
              </motion.div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-gradient-to-r from-[#FF9100] to-[#FFD700] scale-125"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="flex justify-center items-center gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: testimonialsInView ? 1 : 0,
              y: testimonialsInView ? 0 : 30,
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 text-gray-300">
              <ThumbsUp className="w-5 h-5 text-[#32CD32]" />
              <span className="text-sm">4.5/5 Rating</span>
            </div>
            <div className="w-1 h-8 bg-gradient-to-b from-[#FF9100] to-[#FFD700] rounded-full"></div>
            <div className="flex items-center gap-2 text-gray-300">
              <MessageCircle className="w-5 h-5 text-[#FF9100]" />
              <span className="text-sm">1000+ Reviews</span>
            </div>
            <div className="w-1 h-8 bg-gradient-to-b from-[#FF9100] to-[#FFD700] rounded-full"></div>
            <div className="flex items-center gap-2 text-gray-300">
              <Share2 className="w-5 h-5 text-[#FFD700]" />
              <span className="text-sm">50K+ Shares</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer isLoggedIn={isLoggedIn}/>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
