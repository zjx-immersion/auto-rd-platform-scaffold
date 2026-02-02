/**
 * 需求树Mock数据
 * Epic → Feature → SSTS → MR 四层结构
 */

export const mockRequirementTreeData = {
  epics: [
    {
      id: 'REQ-EPIC-001',
      name: '智能座舱语音交互升级 2.0',
      code: 'EPIC-2024-001',
      description: '全面升级语音助手能力，支持连续对话和多意图识别',
      status: 'In Progress',
      priority: 'P0',
      owner: '张三',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      progress: 45,
      features: [
        {
          id: 'REQ-FEAT-002',
          name: '语音连续对话能力',
          code: 'FEAT-2024-101',
          type: 'Feature',
          status: '评审中',
          priority: 'High',
          maturity: 60,
          completionRate: 30,
          targetVersion: 'V2.1.0',
          ssts: [
            {
              id: 'REQ-SSTS-003',
              name: '语音唤醒响应时延规范',
              code: 'SSTS-2024-501',
              type: 'SSTS',
              status: '已评审',
              priority: 'Medium',
              moduleCount: 1,
              mrCount: 1,
              mrs: [
                {
                  id: 'REQ-MR-004',
                  name: '语音服务-唤醒词检测模块',
                  code: 'MR-2024-1001',
                  type: 'MR',
                  priority: 'High',
                  status: '已完成',
                  owner: '赵六',
                  module: 'Cockpit-Voice-Service'
                }
              ]
            },
          ],
        },
        {
          id: 'REQ-FEAT-005',
          name: '车辆远程控制-空调',
          code: 'FEAT-2024-102',
          type: 'Feature',
          status: '待评审',
          priority: 'Medium',
          maturity: 10,
          completionRate: 0,
          targetVersion: 'V1.5',
          ssts: [],
        }
      ],
    },
  ],
}

export default mockRequirementTreeData
