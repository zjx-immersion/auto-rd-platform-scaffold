/**
 * 通用类型定义
 */

// 状态枚举
export const Status = {
  DRAFT: 'DRAFT',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  BLOCKED: 'BLOCKED',
} as const
export type Status = typeof Status[keyof typeof Status]

// 优先级枚举
export const Priority = {
  P0: 'P0', // 最高优先级
  P1: 'P1', // 高优先级
  P2: 'P2', // 中优先级
  P3: 'P3', // 低优先级
} as const
export type Priority = typeof Priority[keyof typeof Priority]

// MoSCoW分类
export const MoSCoW = {
  MUST: 'MUST', // 必须有
  SHOULD: 'SHOULD', // 应该有
  COULD: 'COULD', // 可以有
  WONT: 'WONT', // 不会有
} as const
export type MoSCoW = typeof MoSCoW[keyof typeof MoSCoW]

// 基础实体接口
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

export interface BaseListItem extends BaseEntity {
  name: string
  code: string
  description?: string
  status: string
  priority?: string
  owner?: string
}

// 分页参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应
export interface PaginationResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

// API响应
export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  success: boolean
}

// 树节点
export interface TreeNode<T = any> {
  key: string
  title: string
  children?: TreeNode<T>[]
  data?: T
}

// 选项
export interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

// 日期范围
export interface DateRange {
  startDate: string
  endDate: string
}

// 附件
export interface Attachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: string
  uploadedBy: string
}

// 评论
export interface Comment {
  id: string
  content: string
  createdAt: string
  createdBy: string
  parentId?: string
  replies?: Comment[]
}

// 变更记录
export interface ChangeLog {
  id: string
  field: string
  oldValue: any
  newValue: any
  changedAt: string
  changedBy: string
}

// 审批状态
export const ApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
} as const
export type ApprovalStatus = typeof ApprovalStatus[keyof typeof ApprovalStatus]

// 审批记录
export interface ApprovalRecord {
  id: string
  status: ApprovalStatus
  approver: string
  approvedAt?: string
  comment?: string
}
