/**
 * 为L2-J6M产品线生成完整业务数据
 * 包括: Features, SSTS, MRs
 */

const fs = require('fs')
const path = require('path')

// 新增Feature数据
const newFeatures = [
    {
        id: 'FEAT-019',
        name: '高速自动跟车',
        description: 'L2级高速公路自动跟车功能，支持0-130km/h全速域跟车',
        ucId: 'UC-010',
        productId: 'product-006',
        priority: 'P0',
        status: '开发中',
        team: 'L2控制团队',
        owner: '张伟',
        version: 'V1.0',
        startDate: '2026-02-05',
        endDate: '2026-04-30',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-020',
        name: '自动变道辅助',
        description: 'L2级自动变道辅助功能，支持智能变道决策和执行',
        ucId: 'UC-010',
        productId: 'product-006',
        priority: 'P0',
        status: '开发中',
        team: 'L2规划团队',
        owner: '王芳',
        version: 'V1.0',
        startDate: '2026-02-10',
        endDate: '2026-05-15',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-021',
        name: '智能限速识别',
        description: 'L2级智能限速识别功能，支持交通标志识别和地图融合',
        ucId: 'UC-010',
        productId: 'product-007',
        priority: 'P1',
        status: '规划中',
        team: 'L2感知团队',
        owner: '刘强',
        version: 'V1.0',
        startDate: '2026-03-01',
        endDate: '2026-05-30',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-022',
        name: '自动泊车入位',
        description: 'L2级自动泊车入位功能，支持垂直、水平、斜列泊车',
        ucId: 'UC-011',
        productId: 'product-006',
        priority: 'P0',
        status: '开发中',
        team: 'L2控制团队',
        owner: '赵敏',
        version: 'V1.0',
        startDate: '2026-02-08',
        endDate: '2026-05-10',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-023',
        name: '记忆泊车',
        description: 'L2级记忆泊车功能，支持固定车位的自动泊车',
        ucId: 'UC-011',
        productId: 'product-006',
        priority: 'P1',
        status: '规划中',
        team: 'L2规划团队',
        owner: '孙丽',
        version: 'V1.0',
        startDate: '2026-03-15',
        endDate: '2026-06-20',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
    {
        id: 'FEAT-024',
        name: '遥控泊车',
        description: 'L2级遥控泊车功能，支持车外遥控车辆自动泊车',
        ucId: 'UC-011',
        productId: 'product-007',
        priority: 'P1',
        status: '规划中',
        team: 'L2感知团队',
        owner: '周杰',
        version: 'V1.0',
        startDate: '2026-03-20',
        endDate: '2026-06-30',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    }
]

// 生成SSTS数据（每个Feature 3个SSTS）
const newSSTSList = []
const sstsTemplates = [
    ['场景定义', '功能设计', '性能指标'],
    ['算法设计', '接口设计', '测试用例'],
    ['需求分析', '架构设计', '验收标准']
]

newFeatures.forEach((feature, featureIndex) => {
    const baseId = 38 + featureIndex * 3 // SSTS-038开始
    const templates = sstsTemplates[featureIndex % 3]

    templates.forEach((template, index) => {
        newSSTSList.push({
            id: `SSTS-${String(baseId + index).padStart(3, '0')}`,
            name: `${feature.name}-${template}`,
            description: `${feature.name}的${template}规格说明`,
            featureId: feature.id,
            productId: feature.productId,
            priority: feature.priority,
            reviewStatus: index === 0 ? '已通过' : (index === 1 ? '评审中' : '草稿'),
            owner: feature.owner,
            createdAt: '2026-02-02',
            updatedAt: '2026-02-02'
        })
    })
})

// 生成MR数据（每个SSTS 2个MR）
const newMRsList = []
const mrTemplates = ['前端实现', '后端实现', '算法实现', '测试实现']

newSSTSList.forEach((ssts, sstsIndex) => {
    const baseId = 26 + sstsIndex * 2 // MR-026开始

    for (let i = 0; i < 2; i++) {
        const template = mrTemplates[(sstsIndex * 2 + i) % 4]
        newMRsList.push({
            id: `MR-${String(baseId + i).padStart(3, '0')}`,
            name: `${ssts.name}-${template}`,
            description: `${ssts.name}的${template}合并请求`,
            sstsId: ssts.id,
            productId: ssts.productId,
            priority: ssts.priority,
            status: i === 0 ? '已合并' : '待审核',
            author: ssts.owner,
            reviewer: i === 0 ? '技术负责人' : '待分配',
            createdAt: '2026-02-02',
            updatedAt: '2026-02-02'
        })
    })
})

console.log('=== 生成的Features数据 ===')
console.log(JSON.stringify(newFeatures, null, 2))
console.log(`\n共生成 ${newFeatures.length} 个Features`)

console.log('\n=== 生成的SSTS数据 ===')
console.log(JSON.stringify(newSSTSList, null, 2))
console.log(`\n共生成 ${newSSTSList.length} 个SSTS`)

console.log('\n=== 生成的MR数据 ===')
console.log(JSON.stringify(newMRsList, null, 2))
console.log(`\n共生成 ${newMRsList.length} 个MR`)

// 保存到临时文件
const outputDir = path.join(__dirname, '../temp')
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(
    path.join(outputDir, 'l2-j6m-features.json'),
    JSON.stringify(newFeatures, null, 2)
)

fs.writeFileSync(
    path.join(outputDir, 'l2-j6m-ssts.json'),
    JSON.stringify(newSSTSList, null, 2)
)

fs.writeFileSync(
    path.join(outputDir, 'l2-j6m-mrs.json'),
    JSON.stringify(newMRsList, null, 2)
)

console.log('\n数据已保存到 temp/ 目录')
