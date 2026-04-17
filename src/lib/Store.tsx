import { createContext, useContext, useState, ReactNode } from "react";

export type GoalType = 'pulse' | 'orbit' | 'galaxy';
export type MemberBias = 'None' | 'Karina' | 'Winter' | 'Giselle' | 'Ningning';

export interface Goal {
  id: string;
  title: string;
  type: GoalType;
  completed: boolean;
}

export interface UserStats {
  level: number;
  experience: number;
  crystals: number;
  completed_goals: number;
}

export interface Decoration {
  id: string;
  image: string;
  x: number;
  y: number;
  scale: number;
  type: 'image' | 'crystal' | 'orb';
}

interface SYNKContextType {
  stats: UserStats;
  goals: Goal[];
  addGoal: (title: string, type: GoalType) => void;
  completeGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  completionRate: number;
  triggerAchievement: (title: string, sub: string) => void;
  achievement: { show: boolean, title: string, sub: string };
  hideAchievement: () => void;
  customBackground: string | null;
  setCustomBackground: (url: string | null) => void;
  bias: MemberBias;
  setBias: (bias: MemberBias) => void;
  roomAtmosphere: string;
  setRoomAtmosphere: (atmos: string) => void;
  decorations: Decoration[];
  addDecoration: (image: string, type: 'image' | 'crystal' | 'orb') => void;
  removeDecoration: (id: string) => void;
}

const SYNKContext = createContext<SYNKContextType | undefined>(undefined);

export function SYNKProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    experience: 0,
    crystals: 10,
    completed_goals: 0,
  });

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: '尋找內心澄淨', type: 'pulse', completed: false },
    { id: '2', title: '建造軌道站', type: 'orbit', completed: false }
  ]);

  const [achievement, setAchievement] = useState({ show: false, title: "", sub: "" });
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const [bias, setBias] = useState<MemberBias>('None');
  const [roomAtmosphere, setRoomAtmosphere] = useState<string>('Standard');
  const [decorations, setDecorations] = useState<Decoration[]>([]);

  const addGoal = (title: string, type: GoalType) => {
    setGoals([...goals, { id: Math.random().toString(), title, type, completed: false }]);
  };

  const completeGoal = (id: string) => {
    setGoals(goals.map(g => {
      if (g.id === id && !g.completed) {
        // Trigger stat update
        setStats(s => {
          const newExp = s.experience + 50;
          const newLevel = Math.floor(newExp / 200) + 1;
          if (newLevel > s.level) {
            triggerAchievement("等級提升", `已達到共鳴等級 ${newLevel}`);
          } else {
            triggerAchievement("目標達成", "+50 EXP | +5 水晶");
          }
          return {
            ...s,
            experience: newExp,
            level: newLevel,
            crystals: s.crystals + 5,
            completed_goals: s.completed_goals + 1
          };
        });
        return { ...g, completed: true };
      }
      return g;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const triggerAchievement = (title: string, sub: string) => {
    setAchievement({ show: true, title, sub });
    setTimeout(() => {
      setAchievement(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const hideAchievement = () => setAchievement(prev => ({...prev, show: false}));

  const addDecoration = (image: string, type: 'image' | 'crystal' | 'orb') => {
    const newDeco: Decoration = {
      id: Math.random().toString(),
      image,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 60 + 20, // 20% to 80%
      scale: 0.8 + Math.random() * 0.4,
      type
    };
    setDecorations([...decorations, newDeco]);
    triggerAchievement("具現完成", "新遺物已同步到您的房間");
  };

  const removeDecoration = (id: string) => {
    setDecorations(decorations.filter(d => d.id !== id));
  };

  const totalCompleted = goals.filter(g => g.completed).length;
  const completionRate = goals.length === 0 ? 0 : totalCompleted / goals.length;

  return (
    <SYNKContext.Provider value={{
      stats, goals, addGoal, completeGoal, deleteGoal, completionRate,
      triggerAchievement, achievement, hideAchievement,
      customBackground, setCustomBackground,
      bias, setBias,
      roomAtmosphere, setRoomAtmosphere,
      decorations, addDecoration, removeDecoration
    }}>
      {children}
    </SYNKContext.Provider>
  );
}

export function useSYNK() {
  const context = useContext(SYNKContext);
  if (!context) throw new Error("useSYNK must be used within SYNKProvider");
  return context;
}
