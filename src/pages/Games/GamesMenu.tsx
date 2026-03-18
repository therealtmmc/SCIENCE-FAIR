import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Flame, HelpCircle, AlertTriangle, MessageSquare } from "lucide-react";

export function GamesMenu() {
  const games = [
    {
      title: "Out Fire",
      description: "Press fire that scatters across the screen to get points!",
      path: "/games/out-fire",
      icon: Flame,
      color: "bg-[#D32F2F]",
      borderColor: "border-[#D32F2F]",
      textColor: "text-[#D32F2F]",
    },
    {
      title: "Guess or Fire",
      description: "Hangman style! Guess fire-related words. 3 lives. The house burns more with wrong guesses.",
      path: "/games/guess-or-fire",
      icon: HelpCircle,
      color: "bg-[#1976D2]",
      borderColor: "border-[#1976D2]",
      textColor: "text-[#1976D2]",
    },
    {
      title: "Hot Button",
      description: "Button game! Follow the rules and survive for 5 minutes.",
      path: "/games/hot-button",
      icon: AlertTriangle,
      color: "bg-[#FFB300]",
      borderColor: "border-[#FFB300]",
      textColor: "text-[#FFB300]",
    },
    {
      title: "Flaming Notes",
      description: "Leave anonymous notes, generate a QR code, and share with friends!",
      path: "/games/flaming-notes",
      icon: MessageSquare,
      color: "bg-[#388E3C]",
      borderColor: "border-[#388E3C]",
      textColor: "text-[#388E3C]",
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-wider drop-shadow-md">
          Choose Your Game
        </h2>
        <p className="text-xl text-gray-400 font-medium">
          Learn about fire safety while having fun!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game, index) => (
          <Link
            key={index}
            to={game.path}
            className={`group relative bg-[#2A2A2A] rounded-3xl p-8 shadow-2xl border border-white/10 hover:border-white/30 transition-all flex flex-col items-center text-center overflow-hidden`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${game.color}`} />
            <div className={`${game.color} p-6 rounded-2xl mb-6 shadow-inner transform group-hover:scale-110 transition-transform border border-white/20`}>
              <game.icon className="w-12 h-12 text-white drop-shadow-md" />
            </div>
            <h3 className={`text-3xl font-black ${game.textColor} mb-4 uppercase tracking-wider drop-shadow-sm`}>
              {game.title}
            </h3>
            <p className="text-gray-400 font-medium text-lg">
              {game.description}
            </p>
            <div className={`mt-6 px-8 py-3 rounded-xl font-black uppercase tracking-wider text-white ${game.color} opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
              Play Now!
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
