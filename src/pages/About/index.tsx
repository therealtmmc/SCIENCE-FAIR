import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { FileText, Cpu, HeartHandshake } from "lucide-react";

export function About() {
  const location = useLocation();

  const tabs = [
    { path: "/about", label: "Description", icon: FileText, color: "bg-[#FF6D00]" },
    { path: "/about/components", label: "Components", icon: Cpu, color: "bg-[#D32F2F]" },
    { path: "/about/significance", label: "Significance", icon: HeartHandshake, color: "bg-[#1C1C1C]" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] p-4 sm:p-8 z-10">
      {/* Unique Background for About Section */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#FF6D00]/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#00C853]/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-black text-center mb-12 text-white uppercase tracking-tighter drop-shadow-md">
          About Project <span className="text-[#FF6D00]">APULA</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all",
                  isActive
                    ? `${tab.color} text-white shadow-[0_0_20px_rgba(255,109,0,0.3)] scale-105 border border-white/20`
                    : "bg-[#1C1C1C]/80 backdrop-blur-md text-gray-400 shadow-lg hover:bg-[#2A2A2A] hover:text-white border border-white/10 hover:scale-105"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="bg-[#1C1C1C]/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 min-h-[400px] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF6D00] to-[#D32F2F]"></div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
