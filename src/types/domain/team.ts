/**
 * 团队协作域类型定义
 */

import type { BaseEntity } from '../common'

// ==================== Team ====================

export enum TeamType {
  SCRUM = 'SCRUM',
  KANBAN = 'KANBAN',
  HYBRID = 'HYBRID',
}

export interface Team extends BaseEntity {
  name: string
  code: string
  description: string
  type: TeamType
  
  // 领域
  domain: 'ADAS' | 'CABIN' | 'EE' | 'PLATFORM' | 'OTHER'
  
  // 负责人
  leaderId: string // DL (Development Leader)
  
  // 成员
  memberIds: string[]
  memberCount: number
  
  // 容量
  capacity: number // 每Sprint人日
  velocity: number // 历史速率
  
  // 模块负责
  moduleIds: string[]
}

// ==================== TeamMember ====================

export enum MemberRole {
  VPM = 'VPM', // Vehicle Project Manager
  PO = 'PO', // Product Owner
  FO = 'FO', // Feature Owner
  PM = 'PM', // Project Manager
  SE = 'SE', // System Engineer
  TPM = 'TPM', // Technical Program Manager
  SO = 'SO', // System Owner
  DL = 'DL', // Development Leader
  DEV = 'DEV', // Developer
  QA = 'QA', // Quality Assurance
  DEVOPS = 'DEVOPS', // DevOps Engineer
}

export interface TeamMember extends BaseEntity {
  userId: string
  teamId: string
  role: MemberRole
  
  // 工作信息
  capacity: number // 每天可用小时数
  availability: number // 可用性百分比 (0-100)
  
  // 技能
  skills: string[]
  
  // 加入/离开时间
  joinedAt: string
  leftAt?: string
}

// ==================== User ====================

export interface User extends BaseEntity {
  username: string
  email: string
  name: string
  avatar?: string
  
  // 组织
  department: string
  position: string
  
  // 角色
  roles: MemberRole[]
  
  // 状态
  isActive: boolean
  lastLoginAt?: string
}

// ==================== 关系数据类型 ====================

export interface TeamWithMembers extends Team {
  leader: User
  members: Array<{
    member: TeamMember
    user: User
  }>
  modules: any[] // Module[]
}

export interface UserProfile extends User {
  teams: Array<{
    team: Team
    membership: TeamMember
  }>
  assignedTasks: any[] // Task[]
  ownedFeatures: any[] // Feature[]
}
