import { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true); // Set submitting to true
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <Link to="/" className="absolute top-8 left-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-white flex items-center gap-2"
          >
            <FiArrowLeft /> Back
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-white mb-8 text-center"
            >
              Welcome to <span className="text-purple-500">QuantumVault</span>
            </motion.h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`} // Disable button styles
                type="submit"
                disabled={isSubmitting} // Disable button when submitting
              >
                {isSubmitting ? (
                  <>
                    Processing...
                    {/* Add a loading spinner icon here if desired */}
                  </>
                ) : (
                  "Login"
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
