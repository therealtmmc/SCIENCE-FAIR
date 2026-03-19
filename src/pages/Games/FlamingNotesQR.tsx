import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "motion/react";

export function FlamingNotesQR() {
  const { encodedNote } = useParams();
  const navigate = useNavigate();
  const sharedUrl = `${window.location.origin}/flaming-notes/view/${encodedNote}`;

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-[#1A1A1A] p-6 cursor-pointer"
      onClick={() => window.open(sharedUrl, "_blank")}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-[#FF6D00]"
      >
        <QRCodeSVG value={sharedUrl} size={256} level="H" />
      </motion.div>
      <p className="text-white mt-8 text-xl font-bold uppercase tracking-widest animate-pulse">
        Tap anywhere to open note
      </p>
    </div>
  );
}
