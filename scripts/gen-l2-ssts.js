// L2-J6M SSTS数据生成脚本
const fs = require('fs');

// 为6个Features生成18个SSTS
const features = [
    { id: 'FEAT-019', name: '高速自动跟车', productId: 'product-006' },
    { id: 'FEAT-020', name: '自动变道辅助', productId: 'product-006' },
    { id: 'FEAT-021', name: '智能限速识别', productId: 'product-007' },
    { id: 'FEAT-022', name: '自动泊车入位', productId: 'product-006' },
    { id: 'FEAT-023', name: '记忆泊车', productId: 'product-006' },
    { id: 'FEAT-024', name: '遥控泊车', productId: 'product-007' }
];

const sstsTemplates = ['场景定义与需求分析', '技术方案与架构设计', '测试验收标准'];
const reviewStatuses = ['已通过', '评审中', '草稿'];

let sstsData = '';
let sstsId = 38;

features.forEach((feature, fIndex) => {
    sstsTemplates.forEach((template, tIndex) => {
        const id = `SSTS-${String(sstsId).padStart(3, '0')}`;
        sstsData += `    {
        id: '${id}',
        featureId: '${feature.id}',
        name: '${feature.name}-${template}',
        scenario: '${feature.name}的${template}场景描述',
        techSpec: \`
**输入**: 传感器数据、地图数据
**输出**: 控制指令
**算法**: L2级智能驾驶算法
**性能**: 响应时间≤100ms，准确率≥99%
        \`,
        acceptanceCriteria: \`
- 功能完整性≥95%
- 性能指标达标
- 安全性验证通过
        \`,
        version: 'V1.0',
        priority: '${fIndex < 3 ? 'P0' : 'P1'}',
        status: '${tIndex === 0 ? '已完成' : (tIndex === 1 ? '开发中' : '设计中')}',
        reviewStatus: '${reviewStatuses[tIndex]}',
        owner: '${['张伟', '王芳', '刘强', '赵敏', '孙丽', '周杰'][fIndex]}',
        createdAt: '2026-02-02',
        updatedAt: '2026-02-02'
    },
`;
        sstsId++;
    });
});

console.log(sstsData);
console.log(`\n生成了 ${sstsId - 38} 个SSTS`);
