
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ComposedChart, Legend
} from 'recharts';
import { 
  Users, Ticket, Clock, CheckCircle2, TrendingUp, TrendingDown, 
  Calendar, Filter, User, ArrowUpRight, Award, Zap, ShieldAlert,
  ChevronRight, MoreVertical, Star, Target, Users2, Activity,
  Search, Download, Layers, Briefcase, GraduationCap
} from 'lucide-react';
import { MOCK_ENGINEERS } from '../constants';

const throughputData = [
  { name: '02-08', L1: 45, L2: 12, total: 57 },
  { name: '02-09', L1: 52, L2: 15, total: 67 },
  { name: '02-10', L1: 48, L2: 10, total: 58 },
  { name: '02-11', L1: 61, L2: 18, total: 79 },
  { name: '02-12', L1: 55, L2: 14, total: 69 },
  { name: '02-13', L1: 67, L2: 22, total: 89 },
  { name: '02-14', L1: 59, L2: 16, total: 75 },
];

const teamComparison = [
  { subject: '工单吞吐', L1: 95, L2: 40, full: 100 },
  { subject: '响应速度', L1: 98, L2: 30, full: 100 },
  { subject: '解决深度', L1: 20, L2: 95, full: 100 },
  { subject: '满意度', L1: 92, L2: 98, full: 100 },
  { subject: 'SLA达成', L1: 97, L2: 94, full: 100 },
];

const categoryData = [
  { name: '基础外设', value: 450 },
  { name: '软件故障', value: 380 },
  { name: '账号权限', value: 290 },
  { name: '疑难杂症', value: 120 },
];

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#10b981'];

const PerformanceAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7天');
  const [selectedTeam, setSelectedTeam] = useState<'ALL' | 'L1' | 'L2'>('ALL');
  const [engineerSearch, setEngineerSearch] = useState('');

  const filteredEngineers = MOCK_ENGINEERS.filter(e => {
    const matchesTeam = selectedTeam === 'ALL' ? true : e.team === selectedTeam;
    const matchesSearch = e.name.toLowerCase().includes(engineerSearch.toLowerCase());
    return matchesTeam && matchesSearch;
  }).sort((a, b) => b.resolvedCount - a.resolvedCount);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f9] p-8 animate-in fade-in duration-500 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest">Efficiency Portal</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">L1 & L2 Teams</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">IT 效能指挥中心</h1>
            <p className="text-slate-400 font-medium mt-1">深度透视大规模 IT 团队的服务产出、协作深度与用户满意度指标。</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
              {['7天', '30天', '90天'].map(r => (
                <button 
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${timeRange === r ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm">
              <Download size={20} />
            </button>
          </div>
        </header>

        {/* Aggregate Team Pulse */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users2 size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black">
                <TrendingUp size={12} /> +12%
              </div>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">在册工程师总量</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">124 <span className="text-sm font-bold text-slate-300 font-sans">人</span></h3>
            <div className="mt-4 flex items-center gap-3 text-[10px] font-bold">
               <span className="text-sky-500 bg-sky-50 px-2 py-0.5 rounded">L1: 82</span>
               <span className="text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">L2: 42</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Ticket size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black">
                <TrendingUp size={12} /> +8.4%
              </div>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">本周闭单量</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">1,862 <span className="text-sm font-bold text-slate-300 font-sans">单</span></h3>
            <p className="mt-4 text-[10px] font-bold text-slate-400">平均单人闭单: 15.0 / 周</p>
          </div>

          <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div className="flex items-center gap-1 text-rose-600 text-[10px] font-black">
                <TrendingDown size={12} /> -5.2%
              </div>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">平均响应时长 (ASA)</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">8.2 <span className="text-sm font-bold text-slate-300 font-sans">min</span></h3>
            <p className="mt-4 text-[10px] font-bold text-emerald-500">优于 SLA 标准 (15min)</p>
          </div>

          <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <div className="flex items-center gap-1 text-sky-600 text-[10px] font-black">
                <Activity size={12} /> 稳健
              </div>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">知识库转化率</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">68.5 <span className="text-sm font-bold text-slate-300 font-sans">%</span></h3>
            <p className="mt-4 text-[10px] font-bold text-slate-400">通过 KB 自助解决工单量</p>
          </div>
        </div>

        {/* Team Tier Analysis (L1 vs L2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Workload Funnel Chart */}
          <section className="lg:col-span-8 bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900">一线/二线团队效能对比</h3>
                <p className="text-sm font-bold text-slate-400 mt-1">展现 L1 快速吞吐与 L2 疑难攻关的资源分配差异</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-sky-500 shadow-sm shadow-sky-200"></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase">L1 Frontline</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm shadow-indigo-200"></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase">L2 Specialists</span>
                 </div>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={throughputData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="L1" stackId="a" fill="#0ea5e9" barSize={32} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="L2" stackId="a" fill="#6366f1" barSize={32} radius={[10, 10, 0, 0]} />
                  <Line type="monotone" dataKey="total" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#94a3b8' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Radar Style Comparison Table */}
          <section className="lg:col-span-4 bg-slate-900 rounded-[40px] p-10 text-white flex flex-col h-[500px] shadow-2xl shadow-slate-900/20 overflow-hidden relative">
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-sky-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">
              <Layers size={20} className="text-sky-400" /> 团队核心素质矩阵
            </h3>
            <p className="text-slate-400 text-xs font-bold mb-8">对比多维度的职能表现差异</p>
            
            <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
              {teamComparison.map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest">{item.subject}</span>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-black text-sky-400">L1: {item.L1}%</span>
                      <span className="text-[10px] font-black text-indigo-400">L2: {item.L2}%</span>
                    </div>
                  </div>
                  <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-sky-500 transition-all duration-1000" style={{ width: `${item.L1}%`, opacity: 0.8 }}></div>
                    <div className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${item.L2}%`, opacity: 0.6 }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
               <div className="flex-1 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase">L1 平均响应</p>
                  <p className="text-xl font-black text-sky-400">8.5 min</p>
               </div>
               <div className="w-px bg-white/5"></div>
               <div className="flex-1 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase">L2 平均响应</p>
                  <p className="text-xl font-black text-indigo-400">12.2 hr</p>
               </div>
            </div>
          </section>
        </div>

        {/* Engineer Leaderboard for Large Teams */}
        <section className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-10 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">工程师全量绩效排名</h3>
              <p className="text-sm font-bold text-slate-400 mt-2">支持按照一二线团队进行精准切分，多维度穿透个人绩效盲点。</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group min-w-[300px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="搜索工程师姓名..."
                  className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-sky-500/10"
                  value={engineerSearch}
                  onChange={(e) => setEngineerSearch(e.target.value)}
                />
              </div>

              <div className="flex bg-slate-100 rounded-2xl p-1.5 border border-slate-200">
                <button 
                  onClick={() => setSelectedTeam('ALL')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${selectedTeam === 'ALL' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  全员 (124)
                </button>
                <button 
                  onClick={() => setSelectedTeam('L1')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${selectedTeam === 'L1' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  一线 L1 (82)
                </button>
                <button 
                  onClick={() => setSelectedTeam('L2')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${selectedTeam === 'L2' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  二线 L2 (42)
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">排名</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">工程师</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">职能级别</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">本周闭单量</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">SLA 达成率</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">平均分</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">效能趋势</th>
                  <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEngineers.map((eng, idx) => (
                  <tr key={eng.id} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                    <td className="px-10 py-6">
                       <span className={`text-sm font-black ${idx < 3 ? 'text-slate-900' : 'text-slate-300'}`}>
                         {(idx + 1).toString().padStart(2, '0')}
                       </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg transition-transform group-hover:scale-110 ${
                          eng.team === 'L1' ? 'bg-sky-500 shadow-sky-100' : 'bg-indigo-600 shadow-indigo-100'
                        }`}>
                          {eng.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 flex items-center gap-2">
                            {eng.name}
                            {idx === 0 && <Award size={14} className="text-amber-500" />}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Active: {eng.activeTickets} 正在处理</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${eng.team === 'L1' ? 'text-sky-600' : 'text-indigo-600'}`}>
                          {eng.team === 'L1' ? 'L1 Frontline Support' : 'L2 Senior Specialist'}
                        </span>
                        <div className="flex gap-1 mt-1.5">
                           {[1,2,3,4,5].map(s => (
                             <div key={s} className={`h-1 w-3 rounded-full ${s <= (eng.team === 'L1' ? 2 : 4) ? (eng.team === 'L1' ? 'bg-sky-400' : 'bg-indigo-400') : 'bg-slate-100'}`}></div>
                           ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className="text-lg font-black text-slate-800">{eng.resolvedCount}</span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`text-sm font-black ${eng.slaCompliance > 98 ? 'text-emerald-600' : 'text-amber-600'}`}>{eng.slaCompliance}%</span>
                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                           <div className="bg-emerald-500 h-full" style={{ width: `${eng.slaCompliance}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                       <div className="flex items-center justify-center gap-1">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span className="text-sm font-black text-slate-800">{(eng.satisfaction/20).toFixed(1)}</span>
                       </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                       <div className="flex justify-center">
                          <TrendingUp size={18} className={idx % 3 === 0 ? 'text-emerald-500' : 'text-slate-300'} />
                       </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-10 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center">
             <p className="text-xs font-bold text-slate-400">显示 {filteredEngineers.length} / 124 位团队成员的效能档案</p>
             <div className="flex items-center gap-2">
                <button className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-black text-slate-400 disabled:opacity-50">Previous</button>
                <div className="flex gap-1">
                   <button className="w-10 h-10 rounded-xl bg-slate-900 text-white text-xs font-black">1</button>
                   <button className="w-10 h-10 rounded-xl hover:bg-white text-slate-400 text-xs font-black">2</button>
                   <button className="w-10 h-10 rounded-xl hover:bg-white text-slate-400 text-xs font-black">3</button>
                </div>
                <button className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-black text-slate-600 hover:shadow-sm">Next Page</button>
             </div>
          </div>
        </section>

        {/* Comparison Strategy Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col group">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl"><Zap size={28} /></div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">L1 团队：流量洪峰承载力</h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">基于大基数用户反馈的响应指标</p>
                </div>
              </div>
              <div className="space-y-6 flex-1">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">一线团队目前处理了 85% 的全公司工单。虽然闭单量极高，但注意到“账号重置”类工单有 15% 的二次回流率。建议针对此类常见问题引入 AI 自动解锁流程，进一步降低 L1 同事的基础性重复劳动。</p>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">吞吐饱和度</span>
                      <span className="text-xs font-black text-sky-600">82.4% Normal</span>
                   </div>
                   <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full w-[82.4%] transition-all duration-1000"></div>
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col group">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><ShieldAlert size={28} /></div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">L2 团队：疑难技术攻坚力</h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">针对复杂系统架构的服务深度</p>
                </div>
              </div>
              <div className="space-y-6 flex-1">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">二线团队目前在 SAP 专项问题和全公司网络链路优化上投入了 72% 的工时。SLA 响应虽然较慢，但闭单质量（用户满意度）极高。当前主要瓶颈在于三线厂商 (L3 Vendor) 的响应同步较慢。</p>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">解决复杂度均值</span>
                      <span className="text-xs font-black text-indigo-600">High Tier</span>
                   </div>
                   <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[94.1%] transition-all duration-1000"></div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
