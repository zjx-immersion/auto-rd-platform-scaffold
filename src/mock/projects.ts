/**
 * 项目管理Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface Project extends BaseListItem {
  name: string
  code: string
  description: string
  status: 'planning' | 'active' | 'completed' | 'archived'
  owner: string
  startDate: string
  endDate: string
  progress: number
  teamSize: number
}

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: '岚图梦想家 - ADAS项目',
    code: 'LANTU-ADAS-001',
    description: '岚图梦想家ADAS功能开发项目',
    status: 'active',
    owner: '张三',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    progress: 65,
    teamSize: 25,
  },
  {
    id: 'proj-002',
    name: '岚图追光 - 智能座舱',
    code: 'LANTU-CABIN-002',
    description: '岚图追光智能座舱系统开发',
    status: 'active',
    owner: '李四',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    progress: 45,
    teamSize: 18,
  },
  {
    id: 'proj-003',
    name: '岚图FREE - 动力系统',
    code: 'LANTU-POWER-003',
    description: '岚图FREE动力系统优化项目',
    status: 'planning',
    owner: '王五',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    progress: 10,
    teamSize: 12,
  },
  {
    id: 'proj-004',
    name: '岚图梦想家 - 车身控制',
    code: 'LANTU-BODY-004',
    description: '岚图梦想家车身控制系统',
    status: 'completed',
    owner: '赵六',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    progress: 100,
    teamSize: 15,
  },
  {
    id: 'proj-005',
    name: '岚图追光 - 底盘系统',
    code: 'LANTU-CHASSIS-005',
    description: '岚图追光底盘系统开发',
    status: 'archived',
    owner: '孙七',
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    progress: 100,
    teamSize: 20,
  },
]
