/**
 * 规划协调Mock数据
 * C3: 迭代规划管理
 */

import type { BaseListItem } from '@/types/common'

export interface IterationPlan extends BaseListItem {
  name: string
  code: string
  description: string
  teamId: string
  teamName: string
  teamType: 'control' | 'e2e' | 'data-platform' | 'other'
  startDate: string
  endDate: string
  status: 'planning' | 'active' | 'completed'
  progress: number
  capacity: number // 团队容量（人天）
  allocated: number // 已分配容量
  velocity: number // 团队速率
  memberCount: number
  featureCount: number
  storyCount: number
  taskCount: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  capacity: number // 工作容量（人天）
  allocated: number // 已分配容量
  available: number // 可用容量
  skills: string[]
}

export interface Feature {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'testing' | 'done'
  priority: 'high' | 'medium' | 'low'
  storyPoints: number
  assignee: string
  startDate: string
  endDate: string
  progress: number
  storyCount: number
}

export interface Story {
  id: string
  featureId: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'testing' | 'done'
  priority: 'high' | 'medium' | 'low'
  storyPoints: number
  assignee: string
  taskCount: number
  completedTaskCount: number
}

export interface Task {
  id: string
  storyId: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  assignee: string
  estimatedHours: number
  actualHours: number
  startDate: string
  dueDate: string
}

// 迭代规划列表
export const mockPlans: IterationPlan[] = [
  {
    id: 'plan-001',
    name: '2024 Q1 迭代规划',
    code: 'ITER-2024-Q1',
    description: '2024年第一季度规控团队迭代规划',
    teamId: 'team-001',
    teamName: '规控团队',
    teamType: 'control',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'active',
    progress: 65,
    capacity: 240,
    allocated: 180,
    velocity: 85,
    memberCount: 12,
    featureCount: 8,
    storyCount: 32,
    taskCount: 156,
  },
  {
    id: 'plan-002',
    name: '2024 Q1 端到端规划',
    code: 'ITER-E2E-2024-Q1',
    description: '2024年第一季度端到端团队迭代规划',
    teamId: 'team-002',
    teamName: '端到端团队',
    teamType: 'e2e',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'active',
    progress: 72,
    capacity: 200,
    allocated: 160,
    velocity: 90,
    memberCount: 10,
    featureCount: 6,
    storyCount: 28,
    taskCount: 142,
  },
  {
    id: 'plan-003',
    name: '2024 Q1 数据平台规划',
    code: 'ITER-DATA-2024-Q1',
    description: '2024年第一季度数据平台团队迭代规划',
    teamId: 'team-003',
    teamName: '数据平台团队',
    teamType: 'data-platform',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'active',
    progress: 58,
    capacity: 180,
    allocated: 145,
    velocity: 78,
    memberCount: 9,
    featureCount: 7,
    storyCount: 25,
    taskCount: 118,
  },
  {
    id: 'plan-004',
    name: '2023 Q4 规控团队规划',
    code: 'ITER-2023-Q4',
    description: '2023年第四季度规控团队迭代规划',
    teamId: 'team-001',
    teamName: '规控团队',
    teamType: 'control',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    status: 'completed',
    progress: 100,
    capacity: 240,
    allocated: 235,
    velocity: 92,
    memberCount: 12,
    featureCount: 10,
    storyCount: 45,
    taskCount: 198,
  },
  {
    id: 'plan-005',
    name: '2024 Q2 规控团队规划',
    code: 'ITER-2024-Q2',
    description: '2024年第二季度规控团队迭代规划',
    teamId: 'team-001',
    teamName: '规控团队',
    teamType: 'control',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    status: 'planning',
    progress: 15,
    capacity: 240,
    allocated: 80,
    velocity: 0,
    memberCount: 12,
    featureCount: 5,
    storyCount: 18,
    taskCount: 65,
  },
]

// 团队成员
export const mockTeamMembers: TeamMember[] = [
  {
    id: 'member-001',
    name: '张三',
    role: '高级开发工程师',
    capacity: 20,
    allocated: 16,
    available: 4,
    skills: ['React', 'TypeScript', '架构设计'],
  },
  {
    id: 'member-002',
    name: '李四',
    role: '开发工程师',
    capacity: 20,
    allocated: 18,
    available: 2,
    skills: ['Java', 'Spring Boot', '微服务'],
  },
  {
    id: 'member-003',
    name: '王五',
    role: '测试工程师',
    capacity: 20,
    allocated: 15,
    available: 5,
    skills: ['自动化测试', 'Selenium', 'JMeter'],
  },
  {
    id: 'member-004',
    name: '赵六',
    role: '架构师',
    capacity: 20,
    allocated: 14,
    available: 6,
    skills: ['系统架构', '性能优化', '技术选型'],
  },
]

// Features
export const mockFeatures: Feature[] = [
  {
    id: 'feature-001',
    title: 'ADAS感知融合算法优化',
    description: '优化多传感器数据融合算法，提升感知准确率',
    status: 'in-progress',
    priority: 'high',
    storyPoints: 13,
    assignee: '张三',
    startDate: '2024-01-05',
    endDate: '2024-02-15',
    progress: 65,
    storyCount: 5,
  },
  {
    id: 'feature-002',
    title: '自动泊车功能增强',
    description: '增强自动泊车功能，支持更多停车场景',
    status: 'in-progress',
    priority: 'high',
    storyPoints: 8,
    assignee: '李四',
    startDate: '2024-01-10',
    endDate: '2024-02-28',
    progress: 45,
    storyCount: 4,
  },
  {
    id: 'feature-003',
    title: '车道保持辅助系统',
    description: '实现车道保持辅助系统，提升行车安全',
    status: 'todo',
    priority: 'medium',
    storyPoints: 5,
    assignee: '王五',
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    progress: 0,
    storyCount: 3,
  },
]

// Stories
export const mockStories: Story[] = [
  {
    id: 'story-001',
    featureId: 'feature-001',
    title: '雷达数据预处理优化',
    description: '优化雷达原始数据的预处理流程',
    status: 'done',
    priority: 'high',
    storyPoints: 3,
    assignee: '张三',
    taskCount: 5,
    completedTaskCount: 5,
  },
  {
    id: 'story-002',
    featureId: 'feature-001',
    title: '摄像头数据融合算法',
    description: '实现摄像头与雷达数据的融合算法',
    status: 'in-progress',
    priority: 'high',
    storyPoints: 5,
    assignee: '张三',
    taskCount: 8,
    completedTaskCount: 5,
  },
  {
    id: 'story-003',
    featureId: 'feature-002',
    title: '垂直泊车位识别',
    description: '实现垂直泊车位的自动识别功能',
    status: 'testing',
    priority: 'high',
    storyPoints: 3,
    assignee: '李四',
    taskCount: 6,
    completedTaskCount: 6,
  },
]

// Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-001',
    storyId: 'story-001',
    title: '雷达数据滤波算法实现',
    description: '实现卡尔曼滤波算法对雷达数据进行滤波',
    status: 'done',
    assignee: '张三',
    estimatedHours: 8,
    actualHours: 9,
    startDate: '2024-01-05',
    dueDate: '2024-01-08',
  },
  {
    id: 'task-002',
    storyId: 'story-001',
    title: '噪声数据剔除',
    description: '实现噪声数据识别和剔除逻辑',
    status: 'done',
    assignee: '张三',
    estimatedHours: 6,
    actualHours: 7,
    startDate: '2024-01-08',
    dueDate: '2024-01-10',
  },
  {
    id: 'task-003',
    storyId: 'story-002',
    title: '数据对齐算法',
    description: '实现时间戳对齐和空间坐标转换',
    status: 'in-progress',
    assignee: '张三',
    estimatedHours: 10,
    actualHours: 6,
    startDate: '2024-01-12',
    dueDate: '2024-01-18',
  },
]
