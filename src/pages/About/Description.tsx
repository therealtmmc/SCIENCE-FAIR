import { motion } from "motion/react";
import { 
  Flame, 
  Camera, 
  Droplets, 
  Wifi, 
  Activity, 
  Triangle, 
  ShieldCheck,
  Cpu
} from "lucide-react";

export function Description() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-5xl mx-auto"
    >
      {/* Header Section */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center bg-[#FF6D00]/20 p-4 rounded-full mb-6 border border-[#FF6D00]/50 shadow-[0_0_30px_rgba(255,109,0,0.3)]">
          <Cpu className="w-12 h-12 text-[#FF6D00]" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 uppercase tracking-wider drop-shadow-md">
          Project A.P.U.L.A.
        </h2>
        <p className="text-xl text-[#FF6D00] font-bold tracking-widest uppercase mb-6">
          Automated Prevention Unit for Lethal Ablaze
        </p>
        <p className="text-lg text-gray-300 leading-relaxed font-medium max-w-3xl mx-auto">
          An <span className="text-white font-bold">Arduino Uno and IoT-based system</span> designed for fast indoor fire detection and suppression.
        </p>
      </div>

      {/* Core Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, title: "Flame Sensors", desc: "Rapid fire detection", color: "text-[#FF6D00]" },
          { icon: Camera, title: "Camera System", desc: "Live monitoring", color: "text-[#1976D2]" },
          { icon: Droplets, title: "Bicarbonate Cannon", desc: "Water-powered suppression", color: "text-[#00C853]" },
          { icon: Wifi, title: "IoT Control", desc: "Remote system management", color: "text-[#9C27B0]" }
        ].map((item, i) => (
          <div key={i} className="bg-[#2A2A2A] p-6 rounded-2xl border border-white/10 shadow-inner flex flex-col items-center text-center group hover:border-white/30 transition-colors">
            <item.icon className={`w-10 h-10 ${item.color} mb-4 drop-shadow-md group-hover:scale-110 transition-transform`} />
            <h3 className="font-black text-white uppercase tracking-wider mb-2 text-sm">{item.title}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Experimental Testing & Mechanism Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Success Rates */}
        <div className="bg-[#1C1C1C] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Activity className="w-32 h-32 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#00C853]" />
            Suppression Success Rates
          </h3>
          <p className="text-sm text-gray-400 mb-8 font-medium">Experimental testing results across different fire intensities.</p>
          
          <div className="space-y-6 relative z-10">
            {[
              { label: "Low Intensity", value: 93.3, color: "bg-[#00C853]" },
              { label: "Moderate Intensity", value: 76.9, color: "bg-[#FFB300]" },
              { label: "High Intensity", value: 75.0, color: "bg-[#D32F2F]" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold uppercase tracking-wider mb-2">
                  <span className="text-gray-300">{stat.label}</span>
                  <span className="text-white">{stat.value}%</span>
                </div>
                <div className="h-3 w-full bg-[#2A2A2A] rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, delay: 0.2 * i, ease: "easeOut" }}
                    className={`h-full ${stat.color} shadow-[0_0_10px_currentColor]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mechanism & Findings */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C] p-8 rounded-3xl border border-[#FF6D00]/30 shadow-[0_0_30px_rgba(255,109,0,0.1)] flex-1">
            <h3 className="text-xl font-black text-[#FF6D00] uppercase tracking-wider mb-4 flex items-center gap-3">
              <Triangle className="w-5 h-5" />
              Fire Tetrahedron Principle
            </h3>
            <p className="text-gray-300 font-medium leading-relaxed mb-6">
              The system works by <span className="text-white font-bold">removing heat</span> from the fire. This makes it highly effective, low-cost, and practical for reducing damage and risk.
            </p>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                <span className="block text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Improves</span>
                <span className="text-sm font-black text-white uppercase">Automation</span>
              </div>
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                <span className="block text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Enhances</span>
                <span className="text-sm font-black text-white uppercase">Accuracy</span>
              </div>
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5">
                <span className="block text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Boosts</span>
                <span className="text-sm font-black text-white uppercase">Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-[#00C853]/10 border border-[#00C853]/30 p-6 rounded-2xl flex items-start gap-4 shadow-[0_0_20px_rgba(0,200,83,0.1)]">
        <div className="bg-[#00C853] p-3 rounded-full shrink-0 shadow-[0_0_15px_rgba(0,200,83,0.4)]">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-black text-[#00C853] uppercase tracking-wider mb-1">Conclusion</h4>
          <p className="text-gray-300 font-medium leading-relaxed">
            A.P.U.L.A. is a reliable prototype for indoor fire safety and a strong model for future automated fire prevention systems.
          </p>
        </div>
      </div>

    </motion.div>
  );
}
