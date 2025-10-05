import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PrimScreen = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/loginScreen");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(-30deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
      <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_60%)]"></div>
      
      
      <motion.div
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-8"
      >
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-52 h-52 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
        />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-6xl font-extrabold text-center mb-10 tracking-wide text-gray-800 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      >
        Welcome to <span className="text-[#800000]">EVENZA</span>
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-col items-center"
      >
        <p className="text-center text-gray-700 text-xl font-medium mb-5 max-w-2xl">
          Book, manage, and explore events seamlessly with just a few clicks
        </p>
        <Button 
          onClick={handleButtonClick} 
          className="px-10 py-6 text-lg bg-transparent backdrop-blur-sm border-2 border-[#800000] text-black hover:bg-[#800000]/15 hover:scale-105 hover:shadow-[0_0_20px_rgba(21,128,61,0.3)] transition-all duration-300"
        >
          Let's Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default PrimScreen;
