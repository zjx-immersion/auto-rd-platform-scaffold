/**
 * 项目管理域类型定义
 * 基于三级计划体系: DomainProject -> Baseline -> ProductVersion -> ModuleVersion
 */

import type { BaseEntity, Status, DateRange } from '../common'

// ==================== DomainProject（L1级计划） ====================

export enum ProjectPhase {
  CONCEPT = 'CONCEPT', // 概念阶段
  PROTOTYPE = 'PROTOTYPE', // 样车阶段
  DVS = 'DVS', // 设计验证
  PVS = 'PVS', // 生产验证
  SOP = 'SOP', // 量产
  PRODUCTION = 'PRODUCTION', // 生产中
}

export interface DomainProject extends BaseEntity {
  name: string
  code: string
  description: string
  domain: 'ADAS' | 'CABIN' | 'EE' | 'CHASSIS' | 'POWERTRAIN'
  status: Status
  phase: ProjectPhase
  
  // 关联
  vehicleId: string // 车型
  managerId: string // VPM (Vehicle Project Manager)
  
  // 团队配置
  teamIds: string[]
  
  // 统计
  baselineCount: number
  totalFeatures: number
  completedFeatures: number
  progress: number // 0-100
  
  // 时间
  startDate: string
  sopDate: string
}

// ==================== Baseline（基线） ====================

export enum BaselineStatus {
  PLANNING = 'PLANNING', // 规划中
  IN_REVIEW = 'IN_REVIEW', // 评审中
  INITIAL_FREEZE = 'INITIAL_FREEZE', // 初步冻结
  CHANGE_CONTROL = 'CHANGE_CONTROL', // 变更控制
  FINAL_FREEZE = 'FINAL_FREEZE', // 最终冻结
  RELEASED = 'RELEASED', // 已发布
  ARCHIVED = 'ARCHIVED', // 已归档
}

export interface Baseline extends BaseEntity {
  name: string
  version: string // V1.0
  description: string
  status: BaselineStatus
  
  // 关联
  domainProjectId: string
  milestoneId: string
  
  // 范围
  scope: string
  productVersionIds: string[]
  
  // 成熟度管理
  maturityThreshold: number // 成熟度阈值 (0-100)
  currentMaturity: number // 当前成熟度 (0-100)
  
  // 冻结管理
  freezeDate?: string
  freezeBy?: string
  
  // 统计
  totalFeatures: number
  completedFeatures: number
  totalMRs: number
  completedMRs: number
}

// ==================== ProjectMilestone ====================

export enum MilestoneType {
  CONCEPT = 'CONCEPT',
  PROTOTYPE = 'PROTOTYPE',
  DVS = 'DVS',
  PVS = 'PVS',
  SOP = 'SOP',
}

export interface ProjectMilestone extends BaseEntity {
  name: string
  type: MilestoneType
  targetDate: string
  actualDate?: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED'
  
  // 关联
  domainProjectId: string
  
  // 交付物
  deliverables: string[]
}

// ==================== CCB Change Control ====================

export enum ChangeType {
  ADD = 'ADD',
  MODIFY = 'MODIFY',
  DELETE = 'DELETE',
}

export enum ChangeStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IMPLEMENTED = 'IMPLEMENTED',
}

export enum ChangeImpact {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface CCBChangeRequest extends BaseEntity {
  title: string
  description: string
  changeType: ChangeType
  status: ChangeStatus
  
  // 关联
  baselineId: string
  requestedBy: string
  
  // 影响分析
  impact: ChangeImpact
  affectedFeatures: string[]
  affectedModules: string[]
  effortEstimate: number // 人日
  scheduleImpact: number // 延期天数
  
  // CCB评审
  ccbReviewDate?: string
  ccbDecision?: 'APPROVED' | 'REJECTED'
  ccbComment?: string
  
  // 实施
  implementedDate?: string
  implementedBy?: string
}

// ==================== Baseline Feature（基线Feature关联） ====================

export interface BaselineFeature {
  id: string
  baselineId: string
  featureId: string
  
  // 成熟度
  maturity: number // 0-100
  completeness: number // 0-100
  
  // 状态
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED'
  
  // 时间
  plannedStartDate: string
  plannedEndDate: string
  actualStartDate?: string
  actualEndDate?: string
}

// ==================== Baseline Quality ====================

export interface BaselineQuality {
  id: string
  baselineId: string
  
  // 质量指标
  codeQuality: number // 0-100
  testCoverage: number // 0-100
  defectDensity: number // 缺陷密度
  
  // 测试统计
  totalTestCases: number
  passedTestCases: number
  failedTestCases: number
  
  // 缺陷统计
  totalDefects: number
  criticalDefects: number
  majorDefects: number
  minorDefects: number
  
  // 更新时间
  updatedAt: string
}

// ==================== 关系数据类型 ====================

export interface DomainProjectWithBaselines extends DomainProject {
  vehicle: any // 引用Vehicle类型
  baselines: Baseline[]
  milestones: ProjectMilestone[]
  teams: any[] // 引用Team类型
}

export interface BaselineWithDetails extends Baseline {
  domainProject: DomainProject
  milestone: ProjectMilestone
  productVersions: any[] // 引用ProductVersion类型
  features: BaselineFeature[]
  quality?: BaselineQuality
  changeRequests: CCBChangeRequest[]
}

// ==================== 视图数据类型 ====================

// 基线甘特图数据
export interface BaselineGanttData {
  baseline: Baseline
  productVersions: Array<{
    productVersion: any // ProductVersion
    features: BaselineFeature[]
  }>
}

// 产品版本甘特图数据
export interface ProductVersionGanttData {
  productVersion: any // ProductVersion
  moduleVersions: any[] // ModuleVersion[]
  teams: any[] // Team[]
}

// 迭代轴视图数据
export interface IterationAxisData {
  baseline: Baseline
  productVersions: Array<{
    productVersion: any // ProductVersion
    pi: any // PI
    sprints: any[] // Sprint[]
    mapping: any[] // Product_Version_Sprint[]
  }>
}
