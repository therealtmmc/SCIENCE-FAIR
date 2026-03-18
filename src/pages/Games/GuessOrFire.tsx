import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Flame, Home, AlertCircle, RotateCcw, Lightbulb } from "lucide-react";
import { Button } from "@/src/components/Button";
import confetti from "canvas-confetti";

const WORDS = [
  { word: "EXTINGUISHER", hint: "A portable device used to put out small fires." },
  { word: "ALARM", hint: "A loud noise that warns people of danger." },
  { word: "SMOKE", hint: "The visible vapor and gases given off by a burning substance." },
  { word: "FLAME", hint: "The glowing, gaseous part of a fire." },
  { word: "OXYGEN", hint: "A gas that fire needs to burn." },
  { word: "HEAT", hint: "One of the three elements needed for a fire to start." },
  { word: "FUEL", hint: "Material that is burned to produce heat or power." },
  { word: "EVACUATE", hint: "To leave a place of danger for a safer place." },
  { word: "SAFETY", hint: "The condition of being protected from or unlikely to cause danger, risk, or injury." },
  { word: "HAZARD", hint: "A potential source of danger." },
  { word: "PREVENTION", hint: "The action of stopping something from happening or arising." },
  { word: "DETECTOR", hint: "A device that senses the presence of something, like smoke." },
];

export function GuessOrFire() {
  const [currentWordObj, setCurrentWordObj] = useState(WORDS[0]);
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWordObj = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWordObj(randomWordObj);
    setWord(randomWordObj.word);
    setHint(randomWordObj.hint);
    setGuessedLetters(new Set());
    setLives(3);
    setGameOver(false);
    setWin(false);
    setShowHint(false);
  };

  const guessLetter = (letter: string) => {
    if (gameOver || win || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!word.includes(letter)) {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setGameOver(true);
      }
    } else {
      const isWin = word.split("").every((char) => newGuessed.has(char));
      if (isWin) {
        setWin(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00C853", "#FFB300", "#FF6D00"],
        });
      }
    }
  };

  const renderWord = () => {
    return word.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block w-10 h-12 sm:w-14 sm:h-16 border-b-4 border-white/30 text-3xl sm:text-5xl font-black text-center mx-1 sm:mx-2 uppercase tracking-wider text-white"
      >
        {guessedLetters.has(char) || gameOver ? char : ""}
      </span>
    ));
  };

  const renderKeyboard = () => {
    const rows = [
      "QWERTYUIOP",
      "ASDFGHJKL",
      "ZXCVBNM",
    ];

    return (
      <div className="flex flex-col items-center gap-2 mt-8">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-1 sm:gap-2">
            {row.split("").map((letter) => {
              const isGuessed = guessedLetters.has(letter);
              const isCorrect = isGuessed && word.includes(letter);
              const isWrong = isGuessed && !word.includes(letter);

              let btnClass = "bg-[#2A2A2A] text-white border border-white/10 hover:bg-[#3A3A3A] hover:border-white/30";
              if (isCorrect) btnClass = "bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/50 opacity-50 cursor-not-allowed";
              if (isWrong) btnClass = "bg-[#D32F2F]/20 text-[#D32F2F] border border-[#D32F2F]/50 opacity-50 cursor-not-allowed";

              return (
                <button
                  key={letter}
                  onClick={() => guessLetter(letter)}
                  disabled={isGuessed || gameOver || win}
                  className={`w-8 h-10 sm:w-12 sm:h-14 rounded-lg font-black text-lg sm:text-2xl transition-all active:scale-95 ${btnClass}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const getHouseState = () => {
    if (lives === 3) return "text-white/20";
    if (lives === 2) return "text-[#FFB300]";
    if (lives === 1) return "text-[#FF6D00]";
    return "text-[#D32F2F]";
  };

  return (
    <div className="flex flex-col items-center p-6 bg-[#1A1A1A] rounded-3xl min-h-[600px] relative border border-white/10 shadow-2xl overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6D00]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D32F2F]/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex justify-between w-full max-w-2xl mb-8 relative z-10">
        <div className="flex items-center gap-2 bg-[#2A2A2A] px-4 py-2 rounded-xl shadow-inner border border-white/10">
          <AlertCircle className="w-6 h-6 text-[#D32F2F]" />
          <span className="font-black text-xl text-white uppercase tracking-wider">Lives: {lives}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowHint(true)} disabled={showHint || gameOver || win} className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Hint
          </Button>
          <Button variant="secondary" size="sm" onClick={startNewGame} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
        </div>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-[#FFB300]/20 border border-[#FFB300]/50 text-[#FFB300] px-6 py-3 rounded-xl font-medium text-center max-w-lg shadow-[0_0_15px_rgba(255,179,0,0.2)] relative z-10 backdrop-blur-sm"
        >
          <span className="font-black uppercase mr-2 text-white tracking-wider">Hint:</span>
          {hint}
        </motion.div>
      )}

      <div className="relative mb-12 z-10">
        <Home className={`w-32 h-32 sm:w-48 sm:h-48 transition-colors duration-500 ${getHouseState()}`} />
        {lives < 3 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4"
          >
            <Flame className="w-16 h-16 text-[#FF6D00] animate-pulse drop-shadow-[0_0_15px_rgba(255,109,0,0.8)]" fill="currentColor" />
          </motion.div>
        )}
        {lives < 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-1/4 left-0 -translate-x-4"
          >
            <Flame className="w-12 h-12 text-[#D32F2F] animate-pulse drop-shadow-[0_0_15px_rgba(211,47,47,0.8)]" fill="currentColor" />
          </motion.div>
        )}
        {lives === 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-0 right-0 translate-x-4 -translate-y-4"
          >
            <Flame className="w-24 h-24 text-[#B71C1C] animate-pulse drop-shadow-[0_0_20px_rgba(183,28,28,0.8)]" fill="currentColor" />
          </motion.div>
        )}
      </div>

      <div className="mb-8 flex justify-center flex-wrap gap-y-4 relative z-10">
        {renderWord()}
      </div>

      <div className="relative z-10">
        {renderKeyboard()}
      </div>

      {(gameOver || win) && (
        <div className="absolute inset-0 bg-black/80 rounded-3xl flex flex-col items-center justify-center z-20 backdrop-blur-md">
          <h2 className={`text-6xl font-black mb-4 uppercase tracking-wider drop-shadow-lg ${win ? 'text-[#00C853]' : 'text-[#D32F2F]'}`}>
            {win ? "You Saved It!" : "Game Over!"}
          </h2>
          <p className="text-2xl text-gray-300 font-medium mb-8">
            The word was: <span className="text-[#FFB300] font-black uppercase tracking-wider">{word}</span>
          </p>
          <Button variant="primary" size="lg" onClick={startNewGame} className="flex items-center gap-2 shadow-[0_0_20px_rgba(255,109,0,0.4)]">
            <RotateCcw className="w-6 h-6" /> Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
