import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingIndicator = () => {
  return (
    <motion.div 
      className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-16 h-16 text-purple-600 dark:text-purple-300" />
      </motion.div>
      <motion.div 
        className="mt-4 text-lg font-semibold text-purple-700 dark:text-purple-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Cargando...
      </motion.div>
    </motion.div>
  );
};

export default LoadingIndicator;