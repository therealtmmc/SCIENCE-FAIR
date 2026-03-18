import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Play, RotateCcw } from "lucide-react";
import { Button } from "@/src/components/Button";

interface Fire {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function OutFire() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [fires, setFires] = useState<Fire[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let spawner: NodeJS.Timeout;
    if (isPlaying) {
      spawner = setInterval(() => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          const newFire: Fire = {
            id: Date.now(),
            x: Math.random() * (width - 60),
            y: Math.random() * (height - 60),
            size: Math.random() * 20 + 40, // 40px to 60px
          };
          setFires((prev) => [...prev, newFire]);
        }
      }, 800); // Spawn a fire every 800ms
    }
    return () => clearInterval(spawner);
  }, [isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setFires([]);
  };

  const putOutFire = (id: number) => {
    if (!isPlaying) return;
    setFires((prev) => prev.filter((fire) => fire.id !== id));
    setScore((prev) => prev + 10);
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] text-white relative overflow-hidden p-6 rounded-3xl min-h-[600px] border border-white/10 shadow-2xl">
      <div className="flex justify-between items-center mb-6 z-10">
        <div className="bg-[#D32F2F] px-6 py-2 rounded-xl font-black text-2xl shadow-[0_0_15px_rgba(211,47,47,0.4)] border border-white/20 uppercase tracking-wider">
          Score: {score}
        </div>
        <div className="bg-[#1976D2] px-6 py-2 rounded-xl font-black text-2xl shadow-[0_0_15px_rgba(25,118,210,0.4)] border border-white/20 uppercase tracking-wider">
          Time: {timeLeft}s
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 relative border border-white/10 rounded-2xl bg-[#2A2A2A] overflow-hidden shadow-inner"
      >
        {!isPlaying && timeLeft === 30 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
            <Flame className="w-24 h-24 text-[#FF6D00] mb-6 animate-pulse drop-shadow-[0_0_20px_rgba(255,109,0,0.6)]" />
            <h2 className="text-5xl font-black mb-4 text-center uppercase tracking-wider text-white drop-shadow-md">Out Fire!</h2>
            <p className="text-xl mb-8 text-gray-400 text-center max-w-md font-medium">
              Tap the fires as fast as you can to put them out before time runs out!
            </p>
            <Button variant="primary" size="xl" onClick={startGame} className="flex items-center gap-2 shadow-[0_0_20px_rgba(255,109,0,0.4)]">
              <Play className="w-8 h-8" /> Start Game
            </Button>
          </div>
        )}

        {!isPlaying && timeLeft === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-20">
            <h2 className="text-6xl font-black mb-4 text-[#FFB300] uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,179,0,0.5)]">Time's Up!</h2>
            <p className="text-3xl mb-8 font-black text-white uppercase tracking-wider">Final Score: <span className="text-[#FF6D00]">{score}</span></p>
            <Button variant="success" size="lg" onClick={startGame} className="flex items-center gap-2 shadow-[0_0_20px_rgba(0,200,83,0.4)]">
              <RotateCcw className="w-6 h-6" /> Play Again
            </Button>
          </div>
        )}

        <AnimatePresence>
          {fires.map((fire) => (
            <motion.button
              key={fire.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute text-[#FF6D00] hover:text-[#FFB300] transition-colors drop-shadow-[0_0_15px_rgba(255,109,0,0.8)]"
              style={{
                left: fire.x,
                top: fire.y,
                width: fire.size,
                height: fire.size,
              }}
              onClick={() => putOutFire(fire.id)}
            >
              <Flame className="w-full h-full" fill="currentColor" />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
