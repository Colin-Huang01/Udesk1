
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Ticket as TicketIcon, 
  BookText, 
  BarChart3, 
  Settings, 
  Users, // 使用 Users 图标替换 MonitorCheck
  ChevronLeft,
  Menu
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: '仪表盘' },
    { id: 'tickets', icon: <TicketIcon size={22} />, label: '工单中心' },
    { id: 'customers', icon: <Users size={22} />, label: '客户中心' }, // 更新此处
    { id: 'kb', icon: <BookText size={22} />, label: '知识库' },
    { id: 'analytics', icon: <BarChart3 size={22} />, label: '效能统计' },
  ];

  return (
    <aside 
      className={`bg-slate-900 text-slate-400 flex flex-col h-full transition-all duration-300 ease-in-out z-50 shadow-2xl ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-5 flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-500/30 shrink-0">
          U
        </div>
        <span 
          className={`text-white font-bold text-lg tracking-tight whitespace-nowrap transition-all duration-300 ${
            isCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100 w-auto'
          }`}
        >
          IT 运维中心
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-x-hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative ${
              activeTab === item.id 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' 
                : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={`shrink-0 transition-transform duration-300 ${
              activeTab === item.id ? 'text-white' : 'group-hover:text-sky-400'
            }`}>
              {item.icon}
            </span>
            <span 
              className={`font-medium whitespace-nowrap transition-all duration-300 ${
                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}
            >
              {item.label}
            </span>
            {activeTab === item.id && !isCollapsed && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
            )}
            {activeTab === item.id && isCollapsed && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        <button 
          onClick={() => setActiveTab('settings')}
          title={isCollapsed ? '系统设置' : ''}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
            activeTab === 'settings' 
              ? 'bg-slate-700 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Settings 
            size={22} 
            className={`shrink-0 transition-colors ${activeTab === 'settings' ? 'text-sky-400' : ''}`} 
          />
          <span 
            className={`font-medium whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}
          >
            系统设置
          </span>
        </button>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-800 hover:text-sky-400 transition-all mt-2"
        >
          <div className="shrink-0 transition-transform duration-500" style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <ChevronLeft size={22} />
          </div>
          <span 
            className={`font-medium whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}
          >
            收起菜单
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
