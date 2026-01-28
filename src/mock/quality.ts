/**
 * C4质量内建 Mock数据
 */

import type { BaseListItem } from '@/types/common'

export interface TestCase extends BaseListItem {
  name: string
  code: string
  type: '功能测试' | '性能测试' | '安全测试' | '兼容性测试'
  priority: '高' | '中' | '低'
  status: '待执行' | '执行中' | '通过' | '失败' | '阻塞'
  tester: string
  project: string
  defectCount: number
  passRate: number
  createdAt: string
  updatedAt: string
}

export const mockTestCases: TestCase[] = [
  {
    id: 'TC-001',
    name: '语音唤醒功能测试',
    code: 'TC-2024-001',
    type: '功能测试',
    priority: '高',
    status: '通过',
    tester: '测试工程师A',
    project: '岚图梦想家',
    defectCount: 2,
    passRate: 95,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-25',
  },
  {
    id: 'TC-002',
    name: '车机性能压测',
    code: 'TC-2024-002',
    type: '性能测试',
    priority: '高',
    status: '执行中',
    tester: '测试工程师B',
    project: '岚图梦想家',
    defectCount: 0,
    passRate: 0,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-26',
  },
  {
    id: 'TC-003',
    name: 'HMI安全测试',
    code: 'TC-2024-003',
    type: '安全测试',
    priority: '中',
    status: '失败',
    tester: '测试工程师C',
    project: '岚图追光',
    defectCount: 5,
    passRate: 78,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-27',
  },
  {
    id: 'TC-004',
    name: '多屏兼容性测试',
    code: 'TC-2024-004',
    type: '兼容性测试',
    priority: '中',
    status: '通过',
    tester: '测试工程师D',
    project: '岚图追光',
    defectCount: 1,
    passRate: 98,
    createdAt: '2024-01-22',
    updatedAt: '2024-01-28',
  },
  {
    id: 'TC-005',
    name: '导航功能测试',
    code: 'TC-2024-005',
    type: '功能测试',
    priority: '高',
    status: '待执行',
    tester: '测试工程师E',
    project: '岚图追光',
    defectCount: 0,
    passRate: 0,
    createdAt: '2024-01-24',
    updatedAt: '2024-01-29',
  },
]
