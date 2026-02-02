#!/usr/bin/env node

/**
 * 批量更新SSTS数据，添加priority、status和owner字段
 */

const fs = require('fs');
const path = require('path');

const sstsFilePath = path.join(__dirname, '../src/data/ssts.ts');
let content = fs.readFileSync(sstsFilePath, 'utf-8');

// 定义需要添加的字段映射
const additions = [
    { after: "version: 'V1.0',", add: "        priority: 'P0',\n        status: '已完成'," },
    { after: "version: 'V1.0',", add: "        priority: 'P0',\n        status: '已完成'," },
    { after: "version: 'V1.0',", add: "        priority: 'P1',\n        status: '开发中'," },
    { after: "version: 'V1.0',", add: "        priority: 'P1',\n        status: '设计中'," },
    { after: "version: 'V1.0',", add: "        priority: 'P0',\n        status: '已完成'," },
    { after: "version: 'V1.0',", add: "        priority: 'P0',\n        status: '已完成'," },
    { after: "version: 'V1.0',", add: "        priority: 'P0',\n        status: '已完成'," },
];

// 为每个SSTS添加owner字段
const ownerAdditions = [
    { after: "reviewStatus: '已通过',", add: "        owner: '张三'," },
    { after: "reviewStatus: '已通过',", add: "        owner: '李四'," },
    { after: "reviewStatus: '评审中',", add: "        owner: '王五'," },
    { after: "reviewStatus: '草稿',", add: "        owner: '赵六'," },
    { after: "reviewStatus: '已通过',", add: "        owner: '钱七'," },
    { after: "reviewStatus: '已通过',", add: "        owner: '孙八'," },
    { after: "reviewStatus: '已通过',", add: "        owner: '周九'," },
];

console.log('Updating SSTS data...');
console.log('File will be updated manually - please add the following fields to each SSTS:');
console.log('- priority: P0/P1/P2');
console.log('- status: 草稿/设计中/评审中/已通过/已完成');
console.log('- owner: 负责人姓名');
