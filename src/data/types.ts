/**
 * 核心数据类型定义
 */

// UC (Use Case) - 用例需求（原Epic）
export interface UC {
    id: string
    name: string
    description: string
    priority: 'Must' | 'Should' | 'Could' | 'Won\'t'
    status: '草稿' | '待评审' | '评审中' | '已通过' | '已拒绝'
    source: '用户需求' | '市场反馈' | '创新需求' | 'FIP表' | '自管理'
    owner: string
    productId?: string // 关联产品线/产品ID
    createdAt: string
    updatedAt: string
}

// Feature - 特性需求
export interface Feature {
    id: string
    ucId: string // 原epicId，改为ucId
    name: string
    version: string
    priority: 'P0' | 'P1' | 'P2'
    status: '草稿' | '设计中' | '评审中' | '已通过' | '开发中' | '已完成'
    owner: string
    team: string
    productId: string
    startDate?: string
    endDate?: string
    createdAt: string
    updatedAt: string
}

// PRD - 产品需求文档
export interface PRD {
    id: string
    featureId: string
    content: string
    version: string
    createdAt: string
    updatedAt: string
}

// SSTS - 场景化技术规格
export interface SSTS {
    id: string
    featureId: string
    name: string
    scenario: string
    techSpec: string
    acceptanceCriteria: string
    version: string
    priority: 'P0' | 'P1' | 'P2'
    status: '草稿' | '设计中' | '评审中' | '已通过' | '开发中' | '已完成' // 添加status字段
    reviewStatus: '草稿' | '评审中' | '已通过' | '已拒绝'
    owner: string
    createdAt: string
    updatedAt: string
}

// MR - 模块需求
export interface MR {
    id: string
    sstsId: string
    moduleId?: string // 可选，用于传统模块需求
    name: string
    description: string
    effort?: number // 工作量（人天），可选
    status: '待分配' | '已分配' | '开发中' | '已完成' | '待审核' | '已合并'
    iterationId?: string
    author?: string // 作者，用于代码审查场景
    reviewer?: string // 审核人，用于代码审查场景
    priority?: 'P0' | 'P1' | 'P2' // 优先级，可选
    createdAt: string
    updatedAt: string
}

// Module - 模块
export interface Module {
    id: string
    name: string
    teamId: string
    productId: string
    description: string
    createdAt: string
}

// Team - 团队
export interface Team {
    id: string
    name: string
    capacity: number // 每Sprint容量（人天）
    members: string[]
    createdAt: string
}

// IterationPlan - 迭代规划
export interface IterationPlan {
    id: string
    name: string
    description: string
    startDate: string
    endDate: string
    sprints: number // Sprint数量
    status: '规划中' | '进行中' | '已完成'
    createdAt: string
}

// Iteration - 迭代（Sprint）
export interface Iteration {
    id: string
    planId: string
    moduleId: string
    sprint: number
    name: string
    capacity: number
    allocated: number
    mrIds: string[]
}

// WorkItem - 工作项
export interface WorkItem {
    id: string
    type: 'MR需求' | '缺陷修复' | '技术任务' | '风险'
    title: string
    description: string
    mrId?: string
    teamId: string
    assignee: string
    priority: '高' | '中' | '低'
    status: '待办' | '进行中' | '已完成'
    sprint: number
    effort: number
    createdAt: string
    updatedAt: string
}

// Product - 产品
export interface Product {
    id: string
    name: string
    description: string
    productLineId: string
    createdAt: string
}

// ProductLine - 产品线
export interface ProductLine {
    id: string
    name: string
    description: string
    createdAt: string
}
