import type { ProductLine, Product } from './types'

/**
 * 产品线Mock数据
 */
export const productLines: ProductLine[] = [
    {
        id: 'line-001',
        name: '岚图梦想家产品线',
        description: '包含智能驾驶和智能座舱功能',
        createdAt: '2025-12-01'
    },
    {
        id: 'line-002',
        name: '岚图FREE产品线',
        description: '包含底盘和车身控制功能',
        createdAt: '2025-12-01'
    }
]

/**
 * 产品Mock数据
 */
export const products: Product[] = [
    {
        id: 'product-001',
        name: 'ADAS系统',
        description: '高级驾驶辅助系统',
        productLineId: 'line-001',
        createdAt: '2025-12-15'
    },
    {
        id: 'product-002',
        name: '智能座舱',
        description: '智能座舱系统',
        productLineId: 'line-001',
        createdAt: '2025-12-15'
    },
    {
        id: 'product-003',
        name: '动力系统',
        description: '动力控制系统',
        productLineId: 'line-001',
        createdAt: '2025-12-15'
    }
]

export const getProductLineById = (id: string): ProductLine | undefined => {
    return productLines.find(pl => pl.id === id)
}

export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id)
}

export const getProductsByProductLineId = (productLineId: string): Product[] => {
    return products.filter(p => p.productLineId === productLineId)
}
