import { motion } from "motion/react";
import { Users, GraduationCap, Target, Lightbulb } from "lucide-react";

export function Researchers() {
  const researchers = [
    {
      name: "Zhaniel Gerenca",
      role: "Leader",
      /* Replace with actual image URL later */
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhaniel&backgroundColor=dc2626",
      contribution: "Spearheaded the research paper, methodology, and comprehensive project documentation.",
      ambition: "To become a leading robotics engineer and create life-saving technologies.",
      school: "St. Michael School of Marilao",
      color: "bg-[#D32F2F]",
      borderColor: "border-[#1A1A1A]",
    },
    {
      name: "Franc Nerielle Manapat",
      role: "Member",
      /* Replace with actual image URL later */
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Franc&backgroundColor=ea580c",
      contribution: "Led the physical product development, hardware integration, and system assembly.",
      ambition: "To innovate in the field of software engineering and artificial intelligence.",
      school: "St. Michael School of Marilao",
      color: "bg-[#FF6D00]",
      borderColor: "border-[#1A1A1A]",
    },
    {
      name: "Dwyane Agnas",
      role: "Member",
      /* Replace with actual image URL later */
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dwyane&backgroundColor=7f1d1d",
      contribution: "Co-led hardware prototyping, component integration, and product testing.",
      ambition: "To specialize in embedded systems and automation.",
      school: "St. Michael School of Marilao",
      color: "bg-[#1C1C1C]",
      borderColor: "border-[#1A1A1A]",
    },
    {
      name: "Travis Miguel Cepe",
      role: "Member",
      /* Replace with actual image URL later */
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Travis&backgroundColor=eab308",
      contribution: "Developed the core software architecture, IoT integration, and system programming.",
      ambition: "To pursue a career in mechatronics and sustainable engineering.",
      school: "St. Michael School of Marilao",
      color: "bg-[#FFB300]",
      borderColor: "border-[#1A1A1A]",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Replace the background image URL below with the actual school photo later */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6D00]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D32F2F]/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/90 to-[#1A1A1A]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#1C1C1C] p-6 rounded-full mb-6 shadow-[0_0_30px_rgba(255,109,0,0.2)] border border-white/10">
            <Users className="w-16 h-16 text-[#FF6D00]" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 uppercase tracking-wider drop-shadow-md">
            The Team
          </h1>
          <p className="text-xl text-gray-400 font-medium">
            The brilliant minds behind Project APULA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchers.map((researcher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#2A2A2A] rounded-3xl shadow-2xl overflow-hidden border border-white/10"
            >
              <div className={`${researcher.color} p-6 flex items-center justify-center relative shadow-inner border-b border-white/10`}>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold text-sm uppercase tracking-wider border border-white/20">
                  {researcher.role}
                </div>
                <img
                  src={researcher.image}
                  alt={researcher.name}
                  className={`w-32 h-32 rounded-full border-4 ${researcher.borderColor} bg-[#1A1A1A] shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                />
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-black text-white mb-6 text-center uppercase tracking-wider">
                  {researcher.name}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1C1C1C] p-3 rounded-xl shrink-0 border border-white/5 shadow-inner">
                      <Lightbulb className="w-6 h-6 text-[#FF6D00]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-300 uppercase text-sm tracking-widest mb-1">Contribution</h3>
                      <p className="text-gray-400 font-medium">{researcher.contribution}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1C1C1C] p-3 rounded-xl shrink-0 border border-white/5 shadow-inner">
                      <Target className="w-6 h-6 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-300 uppercase text-sm tracking-widest mb-1">Ambition</h3>
                      <p className="text-gray-400 font-medium">{researcher.ambition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1C1C1C] p-3 rounded-xl shrink-0 border border-white/5 shadow-inner">
                      <GraduationCap className="w-6 h-6 text-[#FFB300]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-300 uppercase text-sm tracking-widest mb-1">School</h3>
                      <p className="text-gray-400 font-medium">{researcher.school}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
