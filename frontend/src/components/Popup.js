import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Popup = ({
  message,
  showActionButton,
  actionButtonText,
  onClose,
  onAction,
  type = "info",
  title = null,
}) => {
  const typeStyles = {
    info: {
      bgFrom: "from-[#FF9100]/40",
      bgTo: "to-[#FFD700]/40",
      text: "text-white",
      buttonFrom: "from-[#FF9100]",
      buttonTo: "to-[#FFD700]",
      shadow: "shadow-[#FFD700]/60",
      glow: "glow-orange",
    },
    success: {
      bgFrom: "from-[#FF9100]/40",
      bgTo: "to-[#FFD700]/40",
      text: "text-white",
      buttonFrom: "from-[#FF9100]",
      buttonTo: "to-[#FFD700]",
      shadow: "shadow-[#FFD700]/60",
      glow: "glow-orange",
    },
    error: {
      bgFrom: "from-[#FF9100]/40",
      bgTo: "to-[#FFD700]/40",
      text: "text-white",
      buttonFrom: "from-[#FF9100]",
      buttonTo: "to-[#FFD700]",
      shadow: "shadow-[#FFD700]/60",
      glow: "glow-orange",
    },
    warning: {
      bgFrom: "from-[#FF9100]/40",
      bgTo: "to-[#FFD700]/40",
      text: "text-gray-800",
      buttonFrom: "from-[#FF9100]",
      buttonTo: "to-[#FFD700]",
      shadow: "shadow-[#FFD700]/60",
      glow: "glow-orange",
    },
  };

  const styles = typeStyles[type] || typeStyles.info;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const modalVariants = {
    hidden: { scale: 0.7, opacity: 0, y: -50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.17, 0.67, 0.83, 0.67] },
    },
    exit: {
      scale: 0.7,
      opacity: 0,
      y: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-2xl z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={`relative bg-white/10 rounded-3xl shadow-2xl p-8 max-w-md w-full overflow-hidden border border-white/20 ${styles.shadow} ${styles.glow}`}
        variants={modalVariants}
      >
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            className={`absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r ${styles.buttonFrom}/30 ${styles.buttonTo}/30 filter blur-2xl`}
            animate={{
              x: [0, 50, 0, -50, 0],
              y: [0, 20, 0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={`absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r ${styles.buttonTo}/30 ${styles.buttonFrom}/30 filter blur-2xl`}
            animate={{
              x: [0, -50, 0, 50, 0],
              y: [0, -20, 0, 20, 0],
              rotate: [360, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors duration-300 z-10 p-1 rounded-full bg-black/20 backdrop-blur-sm"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title (Optional) */}
        {title && (
          <h2
            className={`text-3xl font-bold text-center ${styles.text} mb-4 relative z-10`}
          >
            {title}
          </h2>
        )}

        {/* Message */}
        <p className={`text-lg font-bold text-center ${styles.text} m-5 relative z-10`}>
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 relative z-10">
          {showActionButton && (
            <button
              onClick={onAction}
              className={`px-6 py-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300 text-white font-extrabold bg-gradient-to-r ${styles.buttonFrom} ${styles.buttonTo} hover:shadow-xl`}
            >
              {actionButtonText}
            </button>
          )}

          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300 text-white font-bold bg-gradient-to-r ${styles.buttonFrom} ${styles.buttonTo} hover:shadow-xl`}
          >
            OK
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
