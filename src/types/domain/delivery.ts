/**
 * 工程交付域类型定义
 * 基于领域模型: PI -> Sprint -> Task
 */

import type { BaseEntity, Status } from '../common'

// ==================== PI (Program Increment) ====================

export enum PIStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface PI extends BaseEntity {
  name: string
  code: string // PI-2024-Q1
  description: string
  status: PIStatus
  
  // 关联
  productVersionId: string
  domainProjectId: string
  
  // 周期
  duration: number // 周数，通常12周
  sprintCount: number // Sprint数量，通常6个
  
  // 时间
  startDate: string
  endDate: string
  
  // 目标
  objectives: PIObjective[]
  
  // 容量规划
  totalCapacity: number // 总人日
  committedCapacity: number // 承诺人日
  actualCapacity?: number // 实际人日
  
  // 统计
  totalStoryPoints: number
  completedStoryPoints: number
  velocity: number // 速率
}

export interface PIObjective {
  id: string
  description: string
  businessValue: number // 1-10
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'AT_RISK'
}

// ==================== Sprint ====================

export enum SprintStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Sprint extends BaseEntity {
  name: string
  code: string // Sprint-1, Sprint-2
  description: string
  status: SprintStatus
  
  // 关联
  piId: string
  teamId: string
  
  // 周期
  duration: number // 周数，通常2周
  startDate: string
  endDate: string
  
  // 目标
  goal: string
  
  // 容量
  capacity: number // 人日
  committedStoryPoints: number
  completedStoryPoints: number
  velocity: number
  
  // 统计
  totalTasks: number
  completedTasks: number
  progress: number // 0-100
  
  // 燃尽图数据
  burndownData: BurndownPoint[]
}

export interface BurndownPoint {
  date: string
  remainingStoryPoints: number
  idealRemaining: number
}

// ==================== Task ====================

export enum TaskType {
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  DOCUMENTATION = 'DOCUMENTATION',
  BUG_FIX = 'BUG_FIX',
  REVIEW = 'REVIEW',
  OTHER = 'OTHER',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export interface Task extends BaseEntity {
  title: string
  description: string
  type: TaskType
  status: TaskStatus
  
  // 关联
  mrId: string
  sprintId: string
  assigneeId: string
  reporterId: string
  
  // 工作量
  estimatedHours: number
  actualHours?: number
  remainingHours?: number
  storyPoints?: number
  
  // 时间
  startDate?: string
  dueDate?: string
  completedDate?: string
  
  // 阻塞
  blockedReason?: string
  blockedBy?: string[]
  
  // 依赖
  dependencies: string[] // Task IDs
  
  // 代码关联
  commitIds: string[]
  pullRequestIds: string[]
  
  // 测试关联
  testCaseIds: string[]
}

// ==================== Build ====================

export enum BuildStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface Build extends BaseEntity {
  name: string
  buildNumber: string
  status: BuildStatus
  
  // 关联
  sprintId: string
  triggeredBy: string
  
  // 代码
  branch: string
  commitId: string
  
  // 时间
  startTime: string
  endTime?: string
  duration?: number // 秒
  
  // 结果
  testsPassed: number
  testsFailed: number
  codeQuality?: number
  coverage?: number
  
  // 构建产物
  artifacts: BuildArtifact[]
}

export interface BuildArtifact {
  id: string
  name: string
  url: string
  size: number
  type: string
}

// ==================== Release ====================

export enum ReleaseStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export interface Release extends BaseEntity {
  name: string
  version: string
  description: string
  status: ReleaseStatus
  
  // 关联
  productVersionId: string
  baselineId?: string
  buildId: string
  
  // 时间
  scheduledDate: string
  actualDate?: string
  
  // 发布内容
  features: string[]
  bugFixes: string[]
  improvements: string[]
  
  // 环境
  targetEnvironment: string
  
  // 批准
  approvedBy?: string
  approvedAt?: string
}

// ==================== 关系数据类型 ====================

export interface PIWithDetails extends PI {
  productVersion: any // ProductVersion
  sprints: Sprint[]
  teams: any[] // Team[]
}

export interface SprintWithDetails extends Sprint {
  pi: PI
  team: any // Team
  tasks: Task[]
  mrs: any[] // MR[]
}

export interface TaskWithDetails extends Task {
  mr: any // MR
  sprint: Sprint
  assignee: any // User
  reporter: any // User
  blockers: Task[]
  dependsOn: Task[]
}

// ==================== 看板数据类型 ====================

export interface KanbanColumn {
  id: string
  name: string
  status: TaskStatus
  tasks: Task[]
  limit?: number // WIP限制
}

export interface KanbanBoard {
  sprintId: string
  columns: KanbanColumn[]
  swimlanes?: KanbanSwimlane[]
}

export interface KanbanSwimlane {
  id: string
  name: string // 按人员、按MR等
  tasks: Task[]
}
