
export enum TicketStatus {
  NEW = '新建',
  PENDING = '处理中',
  SUSPENDED = '挂起',
  RESOLVED = '已解决',
  CLOSED = '已关闭'
}

export enum Priority {
  LOW = '低',
  MEDIUM = '中',
  HIGH = '高',
  URGENT = '紧急'
}

export enum UserRole {
  INTERN = '实习生',
  FULL_TIME = '正式员工',
  VIP = 'VIP'
}

export interface UserAsset {
  id: string;
  model: string;
  sn: string;
  status: '已分配' | '待回收' | '维修中';
  warrantyStatus: string;
  warrantyColor: string;
}

// Added AssetStatus, AssetLog, and Asset to fix missing export errors
export type AssetStatus = '在库' | '领用中' | '故障维修' | '待报废';

export interface AssetLog {
  id: string;
  type: string;
  operator: string;
  targetUser?: string;
  timestamp: string;
  note: string;
}

export interface Asset {
  id: string;
  assetNo: string;
  model: string;
  sn: string;
  computerName: string;
  status: AssetStatus;
  currentUser?: string;
  employeeNo?: string;
  department?: string;
  logs: AssetLog[];
}

export interface UserInfo {
  id: string;
  name: string;
  employeeNo: string;
  subsidiary: string; // 新增：子公司
  department: string;
  phone: string;
  dingTalkPhone: string;
  email: string;
  city: string;
  vipLevel: number;
  position: string;
  role: UserRole;
  manager: string;
  assets: UserAsset[];
  joinDate: string; // 新增：入职日期
}

export interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'internal' | 'log';
  isInternal?: boolean;
}

export interface Ticket {
  id: string;
  ticketNo: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  category: string;
  subCategory: string;
  serviceType: string;
  location: string;
  source: 'DingTalk' | 'Email' | 'Web';
  userId: string;
  agentName: string;
  slaResponseStatus: string;
  slaResolutionTime: string;
  createdAt: string;
  updatedAt: string;
  isActivated: boolean;
  activationTime?: string;
  messages: Message[];
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  mainCategoryId: string;
  subCategoryId: string;
  content: string;
  author: string;
  views: number;
  satisfaction: number;
  updatedAt: string;
  tags: string[];
}

export interface KnowledgeSubCategory {
  id: string;
  name: string;
  description: string;
}

export interface KnowledgeMainCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  subCategories: KnowledgeSubCategory[];
}

export interface EngineerStats {
  id: string;
  name: string;
  avatar: string;
  team: 'L1' | 'L2';
  resolvedCount: number;
  avgResolutionTime: string;
  satisfaction: number;
  slaCompliance: number;
  activeTickets: number;
}