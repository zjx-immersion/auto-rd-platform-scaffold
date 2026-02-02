import type { Feature } from './types'

/**
 * Feature Mock数据
 */
export const features: Feature[] = [
    // UC-001: 智能泊车增强功能 的Features
    {
        id: 'FEAT-001',
        ucId: 'UC-001',
        name: '斜列泊车场景',
        version: 'V1.0',
        priority: 'P0',
        status: '设计中',
        owner: '张三',
        team: '感知团队',
        productId: 'product-001',
        startDate: '2026-02-01',
        endDate: '2026-03-15',
        createdAt: '2026-01-20',
        updatedAt: '2026-01-28'
    },
    {
        id: 'FEAT-002',
        ucId: 'UC-001',
        name: '垂直泊车场景',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        owner: '张三',
        team: '感知团队',
        productId: 'product-001',
        startDate: '2026-02-15',
        endDate: '2026-03-30',
        createdAt: '2026-01-20',
        updatedAt: '2026-01-28'
    },
    {
        id: 'FEAT-003',
        ucId: 'UC-001',
        name: '狭窄车位泊车',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        owner: '李四',
        team: '规划团队',
        productId: 'product-001',
        startDate: '2026-03-01',
        endDate: '2026-04-15',
        createdAt: '2026-01-20',
        updatedAt: '2026-01-28'
    },

    // UC-002: 自适应巡航优化 的Features
    {
        id: 'FEAT-004',
        ucId: 'UC-002',
        name: '跟车平顺性优化',
        version: 'V1.0',
        priority: 'P0',
        status: '评审中',
        owner: '李四',
        team: '控制团队',
        productId: 'product-001',
        startDate: '2026-02-10',
        endDate: '2026-03-20',
        createdAt: '2026-01-25',
        updatedAt: '2026-01-28'
    },
    {
        id: 'FEAT-005',
        ucId: 'UC-002',
        name: '安全距离自适应',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        owner: '王五',
        team: '感知团队',
        productId: 'product-001',
        startDate: '2026-02-20',
        endDate: '2026-04-01',
        createdAt: '2026-01-25',
        updatedAt: '2026-01-28'
    },

    // UC-003: 车道保持辅助增强 的Features
    {
        id: 'FEAT-006',
        ucId: 'UC-003',
        name: '弯道车道保持',
        version: 'V1.0',
        priority: 'P0',
        status: '开发中',
        owner: '王五',
        team: '控制团队',
        productId: 'product-001',
        startDate: '2026-01-25',
        endDate: '2026-03-10',
        createdAt: '2026-01-22',
        updatedAt: '2026-01-28'
    },
    {
        id: 'FEAT-007',
        ucId: 'UC-003',
        name: '恶劣天气车道识别',
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        owner: '赵六',
        team: '感知团队',
        productId: 'product-001',
        startDate: '2026-02-05',
        endDate: '2026-03-25',
        createdAt: '2026-01-22',
        updatedAt: '2026-01-28'
    },

    // UC-005: 交通标志识别 的Features
    {
        id: 'FEAT-008',
        ucId: 'UC-005',
        name: '限速标志识别',
        version: 'V1.0',
        priority: 'P0',
        status: '已通过',
        owner: '钱七',
        team: '感知团队',
        productId: 'product-001',
        startDate: '2026-01-28',
        endDate: '2026-03-05',
        createdAt: '2026-01-24',
        updatedAt: '2026-01-28'
    },

    // UC-006: 智能泊车系统 V2.0 的Features
    {
        id: 'FEAT-009',
        ucId: 'UC-006',
        name: '斜列车位识别与泊入',
        version: 'V2.0',
        priority: 'P0',
        status: '设计中',
        owner: '张三',
        team: '感知团队',
        productId: 'product-001',
        startDate: '2026-02-01',
        endDate: '2026-03-31',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'FEAT-010',
        ucId: 'UC-006',
        name: '记忆泊车功能',
        version: 'V2.0',
        priority: 'P0',
        status: '设计中',
        owner: '李四',
        team: '规划团队',
        productId: 'product-001',
        startDate: '2026-02-15',
        endDate: '2026-04-15',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },
    {
        id: 'FEAT-011',
        ucId: 'UC-006',
        name: '多层停车场导航泊车',
        version: 'V2.0',
        priority: 'P1',
        status: '草稿',
        owner: '王五',
        team: '控制团队',
        productId: 'product-001',
        startDate: '2026-03-01',
        endDate: '2026-04-30',
        createdAt: '2026-01-28',
        updatedAt: '2026-02-01'
    },

    // UC-007: 高速领航辅助驾驶 的Features
    {
        id: 'FEAT-012',
        ucId: 'UC-007',
        name: '自动变道功能',
        version: 'V1.0',
        priority: 'P0',
        status: '设计中',
        owner: '李四',
        team: '规划团队',
        productId: 'product-002',
        startDate: '2026-02-01',
        endDate: '2026-03-31',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },
    {
        id: 'FEAT-013',
        ucId: 'UC-007',
        name: '智能上下匝道',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        owner: '王五',
        team: '控制团队',
        productId: 'product-002',
        startDate: '2026-02-15',
        endDate: '2026-04-15',
        createdAt: '2026-01-29',
        updatedAt: '2026-02-01'
    },

    // UC-008: 智能语音交互系统 的Features
    {
        id: 'FEAT-014',
        ucId: 'UC-008',
        name: '多轮对话引擎',
        version: 'V1.0',
        priority: 'P0',
        status: '设计中',
        owner: '王五',
        team: 'HMI团队',
        productId: 'product-003',
        startDate: '2026-02-01',
        endDate: '2026-03-31',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'FEAT-015',
        ucId: 'UC-008',
        name: '场景理解与推荐',
        version: 'V1.0',
        priority: 'P0',
        status: '草稿',
        owner: '赵六',
        team: 'HMI团队',
        productId: 'product-003',
        startDate: '2026-02-15',
        endDate: '2026-04-15',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },
    {
        id: 'FEAT-016',
        ucId: 'UC-008',
        name: '情感识别与反馈',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        owner: '钱七',
        team: 'HMI团队',
        productId: 'product-003',
        startDate: '2026-03-01',
        endDate: '2026-04-30',
        createdAt: '2026-01-30',
        updatedAt: '2026-02-01'
    },

    // UC-009: 沉浸式座舱体验 的Features
    {
        id: 'FEAT-017',
        ucId: 'UC-009',
        name: '氛围灯智能联动',
        version: 'V1.0',
        priority: 'P0',
        status: '设计中',
        owner: '赵六',
        team: 'HMI团队',
        productId: 'product-003',
        startDate: '2026-02-01',
        endDate: '2026-03-31',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },
    {
        id: 'FEAT-018',
        ucId: 'UC-009',
        name: '多感官体验系统',
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        owner: '钱七',
        team: 'HMI团队',
        productId: 'product-003',
        startDate: '2026-02-15',
        endDate: '2026-04-15',
        createdAt: '2026-01-31',
        updatedAt: '2026-02-01'
    },
    // L2-J6M产品线Features
    {
        id: 'FEAT-019',
        ucId: 'UC-010',
        name: '高速自动跟车',
        version: 'V1.0',
        priority: 'P0',
        status: '开发中',
        owner: '张伟',
        team: 'L2控制团队',
        productId: 'product-006',
        startDate: '2026-02-05',
        endDate: '2026-04-30',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-020',
        ucId: 'UC-010',
        name: '自动变道辅助',
        version: 'V1.0',
        priority: 'P0',
        status: '开发中',
        owner: '王芳',
        team: 'L2规划团队',
        productId: 'product-006',
        startDate: '2026-02-10',
        endDate: '2026-05-15',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-021',
        ucId: 'UC-010',
        name: '智能限速识别',
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        owner: '刘强',
        team: 'L2感知团队',
        productId: 'product-007',
        startDate: '2026-03-01',
        endDate: '2026-05-30',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-022',
        ucId: 'UC-011',
        name: '自动泊车入位',
        version: 'V1.0',
        priority: 'P0',
        status: '开发中',
        owner: '赵敏',
        team: 'L2控制团队',
        productId: 'product-006',
        startDate: '2026-02-08',
        endDate: '2026-05-10',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-023',
        ucId: 'UC-011',
        name: '记忆泊车',
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        owner: '孙丽',
        team: 'L2规划团队',
        productId: 'product-006',
        startDate: '2026-03-15',
        endDate: '2026-06-20',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-024',
        ucId: 'UC-011',
        name: '遥控泊车',
        version: 'V1.0',
        priority: 'P1',
        status: '设计中',
        owner: '周杰',
        team: 'L2感知团队',
        productId: 'product-007',
        startDate: '2026-03-20',
        endDate: '2026-06-30',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    }
]

export const getFeatureById = (id: string): Feature | undefined => {
    return features.find(feature => feature.id === id)
}

export const getFeaturesByUCId = (ucId: string): Feature[] => {
    return features.filter(feature => feature.ucId === ucId)
}

export const getFeaturesByStatus = (status: Feature['status']): Feature[] => {
    return features.filter(feature => feature.status === status)
}

export const getFeaturesByTeam = (team: string): Feature[] => {
    return features.filter(feature => feature.team === team)
}

/**
 * 从UC创建多个Features
 */
export const createSplitFeatures = (ucId: string, featureNames: string[], owner: string = '未分配'): Feature[] => {
    const newFeatures: Feature[] = featureNames.map((name, index) => ({
        id: `FEAT-${String(features.length + index + 1).padStart(3, '0')}`,
        ucId,
        name,
        version: 'V1.0',
        priority: 'P1',
        status: '草稿',
        owner,
        team: '未分配',
        productId: 'product-001',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    }))

    features.push(...newFeatures)
    return newFeatures
}

/**
 * 创建单个Feature
 */
export const createFeature = (feature: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>): Feature => {
    const newFeature: Feature = {
        ...feature,
        id: `FEAT-${String(features.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    }

    features.push(newFeature)
    return newFeature
}

/**
 * 更新Feature
 */
export const updateFeature = (id: string, updates: Partial<Feature>): Feature | undefined => {
    const feature = getFeatureById(id)
    if (feature) {
        Object.assign(feature, updates, {
            updatedAt: new Date().toISOString().split('T')[0]
        })
    }
    return feature
}
