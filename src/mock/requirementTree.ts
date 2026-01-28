/**
 * 需求树Mock数据
 * Epic → Feature → SSTS → MR 四层结构
 */

export const mockRequirementTreeData = {
  epics: [
    {
      id: 'epic-l2plus',
      name: 'Epic: L2+ 高速领航辅助',
      description: 'L2+高速场景智能驾驶能力',
      productId: 'prod-adas-l2plus',
      productName: '城市NOA',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      owner: 'PO-张三',
      startDate: '2025-Q3',
      endDate: '2026-Q1',
      progressEpic: 65,
      features: [
        {
          id: 'fr-lka-001',
          name: 'Feature: 车道保持辅助（LKA）',
          type: 'FUNCTIONAL',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          maturity: 85,
          completionRate: 60,
          ssts: [
            {
              id: 'ssts-lka-001',
              name: 'SSTS: 直道车道保持',
              description: '车辆在高速直道保持车道中心行驶',
              type: 'FUNCTIONAL',
              status: 'IN_PROGRESS',
              priority: 'HIGH',
              moduleCount: 2,
              mrCount: 2,
            },
          ],
        },
      ],
    },
  ],
}

export default mockRequirementTreeData
