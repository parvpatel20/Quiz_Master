import React from "react";
import { Link } from "react-router-dom";

const Footer = ({isLoggedIn}) => (

  <footer className="bg-[#0A0F1C]/90 text-white-300 py-12 px-20">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Description Section */}
        <div className="md:col-span-1">
          <div className="flex items-center mb-4">
            <img 
              src="../../assets/logo.png" 
              alt="QuizMaster Logo" 
              className="h-8 w-8 mr-3"
            />
            <span className="text-xl font-bold text-white">QUIZ MASTER</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            The Ultimate Platform To Master Your Knowledge Through Interactive Quizzes.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="md:col-span-1">
          <h3 className="text-white font-semibold mb-4 text-center">Quick Links</h3>
          <ul className="space-y-2 text-center">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to={isLoggedIn === true ? "/quiz-search" : "/quiz-search-before-signup"}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Quizzes
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Get In Touch Section */}
        <div className="md:col-span-1">
          <h3 className="text-white font-semibold mb-4">GET IN TOUCH</h3>
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 mr-2 text-gray-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <a 
              href="mailto:support@quizmaster.com" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              support@quizmaster.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Border and Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6">
        <div className="text-center text-gray-400 text-sm">
          Copyright © 2025 QuizMaster. All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>
);


export default Footer;
