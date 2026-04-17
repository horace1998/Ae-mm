import { useState } from "react";
import MiniOrb from "./MiniOrb";
import { motion, AnimatePresence } from "motion/react";

export default function PurgeMode() {
  const [pressureType, setPressureType] = useState<string | null>(null);
  const [shattered, setShattered] = useState(false);

  const handleShatter = () => {
    setShattered(true);
    setTimeout(() => {
      setPressureType(null);
      setShattered(false);
    }, 3000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
      <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col items-start select-none pointer-events-none z-0">
        <h2 className="high-fashion-header text-5xl md:text-9xl opacity-5 md:opacity-10 leading-none">WHIPLASH</h2>
        <span className="text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-synk-pink/30 uppercase ml-1 md:ml-2 mt-1 md:mt-[-10px]">PVRGE_SYSTEM_V.01</span>
      </div>

      <AnimatePresence mode="wait">
        {!pressureType ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
            className="flex flex-col items-center gap-12 md:gap-16 relative z-10 w-full"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <h1 className="high-fashion-header text-4xl md:text-8xl text-synk-pink leading-none">PVRGE</h1>
              <p className="text-[10px] md:text-[12px] text-synk-pink/60 uppercase tracking-[0.4em] md:tracking-[0.6em] font-serif italic">清除協議 / SELECT_ANOMALY</p>
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 w-full max-w-2xl px-4 md:px-0">
              {[
                { en: 'PRESSURE', zh: '壓力' },
                { en: 'DOUBT', zh: '懷疑' },
                { en: 'FEAR', zh: '恐懼' },
                { en: 'TRIVIA', zh: '瑣事' }
              ].map(t => (
                <button
                  key={t.en}
                  onClick={() => setPressureType(t.zh)}
                  className="group relative flex flex-col items-center gap-2 w-full md:w-auto"
                >
                  <span className="w-full md:w-auto px-4 md:px-10 py-4 md:py-5 border border-synk-pink/20 bg-synk-pink/2 text-synk-pink text-[12px] md:text-[14px] font-serif italic uppercase tracking-[0.2em] group-hover:bg-synk-pink group-hover:text-black transition-all duration-500 rounded-sm">
                    {t.en}
                  </span>
                  <span className="text-[8px] md:text-[9px] tracking-[0.4em] text-synk-pink/40 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.zh}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="orb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(30px)" }}
            className="flex flex-col items-center gap-12 relative z-10"
          >
            {shattered ? (
              <div className="flex flex-col gap-4">
                <h3 className="high-fashion-header text-5xl text-synk-pink animate-pulse">ERASED</h3>
                <p className="text-[10px] uppercase tracking-[0.5em] text-synk-pink/40 font-serif italic">異象已清除 / SYNC_RECOVERY_IN_PROGRESS</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6 justify-center">
                    <span className="w-12 h-[1px] bg-synk-pink/20" />
                    <h3 className="text-[14px] font-serif italic text-synk-pink uppercase tracking-[0.4em]">
                      TARGET: {pressureType}
                    </h3>
                    <span className="w-12 h-[1px] bg-synk-pink/20" />
                  </div>
                  <p className="text-[10px] text-synk-pink/60 uppercase font-light tracking-[0.8em] animate-pulse">
                    RAPID_TAP_TO_DISRUPT / 快速點擊以破碎
                  </p>
                </div>
                <div className="scale-125 md:scale-150 py-12">
                  <MiniOrb onShatter={handleShatter} />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
