import type { IterationPlan, Iteration } from './types'

/**
 * 迭代规划Mock数据
 */
export const iterationPlans: IterationPlan[] = [
    {
        id: 'PLAN-001',
        name: '2026 Q1 智能驾驶迭代规划',
        description: '2026年第一季度智能驾驶功能迭代规划，包含泊车和车道保持功能',
        startDate: '2026-02-01',
        endDate: '2026-04-30',
        sprints: 4,
        status: '进行中',
        createdAt: '2026-01-15'
    },
    {
        id: 'PLAN-002',
        name: '2026 Q2 智能驾驶+座舱联合规划',
        description: '2026年第二季度智能驾驶和智能座舱功能联合迭代规划，包含泊车V2.0、高速领航、语音交互、沉浸式体验等功能',
        startDate: '2026-05-01',
        endDate: '2026-07-31',
        sprints: 4,
        status: '规划中',
        createdAt: '2026-02-01'
    }
]

/**
 * 迭代（Sprint）Mock数据
 */
export const iterations: Iteration[] = [
    // 感知模块的迭代
    {
        id: 'ITER-001',
        planId: 'PLAN-001',
        moduleId: 'MOD-001', // 感知模块
        sprint: 1,
        name: '感知模块 Sprint 1',
        capacity: 40,
        allocated: 18,
        mrIds: ['MR-001', 'MR-006']
    },
    {
        id: 'ITER-005',
        planId: 'PLAN-001',
        moduleId: 'MOD-001',
        sprint: 2,
        name: '感知模块 Sprint 2',
        capacity: 40,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-009',
        planId: 'PLAN-001',
        moduleId: 'MOD-001',
        sprint: 3,
        name: '感知模块 Sprint 3',
        capacity: 40,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-013',
        planId: 'PLAN-001',
        moduleId: 'MOD-001',
        sprint: 4,
        name: '感知模块 Sprint 4',
        capacity: 40,
        allocated: 0,
        mrIds: []
    },

    // 规划模块的迭代
    {
        id: 'ITER-002',
        planId: 'PLAN-001',
        moduleId: 'MOD-002', // 规划模块
        sprint: 1,
        name: '规划模块 Sprint 1',
        capacity: 35,
        allocated: 10,
        mrIds: ['MR-003']
    },
    {
        id: 'ITER-006',
        planId: 'PLAN-001',
        moduleId: 'MOD-002',
        sprint: 2,
        name: '规划模块 Sprint 2',
        capacity: 35,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-010',
        planId: 'PLAN-001',
        moduleId: 'MOD-002',
        sprint: 3,
        name: '规划模块 Sprint 3',
        capacity: 35,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-014',
        planId: 'PLAN-001',
        moduleId: 'MOD-002',
        sprint: 4,
        name: '规划模块 Sprint 4',
        capacity: 35,
        allocated: 0,
        mrIds: []
    },

    // 控制模块的迭代
    {
        id: 'ITER-003',
        planId: 'PLAN-001',
        moduleId: 'MOD-003', // 控制模块
        sprint: 1,
        name: '控制模块 Sprint 1',
        capacity: 30,
        allocated: 20,
        mrIds: ['MR-004', 'MR-007']
    },
    {
        id: 'ITER-007',
        planId: 'PLAN-001',
        moduleId: 'MOD-003',
        sprint: 2,
        name: '控制模块 Sprint 2',
        capacity: 30,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-011',
        planId: 'PLAN-001',
        moduleId: 'MOD-003',
        sprint: 3,
        name: '控制模块 Sprint 3',
        capacity: 30,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-015',
        planId: 'PLAN-001',
        moduleId: 'MOD-003',
        sprint: 4,
        name: '控制模块 Sprint 4',
        capacity: 30,
        allocated: 0,
        mrIds: []
    },

    // HMI模块的迭代
    {
        id: 'ITER-004',
        planId: 'PLAN-001',
        moduleId: 'MOD-004', // HMI模块
        sprint: 1,
        name: 'HMI模块 Sprint 1',
        capacity: 25,
        allocated: 3,
        mrIds: ['MR-002']
    },
    {
        id: 'ITER-008',
        planId: 'PLAN-001',
        moduleId: 'MOD-004',
        sprint: 2,
        name: 'HMI模块 Sprint 2',
        capacity: 25,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-012',
        planId: 'PLAN-001',
        moduleId: 'MOD-004',
        sprint: 3,
        name: 'HMI模块 Sprint 3',
        capacity: 25,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-016',
        planId: 'PLAN-001',
        moduleId: 'MOD-004',
        sprint: 4,
        name: 'HMI模块 Sprint 4',
        capacity: 25,
        allocated: 0,
        mrIds: []
    },

    // Q2规划的迭代 - PLAN-002
    // 感知模块的Q2迭代
    {
        id: 'ITER-017',
        planId: 'PLAN-002',
        moduleId: 'MOD-001',
        sprint: 1,
        name: '感知模块 Q2 Sprint 1',
        capacity: 40,
        allocated: 28,
        mrIds: ['MR-010', 'MR-015', 'MR-018']
    },
    {
        id: 'ITER-021',
        planId: 'PLAN-002',
        moduleId: 'MOD-001',
        sprint: 2,
        name: '感知模块 Q2 Sprint 2',
        capacity: 40,
        allocated: 0,
        mrIds: []
    },

    // 规划模块的Q2迭代
    {
        id: 'ITER-018',
        planId: 'PLAN-002',
        moduleId: 'MOD-002',
        sprint: 1,
        name: '规划模块 Q2 Sprint 1',
        capacity: 35,
        allocated: 38,
        mrIds: ['MR-011', 'MR-012', 'MR-014', 'MR-017']
    },
    {
        id: 'ITER-022',
        planId: 'PLAN-002',
        moduleId: 'MOD-002',
        sprint: 2,
        name: '规划模块 Q2 Sprint 2',
        capacity: 35,
        allocated: 0,
        mrIds: []
    },

    // 控制模块的Q2迭代
    {
        id: 'ITER-019',
        planId: 'PLAN-002',
        moduleId: 'MOD-003',
        sprint: 1,
        name: '控制模块 Q2 Sprint 1',
        capacity: 30,
        allocated: 35,
        mrIds: ['MR-013', 'MR-016', 'MR-019']
    },
    {
        id: 'ITER-023',
        planId: 'PLAN-002',
        moduleId: 'MOD-003',
        sprint: 2,
        name: '控制模块 Q2 Sprint 2',
        capacity: 30,
        allocated: 0,
        mrIds: []
    },

    // HMI模块的Q2迭代
    {
        id: 'ITER-020',
        planId: 'PLAN-002',
        moduleId: 'MOD-004',
        sprint: 1,
        name: 'HMI模块 Q2 Sprint 1',
        capacity: 25,
        allocated: 61,
        mrIds: ['MR-020', 'MR-021', 'MR-022', 'MR-023', 'MR-024', 'MR-025']
    },
    {
        id: 'ITER-024',
        planId: 'PLAN-002',
        moduleId: 'MOD-004',
        sprint: 2,
        name: 'HMI模块 Q2 Sprint 2',
        capacity: 25,
        allocated: 0,
        mrIds: []
    }
]

export const getIterationPlanById = (id: string): IterationPlan | undefined => {
    return iterationPlans.find(plan => plan.id === id)
}

export const getIterationById = (id: string): Iteration | undefined => {
    return iterations.find(iter => iter.id === id)
}

export const getIterationsByPlanId = (planId: string): Iteration[] => {
    return iterations.filter(iter => iter.planId === planId)
}

export const getIterationsByModuleAndSprint = (moduleId: string, sprint: number): Iteration | undefined => {
    return iterations.find(iter => iter.moduleId === moduleId && iter.sprint === sprint)
}

export const addMRToIteration = (iterationId: string, mrId: string, effort: number): void => {
    const iteration = iterations.find(iter => iter.id === iterationId)
    if (iteration && !iteration.mrIds.includes(mrId)) {
        iteration.mrIds.push(mrId)
        iteration.allocated += effort
    }
}

export const removeMRFromIteration = (iterationId: string, mrId: string, effort: number): void => {
    const iteration = iterations.find(iter => iter.id === iterationId)
    if (iteration) {
        iteration.mrIds = iteration.mrIds.filter(id => id !== mrId)
        iteration.allocated -= effort
    }
}
