// src/hooks/useFileUpload.js
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { useFiles } from '../context/FileContext';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { setUploadProgress } = useFiles();

  const uploadFile = async (file) => {
    if (!file) return null;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const storageRef = ref(storage, `files/${file.name}`);
    
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setIsUploading(false);
          setUploadProgress(0);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setIsUploading(false);
            setUploadProgress(0);
            resolve({ url: downloadURL, name: file.name });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  return { uploadFile, isUploading };
};