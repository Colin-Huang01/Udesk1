
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import TicketDetail from './components/TicketDetail';
import TicketCenter from './views/TicketCenter'; // 新增集成
import KnowledgeBase from './views/KnowledgeBase';
import CustomerCenter from './views/CustomerCenter';
import PerformanceAnalytics from './views/PerformanceAnalytics';
import Settings from './views/Settings';
import { MOCK_TICKETS } from './constants';
import { Ticket, TicketStatus, Priority } from './types';
import { 
  Search, Bell, Sun, Moon
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t));
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return '仪表盘 / 知识库与效能分析';
      case 'tickets': return '工单中心 / 工单队列';
      case 'customers': return '客户中心 / 全量员工档案';
      case 'kb': return '知识库 / IT 自助服务';
      case 'analytics': return '效能统计 / 团队 KPI 看板';
      case 'settings': return '系统设置 / 全局参数配置';
      default: return 'IT 运维中心';
    }
  };

  return (
    <div className={`flex h-screen w-full bg-[#f4f7f9] overflow-hidden ${darkMode ? 'dark' : ''}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Global Header */}
        <header className="h-[64px] px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 z-40">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <div className="flex items-center gap-2 text-slate-400 mr-4">
               <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{activeTab === 'dashboard' ? '首页' : (activeTab === 'kb' || activeTab === 'analytics') ? '学习与洞察' : activeTab === 'settings' ? '配置' : '管理'}</span>
               <span className="text-slate-200">/</span>
               <span className="text-xs font-black text-slate-800 truncate">{getPageTitle()}</span>
            </div>
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="快速全局搜索..." 
                className="w-full h-10 pl-10 pr-4 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-6 w-px bg-slate-100 mx-2"></div>
            <div className="flex items-center gap-2 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-800 group-hover:text-sky-600 transition-colors">Admin 王</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">高级运维工程师</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 ring-2 ring-indigo-50 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">W</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex">
          {activeTab === 'dashboard' ? (
            <div className="flex-1 overflow-y-auto custom-scrollbar"><Dashboard /></div>
          ) : activeTab === 'kb' ? (
            <KnowledgeBase />
          ) : activeTab === 'customers' ? (
            <CustomerCenter />
          ) : activeTab === 'analytics' ? (
            <PerformanceAnalytics />
          ) : activeTab === 'settings' ? (
            <Settings />
          ) : activeTab === 'tickets' ? ( // 正确分发到 TicketCenter
            <TicketCenter onSelectTicket={(id) => setSelectedTicketId(id)} />
          ) : null}
        </div>

        {selectedTicket && (
          <TicketDetail 
            ticket={selectedTicket} 
            onClose={() => setSelectedTicketId(null)}
            onUpdateStatus={updateTicketStatus}
          />
        )}
      </main>
    </div>
  );
};

export default App;
