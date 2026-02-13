
import React, { useState } from 'react';
import { 
  Search, Plus, ClipboardList, Cpu, AppWindow, Database, 
  HelpCircle, Clock, Users, ArrowRight, ChevronLeft, 
  ThumbsUp, ThumbsDown, Share2, Printer, Edit3, MessageSquare, BookOpen, Stars,
  FolderOpen, FolderPlus, MoreVertical, Trash2, Edit2, ShieldAlert
} from 'lucide-react';
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES } from '../constants';
import { KnowledgeArticle, KnowledgeMainCategory, KnowledgeSubCategory } from '../types';

const IconMap: Record<string, any> = {
  ClipboardList,
  Cpu,
  AppWindow,
  Database
};

const KnowledgeBase: React.FC = () => {
  const [selectedMainCat, setSelectedMainCat] = useState<KnowledgeMainCategory | null>(null);
  const [selectedSubCat, setSelectedSubCat] = useState<KnowledgeSubCategory | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // 默认设置为 false，进入知识库时处于纯净阅读模式
  const [isEngineerMode, setIsEngineerMode] = useState(false); 

  const filteredArticles = KNOWLEDGE_ARTICLES.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMainCat = selectedMainCat ? art.mainCategoryId === selectedMainCat.id : true;
    const matchesSubCat = selectedSubCat ? art.subCategoryId === selectedSubCat.id : true;
    return matchesSearch && matchesMainCat && matchesSubCat;
  });

  // 文章详情视图
  if (selectedArticle) {
    return (
      <div className="flex-1 overflow-y-auto bg-white animate-in slide-in-from-right duration-300">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold text-sm mb-8 transition-colors"
          >
            <ChevronLeft size={18} /> 返回列表
          </button>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-100">
                {selectedMainCat?.name} / {selectedSubCat?.name}
              </span>
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">•</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{selectedArticle.updatedAt}</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{selectedArticle.title}</h1>
            
            <div className="flex items-center justify-between py-6 border-y border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{selectedArticle.author}</p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">作者 / 维护人</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-slate-400 hover:text-sky-500 rounded-lg hover:bg-slate-50 transition-all"><Share2 size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-sky-500 rounded-lg hover:bg-slate-50 transition-all"><Printer size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-sky-500 rounded-lg hover:bg-slate-50 transition-all"><Edit3 size={18} /></button>
              </div>
            </div>
          </header>

          <article className="prose prose-slate max-w-none mb-12">
            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base font-medium">
              {selectedArticle.content}
            </div>
          </article>
          
          <div className="bg-slate-50 rounded-[32px] p-10 flex flex-col items-center text-center">
            <h3 className="text-xl font-black text-slate-800 mb-2">这篇文章对您有帮助吗？</h3>
            <div className="flex items-center gap-4 mt-6">
              <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-all font-bold">
                <ThumbsUp size={18} /> 有帮助
              </button>
              <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all font-bold">
                <ThumbsDown size={18} /> 没帮助
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f9] p-8 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Search & Navigation */}
        <section className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                {selectedMainCat && (
                  <button 
                    onClick={() => { setSelectedMainCat(null); setSelectedSubCat(null); }}
                    className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-sky-500 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    {selectedMainCat ? selectedMainCat.name : 'IT 知识库'}
                  </h1>
                  <p className="text-slate-400 font-medium mt-1">
                    {selectedMainCat ? `浏览 ${selectedMainCat.name} 下的细分领域和解决方案` : '全面覆盖流程、硬/软件及 CRC 常用系统。'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsEngineerMode(!isEngineerMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    isEngineerMode ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500'
                  }`}
                >
                  <Edit2 size={14} /> {isEngineerMode ? '已开启编辑' : '阅读模式'}
                </button>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center gap-2 active:scale-95">
                  <Plus size={18} /> 新建文章
                </button>
              </div>
            </div>

            <div className="relative group max-w-3xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="搜索常见故障、操作流程或关键词..."
                className="w-full h-16 pl-14 pr-6 bg-slate-50 border-none rounded-2xl text-base font-medium focus:ring-4 focus:ring-sky-500/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Categories Grid (Main Category Selection) */}
        {!selectedMainCat && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in zoom-in-95 duration-300">
            {KNOWLEDGE_CATEGORIES.map((cat) => {
              const Icon = IconMap[cat.icon];
              return (
                <button 
                  key={cat.id} 
                  onClick={() => setSelectedMainCat(cat)}
                  className="p-8 rounded-[32px] border border-slate-100 bg-white transition-all text-left flex flex-col items-start group shadow-sm hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${cat.color}`}>
                    <Icon size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-800">{cat.name}</h4>
                  <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{cat.subCategories.length} 个子分类</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Sub-categories & Articles Section */}
        {selectedMainCat && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sub-category Sidebar */}
            <aside className="lg:col-span-1 space-y-4 animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">子分类列表</h3>
                {isEngineerMode && (
                  <button className="text-sky-500 hover:bg-sky-50 p-1.5 rounded-lg transition-colors"><FolderPlus size={16} /></button>
                )}
              </div>
              <div className="space-y-1.5">
                <button 
                  onClick={() => setSelectedSubCat(null)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${
                    !selectedSubCat ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-600 hover:bg-white border border-transparent hover:border-slate-100'
                  }`}
                >
                  <FolderOpen size={18} /> 全部解决方案
                </button>
                {selectedMainCat.subCategories.map(sub => (
                  <div key={sub.id} className="relative group">
                    <button 
                      onClick={() => setSelectedSubCat(sub)}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all border ${
                        selectedSubCat?.id === sub.id ? 'bg-white border-sky-200 text-sky-600 shadow-sm' : 'text-slate-500 hover:bg-white border-transparent hover:border-slate-100'
                      }`}
                    >
                      {sub.name}
                    </button>
                    {isEngineerMode && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                        <button className="p-1 hover:text-rose-500 transition-colors"><Trash2 size={12} /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content List */}
            <div className="lg:col-span-3 space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Stars className="text-amber-400" size={22} /> {selectedSubCat ? selectedSubCat.name : '全部'} 列表
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">排序方式:</span>
                  <select className="text-xs font-bold border-none bg-transparent focus:ring-0 text-sky-600 p-0">
                    <option>最热推荐</option>
                    <option>最近更新</option>
                    <option>浏览量</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredArticles.length > 0 ? filteredArticles.map(art => (
                  <div 
                    key={art.id} 
                    onClick={() => setSelectedArticle(art)}
                    className="p-6 rounded-[28px] border border-slate-100 bg-white hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-500/5 transition-all flex items-start gap-6 cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
                      <HelpCircle size={26} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h5 className="text-base font-black text-slate-800 group-hover:text-sky-600 transition-colors truncate">{art.title}</h5>
                        {isEngineerMode && (
                          <button className="p-1 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={16} /></button>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 font-medium mt-1 line-clamp-1">{art.content.split('\n')[0]}</p>
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1.5"><Clock size={14} /> {art.updatedAt}</span>
                          <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1.5"><BookOpen size={14} /> {art.views} 次查看</span>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                           {art.tags.slice(0, 2).map(tag => (
                             <span key={tag} className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-tight group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">#{tag}</span>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FolderOpen size={40} className="text-slate-200" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">该子分类下暂无内容</h4>
                    <p className="text-slate-400 mt-2">点击右侧的“新建文章”来充实该分类下的内容。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;
