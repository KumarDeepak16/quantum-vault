// src/components/UploadModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useFiles } from '../context/FileContext';

export const UploadModal = ({ isOpen, onClose }) => {
  const { uploadProgress } = useFiles();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md m-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Uploading File
              </h3>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <motion.div
                className="bg-blue-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <p className="text-center text-gray-500 dark:text-gray-400">
              {uploadProgress.toFixed(0)}% Complete
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};