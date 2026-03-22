import Link from 'next/link';
import { 
  FolderOpen, 
  Briefcase, 
  ShieldAlert, 
  Activity, 
  Settings, 
  Bell, 
  BarChart2, 
  ShoppingBag,
  Target
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#212538] border-r border-[#2d3248] flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          TriageRPG
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-2">Main</div>
        <Link href="/" className="flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
          <FolderOpen className="w-5 h-5" />
          Cases
        </Link>
        <Link href="/" className="flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
          <Briefcase className="w-5 h-5" />
          Your Workdesk
        </Link>

        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-2">Operations</div>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
            <ShieldAlert className="w-5 h-5" />
            Investigation
          </button>
          
          {/* Active Submenu Example */}
          <div className="bg-[#1a1d2d] rounded-lg overflow-hidden">
            <button className="w-full flex items-center gap-3 px-2 py-2.5 text-indigo-400 bg-[#2d3248]/50">
              <Target className="w-5 h-5" />
              Detection
            </button>
            <div className="pl-10 py-2 space-y-2">
              <Link href="#" className="block text-sm text-gray-400 hover:text-white">Rules & Detections</Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-white">Alerts & IOCs</Link>
              <Link href="#" className="block text-sm text-gray-400 hover:text-white">Risk Analytics</Link>
            </div>
          </div>

          <button className="w-full flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
            <Activity className="w-5 h-5" />
            Response
          </button>
        </div>

        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-2">Management</div>
        <Link href="#" className="flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
          <BarChart2 className="w-5 h-5" />
          Dashboards & Reports
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          Incident Manager
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
          <ShoppingBag className="w-5 h-5" />
          Marketplace
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2.5 text-gray-300 hover:text-white hover:bg-[#2d3248] rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>
      
      {/* User Mini Profile */}
      <div className="p-4 border-t border-[#2d3248]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            T1
          </div>
          <div>
            <div className="text-sm font-medium text-white">Tier 1 Analyst</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
