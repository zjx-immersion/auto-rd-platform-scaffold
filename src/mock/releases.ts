/**
 * C5交付发布 Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface Release extends BaseListItem {
  name: string
  version: string
  status: '计划中' | '开发中' | '测试中' | '待发布' | '已发布' | '已回滚'
  type: 'Major' | 'Minor' | 'Patch'
  releaseDate: string
  environment: '开发' | '测试' | '预发布' | '生产'
  owner: string
  project: string
  features: number
  bugfixes: number
  description: string
}

export const mockReleases: Release[] = [
  {
    id: 'REL-001',
    name: '智能座舱V2.0',
    version: 'v2.0.0',
    status: '已发布',
    type: 'Major',
    releaseDate: '2024-01-20',
    environment: '生产',
    owner: '发布经理A',
    project: '岚图梦想家',
    features: 15,
    bugfixes: 32,
    description: '智能座舱系统重大版本升级，新增语音助手、优化HMI交互',
  },
  {
    id: 'REL-002',
    name: '智能座舱V2.1',
    version: 'v2.1.0',
    status: '测试中',
    type: 'Minor',
    releaseDate: '2024-02-01',
    environment: '测试',
    owner: '发布经理A',
    project: '岚图梦想家',
    features: 8,
    bugfixes: 15,
    description: '智能座舱系统小版本更新，优化语音识别准确率',
  },
  {
    id: 'REL-003',
    name: '导航系统V1.5',
    version: 'v1.5.0',
    status: '已发布',
    type: 'Minor',
    releaseDate: '2024-01-18',
    environment: '生产',
    owner: '发布经理B',
    project: '岚图追光',
    features: 5,
    bugfixes: 20,
    description: '导航系统更新，新增实时路况、优化路径规划算法',
  },
  {
    id: 'REL-004',
    name: '导航系统V1.5.1',
    version: 'v1.5.1',
    status: '开发中',
    type: 'Patch',
    releaseDate: '2024-01-30',
    environment: '开发',
    owner: '发布经理B',
    project: '岚图追光',
    features: 0,
    bugfixes: 8,
    description: '导航系统补丁版本，修复地图显示异常问题',
  },
  {
    id: 'REL-005',
    name: '车控系统V3.0',
    version: 'v3.0.0',
    status: '计划中',
    type: 'Major',
    releaseDate: '2024-02-15',
    environment: '开发',
    owner: '发布经理C',
    project: '岚图追光',
    features: 20,
    bugfixes: 0,
    description: '车控系统重大升级，新增远程控制、车辆诊断等功能',
  },
]
