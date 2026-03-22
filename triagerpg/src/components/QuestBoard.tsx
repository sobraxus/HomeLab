'use client';

import { useState } from 'react';
import QuestCard from './QuestCard';
import { useRouter } from 'next/navigation';

interface Quest {
  id: string;
  title: string;
  description: string | null;
  source: string;
  status: string;
  severity: string;
  xpReward: number;
  aiSummary: string | null;
}

interface QuestBoardProps {
  initialQuests: Quest[];
}

export default function QuestBoard({ initialQuests }: QuestBoardProps) {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const router = useRouter();

  const handleResolve = async (id: string) => {
    try {
      const res = await fetch('/api/quests/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: id })
      });
      const data = await res.json();
      
      if (res.ok) {
        const quest = quests.find(q => q.id === id);
        let msg = `Quest resolved! You earned ${quest?.xpReward} XP.`;
        if (data.leveledUp) {
          msg += `\n\n🎉 Congratulations! You reached Level ${data.newLevel}!`;
        }
        alert(msg);
        setQuests(quests.filter(q => q.id !== id));
        router.refresh();
      } else {
        alert(data.error || 'Failed to resolve quest');
      }
    } catch (err) {
      alert('Network error occurred while resolving quest.');
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Active Quests</h2>
        <div className="text-sm text-gray-400">
          {quests.length} quests available
        </div>
      </div>
      
      {quests.length === 0 ? (
        <div className="bg-[#25293c] border border-[#343b54] rounded-xl p-12 text-center shadow-sm">
          <p className="text-gray-400 text-lg">No active quests. You're all caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map(quest => (
            <QuestCard 
              key={quest.id} 
              quest={quest} 
              onResolve={handleResolve}
            />
          ))}
        </div>
      )}
    </div>
  );
}
