
import React, { useState } from 'react';
import { 
  Search, Filter, ListFilter, Plus, Download, 
  MessageSquare, Mail, Smartphone, Clock, AlertCircle,
  MoreHorizontal, ChevronDown, CheckCircle2, RotateCcw,
  User, Hash, Tag, ArrowUpRight, Inbox, Clock4,
  CheckCircle, ShieldAlert, MoreVertical
} from 'lucide-react';
import { Ticket, TicketStatus, Priority } from '../types';
import { MOCK_TICKETS } from '../constants';

interface TicketCenterProps {
  onSelectTicket: (id: string) => void;
}

const TicketCenter: React.FC<TicketCenterProps> = ({ onSelectTicket }) => {
  const [tickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: '全部工单', icon: <Inbox size={16} />, count: 124 },
    { id: 'mine', label: '我的工单', icon: <User size={16} />, count: 12 },
    { id: 'pending', label: '待处理', icon: <Clock4 size={16} />, count: 5 },
    { id: 'resolved', label: '已解决', icon: <CheckCircle size={16} />, count: 86 },
    { id: 'suspended', label: '已挂起', icon: <ShieldAlert size={16} />, count: 2 },
  ];

  const getStatusStyle = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.NEW: return 'text-sky-500';
      case TicketStatus.PENDING: return 'text-indigo-500';
      case TicketStatus.RESOLVED: return 'text-emerald-500';
      case TicketStatus.CLOSED: return 'text-slate-400';
      case TicketStatus.SUSPENDED: return 'text-amber-500';
      default: return 'text-slate-500';
    }
  };

  // Fix: Wrapped icons with span to handle 'title' attribute which is not a valid prop for Lucide components
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'DingTalk': return <span title="来自钉钉"><Smartphone size={14} className="text-sky-500" /></span>;
      case 'Email': return <span title="来自邮件"><Mail size={14} className="text-indigo-500" /></span>;
      default: return <MessageSquare size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#f4f7f9]">
      {/* 左侧：过滤器侧边栏 */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 animate-in slide-in-from-left duration-300">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-[13px] font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest">
             <ListFilter size={18} className="text-sky-500" /> 工单队列
           </h3>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                activeFilter === filter.id 
                  ? 'bg-sky-50 text-sky-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {filter.icon}
                <span>{filter.label}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeFilter === filter.id ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {filter.count}
              </span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-50">
           <button className="w-full py-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-sky-300 hover:text-sky-500 transition-all flex items-center justify-center gap-2">
             <Plus size={14} /> 新建过滤器
           </button>
        </div>
      </aside>

      {/* 右侧：工单列表主视图 */}
      <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
        
        {/* 工具栏 */}
        <header className="p-6 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
             <div className="relative flex-1 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="搜索工单号、标题、创建人或描述..."
                 className="w-full h-11 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-4 focus:ring-sky-500/10 transition-all"
               />
             </div>
             <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-colors">
               <Filter size={18} />
             </button>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
               <Download size={18} /> 导出
             </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-900/10">
               <Plus size={18} /> 创建工单
             </button>
          </div>
        </header>

        {/* 表格区 */}
        <div className="flex-1 overflow-auto custom-scrollbar p-6">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
             <table className="w-full text-left border-collapse min-w-[1200px]">
               <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100">
                 <tr>
                   <th className="w-12 px-6 py-5">
                     <input type="checkbox" className="rounded border-slate-200 text-sky-500" />
                   </th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">工单信息</th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">状态</th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">优先级</th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">服务项</th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">SLA 状态</th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">来源</th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">受理人</th>
                   <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right pr-10">创建时间</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {tickets.map((ticket) => (
                   <tr 
                     key={ticket.id} 
                     className="group hover:bg-sky-50/40 transition-all cursor-pointer"
                     onClick={() => onSelectTicket(ticket.id)}
                   >
                     <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                       <input type="checkbox" className="rounded border-slate-200 text-sky-500" />
                     </td>
                     <td className="px-6 py-5 max-w-xs">
                       <div className="flex flex-col">
                         <span className="text-[10px] font-mono font-bold text-slate-400 mb-1">#{ticket.ticketNo}</span>
                         <span className="text-sm font-black text-slate-800 truncate group-hover:text-sky-600 transition-colors">{ticket.subject}</span>
                       </div>
                     </td>
                     <td className="px-6 py-5 text-center">
                       <div className={`flex items-center justify-center gap-1.5 font-bold text-xs ${getStatusStyle(ticket.status)}`}>
                         <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusStyle(ticket.status).replace('text', 'bg')}`}></div>
                         {ticket.status}
                       </div>
                     </td>
                     <td className="px-6 py-5 text-center">
                       <span className={`px-3 py-1 rounded-lg text-[10px] font-black border ${
                         ticket.priority === Priority.URGENT ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                         ticket.priority === Priority.HIGH ? 'bg-amber-50 text-amber-600 border-amber-100' :
                         'bg-slate-50 text-slate-500 border-slate-100'
                       }`}>
                         {ticket.priority}
                       </span>
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-slate-700">{ticket.category}</span>
                          <span className="text-[10px] font-medium text-slate-400 mt-0.5">{ticket.subCategory}</span>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                       <div className="flex items-center gap-2">
                         <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                         <div>
                           <p className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">已响应</p>
                           <p className="text-[9px] font-bold text-slate-300">剩余 1.5h 处理</p>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-5 text-center">
                       <div className="flex justify-center">
                         {getSourceIcon(ticket.source)}
                       </div>
                     </td>
                     <td className="px-6 py-5">
                       <div className="flex items-center gap-2">
                         <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[10px]">
                            {ticket.agentName[0]}
                         </div>
                         <span className="text-xs font-bold text-slate-600">{ticket.agentName}</span>
                       </div>
                     </td>
                     <td className="px-6 py-5 text-right pr-10">
                        <p className="text-xs font-bold text-slate-500">{ticket.createdAt.split(' ')[0]}</p>
                        <p className="text-[10px] font-medium text-slate-300 mt-0.5">{ticket.createdAt.split(' ')[1]}</p>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* 分页与底栏 */}
        <footer className="px-10 py-5 bg-white border-t border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <span className="text-xs font-bold text-slate-400">每页显示:</span>
              <select className="text-xs font-black border-none bg-slate-50 rounded-lg py-1.5 pl-3 pr-8 focus:ring-sky-500">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
           </div>
           <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 cursor-not-allowed">
                 <RotateCcw size={16} />
              </button>
              <div className="flex gap-1">
                <button className="w-10 h-10 rounded-xl bg-sky-500 text-white text-xs font-black shadow-lg shadow-sky-500/20">1</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-50 text-slate-400 text-xs font-bold hover:bg-slate-50 transition-all">2</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-50 text-slate-400 text-xs font-bold hover:bg-slate-50 transition-all">3</button>
              </div>
              <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 transition-all">
                 <MoreHorizontal size={16} />
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default TicketCenter;
