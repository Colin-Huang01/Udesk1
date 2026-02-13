
import { Ticket, TicketStatus, Priority, UserRole, KnowledgeArticle, UserInfo, KnowledgeMainCategory, Asset, EngineerStats } from './types';

export const MOCK_USERS: Record<string, UserInfo> = {
  "u1": {
    id: "u1",
    name: "林 晨 (Lin Chen)",
    employeeNo: "13018004",
    subsidiary: "无锡药明康德 (WX)",
    department: "市场营销部",
    phone: "13800138000",
    dingTalkPhone: "13800138000",
    email: "linchen@wuxi.com",
    city: "厦门",
    vipLevel: 2,
    position: "高级设计师",
    role: UserRole.FULL_TIME,
    manager: "张伟",
    joinDate: "2022-03-15",
    assets: [
      { id: "a1", model: "MacBook Pro 16\"", sn: "C02XG1JJKGY", status: "已分配", warrantyStatus: "30天后过期", warrantyColor: "text-rose-500" },
      { id: "a2", model: "iPhone 13", sn: "FD3XG1JJKGY", status: "已分配", warrantyStatus: "保修期内", warrantyColor: "text-emerald-500" }
    ]
  },
  "u2": {
    id: "u2",
    name: "张 伟 (Zhang Wei)",
    employeeNo: "13018005",
    subsidiary: "上海研发中心 (SH)",
    department: "研发部",
    phone: "13800138001",
    dingTalkPhone: "13800138001",
    email: "zhangwei@wuxi.com",
    city: "上海",
    vipLevel: 1,
    position: "高级工程师",
    role: UserRole.FULL_TIME,
    manager: "李明",
    joinDate: "2021-06-20",
    assets: []
  },
  "u3": {
    id: "u3",
    name: "王 芳 (Wang Fang)",
    employeeNo: "23098011",
    subsidiary: "药明生物 (WXB)",
    department: "行政中心",
    phone: "13911223344",
    dingTalkPhone: "13911223344",
    email: "wangfang@wuxi.com",
    city: "苏州",
    vipLevel: 0,
    position: "助理专员",
    role: UserRole.INTERN,
    manager: "刘强",
    joinDate: "2024-01-10",
    assets: []
  }
};

// Added MOCK_ASSETS to fix missing export error in AssetManagement.tsx
export const MOCK_ASSETS: Asset[] = [
  {
    id: "as1",
    assetNo: "AST-2024-001",
    model: "MacBook Pro 16\"",
    sn: "C02XG1JJKGY",
    computerName: "SH-LAP-001",
    status: "领用中",
    currentUser: "林 晨 (Lin Chen)",
    employeeNo: "13018004",
    department: "市场营销部",
    logs: [
      { id: "l1", type: "入库", operator: "Admin", timestamp: "2023-01-01", note: "初始入库" },
      { id: "l2", type: "领用", operator: "Admin", targetUser: "林 晨 (Lin Chen)", timestamp: "2023-02-15", note: "新员工配发" }
    ]
  },
  {
    id: "as2",
    assetNo: "AST-2024-002",
    model: "Dell XPS 15",
    sn: "SN-987654321",
    computerName: "SH-LAP-002",
    status: "在库",
    logs: []
  },
  {
    id: "as3",
    assetNo: "AST-2024-003",
    model: "iPhone 13",
    sn: "FD3XG1JJKGY",
    computerName: "SH-MOB-001",
    status: "故障维修",
    currentUser: "林 晨 (Lin Chen)",
    employeeNo: "13018004",
    department: "市场营销部",
    logs: []
  }
];

export const MOCK_ENGINEERS: EngineerStats[] = [
  { id: 'e1', name: '王慧妍', avatar: 'W', team: 'L1', resolvedCount: 142, avgResolutionTime: '1.2h', satisfaction: 98.5, slaCompliance: 99.2, activeTickets: 3 },
  { id: 'e2', name: '李明', avatar: 'L', team: 'L1', resolvedCount: 128, avgResolutionTime: '1.5h', satisfaction: 96.0, slaCompliance: 98.5, activeTickets: 5 },
  { id: 'e3', name: '张小强', avatar: 'Z', team: 'L1', resolvedCount: 156, avgResolutionTime: '1.1h', satisfaction: 94.2, slaCompliance: 97.8, activeTickets: 2 },
  { id: 'e4', name: '陈建国', avatar: 'C', team: 'L2', resolvedCount: 45, avgResolutionTime: '4.8h', satisfaction: 99.1, slaCompliance: 96.5, activeTickets: 8 },
  { id: 'e5', name: '宋茜', avatar: 'S', team: 'L2', resolvedCount: 38, avgResolutionTime: '5.2h', satisfaction: 100.0, slaCompliance: 95.0, activeTickets: 6 },
  { id: 'e6', name: '赵大勇', avatar: 'Z', team: 'L2', resolvedCount: 52, avgResolutionTime: '4.1h', satisfaction: 92.5, slaCompliance: 94.2, activeTickets: 12 },
];

export const KNOWLEDGE_CATEGORIES: KnowledgeMainCategory[] = [
  {
    id: 'process',
    name: '公司流程',
    icon: 'ClipboardList',
    color: 'bg-emerald-50 text-emerald-600',
    subCategories: [
      { id: 'p1', name: '入职指引', description: '新员工入职IT配置与系统权限开通' },
      { id: 'p2', name: '离职流程', description: '离职资产回收与帐号注销规范' }
    ]
  }
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  { 
    id: "k1", 
    title: "打印机驱动安装流程 (A组)", 
    mainCategoryId: "hardware",
    subCategoryId: "h2",
    content: "1. 访问公司内部驱动下载站...", 
    author: "IT 帮助台",
    views: 1204, 
    satisfaction: 98, 
    updatedAt: "2小时前更新",
    tags: ["打印机", "驱动"]
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "t1",
    ticketNo: "2685620",
    subject: "钉钉反馈 - IT 故障报修...",
    description: "用户 Lin 报告遇到问题。",
    status: TicketStatus.PENDING,
    priority: Priority.HIGH,
    category: "硬件故障",
    subCategory: "打印机 / 扫描仪",
    serviceType: "服务请求 (Request)",
    location: "上海 SMO 办公室",
    source: "DingTalk",
    userId: "u1",
    agentName: "王慧妍",
    slaResponseStatus: "已达标 (剩余 12分钟)",
    slaResolutionTime: "2 个工作日",
    createdAt: "2024-02-13 18:32",
    updatedAt: "2024-02-13 18:45",
    isActivated: true,
    activationTime: "2024-02-13 18:35",
    messages: []
  }
];

export const COMPANY_NEWS = [
  { id: 'n1', title: 'IT 基础设施升级公告', date: '2024-02-14', tag: '维护' }
];

export const REPLY_TEMPLATES = {
  GENERAL: "您好，我是 IT 工程师...",
  REMOTE: "请提供您的 TeamViewer ID 和密码...",
  EXPRESS: "您的硬件维修件已发出...",
  FOLLOW_UP: "您好，之前处理的问题现在使用是否正常？"
};