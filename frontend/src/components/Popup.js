import React from "react";

const Popup = ({ message, showActionButton, actionButtonText, onClose, onAction }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-xl shadow-xl p-6 max-w-md w-full">
        <p className="text-xl text-center font-semibold text-white mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          {showActionButton && (
            <button
              onClick={onAction}
              className="w-20% my-2 px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
            >
              {actionButtonText}
            </button>
          )}
          
          <button
            onClick={onClose}
            className="w-20% my-2 px-6 py-2 bg-gradient-to-r from-[#FF9100] to-[#FF5E00] text-[#ffffff] text-lg font-semibold rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
