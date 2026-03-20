import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { QrCode, ChevronRight, Copy } from "lucide-react";

export function FlamingNotesQR() {
  const [searchParams] = useSearchParams();
  const encodedNote = searchParams.get("note");
  const note = encodedNote ? new TextDecoder().decode(Uint8Array.from(atob(encodedNote), c => c.charCodeAt(0))) : "";
  const noteUrl = `${window.location.origin}/flaming-notes/view/${encodeURIComponent(btoa(String.fromCharCode(...new TextEncoder().encode(note))))}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(noteUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1A1A] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#2A2A2A] p-6 rounded-3xl shadow-2xl border border-white/10 w-full max-w-sm cursor-pointer flex items-center justify-between"
        onClick={() => window.location.href = noteUrl}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="bg-[#1C1C1C] p-3 rounded-2xl shrink-0">
            <QrCode className="w-8 h-8 text-[#FF6D00]" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-white font-bold text-lg">Webpage</h3>
            <p className="text-gray-400 text-sm">Tap here to go to the website in your browser.</p>
            <p className="text-[#FF6D00] text-xs truncate">{noteUrl}</p>
          </div>
        </div>
        <ChevronRight className="text-gray-500 shrink-0 ml-2" />
      </motion.div>
      
      <button 
        onClick={handleCopy}
        className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <Copy className="w-4 h-4" /> Copy Link
      </button>
    </div>
  );
}
