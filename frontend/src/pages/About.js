import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import {
  Sparkles,
  Users,
  Library,
  Quote,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Target,
  Trophy,
  BookOpen,
  Zap,
  Award,
  Globe,
  Heart,
  Lightbulb
} from "lucide-react";

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

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

  const SectionDivider = () => (
    <div className="flex justify-center items-center gap-6 my-20">
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FF9100] to-[#FFD700] rounded-full"></div>
      <Star className="w-8 h-8 text-[#FFD700] animate-spin-slow" />
      <div className="w-16 h-0.5 bg-gradient-to-r from-[#FFD700] via-[#FF9100] to-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#2C4A75]/30 to-[#FF9100]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      <Loading isLoading={isLoggedIn === null} />
      {isLoggedIn ? <HeaderAfterSignup /> : <Header />}

      <div className="relative max-w-7xl mx-auto p-6 z-10">
        {/* Spectacular Hero Section */}
        <section className="text-center pt-12">
          <div className="relative inline-block mb-3">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
              <Sparkles className="w-16 h-16 text-white animate-spin-slow" />
            </div>
          </div>
          
          <h1 className="text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#FF9100] via-[#FFD700] via-[#FF6B35] to-[#FF9100] bg-clip-text text-transparent animate-gradient-x">
              About Quiz Master
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            We believe learning should be an electrifying adventure. Our mission is to forge an interactive cosmos where knowledge is explored, skills are mastered, and goals are conquered.
          </p>
        
        </section>

        <SectionDivider />

        {/* Vision & Mission Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 rounded-full border border-[#FF9100]/30 backdrop-blur-lg">
              <Lightbulb className="w-8 h-8 text-[#FF9100]" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">
                Our Vision & Mission
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/20 via-[#FFD700]/10 to-[#FF6B35]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#FF9100]/30 transition-all duration-500">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-60"></div>
                    <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                    Our Vision
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed text-center">
                  "To create a global educational ecosystem where every learner can unlock their full potential through engaging, interactive, and personalized quiz experiences that make learning an adventure."
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/20 via-[#FFD700]/10 to-[#FF6B35]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#FF9100]/30 transition-all duration-500">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-60"></div>
                    <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                      <Globe className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">
                    Our Mission
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-[#FF9100] to-[#FFD700] mx-auto rounded-full"></div>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed text-center">
                  
"To give everyone access to great education by creating quiz platforms that make teaching easier and learning more exciting for students everywhere."

                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Stunning Stats Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-2xl">
              Our Impact by the Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Join thousands of learners and educators who are transforming education through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Instructors Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/20 via-[#FFD700]/10 to-[#FF6B35]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-[#FF9100]/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-60"></div>
                    <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-6xl font-black bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">300+</h3>
                    <p className="text-2xl text-[#FFD700] font-bold">Expert Instructors</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[#FFD700]" />
                    <span className="text-gray-300">Trusted by education professionals worldwide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#FF9100]" />
                    <span className="text-gray-300">Creating engaging learning experiences</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-[#FFD700]" />
                    <span className="text-gray-300">Guiding students to academic success</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quizzes Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/20 via-[#FFD700]/10 to-[#FF6B35]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-[#FF9100]/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl blur-md opacity-60"></div>
                    <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-2xl">
                      <Library className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-6xl font-black bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">300+</h3>
                    <p className="text-2xl text-[#FFD700] font-bold">Interactive Quizzes</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#FF9100]" />
                    <span className="text-gray-300">Covering diverse academic subjects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#FFD700]" />
                    <span className="text-gray-300">Multiple engaging question formats</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-[#FF9100]" />
                    <span className="text-gray-300">Adaptive difficulty levels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <SectionDivider />

        {/* Stunning Contact Section */}
        <section className="mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/20 via-[#FFD700]/10 to-[#FF6B35]/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-gradient-to-br from-[#0F1A36]/95 via-[#1a2845]/90 to-[#0A1C36]/95 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-[#FF9100]/30">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full blur-2xl opacity-60"></div>
                  <div className="relative p-4 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-full">
                    <Mail className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent">
                  Connect With Our Universe
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                  Ready to embark on your learning adventure? We're here to help you every step of the way
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Location Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-8 bg-gradient-to-br from-[#1a2845]/60 to-[#2d3f5f]/40 rounded-2xl border border-[#FF9100]/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl blur-sm opacity-60"></div>
                        <div className="relative p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">
                        Our Headquarters
                      </h3>
                    </div>
                    
                    <p className="text-lg text-gray-300 font-light leading-relaxed mb-6">
                      DAIICT-campus, near Reliance Cross Rd, Gandhinagar, Gujarat 382007
                    </p>
                    
                    <a
                      href="https://www.google.com/maps/place/DA-IICT/@23.1889152,72.6278185,17z/data=!4m6!3m5!1s0x395c2a3c9618d2c5:0xc54de484f986b1fa!8m2!3d23.188537!4d72.6289155!16zL20vMDIzc2g3?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF9100]/20 to-[#FFD700]/20 text-[#FF9100] font-bold rounded-xl border border-[#FF9100]/30 hover:bg-gradient-to-r hover:from-[#FF9100]/30 hover:to-[#FFD700]/30 transition-all group"
                    >
                      <span>View on Map</span> 
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Contact Info Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF9100]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-8 bg-gradient-to-br from-[#1a2845]/60 to-[#2d3f5f]/40 rounded-2xl border border-[#FF9100]/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl blur-sm opacity-60"></div>
                        <div className="relative p-3 bg-gradient-to-r from-[#FF9100] to-[#FFD700] rounded-xl">
                          <Phone className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-[#FF9100] to-[#FFD700] bg-clip-text text-transparent">
                        Contact Info
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <a 
                        href="mailto:support@quizmaster.com" 
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FF9100]/10 to-transparent rounded-xl border border-[#FF9100]/20 hover:border-[#FF9100]/40 transition-all group"
                      >
                        <Mail className="w-5 h-5 text-[#FF9100]" />
                        <span className="text-lg text-gray-300 group-hover:text-white transition-colors">support@quizmaster.com</span>
                      </a>
                      
                      <a 
                        href="tel:+917990377408" 
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FF9100]/10 to-transparent rounded-xl border border-[#FF9100]/20 hover:border-[#FF9100]/40 transition-all group"
                      >
                        <Phone className="w-5 h-5 text-[#FF9100]" />
                        <span className="text-lg text-gray-300 group-hover:text-white transition-colors">(+91) 7990377408</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer isLoggedIn={isLoggedIn} />

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

export default About;
