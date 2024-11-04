// src/components/FilePreview.jsx
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export const FilePreview = ({ file, onClose }) => {
  const isImage = file.type?.startsWith('image/');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {file.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX size={24} />
          </button>
        </div>
        
        {isImage ? (
          <img
            src={file.url}
            alt={file.name}
            className="w-full h-auto max-h-[60vh] object-contain rounded"
          />
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-500 dark:text-gray-400">
              Preview not available for this file type
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};