/**
 * 资产管理域类型定义
 */

import type { BaseEntity } from '../common'

// ==================== Asset ====================

export enum AssetType {
  PRODUCT = 'PRODUCT',
  FEATURE = 'FEATURE',
  MODULE = 'MODULE',
  COMPONENT = 'COMPONENT',
  ALGORITHM = 'ALGORITHM',
}

export enum AssetStatus {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  DEPRECATED = 'DEPRECATED',
}

export enum MaturityLevel {
  L1 = 'L1', // 初级：概念验证
  L2 = 'L2', // 中级：功能验证
  L3 = 'L3', // 高级：系统验证
  L4 = 'L4', // 专家：批量应用
}

export interface Asset extends BaseEntity {
  name: string
  code: string
  description: string
  type: AssetType
  status: AssetStatus
  
  // 版本
  version: string
  previousVersionId?: string
  
  // 成熟度
  maturityLevel: MaturityLevel
  maturityScore: number // 0-100
  
  // 分类
  domain: string // ADAS, CABIN, EE
  category: string
  tags: string[]
  
  // 技术信息
  technology: string
  architecture?: string
  interfaces?: string[]
  
  // 质量指标
  testCoverage: number // 0-100
  defectDensity: number
  codeQuality: number // 0-100
  
  // 复用信息
  reuseCount: number // 被复用次数
  projects: string[] // 使用该资产的项目
  
  // 资产内容
  repositoryUrl?: string
  documentationUrl?: string
  
  // 维护
  ownerId: string
  maintainerIds: string[]
  
  // 审批
  approvedBy?: string
  approvedAt?: string
}

// ==================== Asset Match Result ====================

export interface AssetMatchResult {
  assetId: string
  asset: Asset
  
  // 匹配度
  matchScore: number // 0-100
  
  // 匹配维度
  functionalMatch: number // 功能匹配度
  technicalMatch: number // 技术匹配度
  maturityMatch: number // 成熟度匹配度
  
  // 复用建议
  reuseStrategy: 'FULL_REUSE' | 'PARTIAL_REUSE' | 'MODIFY_EXISTING' | 'REFERENCE_ONLY'
  effortSaved: number // 节省工作量（人日）
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  
  // 差异分析
  gaps: string[]
  modifications: string[]
  
  // 推荐理由
  reasons: string[]
}

// ==================== Asset Reuse Record ====================

export interface AssetReuseRecord extends BaseEntity {
  assetId: string
  assetVersion: string
  
  // 使用方
  projectId: string
  mrId: string
  teamId: string
  
  // 复用策略
  reuseStrategy: 'FULL_REUSE' | 'PARTIAL_REUSE' | 'MODIFY_EXISTING'
  modifications?: string
  
  // 效益
  effortSaved: number // 人日
  costSaved: number // 成本
  qualityImproved: boolean
  
  // 反馈
  feedback?: string
  rating?: number // 1-5
  
  // 时间
  reusedAt: string
}

// ==================== 关系数据类型 ====================

export interface AssetWithDetails extends Asset {
  owner: any // User
  maintainers: any[] // User[]
  reuseRecords: AssetReuseRecord[]
  relatedAssets: Asset[]
}

export interface AssetSearchParams {
  keyword?: string
  type?: AssetType
  domain?: string
  category?: string
  maturityLevel?: MaturityLevel
  minMaturityScore?: number
  tags?: string[]
}
