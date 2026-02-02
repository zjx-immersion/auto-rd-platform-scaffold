import type { UC } from './types'

/**
 * UC Mock数据
 */
export const ucs: UC[] = [
    {
        id: 'UC-001',
        name: '智能泊车增强功能',
        description: '支持更多复杂泊车场景，包括斜列泊车、狭窄车位、多层停车场等场景',
        priority: 'Must',
        status: '已通过',
        source: '用户需求',
        owner: '张三',
        productId: 'line-001', // 岚图产品线
        createdAt: '2026-01-15',
        updatedAt: '2026-01-20'
    },
    {
        id: 'UC-002',
        name: '自适应巡航优化',
        description: '优化自适应巡航功能，提升跟车平顺性和安全性',
        priority: 'Should',
        status: '评审中',
        source: '市场反馈',
        owner: '李四',
        productId: 'line-001', // 岚图产品线
        createdAt: '2026-01-18',
        updatedAt: '2026-01-25'
    },
    {
        id: 'UC-003',
        name: '车道保持辅助增强',
        description: '增强车道保持辅助功能，支持弯道场景和恶劣天气',
        priority: 'Must',
        status: '已通过',
        source: 'FIP表',
        owner: '王五',
        productId: 'line-001', // 岚图产品线
        createdAt: '2026-01-10',
        updatedAt: '2026-01-22'
    },
    {
        id: 'UC-004',
        name: '智能召唤功能',
        description: '实现远程召唤车辆功能，支持停车场自动寻车',
        priority: 'Could',
        status: '待评审',
        source: '创新需求',
        owner: '赵六',
        productId: 'line-002', // FREE产品线
        createdAt: '2026-01-20',
        updatedAt: '2026-01-28'
    },
    {
        id: 'UC-005',
        name: '交通标志识别',
        description: '识别交通标志并提供驾驶辅助信息',
        priority: 'Should',
        status: '已通过',
        source: '用户需求',
        owner: '钱七',
        productId: 'line-001', // 岚图产品线
        createdAt: '2026-01-12',
        updatedAt: '2026-01-24'
    },
    // 新增Epic数据
    {
        id: 'UC-006',
        name: '智能泊车系统 V2.0',
        description: 'Epic: 全面升级智能泊车系统，支持更多复杂场景，包括斜列泊车、狭窄车位、多层停车场、记忆泊车等',
        priority: 'Must',
        status: '已通过',
        source: 'FIP表',
        owner: '张三',
        productId: 'line-001', // 智能驾驶产品线
        createdAt: '2026-01-10',
        updatedAt: '2026-01-28'
    },
    {
        id: 'UC-007',
        name: '高速领航辅助驾驶',
        description: 'Epic: 实现高速公路场景下的领航辅助驾驶功能，包括自动变道、上下匝道、智能超车等',
        priority: 'Must',
        status: '已通过',
        source: '用户需求',
        owner: '李四',
        productId: 'PL-001', // 智能驾驶产品线
        createdAt: '2026-01-12',
        updatedAt: '2026-01-29'
    },
    {
        id: 'UC-008',
        name: '智能语音交互系统',
        description: 'Epic: 打造新一代智能语音交互系统，支持多轮对话、场景理解、情感识别等',
        priority: 'Must',
        status: '已通过',
        source: '市场反馈',
        owner: '王五',
        productId: 'line-001', // 智能座舱产品线（岚图梦想家包含驾驶和座舱）
        createdAt: '2026-01-15',
        updatedAt: '2026-01-30'
    },
    {
        id: 'UC-009',
        name: '沉浸式座舱体验',
        description: 'Epic: 提供沉浸式座舱体验，包括氛围灯联动、音效系统、座椅按摩、香氛系统等多感官体验',
        priority: 'Should',
        status: '已通过',
        source: '创新需求',
        owner: '赵六',
        productId: 'PL-002', // 智能座舱产品线
        createdAt: '2026-01-18',
        updatedAt: '2026-01-31'
    },
    {
        id: 'UC-010',
        name: 'L2高速领航辅助',
        description: 'Epic: 实现L2级高速公路领航辅助功能，包括自动跟车、自动变道、智能限速识别等',
        priority: 'Must',
        status: '已通过',
        source: 'FIP表',
        owner: '李明',
        productId: 'line-003', // L2智能驾驶-J6M产品线
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02'
    },
    {
        id: 'UC-011',
        name: 'L2智能泊车辅助',
        description: 'Epic: 实现L2级智能泊车辅助功能，包括自动泊车入位、记忆泊车、遥控泊车等',
        priority: 'Must',
        status: '已通过',
        source: '市场反馈',
        owner: '陈强',
        productId: 'line-003', // L2智能驾驶-J6M产品线
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02'
    }
]

export const getUCById = (id: string): UC | undefined => {
    return ucs.find(uc => uc.id === id)
}

export const getUCsByStatus = (status: UC['status']): UC[] => {
    return ucs.filter(uc => uc.status === status)
}

export const getUCsByPriority = (priority: UC['priority']): UC[] => {
    return ucs.filter(uc => uc.priority === priority)
}

/**
 * 创建UC
 */
export const createUC = (data: Partial<UC>): UC => {
    const newId = `UC-${String(ucs.length + 1).padStart(3, '0')}`
    const newUC: UC = {
        id: newId,
        name: data.name || '',
        description: data.description || '',
        priority: data.priority || 'Should',
        status: '草稿',
        source: data.source || '自管理',
        owner: data.owner || '',
        productId: data.productId, // 支持productId
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    }
    ucs.push(newUC)
    return newUC
}

/**
 * 更新UC
 */
export const updateUC = (id: string, data: Partial<UC>): UC | undefined => {
    const index = ucs.findIndex(uc => uc.id === id)
    if (index === -1) return undefined

    ucs[index] = {
        ...ucs[index],
        ...data,
        updatedAt: new Date().toISOString().split('T')[0]
    }
    return ucs[index]
}
