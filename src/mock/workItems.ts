/**
 * WorkItem Mock Data (Sprint Execution Items)
 * Links Sprint <=> MR
 */

export type WorkItemType = 'MR' | 'Bug' | 'Risk' | 'Dependency' | 'Tech'
export type WorkItemStatus = 'To Do' | 'In Progress' | 'Testing' | 'Done'

export interface WorkItem {
    id: string
    code: string
    title: string
    type: WorkItemType
    priority: 'High' | 'Medium' | 'Low'
    status: WorkItemStatus
    assignee: string
    sprintId: string
    linkedMrId?: string
    remainingHours: number
}

// Example: Sprint 2 Items
export const mockWorkItems: WorkItem[] = [
    {
        id: 'WI-1001',
        code: 'WI-2024-101',
        title: 'MR: 语音唤醒词检测模块开发',
        type: 'MR',
        priority: 'High',
        status: 'Done',
        assignee: '赵六',
        sprintId: 'SPRINT-001', // Linked to '智能座舱-Sprint 1'
        linkedMrId: 'REQ-MR-004',
        remainingHours: 0,
    },
    {
        id: 'WI-1002',
        code: 'WI-2024-102',
        title: 'Bug: 偶发唤醒失败',
        type: 'Bug',
        priority: 'High',
        status: 'In Progress',
        assignee: '赵六',
        sprintId: 'SPRINT-001',
        remainingHours: 4,
    },
    {
        id: 'WI-1003',
        code: 'WI-2024-103',
        title: 'Tech: 本地日志模块重构',
        type: 'Tech',
        priority: 'Medium',
        status: 'To Do',
        assignee: '王五',
        sprintId: 'SPRINT-001',
        remainingHours: 8,
    },
]
