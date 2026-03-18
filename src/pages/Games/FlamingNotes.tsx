import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "motion/react";
import { MessageSquare, Share2, Flame, Download } from "lucide-react";
import { Button } from "@/src/components/Button";
import { toPng } from "html-to-image";

export function FlamingNotes() {
  const [note, setNote] = useState("");
  const [sharedUrl, setSharedUrl] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    if (!note.trim()) return;
    // Encode the note in the URL
    const encodedNote = encodeURIComponent(note);
    const url = `${window.location.origin}/flaming-notes/view/${encodedNote}`;
    setSharedUrl(url);
  };

  const handleSavePhoto = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: "#1A1A1A",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = "apula-sharing-card.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to save image", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#1A1A1A] rounded-3xl min-h-[600px] relative border border-white/10 shadow-2xl overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6D00]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D32F2F]/10 rounded-full blur-[100px]" />
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="inline-block bg-[#2A2A2A] p-4 rounded-full mb-4 shadow-[0_0_20px_rgba(255,109,0,0.3)] border border-white/10">
          <MessageSquare className="w-12 h-12 text-[#FF6D00]" />
        </div>
        <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-wider drop-shadow-md">
          Flaming Notes
        </h2>
        <p className="text-gray-400 font-medium">
          Leave an anonymous note and share it via QR code!
        </p>
      </div>

      {!sharedUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#2A2A2A] p-8 rounded-3xl shadow-2xl border border-white/10 relative z-10 backdrop-blur-md"
        >
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your flaming note here..."
            className="w-full h-40 p-4 rounded-xl bg-[#1C1C1C] border border-white/10 text-white focus:border-[#FF6D00] focus:ring-1 focus:ring-[#FF6D00] resize-none font-sans text-lg mb-6 placeholder:text-gray-600"
            maxLength={200}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-bold">{note.length}/200</span>
            <Button
              variant="primary"
              onClick={handleShare}
              disabled={!note.trim()}
              className="flex items-center gap-2 shadow-[0_0_15px_rgba(255,109,0,0.4)]"
            >
              <Share2 className="w-5 h-5" /> Share Note
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-md relative z-10">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-gradient-to-b from-[#2A2A2A] to-[#121212] p-10 rounded-[2rem] shadow-2xl border border-white/5 text-center relative overflow-hidden flex flex-col items-center"
          >
            {/* Top Orange Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-[#FF6D00] shadow-[0_0_30px_#FF6D00]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[#FF6D00]/20 blur-[50px] pointer-events-none" />
            
            {/* Icon */}
            <div className="bg-[#1A1A1A] w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,109,0,0.15)] mb-8 relative z-10">
              <Flame className="w-10 h-10 text-[#FF6D00]" strokeWidth={1.5} />
            </div>
            
            {/* Title */}
            <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-widest leading-tight relative z-10">
              APULA SHARING<br/>CARD
            </h3>
            
            {/* QR Code */}
            <div className="bg-white p-4 rounded-2xl inline-block border-4 border-[#FF6D00] mb-8 relative z-10 w-full max-w-[240px] aspect-square flex items-center justify-center">
              <QRCodeSVG value={sharedUrl} size={200} level="H" style={{ width: '100%', height: '100%' }} />
            </div>
            
            {/* Footer Text */}
            <p className="text-gray-300 font-medium text-lg relative z-10 leading-relaxed">
              Scan this QR code to view the<br/>flaming note!
            </p>
          </motion.div>

          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={handleSavePhoto}
              className="flex-1 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,109,0,0.4)]"
            >
              <Download className="w-5 h-5" /> Save Photo
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSharedUrl("");
                setNote("");
              }}
              className="flex-1 border border-white/10"
            >
              Create Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
