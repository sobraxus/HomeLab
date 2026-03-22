import { Plus, BarChart2 } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-16 bg-[#0f172a] border-b border-[#1e293b] flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-white font-semibold hover:text-indigo-300 transition-colors">
          <Plus className="w-5 h-5" />
          New Case
        </button>
        
        <div className="h-6 w-px bg-[#1e293b]"></div>
        
        <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
          My tasks
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">1</span>
        </button>
        
        <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
          Waiting tasks
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">30</span>
        </button>
        
        <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
          Alerts
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">191</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="h-6 w-px bg-[#1e293b]"></div>
        <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
          <BarChart2 className="w-5 h-5" />
          Statistics
        </button>
      </div>
    </header>
  );
}
