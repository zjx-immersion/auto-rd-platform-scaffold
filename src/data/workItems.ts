import type { WorkItem } from './types'

/**
 * 工作项Mock数据
 */
export const workItems: WorkItem[] = [
    // 从MR转化的工作项
    {
        id: 'WI-001',
        type: 'MR需求',
        title: '斜列车位识别-感知模块',
        description: '实现斜列车位的图像识别和超声波融合',
        mrId: 'MR-001',
        teamId: 'TEAM-001',
        assignee: '张三',
        priority: '高',
        status: '进行中',
        sprint: 1,
        effort: 8,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-05'
    },
    {
        id: 'WI-002',
        type: 'MR需求',
        title: '弯道车道线识别算法',
        description: '实现深度学习车道线检测和曲线拟合',
        mrId: 'MR-006',
        teamId: 'TEAM-001',
        assignee: '李四',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 10,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // 缺陷修复类工作项
    {
        id: 'WI-003',
        type: '缺陷修复',
        title: '感知算法误报问题',
        description: '在雨天场景下感知算法存在误报，需要优化',
        teamId: 'TEAM-001',
        assignee: '王五',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 3,
        createdAt: '2026-02-03',
        updatedAt: '2026-02-03'
    },

    // 技术任务类工作项
    {
        id: 'WI-004',
        type: '技术任务',
        title: '感知算法性能优化',
        description: '优化感知算法的计算性能，降低CPU占用率',
        teamId: 'TEAM-001',
        assignee: '赵六',
        priority: '中',
        status: '进行中',
        sprint: 1,
        effort: 5,
        createdAt: '2026-02-02',
        updatedAt: '2026-02-04'
    },

    // 风险类工作项
    {
        id: 'WI-005',
        type: '风险',
        title: '雨天感知风险评估',
        description: '评估雨天场景下的感知风险，制定应对方案',
        teamId: 'TEAM-001',
        assignee: '钱七',
        priority: '中',
        status: '待办',
        sprint: 1,
        effort: 2,
        createdAt: '2026-02-04',
        updatedAt: '2026-02-04'
    },

    // 规划团队的工作项
    {
        id: 'WI-006',
        type: 'MR需求',
        title: '斜列泊车路径规划算法',
        description: '实现混合A*路径规划算法',
        mrId: 'MR-003',
        teamId: 'TEAM-002',
        assignee: '孙八',
        priority: '高',
        status: '进行中',
        sprint: 1,
        effort: 10,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-06'
    },

    // 控制团队的工作项
    {
        id: 'WI-007',
        type: 'MR需求',
        title: '斜列泊车MPC控制器',
        description: '实现MPC模型预测控制器',
        mrId: 'MR-004',
        teamId: 'TEAM-003',
        assignee: '吴十',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 12,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-008',
        type: 'MR需求',
        title: '弯道转向控制算法',
        description: '实现前馈+反馈转向控制',
        mrId: 'MR-007',
        teamId: 'TEAM-003',
        assignee: '郑十一',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 8,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // HMI团队的工作项
    {
        id: 'WI-009',
        type: 'MR需求',
        title: '斜列车位识别-HMI显示',
        description: '在HMI上显示识别到的斜列车位',
        mrId: 'MR-002',
        teamId: 'TEAM-004',
        assignee: '陈十三',
        priority: '中',
        status: '已完成',
        sprint: 1,
        effort: 3,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-07'
    },

    // Q2 Sprint 1 工作项 - 从新MR转化
    // 感知团队
    {
        id: 'WI-010',
        type: 'MR需求',
        title: '斜列车位识别-感知算法',
        description: '实现斜列车位的深度学习识别算法',
        mrId: 'MR-010',
        teamId: 'TEAM-001',
        assignee: '张三',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 10,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-011',
        type: 'MR需求',
        title: '记忆场景识别-场景匹配',
        description: '实现场景识别和匹配算法',
        mrId: 'MR-015',
        teamId: 'TEAM-001',
        assignee: '李四',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 9,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-012',
        type: 'MR需求',
        title: '盲区检测-传感器融合',
        description: '实现雷达和摄像头融合检测',
        mrId: 'MR-018',
        teamId: 'TEAM-001',
        assignee: '王五',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 10,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // 规划团队
    {
        id: 'WI-013',
        type: 'MR需求',
        title: '斜列车位识别-数据融合',
        description: '实现超声波和视觉数据融合',
        mrId: 'MR-011',
        teamId: 'TEAM-002',
        assignee: '孙八',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 8,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-014',
        type: 'MR需求',
        title: '斜列泊车路径规划-算法实现',
        description: '实现混合A*路径规划算法',
        mrId: 'MR-012',
        teamId: 'TEAM-002',
        assignee: '周九',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 12,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-015',
        type: 'MR需求',
        title: '泊车路线学习-轨迹记录',
        description: '实现泊车轨迹学习和存储',
        mrId: 'MR-014',
        teamId: 'TEAM-002',
        assignee: '吴十',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 10,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-016',
        type: 'MR需求',
        title: '变道时机判断-决策算法',
        description: '实现变道决策树算法',
        mrId: 'MR-017',
        teamId: 'TEAM-002',
        assignee: '郑十一',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 8,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // 控制团队
    {
        id: 'WI-017',
        type: 'MR需求',
        title: '斜列泊车控制-MPC控制器',
        description: '实现MPC模型预测控制器',
        mrId: 'MR-013',
        teamId: 'TEAM-003',
        assignee: '王十二',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 15,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-018',
        type: 'MR需求',
        title: '记忆泊车执行-轨迹跟踪',
        description: '实现轨迹跟踪控制',
        mrId: 'MR-016',
        teamId: 'TEAM-003',
        assignee: '冯十三',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 11,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-019',
        type: 'MR需求',
        title: '变道轨迹控制-轨迹跟踪',
        description: '实现变道轨迹跟踪控制',
        mrId: 'MR-019',
        teamId: 'TEAM-003',
        assignee: '陈十四',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 9,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },

    // HMI团队
    {
        id: 'WI-020',
        type: 'MR需求',
        title: '上下文管理-记忆网络',
        description: '实现上下文记忆网络',
        mrId: 'MR-020',
        teamId: 'TEAM-004',
        assignee: '刘十五',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 12,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-021',
        type: 'MR需求',
        title: '意图识别-NLU模型',
        description: '实现自然语言理解模型',
        mrId: 'MR-021',
        teamId: 'TEAM-004',
        assignee: '赵十六',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 15,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-022',
        type: 'MR需求',
        title: '对话生成-NLG模型',
        description: '实现自然语言生成模型',
        mrId: 'MR-022',
        teamId: 'TEAM-004',
        assignee: '孙十七',
        priority: '高',
        status: '待办',
        sprint: 1,
        effort: 13,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-023',
        type: 'MR需求',
        title: '场景联动控制-规则引擎',
        description: '实现场景映射规则引擎',
        mrId: 'MR-023',
        teamId: 'TEAM-004',
        assignee: '李十八',
        priority: '中',
        status: '待办',
        sprint: 1,
        effort: 7,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-024',
        type: 'MR需求',
        title: '音乐节奏联动-节奏检测',
        description: '实现音乐节奏检测算法',
        mrId: 'MR-024',
        teamId: 'TEAM-004',
        assignee: '周十九',
        priority: '中',
        status: '待办',
        sprint: 1,
        effort: 8,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    },
    {
        id: 'WI-025',
        type: 'MR需求',
        title: '语音交互联动-状态机',
        description: '实现语音交互状态机控制',
        mrId: 'MR-025',
        teamId: 'TEAM-004',
        assignee: '吴二十',
        priority: '中',
        status: '待办',
        sprint: 1,
        effort: 6,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
    }
]

export const getWorkItemById = (id: string): WorkItem | undefined => {
    return workItems.find(wi => wi.id === id)
}

export const getWorkItemsByTeamId = (teamId: string): WorkItem[] => {
    return workItems.filter(wi => wi.teamId === teamId)
}

export const getWorkItemsBySprint = (sprint: number): WorkItem[] => {
    return workItems.filter(wi => wi.sprint === sprint)
}

export const getWorkItemsByStatus = (status: WorkItem['status']): WorkItem[] => {
    return workItems.filter(wi => wi.status === status)
}

export const getWorkItemsByType = (type: WorkItem['type']): WorkItem[] => {
    return workItems.filter(wi => wi.type === type)
}

export const getWorkItemsByMRId = (mrId: string): WorkItem[] => {
    return workItems.filter(wi => wi.mrId === mrId)
}

export const createWorkItem = (workItem: Omit<WorkItem, 'id' | 'createdAt' | 'updatedAt'>): WorkItem => {
    const newWorkItem: WorkItem = {
        ...workItem,
        id: `WI-${String(workItems.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    }

    workItems.push(newWorkItem)
    return newWorkItem
}

export const updateWorkItemStatus = (id: string, status: WorkItem['status']): void => {
    const workItem = getWorkItemById(id)
    if (workItem) {
        workItem.status = status
        workItem.updatedAt = new Date().toISOString().split('T')[0]
    }
}
