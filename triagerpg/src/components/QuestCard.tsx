import { AlertTriangle, CheckCircle2, Cpu, Github, Trello, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface QuestCardProps {
  quest: {
    id: string;
    title: string;
    description: string | null;
    source: string;
    status: string;
    severity: string;
    xpReward: number;
    aiSummary?: string | null;
  };
  onResolve: (id: string) => void;
}

export default function QuestCard({ quest, onResolve }: QuestCardProps) {
  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'jira': return <Trello className="w-5 h-5" />; // Using Trello as a placeholder for Jira
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="bg-[#25293c] border border-[#343b54] rounded-lg p-5 hover:border-indigo-500/50 transition-colors flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="text-gray-400 bg-[#1e2130] p-2 rounded-md border border-[#2d3248]">
            {getSourceIcon(quest.source)}
          </div>
          <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getSeverityColor(quest.severity)} uppercase tracking-wider`}>
            {quest.severity}
          </span>
        </div>
        <div className="text-indigo-400 font-bold text-xs bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 flex items-center gap-1">
          +{quest.xpReward} XP
        </div>
      </div>
      
      <h3 className="text-base font-semibold text-white mb-2 line-clamp-1">{quest.title}</h3>
      <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">
        {quest.description || "No description provided."}
      </p>

      {quest.aiSummary && (
        <div className="mb-4 text-[10px] text-purple-400 flex items-center gap-1 bg-purple-500/10 w-fit px-2 py-1 rounded border border-purple-500/20 font-medium">
          <Cpu className="w-3 h-3" /> AI Summary Available
        </div>
      )}

      <div className="flex gap-3 mt-auto pt-4 border-t border-[#343b54]">
        <Link 
          href={`/quest/${quest.id}`}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          View Details
          <ArrowRight className="w-3 h-3" />
        </Link>
        <button 
          onClick={() => onResolve(quest.id)}
          className="flex-1 bg-[#1e2130] hover:bg-[#2d3248] text-gray-300 py-2 px-4 rounded-md font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-[#343b54]"
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          Resolve
        </button>
      </div>
    </div>
  );
}
