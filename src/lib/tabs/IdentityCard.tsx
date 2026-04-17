import React, { useState } from "react";
import { useSYNK } from "../Store";
import { Fingerprint, Download, User as UserIcon, Shield, Map } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../utils";

export default function IdentityCard() {
  const { stats, customBackground, setCustomBackground, bias, roomAtmosphere, setRoomAtmosphere } = useSYNK();
  const [showMotivation, setShowMotivation] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomBackground(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-8 lg:p-14 text-center perspective-1000 overflow-y-auto custom-scrollbar pb-32">
      
      {/* Editorial Navigation */}
      <div className="flex gap-12 mb-20 mt-8 border-b border-white/10 w-full justify-center pb-4">
        <button 
          onClick={() => setShowMotivation(false)}
          className={`text-[11px] uppercase tracking-[0.4em] transition-all font-serif italic ${!showMotivation ? 'text-white border-b border-white' : 'text-white/30 hover:text-white/60'}`}
        >
          RESONANCE_ACCESS / 共鳴存取
        </button>
        <button 
          onClick={() => setShowMotivation(true)}
          className={`text-[11px] uppercase tracking-[0.4em] transition-all font-serif italic ${showMotivation ? 'text-white border-b border-white' : 'text-white/30 hover:text-white/60'}`}
        >
          MY_AUTHENTICATION / 會員認證
        </button>
      </div>

      {!showMotivation ? (
        <motion.div
          key="identity"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          {/* Left Column: Visuals */}
          <div className="flex flex-col gap-12">
            <div className="relative group">
               <span className="absolute -top-12 left-0 text-[10px] tracking-[0.5em] text-white/20 uppercase font-light">IDENTIFICATION_SCAN</span>
               <div className="aspect-[4/5] bg-white/2 border border-white/10 overflow-hidden relative group">
                  {bias !== 'None' ? (
                    <img 
                      src={`https://picsum.photos/seed/${bias}/600/800`} 
                      alt={bias} 
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <UserIcon className="w-20 h-20 text-white/5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 flex flex-col items-start gap-1">
                     <span className="text-[9px] uppercase tracking-[0.4em] text-synk-lavender">ACCESS_CODE</span>
                     <span className="text-2xl font-serif italic uppercase tracking-widest text-white">
                        {bias === 'None' ? 'GUEST_MY' : `MY_${bias.toUpperCase()}`}
                     </span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-4 text-left">AESTHETICS_CONFIG / 美學配置</span>
              <div className="grid grid-cols-1 gap-6">
                 <div className="flex flex-col gap-3">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 text-left">AMBIENT_AURA / 靈氣</span>
                    <div className="flex gap-4">
                       {(['Standard', 'Neon', 'Void'] as const).map(atmos => (
                          <button 
                             key={atmos}
                             onClick={() => setRoomAtmosphere(atmos)}
                             className={cn(
                               "px-6 py-2 text-[10px] uppercase tracking-[0.3em] border transition-all",
                               roomAtmosphere === atmos ? "bg-white text-black font-bold border-white" : "border-white/10 text-white/30 hover:border-white/30"
                             )}
                          >
                             {atmos}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col gap-3">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 text-left">TEXTURE_SYNC / 紋理</span>
                    <label className="flex items-center gap-6 px-8 py-5 border border-white/10 bg-white/2 hover:bg-white/5 transition-all cursor-pointer group">
                      <Map className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                      <span className="text-[11px] uppercase tracking-[0.4em] font-serif italic">MANIFEST_SPATIAL_SYNC / 同步環境</span>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Credentials */}
          <div className="flex flex-col gap-16 text-left">
            <header className="flex flex-col gap-4">
               <h1 className="high-fashion-header text-5xl md:text-8xl leading-none">AUTHENTICATION</h1>
               <p className="text-[12px] text-synk-lavender/60 uppercase tracking-[0.5em] font-serif italic">身份認證 / REDEFINING_REALITY</p>
            </header>

            <div className="flex flex-col gap-12">
               <div className="flex flex-col gap-8">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-4">CORE_METRICS / 核心指標</span>
                  <div className="grid grid-cols-1 gap-12">
                     <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-2">RESONANCE_INDEX</span>
                        <div className="flex items-end gap-4">
                           <span className="text-5xl font-serif italic text-white leading-none">{stats.level}</span>
                           <span className="text-[10px] uppercase tracking-widest text-synk-lavender mb-1">STABLE_REB_LEVEL</span>
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-2">EXPERIENCE_ACCUMULATION</span>
                        <div className="flex items-end gap-4">
                           <span className="text-5xl font-serif italic text-white leading-none">{stats.experience}</span>
                           <span className="text-[10px] uppercase tracking-widest text-white/10 mb-1">FLAT_DATA_UNITS</span>
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-2">ANOMALY_ERASURE_COUNT</span>
                        <div className="flex items-end gap-4">
                           <span className="text-5xl font-serif italic text-white leading-none">{stats.completed_goals}</span>
                           <span className="text-[10px] uppercase tracking-widest text-synk-pink mb-1">PROTOCOLS_EXECUTED</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-6">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 border-b border-white/5 pb-4">STATUS_RATING</span>
                  <div className="flex items-center gap-6">
                     <div className="w-4 h-4 rounded-full bg-synk-pink animate-pulse" />
                     <h2 className="text-3xl font-serif italic uppercase tracking-widest text-white">ELITE_AGENT / 精英特工</h2>
                  </div>
                  <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                     VIRTUAL_ACCESSID_MY_V2. AUTHORIZED_TO_NAVIGATE_THE_VOID_AND_SYNCHRONIZE_WITH_THE_CORE.
                  </p>
               </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <MotivationCard />
      )}
    </div>
  );
}

function MotivationCard() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      key="passport"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-16"
      style={{ perspective: 1200 }}
    >
      <header className="flex flex-col gap-2 items-center">
         <h1 className="high-fashion-header text-5xl md:text-8xl text-white">PASSPORT</h1>
         <p className="text-[12px] text-synk-lavender uppercase tracking-[0.6em] font-serif italic">虛擬准入證 / VIRTUAL_ACCESS_PASS</p>
      </header>

      <motion.div
        className="w-full max-w-[420px] aspect-[1/1.4] bg-white text-black relative overflow-hidden flex flex-col justify-between p-12 cursor-pointer shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex justify-between items-start w-full relative z-10 border-b border-black/10 pb-8">
          <Fingerprint className="w-12 h-12 text-black" />
          <div className="text-right flex flex-col items-end">
            <span className="text-[12px] uppercase tracking-[0.4em] font-serif italic font-bold">SYNK_PASSPORT_TOKEN</span>
            <span className="text-[10px] font-mono text-black/40">#AE-KW_0X9192</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 relative z-10">
          <h3 className="high-fashion-header text-6xl text-black leading-none">
            MANIFEST<br/>DESTINY
          </h3>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.4em] text-black/30 font-bold">AGENT_RESOLUTION / 宣示命運</span>
            <p className="text-[16px] font-serif italic text-black leading-relaxed">
              「我們在宇宙的負空間中<br/>建立自己的現實。」
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end relative z-10 border-t border-black/10 pt-8">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[9px] uppercase tracking-[0.4em] text-black/40">ORIGIN_COORD / 座標</span>
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold">UNKNOWN / 未知</span>
          </div>
          <div className="w-12 h-12 border border-black/20 bg-black flex items-center justify-center">
             <div className="w-6 h-6 border border-white/20" />
          </div>
        </div>
      </motion.div>

      <button className="flex items-center gap-6 px-12 py-5 bg-white text-black text-[12px] font-bold uppercase tracking-[0.4em] hover:invert transition-all group">
        <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" /> SAVE_CREDENTIALS / 儲存通行證
      </button>
    </motion.div>
  );
}
