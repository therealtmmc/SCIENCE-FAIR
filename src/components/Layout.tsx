import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Info, Users, Gamepad2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";
import { CustomFireExtinguisher } from "./icons";

export function Layout() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const navItems = [
    { path: "/", label: "Home", icon: CustomFireExtinguisher },
    { path: "/about", label: "About", icon: Info },
    { path: "/researchers", label: "Team", icon: Users },
    { path: "/games", label: "Games", icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white font-sans selection:bg-[#FF6D00] selection:text-white overflow-x-hidden relative">
      
      {/* Unique Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FF6D00]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#D32F2F]/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Top Header Bar - Orange */}
      <header className="bg-[#FF6D00] border-b border-orange-600 sticky top-0 z-50 shadow-2xl">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
          style={{ scaleX }}
        />
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="bg-white p-3 rounded-xl shadow-inner group-hover:scale-105 transition-transform">
              <CustomFireExtinguisher className="w-8 h-8 text-[#FF6D00]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-3xl tracking-tight uppercase leading-none text-white drop-shadow-md">
                APULA
              </span>
              <span className="text-[10px] font-bold tracking-widest text-orange-100 uppercase mt-1">
                Prevention Unit // System
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all",
                    isActive
                      ? "bg-white text-[#FF6D00] shadow-lg scale-105"
                      : "bg-orange-600/50 text-orange-100 hover:bg-white/20 hover:text-white border border-white/10"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Info */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold tracking-widest text-orange-200 uppercase">Local Time</span>
              <div className="font-black text-2xl tracking-tight text-white drop-shadow-md">
                {formatTime(time)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 p-4 sm:p-6 max-w-[1600px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* See-through Footer */}
      <footer className="relative z-10 w-full bg-[#111111]/80 backdrop-blur-xl border-t border-white/5 py-8 mt-auto shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-6 text-gray-400 text-sm font-medium uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF6D00]/20 p-2 rounded-lg border border-[#FF6D00]/30">
              <CustomFireExtinguisher className="w-5 h-5 text-[#FF6D00]" />
            </div>
            <span className="text-white font-bold tracking-widest drop-shadow-md">Project APULA &copy; 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
