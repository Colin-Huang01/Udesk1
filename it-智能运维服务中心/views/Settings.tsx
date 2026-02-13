
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Bell, Shield, Mail, MessageSquare, 
  Users, Zap, Clock, Globe, Laptop, Terminal, Save, 
  CheckCircle2, AlertCircle, RefreshCcw, Smartphone, 
  ChevronRight, Plus, Trash2, Edit2, Key, Database, MoreVertical
} from 'lucide-react';

type SettingsTab = 'general' | 'sla' | 'integrations' | 'templates' | 'team';

const Settings: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SettingsTab>('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('系统配置已成功同步并生效');
    }, 1000);
  };

  const menuItems = [
    { id: 'general', label: '通用服务配置', icon: SettingsIcon },
    { id: 'sla', label: 'SLA 服务水平协定', icon: Clock },
    { id: 'integrations', label: '渠道集成 (钉钉/邮件)', icon: Zap },
    { id: 'templates', label: '快捷回复模板库', icon: MessageSquare },
    { id: 'team', label: 'IT 团队与权限管理', icon: Users },
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'general':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="space-y-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                基础信息设置 <Globe size={18} className="text-sky-500" />
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">运维中心名称</label>
                  <input type="text" defaultValue="无锡 IT 智能运维中心" className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-sky-500/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">服务支持邮箱</label>
                  <input type="email" defaultValue="helpdesk@wuxi.com" className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-sky-500/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase">服务时段</label>
                  <select className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold">
                    <option>7 x 24 小时 (全天候)</option>
                    <option>5 x 8 小时 (法定工作日)</option>
                    <option>5 x 12 小时 (含加班时段)</option>
                  </select>
                </div>
              </div>
            </section>
            
            <section className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-sky-500 shadow-sm">
                  <Bell size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800">全局通知推送</h4>
                  <p className="text-xs font-bold text-slate-400">当工单即将逾期或收到紧急工单时通知管理员</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-6 bg-sky-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'sla':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800">SLA 响应与解决标准</h3>
                <p className="text-xs font-bold text-slate-400 mt-1">根据不同优先级设置工单处理的考核基准线</p>
              </div>
              <button className="text-sky-600 font-bold text-sm flex items-center gap-1 hover:underline"><RefreshCcw size={14} /> 重置为默认</button>
            </header>

            <div className="space-y-4">
              {[
                { priority: '紧急 (Urgent)', color: 'text-rose-600 bg-rose-50', resp: '15min', res: '4h' },
                { priority: '高 (High)', color: 'text-amber-600 bg-amber-50', resp: '30min', res: '8h' },
                { priority: '中 (Medium)', color: 'text-sky-600 bg-sky-50', resp: '2h', res: '24h' },
                { priority: '低 (Low)', color: 'text-slate-500 bg-slate-100', resp: '4h', res: '48h' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 rounded-[28px] flex items-center justify-between group hover:border-sky-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${item.color.split(' ')[0].replace('text', 'bg')}`}></div>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${item.color}`}>{item.priority}</span>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">响应限时</p>
                      <input type="text" defaultValue={item.resp} className="w-20 text-center bg-slate-50 border-none rounded-lg text-xs font-black py-1.5" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">解决限时</p>
                      <input type="text" defaultValue={item.res} className="w-20 text-center bg-slate-50 border-none rounded-lg text-xs font-black py-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-2 gap-8">
                {/* DingTalk Card */}
                <div className="bg-white border border-slate-100 rounded-[32px] p-8 space-y-6 shadow-sm">
                   <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#007fff]/10 flex items-center justify-center text-[#007fff]">
                        <Smartphone size={32} />
                      </div>
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100">已连接</span>
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-slate-900">钉钉 (DingTalk) 集成</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1">自动同步钉钉群聊及私聊上报的 IT 故障</p>
                   </div>
                   <div className="space-y-4 pt-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AppKey</label>
                        <div className="flex gap-2">
                          <input type="password" value="dingp89xk200xlsk2" readOnly className="flex-1 bg-slate-50 border-slate-100 rounded-xl text-xs font-mono py-2.5 px-3" />
                          <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-sky-500"><Key size={16} /></button>
                        </div>
                      </div>
                      <button className="w-full py-3 rounded-xl border border-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-50">同步测试 (Sync Test)</button>
                   </div>
                </div>

                {/* Email Card */}
                <div className="bg-white border border-slate-100 rounded-[32px] p-8 space-y-6 shadow-sm">
                   <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Mail size={32} />
                      </div>
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100">已连接</span>
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-slate-900">邮件 (Helpdesk Email)</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1">监听 helpdesk@wuxi.com 邮件箱转化工单</p>
                   </div>
                   <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                         <span className="text-xs font-bold text-slate-600">IMAP 状态</span>
                         <span className="text-[10px] font-black text-emerald-600 uppercase">Connected (SSL)</span>
                      </div>
                      <button className="w-full py-3 rounded-xl border border-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-50">邮件轮询配置</button>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">快捷回复模板库</h3>
              <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold">
                <Plus size={16} /> 新增模板
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { tag: '常规', title: '确认受理告知', content: '您好，您的 IT 工单已收到并由 [工程师姓名] 受理。我们将尽快为您核实并反馈处理进度。' },
                { tag: '硬件', title: '资产快递单号同步', content: '您好，您的申领设备已寄出，顺丰单号为：[单号]。请注意查收。' },
                { tag: '远程', title: '请求远程协助 (TV)', content: '您好，为了高效处理您的问题，请提供您的 TeamViewer ID 和密码。' },
                { tag: '满意度', title: '问题闭环回访', content: '您好，之前处理的问题现在使用是否正常？如无疑问，我们将关闭该工单。祝工作愉快！' },
              ].map((tmp, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-[24px] p-6 hover:border-sky-200 transition-all group">
                   <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-black">{tmp.tag}</span>
                        <h5 className="text-sm font-black text-slate-800">{tmp.title}</h5>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-sky-600 transition-colors"><Edit2 size={14} /></button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                   </div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-50">{tmp.content}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* L1 Team */}
                <div className="space-y-4">
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                     IT 帮助台 L1 (一线支持) <Plus size={14} className="cursor-pointer" />
                   </h4>
                   <div className="space-y-2">
                      {['王慧妍', '李明', '张小强'].map(name => (
                        <div key={name} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black text-xs">{name[0]}</div>
                              <span className="text-sm font-bold text-slate-700">{name}</span>
                           </div>
                           {/* Fixed missing import for MoreVertical */}
                           <MoreVertical size={16} className="text-slate-300 cursor-pointer" />
                        </div>
                      ))}
                   </div>
                </div>

                {/* L2 Team */}
                <div className="space-y-4">
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                     运维专家 L2 (二线运维) <Plus size={14} className="cursor-pointer" />
                   </h4>
                   <div className="space-y-2">
                      {['陈建国', '宋茜', '赵大勇'].map(name => (
                        <div key={name} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">{name[0]}</div>
                              <span className="text-sm font-bold text-slate-700">{name}</span>
                           </div>
                           {/* Fixed missing import for MoreVertical */}
                           <MoreVertical size={16} className="text-slate-300 cursor-pointer" />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex bg-[#f4f7f9] p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest">Configuration</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Global Settings</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">系统设置中心</h1>
            <p className="text-slate-400 font-medium mt-1">管理 IT 运维流程参数、渠道集成接口以及团队协作权限。</p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-sky-500 text-white px-8 py-4 rounded-[24px] font-black shadow-xl shadow-sky-500/20 hover:bg-sky-600 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <RefreshCcw size={20} className="animate-spin" /> : <Save size={20} />}
            {isSaving ? '正在同步...' : '保存全局配置'}
          </button>
        </header>

        {/* Settings Main Layout */}
        <div className="flex-1 flex overflow-hidden gap-8">
          
          {/* Left: Sidebar Navigation */}
          <aside className="w-72 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id as SettingsTab)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[24px] transition-all font-bold text-sm ${
                  activeSubTab === item.id 
                    ? 'bg-white text-sky-600 shadow-sm border border-slate-100' 
                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                }`}
              >
                <item.icon size={20} className={activeSubTab === item.id ? 'text-sky-500' : 'text-slate-400'} />
                {item.label}
                {activeSubTab === item.id && <ChevronRight size={16} className="ml-auto opacity-40" />}
              </button>
            ))}

            <div className="mt-8 p-6 bg-indigo-50 rounded-[28px] border border-indigo-100">
               <div className="flex items-center gap-2 text-indigo-700 mb-2">
                  <Shield size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">系统健康度</span>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-indigo-400">
                    <span>数据库存储</span>
                    <span>42% Used</span>
                  </div>
                  <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-[42%]"></div>
                  </div>
                  <p className="text-[10px] text-indigo-400 font-medium mt-2">版本 v2.4.0-Stable</p>
               </div>
            </div>
          </aside>

          {/* Right: Content Area */}
          <main className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col p-10">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {renderContent()}
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default Settings;
