import { motion } from "motion/react";
import { Cpu, Flame, Zap, Droplets, Monitor, Cable } from "lucide-react";

export function Components() {
  const components = [
    {
      title: "IR Flame Sensors",
      description: "Detects the specific fire radiation that emits flame up to 60 Degrees with a distance of 1-3 meters.",
      icon: Flame,
      color: "text-[#FF6D00]",
      bg: "bg-[#FF6D00]/10",
      border: "border-[#FF6D00]/30"
    },
    {
      title: "Relay Module",
      description: "It serves as an automated electrical switch, allowing power signals (like Arduino) to control high-powered devices.",
      icon: Zap,
      color: "text-[#FFB300]",
      bg: "bg-[#FFB300]/10",
      border: "border-[#FFB300]/30"
    },
    {
      title: "Pressure Water Pump",
      description: "Transports the water from the water storage into the hose and fixed nozzle.",
      icon: Droplets,
      color: "text-[#00C853]",
      bg: "bg-[#00C853]/10",
      border: "border-[#00C853]/30"
    },
    {
      title: "Barrel Jack (LCD)",
      description: "It features 16 characters by 2 lines and has an adjustable backlight to display text.",
      icon: Monitor,
      color: "text-[#1976D2]",
      bg: "bg-[#1976D2]/10",
      border: "border-[#1976D2]/30"
    },
    {
      title: "Thick Wires",
      description: "A long compact wire that is being used to hold a high unit of current flowing to the other components.",
      icon: Cable,
      color: "text-[#9C27B0]",
      bg: "bg-[#9C27B0]/10",
      border: "border-[#9C27B0]/30"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto flex flex-col gap-8"
    >
      {/* Arduino Section */}
      <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
          <Cpu className="w-64 h-64 text-white" />
        </div>
        
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="bg-[#FF6D00] p-4 rounded-2xl shadow-[0_0_20px_rgba(255,109,0,0.4)]">
            <Cpu className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-wider drop-shadow-md">
              Arduino Uno
            </h2>
            <p className="text-[#FF6D00] font-bold tracking-widest uppercase text-sm">
              The Principal Controller
            </p>
          </div>
        </div>
        
        <p className="text-gray-300 font-medium leading-relaxed relative z-10 text-lg">
          The principal component of controlling all the sensors, data, and decisions of the A.P.U.L.A. system is by utilizing an Arduino. It is one of the most popular programming systems for making electronics and home systems (Create&Learn, 2023). The Arduino is a cost-effective and simple open-source microcontroller board that may be used in an extensive range of electronic applications.
        </p>
      </div>

      {/* Connected Components */}
      <div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
          <span className="w-2 h-8 bg-[#FF6D00] rounded-full"></span>
          Components Connected to Arduino Uno
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((comp, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`bg-[#2A2A2A] p-6 rounded-2xl border ${comp.border} shadow-lg flex flex-col h-full relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${comp.bg} rounded-bl-full -z-0 transition-transform group-hover:scale-110`} />
              
              <div className="relative z-10 flex-1">
                <div className={`inline-flex p-3 rounded-xl ${comp.bg} ${comp.color} mb-4 border ${comp.border}`}>
                  <comp.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-white uppercase tracking-wider mb-3">
                  {comp.title}
                </h4>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">
                  {comp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
