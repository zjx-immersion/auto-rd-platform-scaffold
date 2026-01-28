/**
 * C3开发执行 Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface Sprint extends BaseListItem {
  name: string
  code: string
  status: '未开始' | '进行中' | '已完成' | '已延期'
  startDate: string
  endDate: string
  progress: number
  teamSize: number
  taskTotal: number
  taskCompleted: number
  owner: string
  project: string
  description: string
}

export const mockSprints: Sprint[] = [
  {
    id: 'SPRINT-001',
    name: 'Sprint 2024-01',
    code: 'SPR-2024-001',
    status: '进行中',
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    progress: 65,
    teamSize: 12,
    taskTotal: 45,
    taskCompleted: 29,
    owner: 'Scrum Master A',
    project: '岚图梦想家',
    description: '智能座舱核心功能开发',
  },
  {
    id: 'SPRINT-002',
    name: 'Sprint 2024-02',
    code: 'SPR-2024-002',
    status: '未开始',
    startDate: '2024-01-30',
    endDate: '2024-02-13',
    progress: 0,
    teamSize: 12,
    taskTotal: 38,
    taskCompleted: 0,
    owner: 'Scrum Master A',
    project: '岚图梦想家',
    description: 'HMI界面优化迭代',
  },
  {
    id: 'SPRINT-003',
    name: 'Sprint 2024-01',
    code: 'SPR-2024-003',
    status: '已完成',
    startDate: '2024-01-08',
    endDate: '2024-01-22',
    progress: 100,
    teamSize: 10,
    taskTotal: 32,
    taskCompleted: 32,
    owner: 'Scrum Master B',
    project: '岚图追光',
    description: '导航地图集成开发',
  },
  {
    id: 'SPRINT-004',
    name: 'Sprint 2024-02',
    code: 'SPR-2024-004',
    status: '进行中',
    startDate: '2024-01-23',
    endDate: '2024-02-06',
    progress: 42,
    teamSize: 10,
    taskTotal: 40,
    taskCompleted: 17,
    owner: 'Scrum Master B',
    project: '岚图追光',
    description: '车辆远程控制功能开发',
  },
  {
    id: 'SPRINT-005',
    name: 'Sprint 2024-00',
    code: 'SPR-2024-005',
    status: '已延期',
    startDate: '2024-01-01',
    endDate: '2024-01-14',
    progress: 85,
    teamSize: 8,
    taskTotal: 28,
    taskCompleted: 24,
    owner: 'Scrum Master C',
    project: '岚图梦想家',
    description: '语音助手核心模块开发',
  },
]
