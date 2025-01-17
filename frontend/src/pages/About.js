import React from "react";
import Header from "../components/Header";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import HeaderAfterSignup from "../components/HeaderAfterSignup";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const About = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(null); // Local state for login status

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/check-login-status", {
          method: "GET",
          credentials: "include", // Include cookies if using them for authentication
        });

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
  
  return (
    <div className="h-screen bg-gradient-to-br from-[#0F1A36] via-[#2C4A75] to-[#0A1C36] text-[#ffffff] font-sans scrollbar-hide">
      
      <Loading isLoading={(isLoggedIn === null)} />
      {/* console.log(isLoggedIn); */}
      {isLoggedIn ? <HeaderAfterSignup /> : <Header />}
      
      {/* Header Section */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg">
          About Quiz Master
        </h1>
        <p className="text-xl font-semibold text-[#ffffff] max-w-3xl mx-auto">
          At Quiz Master, we believe that learning should be engaging and fun.
          Our mission is to provide an interactive platform where users can
          test their knowledge, improve their skills, and achieve their goals.
        </p>
      </section>

      {/* Key Stats */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#112D4E] to-[#0F1A36]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Stat 1 */}
          <div className="text-center">
            <div className="text-[#FF9100] text-6xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="text-3xl font-bold text-[#FFD700] mb-4">300+ Instructors</h3>
            <p className="text-lg font-semibold text-[#ffffff]">
              Trusted by over 300+ instructors to help students learn and grow.
            </p>
          </div>
          {/* Stat 2 */}
          <div className="text-center">
            <div className="text-[#FF9100] text-6xl mb-4">
              <i className="fas fa-book-open"></i>
            </div>
            <h3 className="text-3xl font-bold text-[#FFD700] mb-4">Over 300 Quizzes</h3>
            <p className="text-lg font-semibold text-[#ffffff]">
              Test your knowledge with over 300 quizzes across various subjects.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <h2 className="text-5xl text-center font-extrabold mb-6 bg-gradient-to-r from-[#FF9100] via-[#FFD700] to-[#FF9100] bg-clip-text text-transparent drop-shadow-lg leading-normal">
          What Our Users Say
        </h2>
        <div className="flex justify-center gap-8">
          {/* Testimonial 1 */}
          <div className="w-1/3 bg-gradient-to-r from-[#112D4E] to-[#0F1A36] rounded-lg shadow-lg p-8 text-center">
            <p className="text-lg font-semibold text-[#ffffff] mb-4">
              "Quiz Master helped me improve my skills and gain more confidence. The quizzes are engaging, and the feedback is invaluable!"
            </p>
            <h3 className="text-2xl font-bold text-[#FFD700]">Sarah Lee</h3>
            <p className="text-[#FF9100]">Student</p>
          </div>
          {/* Testimonial 2 */}
          <div className="w-1/3 bg-gradient-to-r from-[#112D4E] to-[#0F1A36] rounded-lg shadow-lg p-8 text-center">
            <p className="text-lg font-semibold text-[#ffffff] mb-4">
              "As an instructor, I recommend Quiz Master to my students because it makes learning fun and rewarding. The analytics are great!"
            </p>
            <h3 className="text-2xl font-bold text-[#FFD700]">John Smith</h3>
            <p className="text-[#FF9100]">Instructor</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex justify-around bg-gradient-to-r from-[#112D4E] to-[#0F1A36] py-10 px-10 text-center text-white">
      {/* Address Section */}
      <div className="flex flex-col items-center max-w-xs mx-4 transition-transform duration-300">
        <FaMapMarkerAlt className="text-[#00ff00] opacity-70 text-4xl mb-3" />
        <h3 className="text-2xl font-bold mb-4">Address</h3>
        <p className="text-base text-gray-300 mb-4">
          DAIICT-campus, near Reliance Cross Rd, Gandhinagar, Gujarat 382007
        </p>
        <a
          href="https://www.google.com/maps/place/DA-IICT/@23.1889152,72.6278185,17z/data=!4m6!3m5!1s0x395c2a3c9618d2c5:0xc54de484f986b1fa!8m2!3d23.188537!4d72.6289155!16zL20vMDIzc2g3?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ff5e00] font-bold hover:text-[#ff9100] transition-colors"
        >
          View Map
        </a>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col items-center max-w-xs mx-4 transition-transform duration-300">
        <FaPhoneAlt className="text-[#00ff00] opacity-70 text-4xl mb-3" />
        <h3 className="text-2xl font-bold mb-4">Contact Info</h3>
        <p className="text-base text-gray-300 mb-2">Mobile: (+91) 7990377408</p>
        <p className="text-base text-gray-300">Email: quizmaster@gmail.com</p>
      </div>

    </section>
    </div>
  );
};

export default About;
