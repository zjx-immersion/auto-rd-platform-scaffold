/**
 * 生成L2-J6M迭代规划数据
 */

// 1. 模块数据
const l2Modules = `    // L2-J6M产品线模块
    {
        id: 'MOD-005',
        name: 'L2感知模块',
        teamId: 'TEAM-005',
        productId: 'product-006',
        description: 'L2级感知算法和传感器融合',
        createdAt: '2026-02-02'
    },
    {
        id: 'MOD-006',
        name: 'L2规划模块',
        teamId: 'TEAM-006',
        productId: 'product-006',
        description: 'L2级路径规划和行为决策',
        createdAt: '2026-02-02'
    },
    {
        id: 'MOD-007',
        name: 'L2控制模块',
        teamId: 'TEAM-007',
        productId: 'product-006',
        description: 'L2级车辆控制和执行',
        createdAt: '2026-02-02'
    },
    {
        id: 'MOD-008',
        name: 'L2 HMI模块',
        teamId: 'TEAM-008',
        productId: 'product-007',
        description: 'L2级人机交互界面',
        createdAt: '2026-02-02'
    },`;

// 2. 团队数据
const l2Teams = `    // L2-J6M产品线团队
    {
        id: 'TEAM-005',
        name: 'L2感知团队',
        capacity: 30,
        members: ['刘强', '周杰', '感知工程师A', '感知工程师B'],
        createdAt: '2026-02-02'
    },
    {
        id: 'TEAM-006',
        name: 'L2规划团队',
        capacity: 35,
        members: ['王芳', '孙丽', '规划工程师A', '规划工程师B'],
        createdAt: '2026-02-02'
    },
    {
        id: 'TEAM-007',
        name: 'L2控制团队',
        capacity: 32,
        members: ['张伟', '赵敏', '控制工程师A', '控制工程师B'],
        createdAt: '2026-02-02'
    },
    {
        id: 'TEAM-008',
        name: 'L2 HMI团队',
        capacity: 20,
        members: ['HMI负责人', 'HMI工程师A', 'HMI工程师B'],
        createdAt: '2026-02-02'
    },`;

// 3. 迭代规划数据
const l2IterationPlan = `    {
        id: 'PLAN-003',
        name: '2026 Q3 L2智能驾驶迭代规划',
        description: '2026年第三季度L2级智能驾驶功能迭代规划，包含高速领航辅助和智能泊车辅助',
        startDate: '2026-03-01',
        endDate: '2026-06-30',
        sprints: 4,
        status: '进行中',
        createdAt: '2026-02-02'
    },`;

// 4. 迭代数据 (16个)
const l2Iterations = `    // L2-J6M产品线迭代 - 感知模块
    {
        id: 'ITER-025',
        planId: 'PLAN-003',
        moduleId: 'MOD-005',
        sprint: 1,
        name: 'L2感知模块 Sprint 1',
        capacity: 30,
        allocated: 9,
        mrIds: ['MR-038', 'MR-039', 'MR-042']
    },
    {
        id: 'ITER-026',
        planId: 'PLAN-003',
        moduleId: 'MOD-005',
        sprint: 2,
        name: 'L2感知模块 Sprint 2',
        capacity: 30,
        allocated: 12,
        mrIds: ['MR-040', 'MR-041', 'MR-043']
    },
    {
        id: 'ITER-027',
        planId: 'PLAN-003',
        moduleId: 'MOD-005',
        sprint: 3,
        name: 'L2感知模块 Sprint 3',
        capacity: 30,
        allocated: 9,
        mrIds: ['MR-056', 'MR-057', 'MR-060']
    },
    {
        id: 'ITER-028',
        planId: 'PLAN-003',
        moduleId: 'MOD-005',
        sprint: 4,
        name: 'L2感知模块 Sprint 4',
        capacity: 30,
        allocated: 3,
        mrIds: ['MR-061']
    },
    // L2-J6M产品线迭代 - 规划模块
    {
        id: 'ITER-029',
        planId: 'PLAN-003',
        moduleId: 'MOD-006',
        sprint: 1,
        name: 'L2规划模块 Sprint 1',
        capacity: 35,
        allocated: 10,
        mrIds: ['MR-032', 'MR-033', 'MR-036']
    },
    {
        id: 'ITER-030',
        planId: 'PLAN-003',
        moduleId: 'MOD-006',
        sprint: 2,
        name: 'L2规划模块 Sprint 2',
        capacity: 35,
        allocated: 12,
        mrIds: ['MR-034', 'MR-035', 'MR-037']
    },
    {
        id: 'ITER-031',
        planId: 'PLAN-003',
        moduleId: 'MOD-006',
        sprint: 3,
        name: 'L2规划模块 Sprint 3',
        capacity: 35,
        allocated: 11,
        mrIds: ['MR-050', 'MR-051', 'MR-054']
    },
    {
        id: 'ITER-032',
        planId: 'PLAN-003',
        moduleId: 'MOD-006',
        sprint: 4,
        name: 'L2规划模块 Sprint 4',
        capacity: 35,
        allocated: 9,
        mrIds: ['MR-052', 'MR-053', 'MR-055']
    },
    // L2-J6M产品线迭代 - 控制模块
    {
        id: 'ITER-033',
        planId: 'PLAN-003',
        moduleId: 'MOD-007',
        sprint: 1,
        name: 'L2控制模块 Sprint 1',
        capacity: 32,
        allocated: 11,
        mrIds: ['MR-026', 'MR-027', 'MR-030']
    },
    {
        id: 'ITER-034',
        planId: 'PLAN-003',
        moduleId: 'MOD-007',
        sprint: 2,
        name: 'L2控制模块 Sprint 2',
        capacity: 32,
        allocated: 12,
        mrIds: ['MR-028', 'MR-029', 'MR-031']
    },
    {
        id: 'ITER-035',
        planId: 'PLAN-003',
        moduleId: 'MOD-007',
        sprint: 3,
        name: 'L2控制模块 Sprint 3',
        capacity: 32,
        allocated: 13,
        mrIds: ['MR-044', 'MR-045', 'MR-048']
    },
    {
        id: 'ITER-036',
        planId: 'PLAN-003',
        moduleId: 'MOD-007',
        sprint: 4,
        name: 'L2控制模块 Sprint 4',
        capacity: 32,
        allocated: 9,
        mrIds: ['MR-046', 'MR-047', 'MR-049']
    },
    // L2-J6M产品线迭代 - HMI模块
    {
        id: 'ITER-037',
        planId: 'PLAN-003',
        moduleId: 'MOD-008',
        sprint: 1,
        name: 'L2 HMI模块 Sprint 1',
        capacity: 20,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-038',
        planId: 'PLAN-003',
        moduleId: 'MOD-008',
        sprint: 2,
        name: 'L2 HMI模块 Sprint 2',
        capacity: 20,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-039',
        planId: 'PLAN-003',
        moduleId: 'MOD-008',
        sprint: 3,
        name: 'L2 HMI模块 Sprint 3',
        capacity: 20,
        allocated: 0,
        mrIds: []
    },
    {
        id: 'ITER-040',
        planId: 'PLAN-003',
        moduleId: 'MOD-008',
        sprint: 4,
        name: 'L2 HMI模块 Sprint 4',
        capacity: 20,
        allocated: 0,
        mrIds: []
    },`;

console.log('=== 模块数据 ===');
console.log(l2Modules);
console.log('\n=== 团队数据 ===');
console.log(l2Teams);
console.log('\n=== 迭代规划数据 ===');
console.log(l2IterationPlan);
console.log('\n=== 迭代数据 ===');
console.log(l2Iterations);

// 保存到文件
const fs = require('fs');
fs.writeFileSync('/tmp/l2-modules.txt', l2Modules);
fs.writeFileSync('/tmp/l2-teams.txt', l2Teams);
fs.writeFileSync('/tmp/l2-iteration-plan.txt', l2IterationPlan);
fs.writeFileSync('/tmp/l2-iterations.txt', l2Iterations);

console.log('\n数据已保存到 /tmp/ 目录');
