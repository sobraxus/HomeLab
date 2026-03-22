'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Cpu, CheckCircle2, ArrowLeft, Loader2, AlertTriangle, Github, Trello, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface QuestClientProps {
  initialQuest: {
    id: string;
    title: string;
    description: string | null;
    source: string;
    status: string;
    severity: string;
    xpReward: number;
    aiSummary: string | null;
  };
}

export default function QuestClient({ initialQuest }: QuestClientProps) {
  const [quest, setQuest] = useState(initialQuest);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!quest.aiSummary && !isGenerating) {
      handleGenerateSummary();
    }
  }, []);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: quest.id })
      });
      const data = await res.json();
      
      if (res.ok) {
        setQuest({ ...quest, aiSummary: data.summary });
        router.refresh();
      } else {
        console.error(data.error || 'Failed to generate summary');
      }
    } catch (err) {
      console.error('Network error occurred while generating summary.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResolve = async () => {
    setIsResolving(true);
    try {
      const res = await fetch('/api/quests/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId: quest.id })
      });
      const data = await res.json();
      
      if (res.ok) {
        let msg = `Quest resolved! You earned ${quest.xpReward} XP.`;
        if (data.leveledUp) {
          msg += `\n\n🎉 Congratulations! You reached Level ${data.newLevel}!`;
        }
        alert(msg);
        router.push('/');
        router.refresh();
      } else {
        alert(data.error || 'Failed to resolve quest');
        setIsResolving(false);
      }
    } catch (err) {
      alert('Network error occurred while resolving quest.');
      setIsResolving(false);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'jira': return <Trello className="w-5 h-5" />;
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

  // Parse the JSON summary
  let parsedSummary = null;
  if (quest.aiSummary) {
    try {
      parsedSummary = JSON.parse(quest.aiSummary);
    } catch (e) {
      // Fallback if AI didn't return perfect JSON
      parsedSummary = {
        whatHappened: quest.aiSummary,
        investigation: [],
        nextSteps: []
      };
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar for Case */}
      <div className="bg-[#25293c] border border-[#343b54] rounded-lg p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-gray-400">
            {getSourceIcon(quest.source)}
          </div>
          <h1 className="text-xl font-bold text-white">{quest.title}</h1>
          <div className="h-6 w-px bg-[#343b54] mx-2"></div>
          <span className="text-gray-400 text-sm">ID: {quest.id.slice(-6).toUpperCase()}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getSeverityColor(quest.severity)} uppercase tracking-wider`}>
            {quest.severity}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              T1
            </div>
            <span className="text-sm text-gray-300">@Tier1</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Explore
          </button>
        </div>
      </div>

      {/* Tabs (Visual only) */}
      <div className="flex gap-6 border-b border-[#343b54] px-2">
        <button className="text-indigo-400 font-medium pb-3 border-b-2 border-indigo-500">Overview</button>
        <button className="text-gray-500 hover:text-gray-300 font-medium pb-3">Timeline</button>
        <button className="text-gray-500 hover:text-gray-300 font-medium pb-3">Entities</button>
      </div>

      {/* AI Investigation Section */}
      <div className="bg-[#25293c] rounded-lg overflow-hidden border border-[#343b54] shadow-lg">
        <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-[#25293c] p-4 border-b border-[#343b54] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">AI Investigation</h2>
          {isGenerating && <Loader2 className="w-4 h-4 text-purple-400 animate-spin ml-2" />}
        </div>
        
        <div className="p-6">
          {!parsedSummary && isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
              <p>Analyzing case details and generating investigation points...</p>
            </div>
          ) : parsedSummary ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="bg-[#1e2130] rounded-lg p-5 border border-[#2d3248]">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                  <h3 className="text-lg font-semibold text-white">You may want to investigate this case further</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-300 list-disc pl-5">
                  {parsedSummary.investigation?.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
                  Was this helpful? 
                  <button className="hover:text-white"><ThumbsUp className="w-4 h-4" /></button>
                  <button className="hover:text-white"><ThumbsDown className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Column 2 */}
              <div className="p-2">
                <h3 className="text-lg font-semibold text-white mb-4">What Actually Happened?</h3>
                <div className="flex gap-4 mb-4 text-sm">
                  <span className="text-gray-400">Based on:</span>
                  <span className="text-gray-200 font-medium">1 Alert</span>
                  <span className="text-gray-200 font-medium">Multiple Events</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {parsedSummary.whatHappened}
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
                  Was this helpful? 
                  <button className="hover:text-white"><ThumbsUp className="w-4 h-4" /></button>
                  <button className="hover:text-white"><ThumbsDown className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Column 3 */}
              <div className="p-2">
                <h3 className="text-lg font-semibold text-white mb-4">The Next Steps You Should Take</h3>
                <ol className="space-y-4 text-sm text-gray-300 list-decimal pl-4">
                  {parsedSummary.nextSteps?.map((step: string, i: number) => (
                    <li key={i} className="pl-2">{step}</li>
                  ))}
                </ol>
                <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
                  Was this helpful? 
                  <button className="hover:text-white"><ThumbsUp className="w-4 h-4" /></button>
                  <button className="hover:text-white"><ThumbsDown className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-red-400">
              Failed to load AI summary. Please try refreshing.
            </div>
          )}
        </div>
      </div>

      {/* Raw Description / Pending Actions */}
      <div className="bg-[#25293c] rounded-lg overflow-hidden border border-[#343b54] shadow-lg">
        <div className="bg-[#2d3248]/50 p-4 border-b border-[#343b54] flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-gray-400" />
            Pending actions
          </h2>
          <span className="text-indigo-400 font-bold text-sm bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Reward: +{quest.xpReward} XP
          </span>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Raw Alert Data</h3>
            <div className="bg-[#1e2130] rounded-lg p-4 text-gray-300 whitespace-pre-wrap font-mono text-sm border border-[#2d3248]">
              {quest.description || "No description provided."}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#343b54]">
            <button 
              onClick={handleResolve}
              disabled={isResolving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-8 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResolving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {isResolving ? 'Resolving...' : 'Mark as Resolved'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
