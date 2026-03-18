import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Play, RotateCcw, Clock } from "lucide-react";
import { Button } from "@/src/components/Button";

type RuleType = "PRESS" | "DONT_PRESS" | "HOLD" | "RELEASE";

interface Rule {
  type: RuleType;
  text: string;
  duration: number; // in ms
}

const RULES: Rule[] = [
  { type: "PRESS", text: "Press the button NOW!", duration: 3000 },
  { type: "DONT_PRESS", text: "Do NOT press the button!", duration: 4000 },
  { type: "HOLD", text: "Hold the button!", duration: 5000 },
  { type: "RELEASE", text: "Release the button!", duration: 3000 },
];

export function HotButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const [currentRule, setCurrentRule] = useState<Rule | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);

  const ruleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !gameOver && !win) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setWin(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [isPlaying, gameOver, win]);

  useEffect(() => {
    if (isPlaying && !gameOver && !win && !currentRule && score === 0) {
      nextRule();
    }
  }, [isPlaying, gameOver, win, currentRule, score]);

  const handlePress = () => {
    if (!isPlaying || gameOver || win) return;
    setIsPressed(true);

    if (currentRule?.type === "DONT_PRESS") {
      failGame();
    } else if (currentRule?.type === "PRESS") {
      passRule();
    }
  };

  const handleRelease = () => {
    if (!isPlaying || gameOver || win) return;
    setIsPressed(false);

    if (currentRule?.type === "HOLD") {
      failGame();
    } else if (currentRule?.type === "RELEASE") {
      passRule();
    }
  };

  const passRule = () => {
    if (ruleTimerRef.current) clearTimeout(ruleTimerRef.current);
    setScore((s) => s + 10);
    setCurrentRule(null);
    
    // Add a delay before the next rule
    setTimeout(() => {
      if (isPlaying && !gameOver && !win) {
        nextRule();
      }
    }, 1000);
  };

  const nextRule = () => {
    const randomRule = RULES[Math.floor(Math.random() * RULES.length)];
    setCurrentRule(randomRule);

    if (ruleTimerRef.current) clearTimeout(ruleTimerRef.current);

    ruleTimerRef.current = setTimeout(() => {
      // Timer expired. Evaluate based on rule type.
      if (randomRule.type === "DONT_PRESS") {
        // Successfully didn't press
        passRule();
      } else if (randomRule.type === "HOLD") {
        // Successfully held for duration
        passRule();
      } else {
        // Failed to PRESS or RELEASE in time
        failGame();
      }
    }, randomRule.duration);
  };

  const failGame = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (ruleTimerRef.current) clearTimeout(ruleTimerRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setWin(false);
    setTimeLeft(300);
    setScore(0);
    setCurrentRule(null);
    setIsPressed(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getRuleColor = (type: RuleType) => {
    switch (type) {
      case "PRESS": return "text-[#00C853]";
      case "DONT_PRESS": return "text-[#D32F2F]";
      case "HOLD": return "text-[#1976D2]";
      case "RELEASE": return "text-[#FFB300]";
      default: return "text-white";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#1A1A1A] rounded-3xl min-h-[600px] relative overflow-hidden border border-white/10 shadow-2xl">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6D00]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D32F2F]/10 rounded-full blur-[100px]" />
      </div>

      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <div className="bg-[#2A2A2A] px-4 py-2 rounded-xl shadow-inner border border-white/10 flex items-center gap-2">
          <Clock className="w-6 h-6 text-[#1976D2]" />
          <span className="font-black text-xl text-white tracking-wider">{formatTime(timeLeft)}</span>
        </div>
        <div className="bg-[#2A2A2A] px-4 py-2 rounded-xl shadow-inner border border-white/10">
          <span className="font-black text-xl text-[#FFB300] uppercase tracking-wider">Score: {score}</span>
        </div>
      </div>

      {!isPlaying && !gameOver && !win && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-md rounded-3xl">
          <AlertTriangle className="w-24 h-24 text-[#FFB300] mb-6 animate-bounce drop-shadow-[0_0_20px_rgba(255,179,0,0.6)]" />
          <h2 className="text-5xl font-black mb-4 text-white text-center uppercase tracking-wider drop-shadow-md">Hot Button</h2>
          <p className="text-xl mb-8 text-gray-400 text-center max-w-md font-medium">
            Follow the rules exactly. Survive for 5 minutes. Don't mess up!
          </p>
          <Button variant="primary" size="xl" onClick={startGame} className="flex items-center gap-2 shadow-[0_0_20px_rgba(255,109,0,0.4)]">
            <Play className="w-8 h-8" /> Start Survival
          </Button>
        </div>
      )}

      {(gameOver || win) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 backdrop-blur-xl rounded-3xl">
          <h2 className={`text-6xl font-black mb-4 uppercase tracking-wider drop-shadow-lg ${win ? 'text-[#00C853]' : 'text-[#D32F2F]'}`}>
            {win ? "You Survived!" : "You Failed!"}
          </h2>
          <p className="text-3xl mb-8 font-black text-white uppercase tracking-wider">Final Score: <span className="text-[#FF6D00]">{score}</span></p>
          <Button variant="success" size="lg" onClick={startGame} className="flex items-center gap-2 shadow-[0_0_20px_rgba(0,200,83,0.4)]">
            <RotateCcw className="w-6 h-6" /> Try Again
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full max-w-md z-10 mt-16">
        <AnimatePresence mode="wait">
          {currentRule && (
            <motion.div
              key={currentRule.text}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-[#2A2A2A] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/20 mb-12 w-full text-center backdrop-blur-md"
            >
              <h3 className={`text-3xl sm:text-4xl font-black uppercase tracking-wider drop-shadow-md ${getRuleColor(currentRule.type)}`}>
                {currentRule.text}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9, y: 10 }}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
          disabled={!isPlaying || gameOver || win}
          className={`w-48 h-48 sm:w-64 sm:h-64 rounded-full shadow-[0_20px_0_rgb(183,28,28)] active:shadow-[0_0px_0_rgb(183,28,28)] transition-all duration-100 flex items-center justify-center border-8 border-[#B71C1C] ${
            isPressed ? 'bg-[#D32F2F] translate-y-[20px]' : 'bg-[#FF6D00]'
          }`}
        >
          <span className="font-black text-4xl sm:text-5xl text-white uppercase tracking-widest drop-shadow-md">
            {isPressed ? "HOT!" : "PUSH"}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
