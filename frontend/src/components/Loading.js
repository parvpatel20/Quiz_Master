import React from 'react';

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-transparent flex flex-col items-center justify-center space-y-6 max-w-sm mx-auto">
          {/* Smooth spinning circle */}
          <div className="w-20 h-20 border-12 border-t-8 border-gray-200 border-t-blue-700 rounded-full animate-spin-smooth"></div>
          {/* Smooth transition on text */}
          <p className="text-4xl text-white font-extrabold transition-opacity duration-500 opacity-100">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
