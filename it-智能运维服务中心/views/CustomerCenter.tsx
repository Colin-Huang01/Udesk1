
import React, { useState } from 'react';
import { 
  Search, Users, Star, MapPin, Building2, Briefcase, 
  Phone, Mail, Smartphone, History, ChevronRight, X,
  Filter, MoreHorizontal, Download, UserPlus, ShieldCheck,
  Calendar, CreditCard, ChevronDown, GraduationCap, UserCircle
} from 'lucide-react';
import { MOCK_USERS, MOCK_TICKETS } from '../constants';
import { UserInfo, UserRole, TicketStatus } from '../types';

const CustomerCenter: React.FC = () => {
  const [users] = useState<UserInfo[]>(Object.values(MOCK_USERS));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('全部子公司');
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  const subsidiaries = ['全部子公司', '无锡药明康德 (WX)', '上海研发中心 (SH)', '药明生物 (WXB)'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.employeeNo.includes(searchTerm) ||
      user.department.includes(searchTerm);
    const matchesSub = selectedSubsidiary === '全部子公司' ? true : user.subsidiary === selectedSubsidiary;
    return matchesSearch && matchesSub;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.INTERN:
        return <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black">实习生</span>;
      case UserRole.FULL_TIME:
        return <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-600 border border-sky-100 text-[10px] font-black">正式员工</span>;
      case UserRole.VIP:
        return <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-black">VIP</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden relative bg-[#f4f7f9]">
      <div className="flex-1 flex flex-col overflow-hidden p-8 animate-in fade-in duration-500">
        
        {/* 顶部统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">全量客户总数</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">24,512</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">VIP 等级客户</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">1,204</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">正式员工</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">21,890</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <GraduationCap size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">实习生/外包</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">2,622</h3>
            </div>
          </div>
        </div>

        {/* 搜索与子公司筛选 */}
        <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="搜索姓名、工号、部门或职位..."
                className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-4 focus:ring-sky-500/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                value={selectedSubsidiary}
                onChange={(e) => setSelectedSubsidiary(e.target.value)}
                className="h-12 pl-6 pr-10 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 appearance-none focus:ring-4 focus:ring-sky-500/10"
              >
                {subsidiaries.map(sub => <option key={sub}>{sub}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
              <Download size={18} /> 导出名单
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-900/10">
              <UserPlus size={18} /> 手动录入
            </button>
          </div>
        </div>

        {/* 客户列表 */}
        <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">客户信息</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">工号</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">子公司 / 部门</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">办公地点</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">用工状态</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">VIP 等级</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="group hover:bg-sky-50/40 transition-all cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-110 transition-transform">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{user.name}</p>
                          <p className="text-[11px] font-bold text-slate-400 mt-0.5">{user.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-mono font-bold text-slate-500">#{user.employeeNo}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{user.subsidiary}</span>
                        <span className="text-[10px] font-medium text-slate-400 mt-1">{user.department}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin size={14} className="text-slate-300" />
                        <span className="text-xs font-bold">{user.city}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-1">
                         {[...Array(3)].map((_, i) => (
                           <Star key={i} size={12} className={i < user.vipLevel ? "fill-amber-400 text-amber-400" : "text-slate-100"} />
                         ))}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 text-slate-400 hover:text-sky-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                           <History size={18} />
                         </button>
                         <button className="p-2 text-slate-400 hover:text-slate-600">
                           <MoreHorizontal size={18} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 客户全量详情侧边栏 */}
      {selectedUser && (
        <div className="w-[480px] bg-white border-l border-slate-200 shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
           <header className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
             <div className="flex items-center gap-3">
               <UserCircle className="text-sky-500" size={24} />
               <h3 className="text-lg font-black text-slate-900">客户全景档案</h3>
             </div>
             <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
               <X size={20} />
             </button>
           </header>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
              {/* 基本身份 */}
              <section className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-[32px] bg-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-2xl shadow-indigo-200 mb-6">
                  {selectedUser.name[0]}
                </div>
                <h4 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  {selectedUser.name}
                  {selectedUser.vipLevel > 0 && <Star size={20} className="fill-amber-400 text-amber-400" />}
                </h4>
                <p className="text-sm font-bold text-slate-400 mt-2">{selectedUser.position} · {selectedUser.employeeNo}</p>
                <div className="mt-4">
                  {getRoleBadge(selectedUser.role)}
                </div>
              </section>

              {/* 核心信息网格 */}
              <section className="grid grid-cols-2 gap-4">
                 {[
                   { icon: Building2, label: '所属公司', value: selectedUser.subsidiary },
                   { icon: Briefcase, label: '所属部门', value: selectedUser.department },
                   { icon: MapPin, label: '办公城市', value: selectedUser.city },
                   { icon: Calendar, label: '入职日期', value: selectedUser.joinDate },
                   { icon: Phone, label: '办公电话', value: selectedUser.phone },
                   { icon: Smartphone, label: '钉钉手机', value: selectedUser.dingTalkPhone },
                   { icon: Mail, label: '邮箱地址', value: selectedUser.email },
                   { icon: UserCircle, label: '直属经理', value: selectedUser.manager },
                 ].map((item, i) => (
                   <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                        <item.icon size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 break-all">{item.value}</p>
                   </div>
                 ))}
              </section>

              {/* 历史工单回顾 */}
              <section>
                <div className="flex items-center justify-between mb-4">
                   <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <History size={14} /> 历史工单记录 (2)
                   </h5>
                   <button className="text-[10px] font-black text-sky-600 hover:underline">查看全部</button>
                </div>
                <div className="space-y-3">
                   {MOCK_TICKETS.map(ticket => (
                     <div key={ticket.id} className="p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-lg hover:shadow-sky-500/5 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-mono font-bold text-slate-300">#{ticket.ticketNo}</span>
                           <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-black">{ticket.status}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1">{ticket.subject}</p>
                        <p className="text-[10px] text-slate-400 mt-2 font-medium">{ticket.createdAt}</p>
                     </div>
                   ))}
                </div>
              </section>

              {/* 持有资产清单 */}
              <section>
                 <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <CreditCard size={14} /> 当前持有 IT 资产 ({selectedUser.assets.length})
                 </h5>
                 <div className="space-y-3">
                    {selectedUser.assets.map(asset => (
                      <div key={asset.id} className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                          <CreditCard size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800 truncate">{asset.model}</p>
                          <p className="text-[10px] font-mono text-slate-400 mt-1">SN: {asset.sn}</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-300" />
                      </div>
                    ))}
                    {selectedUser.assets.length === 0 && (
                      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-xs font-bold text-slate-300">暂无关联资产信息</p>
                      </div>
                    )}
                 </div>
              </section>
           </div>

           <footer className="p-8 border-t border-slate-100 flex gap-3 bg-white">
              <button className="flex-1 py-4 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">编辑档案</button>
              <button className="flex-1 py-4 rounded-2xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 transition-all shadow-xl shadow-sky-500/20">发起新工单</button>
           </footer>
        </div>
      )}
    </div>
  );
};

export default CustomerCenter;
