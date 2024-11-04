import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storage, auth } from "../config/firebase";
import { ref, listAll, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
import { FiUpload, FiDownload, FiTrash2, FiLogOut, FiSearch, FiFile, FiImage, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useFileUpload } from "../hooks/useFileUpload";
import { UploadModal } from "../components/UploadModal";
import { FilePreview } from "../components/FilePreview";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { uploadFile, isUploading } = useFileUpload();
  const navigate = useNavigate();

  const fetchFiles = async () => {
    try {
      const storageRef = ref(storage, 'files');
      const filesList = await listAll(storageRef);
      
      const filesData = await Promise.all(
        filesList.items.map(async (item) => {
          try {
            const url = await getDownloadURL(item);
            const metadata = await getMetadata(item);
            
            return {
              name: item.name,
              url,
              size: formatFileSize(metadata.size),
              type: metadata.contentType,
              uploadDate: new Date(metadata.timeCreated).toLocaleDateString(),
            };
          } catch (error) {
            console.error(`Error fetching file ${item.name}:`, error);
            return null;
          }
        })
      );

      // Filter out any null values from failed fetches
      setFiles(filesData.filter(file => file !== null));
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to fetch files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setShowUploadModal(true);
    try {
      await uploadFile(file);
      await fetchFiles();
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setShowUploadModal(false);
    }
  };

  const handleDelete = async (fileName) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const fileRef = ref(storage, `files/${fileName}`);
      await deleteObject(fileRef);
      await fetchFiles();
      toast.success("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file");
    }
  };


  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <AnimatePresence>
        {showUploadModal && (
          <UploadModal 
            isOpen={showUploadModal} 
            onClose={() => setShowUploadModal(false)} 
          />
        )}
        
        {showPreview && selectedFile && (
          <FilePreview 
            file={selectedFile} 
            onClose={() => {
              setShowPreview(false);
              setSelectedFile(null);
            }} 
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
              Quantum<span className="text-purple-500">Vault</span>
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:min-w-[300px]">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
              >
                <span className="hidden sm:inline mr-2">Logout</span>
                <FiLogOut className="inline-block" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
        >
          <label className="flex flex-col items-center justify-center h-40 cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
            <FiUpload className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isUploading ? "Uploading..." : "Drop files or click to upload"}
            </span>
          </label>
        </motion.div>

        {/* Files Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filteredFiles.map((file) => (
              <motion.div
                key={file.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {file.type?.startsWith('image/') ? (
                      <FiImage className="text-blue-500" size={24} />
                    ) : (
                      <FiFile className="text-gray-400" size={24} />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file.size} • {file.uploadDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {file.type?.startsWith('image/') && (
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setShowPreview(true);
                        }}
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiEye size={18} />
                      </button>
                    )}
                    <a
                      href={file.url}
                      download
                      className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiDownload size={18} />
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? "No files found matching your search." : "No files uploaded yet."}
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;