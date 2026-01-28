/**
 * C6 DevOps Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface Pipeline extends BaseListItem {
  name: string
  code: string
  status: '等待中' | '运行中' | '成功' | '失败' | '已取消'
  type: 'CI' | 'CD' | 'CI/CD'
  trigger: '手动' | '代码提交' | '定时任务' | 'MR合并'
  duration: number
  branch: string
  commit: string
  operator: string
  project: string
  createdAt: string
}

export const mockPipelines: Pipeline[] = [
  {
    id: 'PIPE-001',
    name: '智能座舱-CI流水线',
    code: 'PIPE-2024-001',
    status: '成功',
    type: 'CI',
    trigger: '代码提交',
    duration: 580,
    branch: 'feature/voice-assistant',
    commit: 'a1b2c3d',
    operator: '开发者A',
    project: '岚图梦想家',
    createdAt: '2024-01-25 14:30:00',
  },
  {
    id: 'PIPE-002',
    name: '智能座舱-CD流水线',
    code: 'PIPE-2024-002',
    status: '运行中',
    type: 'CD',
    trigger: '手动',
    duration: 320,
    branch: 'main',
    commit: 'e4f5g6h',
    operator: '运维工程师B',
    project: '岚图梦想家',
    createdAt: '2024-01-26 10:15:00',
  },
  {
    id: 'PIPE-003',
    name: '导航系统-CI/CD',
    code: 'PIPE-2024-003',
    status: '失败',
    type: 'CI/CD',
    trigger: 'MR合并',
    duration: 450,
    branch: 'develop',
    commit: 'i7j8k9l',
    operator: '开发者C',
    project: '岚图追光',
    createdAt: '2024-01-26 11:20:00',
  },
  {
    id: 'PIPE-004',
    name: '车控系统-CI流水线',
    code: 'PIPE-2024-004',
    status: '成功',
    type: 'CI',
    trigger: '代码提交',
    duration: 620,
    branch: 'feature/remote-control',
    commit: 'm0n1o2p',
    operator: '开发者D',
    project: '岚图追光',
    createdAt: '2024-01-26 13:45:00',
  },
  {
    id: 'PIPE-005',
    name: 'HMI系统-定时构建',
    code: 'PIPE-2024-005',
    status: '等待中',
    type: 'CI',
    trigger: '定时任务',
    duration: 0,
    branch: 'main',
    commit: 'q3r4s5t',
    operator: '系统',
    project: '岚图梦想家',
    createdAt: '2024-01-26 15:00:00',
  },
]
