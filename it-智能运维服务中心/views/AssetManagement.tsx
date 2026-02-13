
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Download, Upload, Laptop, 
  MoreVertical, Calendar, User, Hash, Tag, Monitor, 
  ArrowUpDown, CheckCircle2, AlertCircle, Trash2, History, Edit, FileText,
  Scan, ArrowRightLeft, UserCheck, PackageOpen, ChevronRight, X, UserPlus, Info
} from 'lucide-react';
import { MOCK_ASSETS, MOCK_USERS } from '../constants';
import { Asset, AssetStatus, UserInfo, AssetLog } from '../types';

const AssetManagement: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AssetStatus | '全部'>('全部');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDispatching, setIsDispatching] = useState(false); // 批量配发模式
  const [batchList, setBatchList] = useState<Asset[]>([]); // 批量操作清单
  const [targetUser, setTargetUser] = useState<UserInfo | null>(null);
  const [userSearch, setUserSearch] = useState('');

  // 模拟搜索用户
  const foundUser = Object.values(MOCK_USERS).find(u => 
    u.employeeNo === userSearch || u.name.includes(userSearch)
  );

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.assetNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asset.sn.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asset.computerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (asset.currentUser?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === '全部' ? true : asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: AssetStatus) => {
    switch (status) {
      case '在库': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case '领用中': return 'bg-sky-50 text-sky-600 border-sky-100';
      case '故障维修': return 'bg-amber-50 text-amber-600 border-amber-100';
      case '待报废': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const addToBatch = (asset: Asset) => {
    if (!batchList.find(a => a.id === asset.id)) {
      setBatchList([...batchList, asset]);
    }
  };

  const removeFromBatch = (id: string) => {
    setBatchList(batchList.filter(a => a.id !== id));
  };

  // Fixed the handleBatchDispatch type error by explicitly defining the AssetLog and casting the mapped result to Asset[]
  const handleBatchDispatch = () => {
    if (!targetUser || batchList.length === 0) return;
    const now = new Date().toLocaleString();
    const updatedAssets: Asset[] = assets.map(asset => {
      if (batchList.find(b => b.id === asset.id)) {
        const newLog: AssetLog = { 
          id: Date.now().toString(), 
          type: '领用', 
          operator: 'Admin', 
          targetUser: targetUser.name, 
          timestamp: now, 
          note: '批量配发操作' 
        };
        return {
          ...asset,
          status: '领用中' as AssetStatus,
          currentUser: targetUser.name,
          employeeNo: targetUser.employeeNo,
          department: targetUser.department,
          logs: [...asset.logs, newLog]
        } as Asset;
      }
      return asset;
    });
    setAssets(updatedAssets);
    setBatchList([]);
    setIsDispatching(false);
    setTargetUser(null);
    setUserSearch('');
    alert(`配发成功：已将 ${batchList.length} 台设备配发给 ${targetUser.name}`);
  };

  return (
    <div className="flex-1 flex overflow-hidden relative">
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f4f7f9] p-8 animate-in fade-in duration-500">
        
        {/* 顶部统计和快捷入口 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Monitor size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">库存总量</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">6,142</h3>
            </div>
          </div>
          <button 
            onClick={() => setIsDispatching(true)}
            className="bg-slate-900 p-6 rounded-[28px] shadow-xl shadow-slate-900/10 flex items-center gap-4 hover:bg-black transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserPlus size={28} />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-black text-white/50 uppercase tracking-widest">快速配发</p>
              <h3 className="text-lg font-black text-white mt-0.5">批量收发工作台</h3>
            </div>
          </button>
          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">在库待命</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">286</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertCircle size={28} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">维修中</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">36</h3>
            </div>
          </div>
        </div>

        {/* 搜索和过滤栏 */}
        <div className="bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[300px]">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="搜索 资产号 / SN / 计算机名 / 使用人..."
                className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-4 focus:ring-sky-500/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-slate-50 rounded-2xl p-1 shrink-0">
              {['全部', '在库', '领用中', '故障维修'].map(s => (
                <button 
                  key={s}
                  onClick={() => setStatusFilter(s as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === s ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50">
              <Download size={18} /> 导出报表
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50">
              <Upload size={18} /> 数据导入
            </button>
          </div>
        </div>

        {/* 资产列表表格 */}
        <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">资产编号</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">SN / 型号</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">计算机名称</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">当前使用人</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">快捷操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAssets.map((asset) => (
                  <tr 
                    key={asset.id} 
                    className="group hover:bg-sky-50/40 transition-all cursor-pointer"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <td className="px-6 py-5">
                      <span className="text-sm font-black text-slate-800">{asset.assetNo}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{asset.model}</span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">SN: {asset.sn}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                        {asset.computerName}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {asset.currentUser ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
                            {asset.currentUser[0]}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{asset.currentUser}</span>
                            <span className="text-[10px] font-bold text-slate-400">{asset.department}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-300">-- 在库待命 --</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {asset.status === '在库' ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); addToBatch(asset); setIsDispatching(true); }}
                            className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-all"
                            title="加入配发清单"
                          >
                            <UserCheck size={18} />
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); alert('回收流程已启动'); }}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all"
                            title="回收资产"
                          >
                            <PackageOpen size={18} />
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><MoreVertical size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 资产详情侧边栏 */}
      {selectedAsset && (
        <div className="w-[450px] bg-white border-l border-slate-200 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right duration-300">
          <header className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">资产履历详情</h3>
            <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
              <X size={20} />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Laptop size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">{selectedAsset.assetNo}</h4>
                  <p className="text-sm font-bold text-slate-400">{selectedAsset.model}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SN 序列号</p>
                  <p className="text-sm font-mono font-bold text-slate-800 mt-1">{selectedAsset.sn}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">资产状态</p>
                  <p className={`text-sm font-bold mt-1 ${selectedAsset.status === '领用中' ? 'text-sky-600' : 'text-emerald-600'}`}>{selectedAsset.status}</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <History size={14} /> 流转记录日志
              </h5>
              <div className="space-y-4 relative pl-4">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                {selectedAsset.logs.length > 0 ? selectedAsset.logs.map((log) => (
                  <div key={log.id} className="relative pl-8">
                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white"></div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{log.type}</span>
                      <span className="font-medium text-slate-400">{log.timestamp}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700">{log.note}</p>
                    {log.targetUser && (
                      <p className="text-[10px] text-sky-600 font-bold mt-1 flex items-center gap-1">
                        <User size={10} /> 接收人: {log.targetUser}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 mt-1 italic">操作员: {log.operator}</p>
                  </div>
                )) : (
                  <p className="text-xs text-slate-300 italic">暂无历史流转数据</p>
                )}
              </div>
            </section>
          </div>
          <footer className="p-6 border-t border-slate-100 flex gap-3">
            <button className="flex-1 py-3 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50">编辑信息</button>
            <button className="flex-1 py-3 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-100">故障报修</button>
          </footer>
        </div>
      )}

      {/* 批量配发工作台弹窗 */}
      {isDispatching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[700px] animate-in zoom-in-95 duration-300">
            <header className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900">批量收发工作台</h3>
                <p className="text-sm font-bold text-slate-400 mt-1">支持多机配发给同一用户，自动同步资产状态与历史日志。</p>
              </div>
              <button onClick={() => { setIsDispatching(false); setBatchList([]); }} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                <X size={24} />
              </button>
            </header>
            
            <div className="flex-1 flex overflow-hidden">
              {/* 左侧：资产清单 */}
              <div className="w-1/2 border-r border-slate-100 flex flex-col p-8 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">待处理资产清单 ({batchList.length})</h4>
                  <button className="text-[10px] font-black text-sky-600 flex items-center gap-1 hover:underline">扫码追加 <Scan size={14} /></button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                  {batchList.length > 0 ? batchList.map(a => (
                    <div key={a.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                          <Laptop size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{a.assetNo}</p>
                          <p className="text-[10px] font-mono text-slate-400">{a.sn}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromBatch(a.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  )) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <PackageOpen size={48} className="text-slate-200 mb-4" />
                      <p className="text-sm font-bold text-slate-400">请从资产列表中<br/>点击“用户配发”加入清单</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 右侧：用户匹配 */}
              <div className="w-1/2 p-8 flex flex-col">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">目标用户信息匹配</h4>
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="输入工号 (如 13018005) 或姓名..."
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-4 focus:ring-sky-500/10"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>

                <div className="flex-1">
                  {foundUser ? (
                    <div className="p-6 rounded-3xl border border-sky-100 bg-sky-50/30 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-200">
                          {foundUser.name[0]}
                        </div>
                        <div>
                          <h5 className="text-lg font-black text-slate-900">{foundUser.name}</h5>
                          <p className="text-xs font-bold text-slate-400">工号: {foundUser.employeeNo}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-slate-400">所属部门</span>
                          <span className="font-black text-slate-800">{foundUser.department}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-slate-400">办公城市</span>
                          <span className="font-black text-slate-800">{foundUser.city}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-slate-400">当前持有资产</span>
                          <span className="font-black text-indigo-600">{foundUser.assets.length} 台</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setTargetUser(foundUser)}
                        className={`w-full mt-6 py-4 rounded-2xl font-black text-sm transition-all ${
                          targetUser?.id === foundUser.id 
                            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-200' 
                            : 'bg-white border border-sky-200 text-sky-600 hover:bg-sky-50'
                        }`}
                      >
                        {targetUser?.id === foundUser.id ? '用户已选定 ✓' : '确认选择该用户'}
                      </button>
                    </div>
                  ) : userSearch.length > 2 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                        <Search size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-400">未找到匹配员工<br/>请检查工号是否正确</p>
                    </div>
                  ) : null}
                </div>

                <div className="pt-8 border-t border-slate-100">
                   <button 
                    disabled={!targetUser || batchList.length === 0}
                    onClick={handleBatchDispatch}
                    className="w-full py-5 rounded-[24px] bg-slate-900 text-white font-black text-base shadow-2xl shadow-slate-900/20 hover:bg-black transition-all disabled:opacity-30 disabled:grayscale active:scale-95 flex items-center justify-center gap-3"
                   >
                     确认完成配发 <ArrowRightLeft size={20} />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;
