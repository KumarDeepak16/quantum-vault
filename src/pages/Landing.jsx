import { motion } from "framer-motion";
import { FiArrowRight, FiDatabase, FiShield, FiZap,FiGithub, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
const Landing = () => {
  const user = auth.currentUser;
  return (
    <div className="min-h-screen bg-black overflow-hidden relative pb-10 md:pb-2">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [-10, 10, -10],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [10, -10, 10],
            y: [10, -10, 10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-row justify-between items-center gap-4"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Quantum<span className="text-purple-500">Vault</span>
            </h1>
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                {/* GitHub Icon */}
                <motion.a
                  href="https://github.com/KumarDeepak16"
                  target="_blank"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-white hover:text-primary"
                >
                  <FiGithub size={24} />
                </motion.a>
                {/* LinkedIn Icon */}
                <motion.a
                  href="https://linkedin.com/in/deepakkumar1916"
                  target="_blank"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-white hover:text-primary"
                >
                  <FiLinkedin size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <main className="container mx-auto px-4 md:px-6 pt-10 md:pt-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8">
                The Personal{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  Cloud Storage
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 px-4">
                Experience quantum-grade security with next-generation cloud
                technology for university students.
              </p>
              {user ? (
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium flex items-center gap-2 mx-auto"
                  >
                    Go to Dashboard <FiArrowRight />
                  </motion.button>
                </Link>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium flex items-center gap-2 mx-auto"
                  >
                    Login <FiArrowRight />
                  </motion.button>
                </Link>
              )}
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0"
            >
              {[
                {
                  icon: <FiZap />,
                  title: "No Account Linking",
                  description:
                    "Share files across devices without connecting accounts on others' PCs.",
                },
                {
                  icon: <FiShield />,
                  title: "Own Secure Platform",
                  description:
                    "Skip third-party storage—build your own for total privacy",
                },
                {
                  icon: <FiDatabase />,
                  title: "All-in-One Storage",
                  description:
                    "Access and manage all your files from one place, anywhere.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
                >
                  <div className="text-purple-500 text-3xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
