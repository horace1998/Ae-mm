import { useState } from "react";
import { useSYNK } from "../Store";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Music, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface ArchiveItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  lyric: string;
}

const INITIAL_ITEMS: ArchiveItem[] = [
  {
    id: "1",
    title: "氖色之雨",
    category: "空間氛圍",
    image: "https://picsum.photos/seed/cyberpunk/400/300",
    tags: ["數碼", "雨夜", "都市"],
    lyric: "靜電中的淚水。"
  },
  {
    id: "2",
    title: "水晶花園",
    category: "庇護所",
    image: "https://picsum.photos/seed/crystal/400/300",
    tags: ["發光", "和平", "礦物"],
    lyric: "在黑暗中茁壯。"
  }
];

export default function Archive() {
  const { bias } = useSYNK();
  const [items, setItems] = useState<ArchiveItem[]>(INITIAL_ITEMS);
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>("calm");

  const generateOracleResponse = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate a new digital artifact for the aespa SYNK portal. 
      The artifact should be inspired by the mood "${selectedMood}" and the member bias "${bias}".
      Theme: Futuristic K-pop, Neo-Kwangya, Cyber-mystique.
      Respond in Traditional Chinese (HK/TW) for the title, category, and lyric.
      Provide only valid JSON matching this schema:
      {
        "title": "Artifact Title",
        "category": "Lore Category",
        "tags": ["tag1", "tag2"],
        "lyric": "A short poetic line"
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        setItems(prev => [{
          id: Math.random().toString(),
          title: data.title,
          category: data.category,
          tags: data.tags,
          lyric: data.lyric,
          image: `https://picsum.photos/seed/${data.title.replace(/ /g, '')}/400/300?blur=2`
        }, ...prev]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 md:p-14 pb-32 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        
        {/* Editorial Header Section */}
        <header className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-start md:items-end border-b border-white/10 pb-8 md:pb-12">
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-white/20 mb-2 block uppercase font-light">INDEX_SYSTEM_V4</span>
            <h1 className="high-fashion-header text-4xl md:text-8xl leading-none">ARCHIVE</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
               <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-synk-lavender uppercase font-light leading-none">數據檔案日誌</span>
               <span className="hidden sm:block w-12 h-[1px] bg-synk-lavender/30" />
               <p className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-white/30 uppercase font-light truncate">從曠野回收的數位遺物。</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/30">ORACLE_MANIFEST / 曠野神諭</span>
            <div className="flex bg-white/2 p-1.5 md:p-2 rounded-sm border border-white/5 backdrop-blur-md w-full md:w-auto">
              <select 
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="bg-transparent text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white outline-none px-2 md:px-4 mr-2 md:mr-4 cursor-pointer flex-1 md:flex-none"
              >
                <option value="calm" className="bg-[#080808]">CALM / 平靜</option>
                <option value="energized" className="bg-[#080808]">ENERGY / 活力</option>
                <option value="melancholic" className="bg-[#080808]">BLUE / 憂鬱</option>
                <option value="focused" className="bg-[#080808]">FOCUS / 專注</option>
              </select>
              <button 
                onClick={generateOracleResponse}
                disabled={loading}
                className="flex items-center justify-center gap-3 md:gap-4 px-6 md:px-8 py-2 md:py-3 bg-white text-black text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] hover:invert transition-all disabled:opacity-50 rounded-sm"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "MANIFEST"}
              </button>
            </div>
          </div>
        </header>

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col group relative"
              >
                <div className="aspect-[4/5] w-full overflow-hidden relative border border-white/5 bg-white/2 rounded-sm">
                   {/* Editorial Badge */}
                   <div className="absolute top-6 left-0 z-20">
                      <div className="bg-black py-1 px-4 border border-white/10">
                         <span className="text-[10px] uppercase tracking-[0.4em] text-white font-serif italic">{item.category}</span>
                      </div>
                   </div>

                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-10 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay Title */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="text-[12px] uppercase tracking-[0.6em] text-white font-light text-center px-12 leading-relaxed">
                        RETRIEVING_DATA_FOR_AGENT_MY...
                     </span>
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                     <span className="text-[8px] uppercase tracking-[0.4em] text-synk-pink">ARTIFACT_ID</span>
                     <span className="text-[10px] font-mono text-white/40">{item.id.slice(0, 8)}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="high-fashion-header text-3xl group-hover:text-synk-lavender transition-colors">{item.title}</h3>
                    <div className="flex gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[8px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-0.5">
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 py-6 border-t border-white/5 group-hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">AGENT_WHISPER</span>
                    </div>
                    <p className="text-lg font-serif italic text-white/70 leading-relaxed">
                       「{item.lyric}」
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
