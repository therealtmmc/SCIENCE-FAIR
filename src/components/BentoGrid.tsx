import { motion } from "motion/react";
import { Pen, Flame, Eye } from "lucide-react";

export function BentoGrid() {
  const steps = [
    {
      title: "Write",
      description: "Compose your anonymous note.",
      icon: Pen,
      color: "text-blue-400",
    },
    {
      title: "Burn & Share",
      description: "Set it ablaze and share the link.",
      icon: Flame,
      color: "text-orange-500",
    },
    {
      title: "Reveal",
      description: "Watch the fire reveal the message.",
      icon: Eye,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center gap-4 hover:border-[#FF6D00]/50 transition-all"
        >
          <div className="bg-[#2A2A2A] p-4 rounded-2xl shadow-inner">
            <step.icon className={`w-10 h-10 ${step.color}`} />
          </div>
          <h3 className="font-black text-2xl text-white uppercase tracking-wider">{step.title}</h3>
          <p className="text-gray-400 text-sm font-medium tracking-wide">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
