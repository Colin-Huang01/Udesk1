
import React from 'react';
import { 
  Users, Ticket, Clock, CheckCircle2, TrendingUp, 
  TrendingDown, Minus, ArrowRight, HelpCircle, Laptop, 
  ShieldAlert, Search, Plus, Cpu, Globe, AppWindow,
  Newspaper, Stars, AlertTriangle, MessageSquare, ExternalLink
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
// Added KNOWLEDGE_CATEGORIES to the import to resolve category name
import { KNOWLEDGE_ARTICLES, COMPANY_NEWS, KNOWLEDGE_CATEGORIES } from '../constants';

const ticketData = [
  { name: '周一', 软件应用: 65, 硬件故障: 28, 网络连接: 45 },
  { name: '周二', 软件应用: 59, 硬件故障: 48, 网络连接: 25 },
  { name: '周三', 软件应用: 80, 硬件故障: 40, 网络连接: 60 },
  { name: '周四', 软件应用: 81, 硬件故障: 19, 网络连接: 45 },
  { name: '周五', 软件应用: 56, 硬件故障: 86, 网络连接: 30 },
  { name: '周六', 软件应用: 40, 硬件故障: 27, 网络连接: 20 },
  { name: '周日', 软件应用: 30, 硬件故障: 20, 网络连接: 15 },
];

const resolutionData = [
  { name: '知识库自助', value: 45, color: '#0ea5e9' },
  { name: '人工处理', value: 35, color: '#6366f1' },
  { name: '升级处理', value: 20, color: '#f59e0b' },
];

const tagsData = [
  { label: '响应慢', count: 32, color: 'bg-rose-500' },
  { label: '服务态度好', count: 28, color: 'bg-sky-500' },
  { label: 'VPN 连接问题', count: 15, color: 'bg-indigo-500' },
  { label: '密码重置', count: 12, color: 'bg-amber-500' },
];

const StatMiniCard = ({ label, value, trend, trendValue, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative group hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <div className={`p-2 rounded-lg bg-slate-50 text-slate-300 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors`}>
        <Icon size={16} />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
      <span className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
        trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
      }`}>
        {trend === 'up' ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
        {trendValue}
      </span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 grid grid-cols-1 xl:grid-cols-12 gap-8 animate-in fade-in duration-700">
      
      {/* Left Column (8 units) */}
      <div className="xl:col-span-8 space-y-8">
        
        {/* News Section */}
        <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Newspaper className="text-sky-500" size={24} /> 公司动态
            </h3>
            <button className="text-xs font-bold text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-1">
              查看全部 <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {COMPANY_NEWS.map(news => (
              <div key={news.id} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-2xl transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                    news.tag === '维护' ? 'bg-amber-100 text-amber-600' : 
                    news.tag === '通知' ? 'bg-sky-100 text-sky-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {news.tag}
                  </span>
                  <p className="text-sm font-bold text-slate-700 group-hover:text-sky-600 transition-colors">{news.title}</p>
                </div>
                <span className="text-[11px] font-medium text-slate-400">{news.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Knowledge Base Search Area */}
        <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">IT 知识库</h2>
              <p className="text-sm font-medium text-slate-400 mt-1">快速查找硬件故障、网络连接及软件应用解决方案。</p>
            </div>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 hover:bg-black transition-all flex items-center gap-2">
              <Plus size={16} /> 新建条目
            </button>
          </div>

          <div className="relative mb-8 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="搜索错误代码、操作流程或标签..."
              className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-sky-500/20"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-30">
               <kbd className="h-5 px-1.5 border border-slate-300 rounded text-[10px] font-bold">⌘</kbd>
               <kbd className="h-5 px-1.5 border border-slate-300 rounded text-[10px] font-bold">K</kbd>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Cpu, label: '硬件故障', count: 45, color: 'bg-sky-50 text-sky-500' },
              { icon: Globe, label: '网络连接', count: 28, color: 'bg-indigo-50 text-indigo-500' },
              { icon: AppWindow, label: '软件应用', count: 62, color: 'bg-amber-50 text-amber-500' },
            ].map((cat, idx) => (
              <div key={idx} className="p-6 rounded-3xl border border-slate-100 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/5 transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                  <cat.icon size={24} />
                </div>
                <h4 className="text-base font-black text-slate-800">{cat.label}</h4>
                <p className="text-xs font-bold text-slate-400 mt-1">{cat.count} 篇文章</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
               <Stars className="text-amber-400" size={18} /> 热门解决方案
            </h3>
            <button className="text-xs font-bold text-sky-600 hover:underline">查看全部</button>
          </div>

          <div className="space-y-4">
            {KNOWLEDGE_ARTICLES.map(art => (
              <div key={art.id} className="p-5 rounded-2xl border border-slate-50 hover:border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-sm transition-all flex items-center gap-5 cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <HelpCircle size={22} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{art.title}</h5>
                  <div className="flex items-center gap-4 mt-2">
                    {/* Fixed art.category by looking up the name from KNOWLEDGE_CATEGORIES using mainCategoryId */}
                    <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                      {KNOWLEDGE_CATEGORIES.find(c => c.id === art.mainCategoryId)?.name || 'IT分类'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={12} /> {art.updatedAt}</span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 ml-auto"><Users size={12} /> {art.views}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column (4 units) - Analytics */}
      <div className="xl:col-span-4 space-y-8">
        
        <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800">IT 效能洞察</h3>
            <select className="text-[11px] font-bold border-slate-100 rounded-lg bg-slate-50 py-1.5 pl-3 pr-8 focus:ring-sky-500 cursor-pointer">
              <option>近 7 天</option>
              <option>近 30 天</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <StatMiniCard label="总工单量" value="1,248" trend="up" trendValue="12%" icon={Ticket} />
            <StatMiniCard label="平均解决时长" value="4.2h" trend="down" trendValue="8%" icon={Clock} />
            <StatMiniCard label="SLA 违规率" value="2.1%" trend="up" trendValue="0.5%" icon={AlertTriangle} />
            <StatMiniCard label="满意度 (CSAT)" value="4.8" trend="neutral" trendValue="持平" icon={Stars} />
          </div>

          <div className="bg-slate-50/50 rounded-3xl p-6 mb-8 flex flex-col h-64 border border-slate-100">
            <h4 className="text-xs font-black text-slate-800 mb-6 flex justify-between items-center">
              工单量统计 (按类型)
              <button className="text-slate-300 hover:text-slate-500"><ExternalLink size={14} /></button>
            </h4>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketData.slice(0, 5)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <Bar dataKey="软件应用" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={8} />
                  <Bar dataKey="硬件故障" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={8} />
                  <Bar dataKey="网络连接" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div><span className="text-[9px] font-bold text-slate-500 uppercase">软件</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-sky-500"></div><span className="text-[9px] font-bold text-slate-500 uppercase">硬件</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div><span className="text-[9px] font-bold text-slate-500 uppercase">网络</span></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col items-center">
               <h4 className="text-[11px] font-black text-slate-800 mb-4 uppercase tracking-widest self-start">解决方式分布</h4>
               <div className="relative w-full h-32 flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie data={resolutionData} cx="50%" cy="50%" innerRadius={35} outerRadius={45} paddingAngle={5} dataKey="value" stroke="none">
                        {resolutionData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                     </Pie>
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-black text-slate-900">100%</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">解决率</span>
                 </div>
               </div>
            </div>
            <div className="space-y-4">
               <h4 className="text-[11px] font-black text-slate-800 mb-4 uppercase tracking-widest">高频反馈标签</h4>
               {tagsData.map(tag => (
                 <div key={tag.label} className="space-y-1.5">
                   <div className="flex justify-between text-[10px] font-bold text-slate-600">
                     <span>{tag.label}</span>
                     <span>{tag.count} 次</span>
                   </div>
                   <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                     <div className={`${tag.color} h-full transition-all duration-1000`} style={{ width: `${(tag.count / 35) * 100}%` }}></div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
