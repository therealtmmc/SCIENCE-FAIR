import { motion } from "motion/react";
import { ShieldAlert, Home, HeartHandshake, Microscope, Target } from "lucide-react";

export function Significance() {
  const points = [
    {
      title: "Enhanced Safety for Firefighters and Responders",
      description: "The ability of high pressure water jets reduces the need for firefighters, and reduces the risk of burning objects, smoke inhalation from the fire, and injury, ensuring the protection of responders.",
      icon: ShieldAlert,
      color: "text-[#FF6D00]",
      bg: "bg-[#2A2A2A]",
      border: "border-[#FF6D00]/30",
      iconBg: "bg-[#FF6D00]/10",
    },
    {
      title: "Protection in the Community",
      description: "The jet water cannon suppressor helps put out fires faster and prevents them from spreading to nearby homes, businesses, and public areas.",
      icon: Home,
      color: "text-[#00C853]",
      bg: "bg-[#2A2A2A]",
      border: "border-[#00C853]/30",
      iconBg: "bg-[#00C853]/10",
    },
    {
      title: "Increased Public Confidence and Preparedness",
      description: "Having advanced technology like jet water cannon suppressors in fire suppression increases the preparedness of people in the community for quick emergencies and makes citizens safer because they know they will be protected from fire.",
      icon: HeartHandshake,
      color: "text-[#1976D2]",
      bg: "bg-[#2A2A2A]",
      border: "border-[#1976D2]/30",
      iconBg: "bg-[#1976D2]/10",
    },
    {
      title: "Future Researchers",
      description: "This study can serve for the future researcher who wants to create, or develop improved fire suppression prototypes, this may help evaluate which technologies are more effective in specific environments.",
      icon: Microscope,
      color: "text-[#9C27B0]",
      bg: "bg-[#2A2A2A]",
      border: "border-[#9C27B0]/30",
      iconBg: "bg-[#9C27B0]/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-block bg-[#D32F2F] p-6 rounded-full mb-6 shadow-[0_0_30px_rgba(211,47,47,0.4)]">
          <Target className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-md">
          Significance of the Study
        </h2>
        
        <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C] p-8 rounded-3xl border border-white/10 shadow-2xl text-left mb-12">
          <p className="text-gray-300 text-lg font-medium leading-relaxed">
            This study entitled <span className="text-white font-bold">“Project A.P.U.L.A: An Automated Prevention Unit for Lethal Ablaze for Real-Time Detection System in Jet Cannon Water Suppression Using Hybrid Arduino Uno and IOT Device”</span> is a project that would be beneficial for the following people below. The importance of this study and the jet water cannon suppressor is its capacity to offer a more efficient and economical fire control, particularly in expansive areas or hazardous industrial settings.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {points.map((point, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 10 }}
            className={`${point.bg} border ${point.border} rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-6 shadow-lg relative overflow-hidden group`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${point.iconBg} rounded-bl-full -z-0 transition-transform group-hover:scale-110 opacity-50`} />
            
            <div className={`${point.color} p-4 ${point.iconBg} rounded-xl shadow-inner border ${point.border} shrink-0 relative z-10`}>
              <point.icon className="w-10 h-10" />
            </div>
            <div className="relative z-10">
              <h3 className={`text-2xl font-black text-white mb-2 uppercase tracking-wider`}>
                {point.title}
              </h3>
              <p className="text-gray-400 text-lg font-medium text-justify">
                {point.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
