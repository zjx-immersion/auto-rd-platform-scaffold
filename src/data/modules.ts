import type { Module } from './types'

/**
 * 模块Mock数据
 */
export const modules: Module[] = [
    {
        id: 'MOD-001',
        name: '感知模块',
        teamId: 'TEAM-001',
        productId: 'PROD-001',
        description: '负责环境感知、目标检测、传感器融合',
        createdAt: '2026-01-01'
    },
    {
        id: 'MOD-002',
        name: '规划模块',
        teamId: 'TEAM-002',
        productId: 'PROD-001',
        description: '负责路径规划、行为决策、轨迹生成',
        createdAt: '2026-01-01'
    },
    {
        id: 'MOD-003',
        name: '控制模块',
        teamId: 'TEAM-003',
        productId: 'PROD-001',
        description: '负责车辆控制、执行器控制',
        createdAt: '2026-01-01'
    },
    {
        id: 'MOD-004',
        name: 'HMI模块',
        teamId: 'TEAM-004',
        productId: 'PROD-001',
        description: '负责人机交互界面、用户提示',
        createdAt: '2026-01-01'
    }
]

export const getModuleById = (id: string): Module | undefined => {
    return modules.find(mod => mod.id === id)
}

export const getModulesByTeamId = (teamId: string): Module[] => {
    return modules.filter(mod => mod.teamId === teamId)
}

export const getModulesByProductId = (productId: string): Module[] => {
    return modules.filter(mod => mod.productId === productId)
}
