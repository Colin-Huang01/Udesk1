
import React, { useState, useEffect } from 'react';
import { Ticket, TicketStatus, UserInfo, Message, Priority, UserRole } from '../types';
import { MOCK_USERS, REPLY_TEMPLATES } from '../constants';
import { 
  X, Send, Paperclip, MoreHorizontal, User, 
  MapPin, Mail, Phone, Clock, AlertCircle, Laptop, 
  CheckCircle, History, MessageSquareText, Reply,
  Printer, Link as LinkIcon, Share2, ImageIcon,
  Smile, ChevronLeft, Edit2, Plus, Smartphone, FileText,
  RotateCcw, Link2, GitBranch, ChevronDown, Monitor, Info,
  AlertTriangle, Timer, ArrowUpRight
} from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  onClose: () => void;
  onUpdateStatus: (id: string, status: TicketStatus) => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onClose, onUpdateStatus }) => {
  const user = MOCK_USERS[ticket.userId] || MOCK_USERS["u1"];
  const [activeTab, setActiveTab] = useState<'user' | 'internal'>('user');
  const [inputText, setInputText] = useState('');
  const [isSuspended, setIsSuspended] = useState(ticket.status === TicketStatus.SUSPENDED);
  
  // 模拟 SLA 倒计时
  const [timeLeft, setTimeLeft] = useState("01:42:15");

  const handleSend = () => {
    if (!inputText.trim()) return;
    // 实际逻辑中会调用 API
    setInputText('');
    alert(`回复已发送至 ${activeTab === 'user' ? '用户 (钉钉/邮件)' : '内部备注'}`);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-in fade-in">
      <div className="w-full h-full max-w-[1600px] bg-[#f4f7f9] flex flex-col shadow-2xl overflow-hidden md:rounded-lg animate-in zoom-in-95">
        
        {/* 1. 顶部操作栏 (Top Actions) */}
        <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200 rounded hover:bg-slate-50">
              <ChevronLeft size={14} /> 返回列表
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1"></div>
            <button className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1">关闭</button>
            <button className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1">关联</button>
            <div className="relative group">
               <button className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1 flex items-center gap-1">
                 宏 <ChevronDown size={12} />
               </button>
            </div>
            <button className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1">父子工单</button>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-slate-400 hover:text-slate-600"><Printer size={16} /></button>
          </div>
        </header>

        {/* 2. 主内容区 (Main Content) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* 左侧：工单详情表单与对话区 */}
          <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-white">
            
            {/* 工单标题与基础信息 */}
            <div className="p-6 border-b border-slate-100">
               <h1 className="text-xl font-black text-slate-800 mb-4">{ticket.subject}</h1>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-500">
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-24">主题 (Subjective):</span>
                    <span className="text-slate-800">{ticket.subject}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 w-24">对象 (Objective):</span>
                    <span className="text-indigo-600 font-bold">{user.employeeNo} {user.name} {user.city}-</span>
                  </div>
               </div>
               <button className="text-[10px] text-sky-500 font-bold mt-2 flex items-center gap-1">展开 <ChevronDown size={10} /></button>
            </div>

            {/* 工单核心属性表单 (Grid Layout matching Screenshot) */}
            <div className="p-6 bg-white space-y-6">
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">属性配置区</span>
                 <select className="text-[10px] border-none bg-slate-50 font-black rounded h-6 py-0">
                    <option>CN Callenter</option>
                 </select>
                 <Info size={14} className="text-slate-300" />
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                 {/* 负责人 */}
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400"><span className="text-rose-500 mr-1">*</span>工单首接责任人 / The first responsible person</label>
                    <div className="flex gap-2">
                      <select className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30">
                        <option>Call center Agent</option>
                      </select>
                      <select className="w-1/3 h-9 border-slate-200 rounded text-sm bg-slate-50/30">
                        <option>{ticket.agentName}</option>
                      </select>
                    </div>
                 </div>

                 {/* 工单类型 & 站点 */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[11px] font-black text-slate-400"><span className="text-rose-500 mr-1">*</span>工单类型 / Ticket Type</label>
                       <select className="w-full h-9 border-slate-200 rounded text-sm bg-slate-50/30">
                         <option>{ticket.serviceType}</option>
                       </select>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[11px] font-black text-slate-400"><span className="text-rose-500 mr-1">*</span>站点 / Site</label>
                       <select className="w-full h-9 border-slate-200 rounded text-sm bg-slate-50/30">
                         <option>{ticket.location}</option>
                       </select>
                    </div>
                 </div>

                 {/* 服务项三级联动 */}
                 <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400"><span className="text-rose-500 mr-1">*</span>服务项</label>
                    <div className="flex gap-2">
                       <select className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30"><option>{ticket.category}</option></select>
                       <select className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30"><option>{ticket.subCategory}</option></select>
                       <select className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30 font-bold text-slate-400"><option>2小时响应 / 2工作日完成</option></select>
                    </div>
                 </div>

                 {/* SLA 时间 */}
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400"><span className="text-rose-500 mr-1">*</span>SLA 响应时间 / SLA Response Time</label>
                    <div className="flex gap-2">
                       <select className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30 font-bold text-emerald-600"><option>2小时 / 2 hours</option></select>
                       <div className="w-24 h-9 bg-emerald-50 border border-emerald-100 rounded flex items-center justify-center text-[10px] font-black text-emerald-600">已达标</div>
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400"><span className="text-rose-500 mr-1">*</span>SLA 解决时间 / SLA Resolution Time</label>
                    <div className="flex gap-2">
                       <select className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30 font-bold text-amber-600"><option>2个工作日 / 2 work day</option></select>
                       <div className="w-24 h-9 bg-amber-50 border border-amber-100 rounded flex items-center justify-center text-[10px] font-black text-amber-600">剩余 {timeLeft}</div>
                    </div>
                 </div>

                 {/* 服务人员 */}
                 <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400">服务人员 / Service Staff</label>
                    <div className="flex gap-2">
                       <select className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30"><option>SMO-Onsite-SH</option></select>
                       <select className="w-1/4 h-9 border-slate-200 rounded text-sm bg-slate-50/30"><option>公共客服</option></select>
                    </div>
                 </div>

                 {/* 计算机名 & 催单级别 & 关联单 */}
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400">计算机名 (虚拟机编号) / Computer Name (VDI No)</label>
                    <div className="flex gap-2">
                       <input type="text" placeholder="请输入" className="flex-1 h-9 border-slate-200 rounded text-sm bg-slate-50/30" />
                       <div className="space-y-1.5 flex-1">
                          <select className="w-full h-9 border-slate-200 rounded text-sm bg-slate-50/30">
                            <option value="">请选择催单级别</option>
                            <option>L1-常规催促</option>
                            <option>L2-紧急催促</option>
                          </select>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-400">Incident 关联工单</label>
                    <input type="text" placeholder="请输入关联的工单号" className="w-full h-9 border-slate-200 rounded text-sm bg-slate-50/30" />
                 </div>

                 {/* 挂起状态 */}
                 <div className="col-span-2 py-4 border-t border-slate-50">
                    <div className="flex items-center gap-8">
                       <span className="text-[11px] font-black text-slate-400">工单是否挂起 / Is pending?</span>
                       <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={!isSuspended} 
                            onChange={() => setIsSuspended(false)} 
                            className="rounded border-slate-300 text-sky-500" 
                          />
                          <span className="text-xs text-slate-600 font-bold">未挂起 / Null</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={isSuspended} 
                            onChange={() => setIsSuspended(true)} 
                            className="rounded border-slate-300 text-sky-500" 
                          />
                          <span className="text-xs text-slate-600 font-bold">已挂起 / Pending</span>
                       </label>
                    </div>
                 </div>
              </div>

              {/* 底部保存按钮 */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                 <button className="bg-[#00a854] text-white px-8 py-2 rounded text-xs font-bold hover:bg-[#008f47] transition-all">保存</button>
                 <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded text-xs font-bold hover:bg-slate-50 transition-all">取消</button>
              </div>
            </div>

            {/* 回复与交互区 (Tabbed) */}
            <div className="mt-8 bg-slate-50/50 p-6 space-y-6">
               <div className="flex border-b border-slate-200 mb-6">
                  <button 
                    onClick={() => setActiveTab('user')}
                    className={`px-8 py-3 text-xs font-black transition-all border-b-2 ${activeTab === 'user' ? 'border-emerald-500 text-emerald-600 bg-white' : 'border-transparent text-slate-400'}`}
                  >
                    回复用户 (Reply User)
                  </button>
                  <button 
                    onClick={() => setActiveTab('internal')}
                    className={`px-8 py-3 text-xs font-black transition-all border-b-2 ${activeTab === 'internal' ? 'border-amber-500 text-amber-600 bg-white' : 'border-transparent text-slate-400'}`}
                  >
                    内部备注 (Internal Note)
                  </button>
               </div>

               <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-slate-400 border-b border-slate-50 pb-2">
                     <button className="p-1 hover:text-sky-500"><ImageIcon size={16} /></button>
                     <button className="p-1 hover:text-sky-500"><Paperclip size={16} /></button>
                     <div className="h-4 w-px bg-slate-100 mx-2"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest">快速回复:</span>
                     <select 
                      onChange={(e) => setInputText(e.target.value)}
                      className="text-[10px] border-none bg-transparent focus:ring-0 font-black text-sky-600 py-0 cursor-pointer"
                     >
                       <option value="">选择模板</option>
                       <option value={REPLY_TEMPLATES.GENERAL}>确认受理</option>
                       <option value={REPLY_TEMPLATES.REMOTE}>申请远程助手</option>
                       <option value={REPLY_TEMPLATES.EXPRESS}>快递单号反馈</option>
                     </select>
                  </div>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="输入内容，按 Ctrl + Enter 发送..."
                    className="w-full h-32 border-none focus:ring-0 text-sm placeholder:text-slate-300 resize-none"
                  />
                  <div className="flex justify-end mt-4">
                     <button 
                       onClick={handleSend}
                       className={`flex items-center gap-2 px-6 py-2 rounded text-xs font-bold text-white shadow-lg transition-all ${
                         activeTab === 'user' ? 'bg-emerald-500 shadow-emerald-100' : 'bg-amber-500 shadow-amber-100'
                       }`}
                     >
                       <Send size={14} /> 发送回复
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* 右侧：工单属性与客户信息面板 */}
          <div className="w-[340px] border-l border-slate-200 flex flex-col overflow-y-auto custom-scrollbar bg-[#fcfdfe]">
            
            {/* 3. 工单属性卡片 */}
            <div className="p-6 border-b border-slate-100">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[13px] font-black text-slate-800">工单属性</h3>
                  <ChevronDown size={14} className="text-slate-400" />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">编号:</span>
                     <span className="font-bold text-slate-800">#{ticket.ticketNo}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">状态:</span>
                     <div className="flex items-center gap-1.5 font-bold text-sky-500">
                        <div className="w-2 h-2 rounded-full bg-sky-500"></div> 解决中
                     </div>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">优先级:</span>
                     <div className="flex items-center gap-1 font-bold text-sky-600">
                        <ArrowUpRight size={12} /> 标准
                     </div>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">渠道:</span>
                     <span className="font-bold text-slate-800">手工录入</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">来源:</span>
                     <span className="font-bold text-slate-800">手工-直接创建</span>
                  </div>
                  <div className="flex justify-between text-[11px] items-center">
                     <span className="text-slate-400">工单标签:</span>
                     <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-black border border-emerald-100">流转</span>
                  </div>
                  
                  <hr className="border-slate-50 my-4" />
                  
                  <div className="space-y-3">
                     <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">首次受理人:</span>
                        <span className="font-bold text-slate-800">{ticket.agentName}</span>
                     </div>
                     <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">受理人:</span>
                        <span className="font-bold text-slate-800">SMO&CDS Onsite / SMO&CDS Onsite</span>
                     </div>
                     <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">关注人:</span>
                        <div className="text-sky-500 font-bold flex items-center gap-1 cursor-pointer hover:underline">
                           <Plus size={12} /> 关注此工单
                        </div>
                     </div>
                  </div>

                  <hr className="border-slate-50 my-4" />

                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                        <span>创建时间:</span>
                        <span className="text-slate-600">{ticket.createdAt}:55</span>
                     </div>
                     <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                        <span>工单处理时长 (不含挂起):</span>
                        <span className="text-emerald-600 font-black">06:59 进行中</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* 4. 客户信息卡片 */}
            <div className="p-6">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-black text-slate-800">{user.employeeNo}{user.name}</h3>
                    <button className="text-sky-500 text-[10px] font-black hover:underline">详情</button>
                    <Edit2 size={10} className="text-slate-300" />
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
               </div>

               <div className="grid grid-cols-4 gap-2 mb-8 text-center">
                  <div className="bg-slate-50 py-2 rounded">
                     <p className="text-[13px] font-black text-emerald-500">1/13</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">工单</p>
                  </div>
                  <div className="bg-slate-50 py-2 rounded">
                     <p className="text-[13px] font-black text-slate-300">0</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">通话</p>
                  </div>
                  <div className="bg-slate-50 py-2 rounded">
                     <p className="text-[13px] font-black text-slate-300">0</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">对话</p>
                  </div>
                  <div className="bg-slate-50 py-2 rounded">
                     <p className="text-[13px] font-black text-slate-300">0</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">视频</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] text-slate-400">邮箱:</span>
                     <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 break-all">{user.email}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">描述:</span>
                     <span className="font-bold text-slate-800">{user.city}-</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">办公地点:</span>
                     <span className="font-bold text-slate-800">{user.city}-</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-400">工号 / Employee ID:</span>
                     <span className="font-bold text-slate-800">{user.employeeNo}</span>
                  </div>
               </div>

               {/* 持有资产快速预览 (Your extra request) */}
               <div className="mt-8 pt-6 border-t border-slate-50">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Laptop size={12} /> 绑定资产资产 (Assets)
                  </h4>
                  {user.assets.slice(0, 1).map(asset => (
                     <div key={asset.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                        <Monitor size={16} className="text-slate-400" />
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-black text-slate-800 truncate">{asset.model}</p>
                           <p className="text-[9px] font-mono text-slate-400">SN: {asset.sn}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* 底部信息提示 (仅内部可见) */}
        <footer className="h-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between px-6 shrink-0">
           <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <AlertTriangle size={12} />
              <span>当前工单正处于 SLA 解决时段内，请及时跟进。</span>
           </div>
           <div className="text-[10px] font-bold text-slate-300">
              Udesk 系统驱动 · IT 运维中心
           </div>
        </footer>
      </div>
    </div>
  );
};

export default TicketDetail;
