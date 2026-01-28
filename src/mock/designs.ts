/**
 * C2方案设计 Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface Design extends BaseListItem {
  name: string
  code: string
  type: '架构设计' | '组件设计' | '接口设计'
  status: '草稿' | '设计中' | '评审中' | '已评审' | '已发布'
  designer: string
  project: string
  version: string
  description: string
  createdAt: string
  updatedAt: string
}

export const mockDesigns: Design[] = [
  {
    id: 'DESIGN-001',
    name: '智能座舱系统架构',
    code: 'ARCH-2024-001',
    type: '架构设计',
    status: '已评审',
    designer: '架构师A',
    project: '岚图梦想家',
    version: 'v1.0',
    description: '智能座舱系统整体架构设计，包含车机、语音、HMI等子系统',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25',
  },
  {
    id: 'DESIGN-002',
    name: '语音识别组件',
    code: 'COMP-2024-101',
    type: '组件设计',
    status: '设计中',
    designer: '设计师B',
    project: '岚图梦想家',
    version: 'v0.5',
    description: '语音识别核心组件设计，支持离线和在线识别',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-26',
  },
  {
    id: 'DESIGN-003',
    name: '车控API接口',
    code: 'API-2024-201',
    type: '接口设计',
    status: '已发布',
    designer: '架构师C',
    project: '岚图追光',
    version: 'v2.1',
    description: '车辆控制相关API接口设计，包含远程控制、状态查询等',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-27',
  },
  {
    id: 'DESIGN-004',
    name: 'HMI交互设计',
    code: 'COMP-2024-102',
    type: '组件设计',
    status: '评审中',
    designer: '设计师D',
    project: '岚图梦想家',
    version: 'v1.2',
    description: 'HMI交互组件库设计，包含按钮、弹窗、Toast等基础组件',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-28',
  },
  {
    id: 'DESIGN-005',
    name: '数据采集架构',
    code: 'ARCH-2024-002',
    type: '架构设计',
    status: '草稿',
    designer: '架构师E',
    project: '岚图追光',
    version: 'v0.1',
    description: '车辆数据采集系统架构设计，支持实时和离线数据采集',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-29',
  },
]
