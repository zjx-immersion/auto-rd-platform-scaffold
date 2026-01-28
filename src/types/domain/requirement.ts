/**
 * 需求管理域类型定义
 * 基于领域模型: Epic -> Feature -> SSTS -> MR
 */

import type { BaseEntity, Status, Priority, MoSCoW, ApprovalRecord } from '../common'

// ==================== Epic ====================

export enum EpicStatus {
  DRAFT = 'DRAFT',
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Epic extends BaseEntity {
  name: string
  code: string
  description: string
  status: EpicStatus
  priority: Priority
  moscow: MoSCoW
  
  // 关联
  productLineId: string
  ownerId: string // PO
  
  // 业务价值
  businessValue: string
  targetUsers: string[]
  
  // 统计
  featureCount: number
  totalStoryPoints: number
  completedStoryPoints: number
  progress: number // 0-100
  
  // 时间
  startDate?: string
  targetDate?: string
}

// ==================== Feature ====================

export enum FeatureStatus {
  REQUIREMENT_ANALYSIS = 'REQUIREMENT_ANALYSIS', // 需求分析
  PRD_WRITING = 'PRD_WRITING', // PRD编写
  PRD_REVIEW = 'PRD_REVIEW', // PRD评审
  SSTS_DECOMPOSITION = 'SSTS_DECOMPOSITION', // SSTS拆解
  IN_DEVELOPMENT = 'IN_DEVELOPMENT', // 开发中
  IN_TESTING = 'IN_TESTING', // 测试中
  COMPLETED = 'COMPLETED', // 已完成
  CANCELLED = 'CANCELLED', // 已取消
}

export interface Feature extends BaseEntity {
  name: string
  code: string
  description: string
  status: FeatureStatus
  priority: Priority
  
  // 关联
  epicId: string
  productId: string
  ownerId: string // FO (Feature Owner)
  
  // PRD
  prdContent?: string // 富文本内容
  prdVersion?: string
  prdStatus?: 'DRAFT' | 'IN_REVIEW' | 'APPROVED'
  
  // 验收标准
  acceptanceCriteria: AcceptanceCriterion[]
  
  // 统计
  sstsCount: number
  mrCount: number
  storyPoints: number
  maturity: number // 成熟度 0-100
  completeness: number // 完成度 0-100
  
  // 时间
  startDate?: string
  targetDate?: string
  completedDate?: string
}

export interface AcceptanceCriterion {
  id: string
  given: string // Given: 前置条件
  when: string // When: 操作
  then: string // Then: 期望结果
  status: 'PENDING' | 'PASSED' | 'FAILED'
}

// ==================== SSTS ====================

export enum SSTSType {
  SYSTEM = 'SYSTEM', // 系统需求
  TECHNICAL = 'TECHNICAL', // 技术需求
  SAFETY = 'SAFETY', // 安全需求
  PERFORMANCE = 'PERFORMANCE', // 性能需求
  INTERFACE = 'INTERFACE', // 接口需求
}

export enum SSTSStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum SafetyLevel {
  QM = 'QM', // Quality Management
  ASIL_A = 'ASIL_A',
  ASIL_B = 'ASIL_B',
  ASIL_C = 'ASIL_C',
  ASIL_D = 'ASIL_D', // 最高安全等级
}

export interface SSTS extends BaseEntity {
  name: string
  code: string
  description: string
  type: SSTSType
  status: SSTSStatus
  priority: Priority
  
  // 关联
  featureId: string
  moduleId?: string
  ownerId: string // SE (System Engineer) or FO
  
  // 规格
  functionalSpec?: string // 功能规格
  technicalSpec?: string // 技术规格
  performanceSpec?: string // 性能规格
  safetyLevel?: SafetyLevel
  
  // 验证
  verificationMethod: 'TEST' | 'ANALYSIS' | 'INSPECTION' | 'DEMONSTRATION'
  verificationCriteria?: string
  
  // 统计
  mrCount: number
  
  // 评审
  reviews: ApprovalRecord[]
}

// ==================== MR (Module Requirement) ====================

export enum MRStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  READY_FOR_DEV = 'READY_FOR_DEV',
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  IN_TESTING = 'IN_TESTING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ReuseStrategy {
  FULL_REUSE = 'FULL_REUSE', // 完全复用
  PARTIAL_REUSE = 'PARTIAL_REUSE', // 部分复用
  NEW_DEVELOPMENT = 'NEW_DEVELOPMENT', // 新开发
  MODIFY_EXISTING = 'MODIFY_EXISTING', // 修改已有
}

export interface MR extends BaseEntity {
  name: string
  code: string
  description: string
  status: MRStatus
  priority: Priority
  
  // 关联
  sstsId: string
  moduleId: string
  teamId: string
  assigneeId?: string // SO (System Owner)
  
  // 接口设计
  interfaces: ModuleInterface[]
  
  // 工作量
  estimatedEffort: number // 人日
  actualEffort?: number
  
  // 资产复用
  reuseStrategy: ReuseStrategy
  reusedAssetId?: string
  reusedAssetVersion?: string
  effortSaved?: number // 节省的工作量（人日）
  
  // 就绪检查
  isReady: boolean
  readinessChecks: ReadinessCheck[]
  
  // 评审
  reviews: ApprovalRecord[]
}

export interface ModuleInterface {
  id: string
  name: string
  type: 'INPUT' | 'OUTPUT' | 'API' | 'EVENT'
  protocol?: string
  dataFormat?: string
  description?: string
}

export interface ReadinessCheck {
  id: string
  item: string
  status: 'PASS' | 'FAIL' | 'N/A'
  comment?: string
}

// ==================== 关系数据类型 ====================

export interface EpicWithFeatures extends Epic {
  features: Feature[]
}

export interface FeatureWithDetails extends Feature {
  epic: Epic
  product: any // 引用Product类型
  ssts: SSTS[]
  mrs: MR[]
}

export interface SSTSWithDetails extends SSTS {
  feature: Feature
  module?: any // 引用Module类型
  mrs: MR[]
}

export interface MRWithDetails extends MR {
  ssts: SSTS
  module: any // 引用Module类型
  team: any // 引用Team类型
  reusedAsset?: any // 引用Asset类型
}
