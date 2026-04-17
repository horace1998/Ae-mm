import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { Fingerprint, Sparkles, Loader2 } from "lucide-react";
import { cn } from "./utils";

const WelcomeScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const p1 = setTimeout(() => setPhase(1), 800);
    const p2 = setTimeout(() => setPhase(2), 1800);
    return () => { clearTimeout(p1); clearTimeout(p2); };
  }, []);

  const handleAuthenticate = () => {
    setPhase(3);
    setTimeout(() => onComplete(), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#010101] text-white overflow-hidden tracking-widest px-8">
      {/* Dynamic Universe Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Rotating Aura Blobs */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-100%] opacity-20 mix-blend-screen pointer-events-none"
      >
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full bg-synk-blue/30 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[40%] h-[40%] rounded-full bg-synk-pink/30 blur-[150px]" />
      </motion.div>

      {/* Decorative vertical texts */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-24 opacity-20">
         <span className="vertical-text text-[9px] tracking-[0.6em] uppercase h-40">SYNK_AUTHENTICATOR_V4</span>
         <span className="vertical-text text-[9px] tracking-[0.6em] uppercase h-40">ACCESS_RESTRICTED_PROTOCOL</span>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 text-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          {phase <= 1 && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <Loader2 className="w-12 h-12 text-synk-lavender animate-spin opacity-20" />
                <Sparkles className="absolute inset-0 w-12 h-12 text-white/40 animate-pulse p-2" />
              </div>
              <h1 className="text-[10px] font-medium tracking-[0.5em] text-white/40 uppercase">
                {phase === 0 ? "CONNECTING..." : "CALIBRATING_AURA / 靈氣同步中"}
              </h1>
            </motion.div>
          )}
          
          {phase === 2 && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              className="flex flex-col items-center gap-12"
            >
              <div className="flex flex-col gap-4">
                <h1 className="high-fashion-header text-5xl md:text-8xl font-bold tracking-[0.4em] md:tracking-[0.5em] leading-none text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">SYNKIFY</h1>
                <p className="text-[9px] md:text-[10px] tracking-[0.8em] text-synk-lavender mt-4 uppercase">已連接至宇宙</p>
              </div>

              <div className="flex flex-col items-center gap-8 mt-4">
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={handleAuthenticate}
                   className="relative group p-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/40 hover:bg-white/10"
                 >
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 group-hover:opacity-40" />
                    <Fingerprint className="w-16 h-16 text-white group-hover:text-synk-lavender transition-colors duration-500" />
                 </motion.button>
                 <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-white/60">BIO_AUTHENTICATION</span>
                    <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase">生物識別驗證 / 點擊指紋進入</span>
                 </div>
              </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
              >
                 <Sparkles className="w-10 h-10 text-black" />
              </motion.div>
              <h2 className="text-[12px] uppercase tracking-[0.8em] text-white">ACCESS_GRANTED</h2>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">歡迎回來，特工</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomeScreen;