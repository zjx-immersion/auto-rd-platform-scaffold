/**
 * C1需求管理 Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface Requirement extends BaseListItem {
  name: string
  code: string
  type: 'Epic' | 'Feature' | 'SSTS' | 'MR'
  priority: '高' | '中' | '低'
  status: '待评审' | '评审中' | '已评审' | '开发中' | '已完成' | '已关闭'
  owner: string
  project: string
  description: string
  createdAt: string
  updatedAt: string
}

export const mockRequirements: Requirement[] = [
  {
    id: 'REQ-001',
    name: '智能座舱系统需求',
    code: 'EPIC-2024-001',
    type: 'Epic',
    priority: '高',
    status: '开发中',
    owner: '张三',
    project: '岚图梦想家',
    description: '智能座舱系统整体需求规划，包含语音助手、车机系统、HMI交互等',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'REQ-002',
    name: '语音助手功能',
    code: 'FEATURE-2024-101',
    type: 'Feature',
    priority: '高',
    status: '评审中',
    owner: '李四',
    project: '岚图梦想家',
    description: '实现智能语音助手，支持语音唤醒、语音控制、语音交互',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-21',
  },
  {
    id: 'REQ-003',
    name: '车机HMI界面设计',
    code: 'SSTS-2024-501',
    type: 'SSTS',
    priority: '中',
    status: '已评审',
    owner: '王五',
    project: '岚图梦想家',
    description: 'HMI界面设计规范，包含主题、布局、交互动效',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-22',
  },
  {
    id: 'REQ-004',
    name: '导航地图集成',
    code: 'MR-2024-1001',
    type: 'MR',
    priority: '高',
    status: '已完成',
    owner: '赵六',
    project: '岚图追光',
    description: '集成高德地图SDK，实现导航、路径规划功能',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-23',
  },
  {
    id: 'REQ-005',
    name: '车辆远程控制',
    code: 'FEATURE-2024-102',
    type: 'Feature',
    priority: '中',
    status: '待评审',
    owner: '孙七',
    project: '岚图追光',
    description: '支持远程启动、远程锁车、远程空调控制',
    createdAt: '2024-01-19',
    updatedAt: '2024-01-24',
  },
]
