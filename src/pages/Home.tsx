import { motion } from "motion/react";
import { Info, Users, Gamepad2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomFireExtinguisher } from "../components/icons";
import { BentoGrid } from "../components/BentoGrid";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto px-4 py-12 relative">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1C1C1C]/80 backdrop-blur-md rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl text-center w-full mb-8 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
          <CustomFireExtinguisher className="w-96 h-96 text-[#FF6D00]" />
        </div>
        <div className="absolute left-0 top-0 w-2 h-full bg-[#FF6D00]"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#2A2A2A] px-4 py-2 rounded-full mb-8 border border-white/10 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse shadow-[0_0_10px_#00C853]"></div>
            <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">System Online & Ready</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none drop-shadow-lg">
            Project <span className="text-[#FF6D00]">APULA</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-gray-300 font-bold uppercase tracking-widest max-w-3xl mx-auto leading-relaxed">
            Automated Prevention Unit for Lethal Ablaze
          </p>
        </div>
      </motion.div>

      {/* How it Works */}
      <BentoGrid />

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        {/* Games Card (Moved to first) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link 
            to="/games" 
            className="bg-[#FF6D00] rounded-3xl p-8 shadow-[0_10px_30px_rgba(255,109,0,0.3)] flex flex-col items-center justify-center gap-6 hover:bg-[#E65100] transition-all group h-full relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <div className="bg-white/20 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
            <div className="text-center">
              <h2 className="font-black text-3xl text-white uppercase tracking-wider mb-2 drop-shadow-md">Games</h2>
              <div className="text-[10px] font-bold text-orange-100 tracking-widest uppercase">Training Modules</div>
            </div>
          </Link>
        </motion.div>

        {/* Researchers Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/researchers" 
            className="bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center gap-6 hover:border-[#FF6D00] hover:bg-[#2A2A2A] transition-all group h-full relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="w-6 h-6 text-[#FF6D00]" />
            </div>
            <div className="bg-[#2A2A2A] p-4 rounded-2xl group-hover:bg-[#FF6D00]/20 transition-colors shadow-inner">
              <Users className="w-12 h-12 text-gray-300 group-hover:text-[#FF6D00] transition-colors" />
            </div>
            <div className="text-center">
              <h2 className="font-black text-3xl text-white uppercase tracking-wider mb-2">Team</h2>
              <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Project Researchers</div>
            </div>
          </Link>
        </motion.div>

        {/* About Card (Moved to last) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/about" 
            className="bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center gap-6 hover:border-[#FF6D00] hover:bg-[#2A2A2A] transition-all group h-full relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="w-6 h-6 text-[#FF6D00]" />
            </div>
            <div className="bg-[#2A2A2A] p-4 rounded-2xl group-hover:bg-[#FF6D00]/20 transition-colors shadow-inner">
              <Info className="w-12 h-12 text-gray-300 group-hover:text-[#FF6D00] transition-colors" />
            </div>
            <div className="text-center">
              <h2 className="font-black text-3xl text-white uppercase tracking-wider mb-2">About</h2>
              <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">System Specs & Info</div>
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
