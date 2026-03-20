import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Share2, Flame, Download } from "lucide-react";
import { Button } from "@/src/components/Button";
import { toPng } from "html-to-image";
import { FireParticles } from "@/src/components/FireParticles";

export function FlamingNotes() {
  const [note, setNote] = useState("");
  const [sharedUrl, setSharedUrl] = useState("");
  const [noteUrl, setNoteUrl] = useState("");
  const [isBurning, setIsBurning] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    if (!note.trim()) return;
    // Encode the note in the URL using base64 and then encodeURIComponent
    const encodedNote = encodeURIComponent(btoa(String.fromCharCode(...new TextEncoder().encode(note))));
    const noteUrl = `${window.location.origin}/flaming-notes/view/${encodedNote}`;
    const qrPageUrl = `${window.location.origin}/flaming-notes/qr?note=${encodedNote}`;
    setSharedUrl(qrPageUrl);
    setNoteUrl(noteUrl);
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
      
      {isBurning && <FireParticles />}

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
              onClick={() => {
                setIsBurning(true);
                setTimeout(() => {
                  handleShare();
                  setIsBurning(false);
                }, 2000);
              }}
              disabled={!note.trim()}
              className="flex items-center gap-2 shadow-[0_0_15px_rgba(255,109,0,0.4)]"
            >
              <Share2 className="w-5 h-5" /> Share Note
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center italic">
            For entertainment purposes only.
          </p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-md relative z-10">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.8, filter: "brightness(2) blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[360px] bg-gradient-to-tr from-[#1A1A1A] via-[#2A1A1A] to-[#1A1A1A] p-6 rounded-3xl shadow-[0_0_60px_rgba(255,109,0,0.4)] border-4 border-[#FF6D00] text-center flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Fire Background Effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF6D00] rounded-full blur-[60px]" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#D32F2F] rounded-full blur-[60px]" />
            </div>

            <div className="flex flex-row items-center justify-between gap-4 w-full z-10">
              <div className="flex flex-col items-center justify-center flex-1">
                {/* Fire Icon */}
                <div className="relative mb-2">
                  <div className="absolute inset-0 bg-[#FF6D00] blur-lg opacity-50 rounded-full animate-pulse" />
                  <Flame className="w-10 h-10 text-[#FF6D00] relative z-10" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-black text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,109,0,0.8)]">
                  APULA<br/>SHARING CARD
                </h3>
              </div>
              
              {/* QR Code */}
              <a 
                href={sharedUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white p-2 rounded-xl border-2 border-[#FF6D00] w-28 h-28 flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer"
              >
                <QRCodeSVG value={sharedUrl} size={112} level="H" style={{ width: '100%', height: '100%' }} />
              </a>
            </div>
            
            {/* Footer Text */}
            <p className="text-gray-200 font-bold text-xs uppercase tracking-widest z-10 w-full border-t border-white/10 pt-4">
              Scan to read the message inside
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
                setNoteUrl("");
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
