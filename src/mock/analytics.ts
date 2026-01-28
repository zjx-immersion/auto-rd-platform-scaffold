/**
 * C7分析治理 Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface Analytics extends BaseListItem {
  name: string
  code: string
  type: '需求分析' | '开发分析' | '质量分析' | '交付分析'
  period: '日报' | '周报' | '月报' | '季报'
  status: '生成中' | '已完成' | '失败'
  analyst: string
  project: string
  indicatorCount: number
  score: number
  createdAt: string
  description: string
}

export const mockAnalytics: Analytics[] = [
  {
    id: 'ANA-001',
    name: '1月份需求质量分析报告',
    code: 'ANA-2024-001',
    type: '需求分析',
    period: '月报',
    status: '已完成',
    analyst: '数据分析师A',
    project: '岚图梦想家',
    indicatorCount: 15,
    score: 85,
    createdAt: '2024-01-25',
    description: '分析需求质量、需求变更率、需求完成度等指标',
  },
  {
    id: 'ANA-002',
    name: 'Sprint-01开发效能分析',
    code: 'ANA-2024-002',
    type: '开发分析',
    period: '周报',
    status: '已完成',
    analyst: '数据分析师B',
    project: '岚图梦想家',
    indicatorCount: 12,
    score: 78,
    createdAt: '2024-01-26',
    description: '分析代码提交量、代码质量、开发速度等指标',
  },
  {
    id: 'ANA-003',
    name: 'Q1质量分析报告',
    code: 'ANA-2024-003',
    type: '质量分析',
    period: '季报',
    status: '生成中',
    analyst: '质量工程师C',
    project: '岚图追光',
    indicatorCount: 20,
    score: 0,
    createdAt: '2024-01-27',
    description: '分析测试覆盖率、缺陷密度、测试通过率等指标',
  },
  {
    id: 'ANA-004',
    name: '1月份交付效率分析',
    code: 'ANA-2024-004',
    type: '交付分析',
    period: '月报',
    status: '已完成',
    analyst: '数据分析师D',
    project: '岚图追光',
    indicatorCount: 10,
    score: 92,
    createdAt: '2024-01-28',
    description: '分析发布频率、发布成功率、回滚率等指标',
  },
  {
    id: 'ANA-005',
    name: '每日代码质量分析',
    code: 'ANA-2024-005',
    type: '开发分析',
    period: '日报',
    status: '已完成',
    analyst: '系统',
    project: '岚图梦想家',
    indicatorCount: 8,
    score: 88,
    createdAt: '2024-01-29',
    description: '每日代码质量检查，包含代码规范、复杂度、重复度等',
  },
]
