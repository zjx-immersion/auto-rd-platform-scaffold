// 此脚本用于批量生成MR数据
// 为SSTS-008到SSTS-037的每个SSTS生成2个MR

const fs = require('fs');
const path = require('path');

// 模块映射
const moduleMapping = {
    'FEAT-009': ['MOD-001', 'MOD-002'], // 感知、规划
    'FEAT-010': ['MOD-002', 'MOD-001'], // 规划、感知
    'FEAT-011': ['MOD-001', 'MOD-002'], // 感知、规划
    'FEAT-012': ['MOD-002', 'MOD-003'], // 规划、控制
    'FEAT-013': ['MOD-003', 'MOD-002'], // 控制、规划
    'FEAT-014': ['MOD-004', 'MOD-004'], // HMI
    'FEAT-015': ['MOD-004', 'MOD-004'], // HMI
    'FEAT-016': ['MOD-004', 'MOD-001'], // HMI、感知
    'FEAT-017': ['MOD-004', 'MOD-004'], // HMI
    'FEAT-018': ['MOD-004', 'MOD-004']  // HMI
};

// SSTS到Feature的映射
const sstsToFeature = {
    'SSTS-008': 'FEAT-009', 'SSTS-009': 'FEAT-009', 'SSTS-010': 'FEAT-009',
    'SSTS-011': 'FEAT-010', 'SSTS-012': 'FEAT-010', 'SSTS-013': 'FEAT-010',
    'SSTS-014': 'FEAT-011', 'SSTS-015': 'FEAT-011', 'SSTS-016': 'FEAT-011',
    'SSTS-017': 'FEAT-012', 'SSTS-018': 'FEAT-012', 'SSTS-019': 'FEAT-012',
    'SSTS-020': 'FEAT-013', 'SSTS-021': 'FEAT-013', 'SSTS-022': 'FEAT-013',
    'SSTS-023': 'FEAT-014', 'SSTS-024': 'FEAT-014', 'SSTS-025': 'FEAT-014',
    'SSTS-026': 'FEAT-015', 'SSTS-027': 'FEAT-015', 'SSTS-028': 'FEAT-015',
    'SSTS-029': 'FEAT-016', 'SSTS-030': 'FEAT-016', 'SSTS-031': 'FEAT-016',
    'SSTS-032': 'FEAT-017', 'SSTS-033': 'FEAT-017', 'SSTS-034': 'FEAT-017',
    'SSTS-035': 'FEAT-018', 'SSTS-036': 'FEAT-018', 'SSTS-037': 'FEAT-018'
};

// SSTS名称
const sstsNames = {
    'SSTS-008': '斜列车位识别-感知模块',
    'SSTS-009': '斜列泊车路径规划',
    'SSTS-010': '斜列泊车控制执行',
    'SSTS-011': '泊车路线学习',
    'SSTS-012': '记忆场景识别',
    'SSTS-013': '记忆泊车执行',
    'SSTS-014': '停车场楼层识别',
    'SSTS-015': '楼层间路径规划',
    'SSTS-016': '空闲车位搜索',
    'SSTS-017': '变道时机判断',
    'SSTS-018': '盲区检测',
    'SSTS-019': '变道轨迹控制',
    'SSTS-020': '匝道识别',
    'SSTS-021': '匝道速度规划',
    'SSTS-022': '匝道行驶控制',
    'SSTS-023': '上下文管理',
    'SSTS-024': '意图识别',
    'SSTS-025': '对话生成',
    'SSTS-026': '场景识别',
    'SSTS-027': '用户偏好分析',
    'SSTS-028': '智能推荐',
    'SSTS-029': '语音情感识别',
    'SSTS-030': '表情识别',
    'SSTS-031': '情感化反馈',
    'SSTS-032': '场景联动控制',
    'SSTS-033': '音乐节奏联动',
    'SSTS-034': '语音交互联动',
    'SSTS-035': '视听联动控制',
    'SSTS-036': '触觉嗅觉联动',
    'SSTS-037': '场景化体验编排'
};

let mrCode = '';
let mrId = 10; // 从MR-010开始

for (let sstsNum = 8; sstsNum <= 37; sstsNum++) {
    const sstsId = `SSTS-${String(sstsNum).padStart(3, '0')}`;
    const featureId = sstsToFeature[sstsId];
    const modules = moduleMapping[featureId];
    const sstsName = sstsNames[sstsId];

    // 为每个SSTS生成2个MR
    for (let i = 0; i < 2; i++) {
        const moduleId = modules[i];
        const moduleName = moduleId === 'MOD-001' ? '感知模块' :
            moduleId === 'MOD-002' ? '规划模块' :
                moduleId === 'MOD-003' ? '控制模块' : 'HMI模块';

        mrCode += `    // ${sstsId}: ${sstsName} 的MR\n`;
        mrCode += `    {\n`;
        mrCode += `        id: 'MR-${String(mrId).padStart(3, '0')}',\n`;
        mrCode += `        sstsId: '${sstsId}',\n`;
        mrCode += `        moduleId: '${moduleId}',\n`;
        mrCode += `        name: '${sstsName}-${moduleName}',\n`;
        mrCode += `        description: '${sstsName}的${moduleName}实现',\n`;
        mrCode += `        effort: ${Math.floor(Math.random() * 8) + 5},\n`;
        mrCode += `        status: '待分配',\n`;
        mrCode += `        createdAt: '2026-02-01',\n`;
        mrCode += `        updatedAt: '2026-02-01'\n`;
        mrCode += `    },\n`;

        mrId++;
    }
}

console.log(mrCode);
console.log(`\n生成了 ${mrId - 10} 个MR数据`);
