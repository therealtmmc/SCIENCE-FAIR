import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Compass, Download } from "lucide-react";
import { Button } from "@/src/components/Button";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import { FireParticles } from "@/src/components/FireParticles";

export function SharedNote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      try {
        setNote(decodeURIComponent(id));
      } catch (e) {
        setNote("Invalid note format.");
      }
      
      // Trigger reveal animation and confetti
      setTimeout(() => setIsRevealed(true), 500);
      
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#D32F2F", "#FFB300", "#FF6D00"]
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#D32F2F", "#FFB300", "#FF6D00"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [id]);

  const handleSavePhoto = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#1A1A1A",
        scale: 2,
      });
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "apula-shared-note.png";
      link.href = url;
      link.click();
    } catch (error) {
      console.error("Failed to save image", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF6D00] rounded-full mix-blend-screen blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D32F2F] rounded-full mix-blend-screen blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      <AnimatePresence>
        {isRevealed && <FireParticles />}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: "brightness(2) blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "brightness(1) blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-lg flex flex-col gap-4"
      >
        {/* The Card itself - designed to be screenshotted */}
        <div ref={cardRef} className="bg-gradient-to-b from-[#2A2A2A] to-[#1C1C1C] rounded-3xl shadow-[0_0_50px_rgba(255,109,0,0.3)] overflow-hidden border border-[#FF6D00]/40 relative">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#D32F2F] via-[#FF6D00] to-[#FFB300] p-6 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
            <Flame className="w-16 h-16 mx-auto mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
            <h1 className="text-4xl font-black tracking-widest uppercase drop-shadow-md relative z-10">
              Flaming Note!
            </h1>
          </div>
          
          {/* Card Body */}
          <div className="p-8 sm:p-12 text-center relative min-h-[250px] flex items-center justify-center">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-[#FF6D00]/5 blur-2xl pointer-events-none"></div>
            <p className="text-2xl sm:text-3xl font-bold text-white leading-relaxed italic drop-shadow-md relative z-10">
              "{note}"
            </p>
          </div>
          
          {/* Card Footer */}
          <div className="bg-[#1A1A1A] p-6 text-center border-t border-white/10 relative">
            <p className="text-gray-400 font-medium text-sm tracking-wider uppercase">
              This anonymous note was shared via Project APULA.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSavePhoto}
            className="flex-1 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,109,0,0.3)]"
          >
            <Download className="w-6 h-6" /> Save Photo
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 border border-white/10"
          >
            <Compass className="w-6 h-6" /> Explore APULA
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
