/**
 * 产品管理域类型定义
 * 基于领域模型: ProductLine -> Product -> ProductVersion -> Feature -> Module
 */

import type { BaseEntity, Status } from '../common'

// ==================== ProductLine ====================

export interface ProductLine extends BaseEntity {
  name: string
  code: string
  description: string
  type: 'ADAS' | 'CABIN' | 'EE' | 'OTHER'
  status: Status
  
  // 负责人
  ownerId: string // PO
  
  // 统计
  productCount: number
}

// ==================== Product ====================

export enum ProductStatus {
  PLANNING = 'PLANNING',
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  IN_TESTING = 'IN_TESTING',
  RELEASED = 'RELEASED',
  DEPRECATED = 'DEPRECATED',
}

export interface Product extends BaseEntity {
  name: string
  code: string
  description: string
  status: ProductStatus
  
  // 关联
  productLineId: string
  ownerId: string // PO
  
  // 版本统计
  versionCount: number
  latestVersion?: string
}

// ==================== ProductVersion ====================

export enum ProductVersionStatus {
  PLANNING = 'PLANNING',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  RELEASED = 'RELEASED',
  DEPRECATED = 'DEPRECATED',
}

export interface ProductVersion extends BaseEntity {
  version: string // V1.0, V1.1, etc.
  name?: string
  description: string
  status: ProductVersionStatus
  
  // 关联
  productId: string
  baselineId?: string
  piId?: string // 对应一个PI
  
  // Feature列表
  featureIds: string[]
  
  // 成熟度与完成度
  maturity: number // 0-100
  completeness: number // 0-100
  
  // 时间计划
  startDate: string
  releaseDate: string
  actualReleaseDate?: string
}

// ==================== Feature（业务架构层） ====================

export interface ProductFeature extends BaseEntity {
  name: string
  code: string
  description: string
  
  // 关联
  productId: string
  parentFeatureId?: string // 支持层级结构
  
  // 子Feature
  childFeatureIds?: string[]
  
  // 模块映射
  moduleIds: string[]
}

// ==================== Module（业务架构层） ====================

export enum ModuleStatus {
  PLANNING = 'PLANNING',
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  IN_TESTING = 'IN_TESTING',
  RELEASED = 'RELEASED',
}

export interface Module extends BaseEntity {
  name: string
  code: string
  description: string
  status: ModuleStatus
  
  // 关联
  featureId: string
  ownerTeamId: string
  
  // 模块信息
  category: 'PERCEPTION' | 'PLANNING' | 'CONTROL' | 'COMMUNICATION' | 'OTHER'
  
  // 统计
  mrCount: number
}

// ==================== ModuleVersion（L3级计划） ====================

export interface ModuleVersion extends BaseEntity {
  version: string
  name?: string
  description: string
  
  // 关联
  moduleId: string
  productVersionId: string
  teamId: string
  
  // 工作量
  estimatedEffort: number // 人日
  actualEffort?: number
  
  // 时间
  startDate: string
  endDate: string
  
  // 进度
  progress: number // 0-100
}

// ==================== 关系数据类型 ====================

export interface ProductLineWithProducts extends ProductLine {
  products: Product[]
}

export interface ProductWithVersions extends Product {
  productLine: ProductLine
  versions: ProductVersion[]
  features: ProductFeature[]
}

export interface ProductVersionWithDetails extends ProductVersion {
  product: Product
  baseline?: any // 引用Baseline类型
  pi?: any // 引用PI类型
  features: ProductFeature[]
  moduleVersions: ModuleVersion[]
}

export interface FeatureWithModules extends ProductFeature {
  product: Product
  parentFeature?: ProductFeature
  childFeatures?: ProductFeature[]
  modules: Module[]
}
