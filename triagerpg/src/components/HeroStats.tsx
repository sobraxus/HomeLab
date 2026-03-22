import { Flame, Shield, Zap } from 'lucide-react';

interface HeroStatsProps {
  level: number;
  xp: number;
  streak: number;
  credits: number;
}

export default function HeroStats({ level, xp, streak, credits }: HeroStatsProps) {
  const requiredXp = level * 100;
  const progress = (xp / requiredXp) * 100;

  return (
    <div className="bg-[#25293c] border border-[#343b54] rounded-xl p-6 text-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600/20 p-3 rounded-xl border border-indigo-500/30">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Level {level} Analyst</h2>
            <p className="text-gray-400 text-sm">Keep closing cases to level up!</p>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="text-center bg-[#1e2130] px-6 py-2 rounded-lg border border-[#2d3248]">
            <div className="flex items-center justify-center gap-1 text-orange-500 font-bold text-xl mb-1">
              <Flame className="w-5 h-5" /> {streak}
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Day Streak</div>
          </div>
          <div className="text-center bg-[#1e2130] px-6 py-2 rounded-lg border border-[#2d3248]">
            <div className="flex items-center justify-center gap-1 text-yellow-400 font-bold text-xl mb-1">
              <Zap className="w-5 h-5" /> {credits}
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Energy Points</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-indigo-400 font-semibold">{xp} XP</span>
          <span className="text-gray-500">{requiredXp} XP</span>
        </div>
        <div className="w-full bg-[#1e2130] rounded-full h-3 border border-[#2d3248]">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-500 h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
