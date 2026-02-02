import type { ProductLine, Product } from './types'

/**
 * 产品线和产品的共享Mock数据
 * 用于产品线列表页、产品线选择器等
 */
export const mockProductLines: Array<{
    id: string
    code: string
    name: string
    description: string
    owner: string
    productCount: number
    children: Array<{
        id: string
        code: string
        name: string
        description: string
        owner: string
        status: string
        productLineId: string
    }>
}> = [
        {
            id: 'line-001',
            code: 'LANTU-LINE',
            name: '岚图梦想家',
            description: '岚图梦想家产品线',
            owner: '张三',
            productCount: 3,
            children: [
                {
                    id: 'product-001',
                    code: 'ADAS-PROD',
                    name: 'ADAS系统',
                    description: '高级驾驶辅助系统',
                    owner: '李四',
                    status: '开发中',
                    productLineId: 'line-001'
                },
                {
                    id: 'product-002',
                    code: 'CABIN-PROD',
                    name: '智能座舱',
                    description: '智能座舱系统',
                    owner: '王五',
                    status: '开发中',
                    productLineId: 'line-001'
                },
                {
                    id: 'product-003',
                    code: 'POWER-PROD',
                    name: '动力系统',
                    description: '动力控制系统',
                    owner: '赵六',
                    status: '规划中',
                    productLineId: 'line-001'
                }
            ]
        },
        {
            id: 'line-002',
            code: 'FREE-LINE',
            name: '岚图FREE',
            description: '岚图FREE产品线',
            owner: '孙七',
            productCount: 2,
            children: [
                {
                    id: 'product-004',
                    code: 'CHASSIS-PROD',
                    name: '底盘系统',
                    description: '底盘控制系统',
                    owner: '周八',
                    status: '已完成',
                    productLineId: 'line-002'
                },
                {
                    id: 'product-005',
                    code: 'BODY-PROD',
                    name: '车身控制',
                    description: '车身控制系统',
                    owner: '吴九',
                    status: '开发中',
                    productLineId: 'line-002'
                }
            ]
        },
        {
            id: 'line-003',
            code: 'L2-J6M',
            name: 'L2智能驾驶-J6M',
            description: 'L2级智能驾驶系统-J6M平台',
            owner: '李明',
            productCount: 2,
            children: [
                {
                    id: 'product-006',
                    code: 'L2-ADAS',
                    name: 'L2 ADAS系统',
                    description: 'L2级高级驾驶辅助系统',
                    owner: '陈强',
                    status: '开发中',
                    productLineId: 'line-003'
                },
                {
                    id: 'product-007',
                    code: 'L2-PERCEPTION',
                    name: 'L2感知系统',
                    description: 'L2级感知融合系统',
                    owner: '刘洋',
                    status: '开发中',
                    productLineId: 'line-003'
                }
            ]
        }
    ]

/**
 * 获取所有产品线
 */
export const getAllProductLines = () => mockProductLines

/**
 * 根据ID获取产品线
 */
export const getProductLineById = (id: string) => {
    return mockProductLines.find(line => line.id === id)
}

/**
 * 根据ID获取产品
 */
export const getProductById = (id: string) => {
    for (const line of mockProductLines) {
        const product = line.children?.find(p => p.id === id)
        if (product) return product
    }
    return null
}
