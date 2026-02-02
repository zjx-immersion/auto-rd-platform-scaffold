/**
 * C1需求管理 Mock数据
 */

import type { BaseListItem } from '@/types/common'

export type RequirementType = 'Epic' | 'Feature' | 'SSTS' | 'MR' | 'FIP'
export type Priority = 'High' | 'Medium' | 'Low' | 'P0' | 'P1' | 'P2'
export type RequirementStatus = '待评审' | '评审中' | '已评审' | '开发中' | '已完成' | '已关闭' | 'To Do' | 'In Progress' | 'Done'

export interface Requirement extends BaseListItem {
  name: string
  code: string
  type: RequirementType
  priority: Priority
  status: RequirementStatus
  owner: string
  project: string
  description: string
  source?: 'Self-managed' | 'FIP' // For Epics
  fipOriginalId?: string // For FIP
  targetVersion?: string // For Feature
  module?: string // For MR
  createdAt: string
  updatedAt: string
}

export const mockRequirements: Requirement[] = [
  // L0: Self-managed Epic
  {
    id: 'REQ-EPIC-001',
    name: '智能座舱语音交互升级 2.0',
    code: 'EPIC-2024-001',
    type: 'Epic',
    priority: 'P0',
    status: 'In Progress',
    owner: '张三',
    project: '岚图梦想家',
    description: '全面升级语音助手能力，支持连续对话和多意图识别',
    source: 'Self-managed',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  // L0: FIP Import
  {
    id: 'REQ-FIP-001',
    name: '[FIP] 自动泊车-垂直车位优化',
    code: 'FIP-2024-882',
    type: 'Epic',
    priority: 'P1',
    status: 'To Do',
    owner: 'FIP_Importer',
    project: '岚图追光',
    description: '优化垂直车位泊入成功率，来源整车规划表',
    source: 'FIP',
    fipOriginalId: 'FIP_ROW_882',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  // L1: Feature
  {
    id: 'REQ-FEAT-002',
    name: '语音连续对话能力',
    code: 'FEAT-2024-101',
    type: 'Feature',
    priority: 'High',
    status: '评审中',
    owner: '李四',
    project: '岚图梦想家',
    description: '支持20秒内免唤醒持续交互',
    targetVersion: 'V2.1.0',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-21',
  },
  {
    id: 'REQ-FEAT-005',
    name: '车辆远程控制-空调',
    code: 'FEAT-2024-102',
    type: 'Feature',
    priority: 'Medium',
    status: '待评审',
    owner: '孙七',
    project: '岚图追光',
    description: '支持远程启动、远程锁车、远程空调控制',
    targetVersion: 'V1.5',
    createdAt: '2024-01-19',
    updatedAt: '2024-01-24',
  },
  // L2: SSTS
  {
    id: 'REQ-SSTS-003',
    name: '语音唤醒响应时延规范',
    code: 'SSTS-2024-501',
    type: 'SSTS',
    priority: 'Medium',
    status: '已评审',
    owner: '王五',
    project: '岚图梦想家',
    description: '唤醒响应时间需小于 300ms',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-22',
  },
  // L3: MR
  {
    id: 'REQ-MR-004',
    name: '语音服务-唤醒词检测模块',
    code: 'MR-2024-1001',
    type: 'MR',
    priority: 'High',
    status: '已完成',
    owner: '赵六',
    project: '岚图梦想家',
    description: '集成声纹识别SDK，实现唤醒词精准检测',
    module: 'Cockpit-Voice-Service',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-23',
  },
]
