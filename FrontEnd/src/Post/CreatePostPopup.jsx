import React, { useState, useEffect } from 'react';
import { FaPlus, FaExchangeAlt, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export function CreatePostPopup({ onCreatePost, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const togglePopup = () => setIsOpen(!isOpen);

  useEffect(() => {
    const controlPopup = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) { // if scroll down hide the popup
          setIsVisible(false);
        } else { // if scroll up show the popup
          setIsVisible(true);
        }
        // Remember last scroll position
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlPopup);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlPopup);
      };
    }
  }, [lastScrollY]);

  return (
    <AnimatePresence >
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-4 flex flex-col items-end space-y-4"
              >
                <motion.button
                  variants={itemVariants}
                  onClick={() => {
                    onCreatePost();
                    togglePopup();
                  }}
                  className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-full p-3 shadow-lg hover:from-blue-600 hover:to-blue-900 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPencilAlt className="mr-2" />
                  <span>Create Post</span>
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={() => {
                    onChange();
                    togglePopup();
                  }}
                  className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-800 text-white rounded-full p-3 shadow-lg hover:from-green-600 hover:to-green-900 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExchangeAlt className="mr-2" />
                  <span>Change</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={togglePopup}
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
              isOpen ? ' items-end bg-gradient-to-r from-red-600 to-red-400 hover:from-red-600 hover:to-red-800' : 'bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800'
            } text-white transition-colors duration-300`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
              {isOpen ? <FaTimes size={20} /> : <FaPlus size={20} />}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}