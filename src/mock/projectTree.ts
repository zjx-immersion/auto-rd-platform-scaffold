/**
 * 项目树Mock数据 - 12个造车节点架构
 * 用于C0项目管理页面的项目树
 * 从auto-rd-platform-web迁移并1:1还原，包含完整的12个造车节点数据
 */

export type VehicleNodeCode =
  | 'PSI'
  | 'PTR'
  | 'PSF'
  | 'PS'
  | 'PC'
  | 'PA'
  | 'VP'
  | 'LR'
  | 'LS'
  | 'J1'
  | 'OKTB'
  | 'FSR'

export type VehicleNodePhase =
  | 'PLANNING' // PSI, PTR, PSF
  | 'INITIATION' // PS, PC, PA
  | 'DEVELOPMENT' // VP
  | 'PRODUCTION' // LR, LS, J1
  | 'LAUNCH' // OKTB
  | 'CLOSED' // FSR

export interface Gateway {
  id: string
  vehicleNodeId?: string
  vpSubPhaseId?: string
  code: string
  name: string
  date: string
  criteria?: string
  status?: 'PENDING' | 'PASSED' | 'FAILED' | 'WAIVED'
  importance: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface VPSubPhase {
  id: string
  vehicleNodeId: string
  code: 'VP1' | 'VP2' | 'VP3'
  name: string
  targetDate: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE'
  gateways?: Gateway[]
}

export interface ProductVersionPlan {
  id: string
  baselineId: string
  productVersionId: string
  productName: string
  version: string
  targetDate: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE'
  completion?: number
  estimatedHours?: number
  sprints?: string[]
}

export interface Sprint {
  id: string
  name: string
  code: string
  teamId: string
  teamName: string
  startDate: string
  endDate: string
  capacity: number
  committed: number
  completed: number
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE'
  workItems?: any[]
}

export interface VehicleNode {
  id: string
  projectId: string
  code: VehicleNodeCode
  name: string
  fullName: string
  description: string
  phase: VehicleNodePhase
  sequence: number
  startDate: string
  targetDate: string
  status: 'NOT_STARTED' | 'PLANNING' | 'IN_PROGRESS' | 'DONE'
  gateways?: Gateway[]
  productVersions?: ProductVersionPlan[]
  sprints?: Sprint[]
  subPhases?: VPSubPhase[]
  maturity?: number
  completion?: number
}

export interface DomainProject {
  id: string
  name: string
  code: string
  description: string
  domain: 'ADAS' | 'CABIN' | 'EE'
  vehicleModel?: string
  projectType?: 'NEW' | 'FACELIFT' | 'UPGRADE'
  startDate: string
  endDate: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED'
  vehicleNodes?: VehicleNode[]
}

/**
 * 生成项目树数据（12个造车节点架构）
 */
export function generateProjectTreeData(): DomainProject[] {
  return [
    {
      id: 'proj-dreamcar-adas',
      name: '岚图梦想家 ADAS项目',
      code: 'DREAMCAR-ADAS',
      description: '岚图梦想家车型的智能驾驶系统项目（L2+级别）',
      domain: 'ADAS',
      vehicleModel: '岚图梦想家',
      projectType: 'NEW',
      startDate: '2025-08-01',
      endDate: '2026-06-30',
      status: 'IN_PROGRESS',
      vehicleNodes: [
        // 1. PSI - 项目战略目的
        {
          id: 'vn-psi',
          projectId: 'proj-dreamcar-adas',
          code: 'PSI',
          name: 'PSI',
          fullName: 'PSI - 项目战略目的',
          description: '项目战略目标定义，市场定位分析，技术路线规划',
          phase: 'PLANNING',
          sequence: 1,
          startDate: '2025-08-01',
          targetDate: '2025-08-31',
          status: 'DONE',
          gateways: [],
          productVersions: [],
          sprints: [],
          maturity: 100,
          completion: 100,
        },
        // 2. PTR - 项目技术要求
        {
          id: 'vn-ptr',
          projectId: 'proj-dreamcar-adas',
          code: 'PTR',
          name: 'PTR',
          fullName: 'PTR - 项目技术要求',
          description: '技术规格书制定，技术可行性分析，技术方案选型',
          phase: 'PLANNING',
          sequence: 2,
          startDate: '2025-09-01',
          targetDate: '2025-09-30',
          status: 'DONE',
          gateways: [],
          productVersions: [],
          sprints: [],
          maturity: 100,
          completion: 100,
        },
        // 3. PSF - 项目战略最终化
        {
          id: 'vn-psf',
          projectId: 'proj-dreamcar-adas',
          code: 'PSF',
          name: 'PSF',
          fullName: 'PSF - 项目战略最终化',
          description: '战略方案最终确认，资源预算确认，项目范围确认',
          phase: 'PLANNING',
          sequence: 3,
          startDate: '2025-10-01',
          targetDate: '2025-10-15',
          status: 'DONE',
          gateways: [],
          productVersions: [],
          sprints: [],
          maturity: 100,
          completion: 100,
        },
        // 4. PS - 项目开始/立项完成
        {
          id: 'vn-ps',
          projectId: 'proj-dreamcar-adas',
          code: 'PS',
          name: 'PS',
          fullName: 'PS - 项目开始/立项完成',
          description: '项目正式启动，团队组建，项目章程发布',
          phase: 'INITIATION',
          sequence: 4,
          startDate: '2025-10-16',
          targetDate: '2025-10-31',
          status: 'DONE',
          gateways: [
            {
              id: 'gw-fc3',
              vehicleNodeId: 'vn-ps',
              code: 'FC3',
              name: 'FC3 - 功能需求锁定点',
              date: '2025-10-31',
              criteria: '功能需求规格书完成，需求评审通过',
              status: 'PASSED',
              importance: 'HIGH',
            },
          ],
          productVersions: [
            {
              id: 'pv-ps-noa',
              baselineId: 'vn-ps',
              productVersionId: 'pv-noa-0.1',
              productName: '城市NOA',
              version: 'V0.1',
              targetDate: '2025-10-31',
              status: 'DONE',
              completion: 100,
              estimatedHours: 3000,
              sprints: ['sprint-ps-1', 'sprint-ps-2'],
            },
            {
              id: 'pv-ps-cabin',
              baselineId: 'vn-ps',
              productVersionId: 'pv-cabin-0.1',
              productName: '智能座舱',
              version: 'V0.1',
              targetDate: '2025-10-31',
              status: 'DONE',
              completion: 100,
              estimatedHours: 2000,
              sprints: ['sprint-ps-3'],
            },
          ],
          sprints: [
            {
              id: 'sprint-ps-1',
              name: 'PS Sprint 1',
              code: 'SP-PS-1',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2025-10-16',
              endDate: '2025-10-23',
              capacity: 40,
              committed: 38,
              completed: 38,
              status: 'DONE',
            },
            {
              id: 'sprint-ps-2',
              name: 'PS Sprint 2',
              code: 'SP-PS-2',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2025-10-24',
              endDate: '2025-10-31',
              capacity: 40,
              committed: 40,
              completed: 40,
              status: 'DONE',
            },
            {
              id: 'sprint-ps-3',
              name: 'PS Sprint 1 (座舱)',
              code: 'SP-PS-CABIN-1',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2025-10-16',
              endDate: '2025-10-31',
              capacity: 50,
              committed: 48,
              completed: 48,
              status: 'DONE',
            },
          ],
          maturity: 100,
          completion: 100,
        },
        // 5. PC - 项目确认
        {
          id: 'vn-pc',
          projectId: 'proj-dreamcar-adas',
          code: 'PC',
          name: 'PC',
          fullName: 'PC - 项目确认',
          description: '项目方案评审，技术路线确认，资源配置确认',
          phase: 'INITIATION',
          sequence: 5,
          startDate: '2025-11-01',
          targetDate: '2025-11-15',
          status: 'DONE',
          gateways: [],
          productVersions: [],
          sprints: [],
          maturity: 100,
          completion: 100,
        },
        // 6. PA - 项目批准
        {
          id: 'vn-pa',
          projectId: 'proj-dreamcar-adas',
          code: 'PA',
          name: 'PA',
          fullName: 'PA - 项目批准',
          description: '项目正式批准，详细设计启动，开发环境准备',
          phase: 'INITIATION',
          sequence: 6,
          startDate: '2025-11-16',
          targetDate: '2025-12-15',
          status: 'DONE',
          gateways: [
            {
              id: 'gw-fdj',
              vehicleNodeId: 'vn-pa',
              code: 'FDJ',
              name: 'FDJ - 单元开发完成/最终数据判定',
              date: '2025-12-15',
              criteria: '详细设计完成，开发环境就绪',
              status: 'PASSED',
              importance: 'MEDIUM',
            },
          ],
          productVersions: [
            {
              id: 'pv-pa-noa',
              baselineId: 'vn-pa',
              productVersionId: 'pv-noa-0.5',
              productName: '城市NOA',
              version: 'V0.5',
              targetDate: '2025-12-15',
              status: 'DONE',
              completion: 100,
              estimatedHours: 5000,
              sprints: ['sprint-pa-1', 'sprint-pa-2'],
            },
            {
              id: 'pv-pa-cabin',
              baselineId: 'vn-pa',
              productVersionId: 'pv-cabin-0.5',
              productName: '智能座舱',
              version: 'V0.5',
              targetDate: '2025-12-15',
              status: 'DONE',
              completion: 100,
              estimatedHours: 4000,
              sprints: ['sprint-pa-3', 'sprint-pa-4'],
            },
          ],
          sprints: [
            {
              id: 'sprint-pa-1',
              name: 'PA Sprint 1',
              code: 'SP-PA-1',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2025-11-16',
              endDate: '2025-11-30',
              capacity: 80,
              committed: 78,
              completed: 78,
              status: 'DONE',
            },
            {
              id: 'sprint-pa-2',
              name: 'PA Sprint 2',
              code: 'SP-PA-2',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2025-12-01',
              endDate: '2025-12-15',
              capacity: 80,
              committed: 80,
              completed: 80,
              status: 'DONE',
            },
            {
              id: 'sprint-pa-3',
              name: 'PA Sprint 1 (座舱)',
              code: 'SP-PA-CABIN-1',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2025-11-16',
              endDate: '2025-11-30',
              capacity: 70,
              committed: 68,
              completed: 68,
              status: 'DONE',
            },
            {
              id: 'sprint-pa-4',
              name: 'PA Sprint 2 (座舱)',
              code: 'SP-PA-CABIN-2',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2025-12-01',
              endDate: '2025-12-15',
              capacity: 70,
              committed: 70,
              completed: 70,
              status: 'DONE',
            },
          ],
          maturity: 100,
          completion: 100,
        },
        // 7. VP - 验证样车/样车确认 (最复杂，包含VP1/VP2/VP3子阶段)
        {
          id: 'vn-vp',
          projectId: 'proj-dreamcar-adas',
          code: 'VP',
          name: 'VP',
          fullName: 'VP - 验证样车/样车确认',
          description: '样车验证阶段，包含VP1/VP2/VP3三个子阶段，周期长，Gateway最多',
          phase: 'DEVELOPMENT',
          sequence: 7,
          startDate: '2025-12-16',
          targetDate: '2026-03-31',
          status: 'IN_PROGRESS',
          gateways: [
            {
              id: 'gw-swrs',
              vehicleNodeId: 'vn-vp',
              code: 'SWRS',
              name: 'SWRS释放 - 软件需求规格书释放',
              date: '2026-01-15',
              criteria: 'SWRS文档完成并评审通过',
              status: 'PASSED',
              importance: 'HIGH',
            },
            {
              id: 'gw-sdb',
              vehicleNodeId: 'vn-vp',
              code: 'SDB',
              name: 'SDB释放 - 系统设计基线释放',
              date: '2026-02-01',
              criteria: 'SDB文档完成并评审通过',
              status: 'PASSED',
              importance: 'HIGH',
            },
            {
              id: 'gw-req-freeze',
              vehicleNodeId: 'vn-vp',
              code: 'REQ_FREEZE',
              name: '功能需求变更锁定',
              date: '2026-02-28',
              criteria: '需求冻结，不再接受新需求',
              status: 'PENDING',
              importance: 'HIGH',
            },
            {
              id: 'gw-mrd-crb',
              vehicleNodeId: 'vn-vp',
              code: 'MRD_CRB',
              name: 'MRD-CRB - 模块需求文档变更评审委员会',
              date: '2026-03-15',
              criteria: '所有MRD评审完成',
              status: 'PENDING',
              importance: 'MEDIUM',
            },
          ],
          subPhases: [
            {
              id: 'vp1',
              vehicleNodeId: 'vn-vp',
              code: 'VP1',
              name: 'VP1 - 初步样车验证',
              targetDate: '2026-01-15',
              status: 'DONE',
              gateways: [
                {
                  id: 'gw-vp1',
                  vpSubPhaseId: 'vp1',
                  code: 'VP1_GATE',
                  name: 'VP1门禁 - 初步样车验证',
                  date: '2026-01-15',
                  criteria: '初步样车验证通过，功能完成度≥60%',
                  status: 'PASSED',
                  importance: 'HIGH',
                },
              ],
            },
            {
              id: 'vp2',
              vehicleNodeId: 'vn-vp',
              code: 'VP2',
              name: 'VP2 - 中期样车验证',
              targetDate: '2026-02-28',
              status: 'IN_PROGRESS',
              gateways: [
                {
                  id: 'gw-vp2',
                  vpSubPhaseId: 'vp2',
                  code: 'VP2_GATE',
                  name: 'VP2门禁 - 中期样车验证',
                  date: '2026-02-28',
                  criteria: '中期样车验证通过，功能完成度≥80%',
                  status: 'PENDING',
                  importance: 'HIGH',
                },
              ],
            },
            {
              id: 'vp3',
              vehicleNodeId: 'vn-vp',
              code: 'VP3',
              name: 'VP3 - 最终样车验证',
              targetDate: '2026-03-31',
              status: 'PLANNING',
              gateways: [
                {
                  id: 'gw-vp3',
                  vpSubPhaseId: 'vp3',
                  code: 'VP3_GATE',
                  name: 'VP3门禁 - 最终样车验证',
                  date: '2026-03-31',
                  criteria: '最终样车验证通过，功能完成度≥95%',
                  status: 'PENDING',
                  importance: 'HIGH',
                },
              ],
            },
          ],
          productVersions: [
            {
              id: 'pv-vp-noa',
              baselineId: 'vn-vp',
              productVersionId: 'pv-noa-1.0',
              productName: '城市NOA',
              version: 'V1.0',
              targetDate: '2026-03-31',
              status: 'IN_PROGRESS',
              completion: 70,
              estimatedHours: 20000,
              sprints: ['sprint-vp-1', 'sprint-vp-2', 'sprint-vp-3', 'sprint-vp-4', 'sprint-vp-5', 'sprint-vp-6'],
            },
            {
              id: 'pv-vp-cabin',
              baselineId: 'vn-vp',
              productVersionId: 'pv-cabin-1.0',
              productName: '智能座舱',
              version: 'V1.0',
              targetDate: '2026-03-31',
              status: 'IN_PROGRESS',
              completion: 75,
              estimatedHours: 18000,
              sprints: ['sprint-vp-7', 'sprint-vp-8', 'sprint-vp-9', 'sprint-vp-10'],
            },
            {
              id: 'pv-vp-ee',
              baselineId: 'vn-vp',
              productVersionId: 'pv-ee-1.0',
              productName: '电子电器架构',
              version: 'E4',
              targetDate: '2026-03-31',
              status: 'IN_PROGRESS',
              completion: 65,
              estimatedHours: 15000,
              sprints: ['sprint-vp-11', 'sprint-vp-12'],
            },
          ],
          sprints: [
            // NOA团队 Sprints
            {
              id: 'sprint-vp-1',
              name: 'VP Sprint 1 (NOA)',
              code: 'SP-VP-NOA-1',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2025-12-16',
              endDate: '2025-12-31',
              capacity: 100,
              committed: 95,
              completed: 95,
              status: 'DONE',
            },
            {
              id: 'sprint-vp-2',
              name: 'VP Sprint 2 (NOA)',
              code: 'SP-VP-NOA-2',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-01-01',
              endDate: '2026-01-15',
              capacity: 100,
              committed: 98,
              completed: 98,
              status: 'DONE',
            },
            {
              id: 'sprint-vp-3',
              name: 'VP Sprint 3 (NOA)',
              code: 'SP-VP-NOA-3',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-01-16',
              endDate: '2026-01-31',
              capacity: 100,
              committed: 100,
              completed: 100,
              status: 'DONE',
            },
            {
              id: 'sprint-vp-4',
              name: 'VP Sprint 4 (NOA)',
              code: 'SP-VP-NOA-4',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-02-01',
              endDate: '2026-02-28',
              capacity: 120,
              committed: 118,
              completed: 90,
              status: 'IN_PROGRESS',
            },
            {
              id: 'sprint-vp-5',
              name: 'VP Sprint 5 (NOA)',
              code: 'SP-VP-NOA-5',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-03-01',
              endDate: '2026-03-15',
              capacity: 100,
              committed: 100,
              completed: 0,
              status: 'PLANNING',
            },
            {
              id: 'sprint-vp-6',
              name: 'VP Sprint 6 (NOA)',
              code: 'SP-VP-NOA-6',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-03-16',
              endDate: '2026-03-31',
              capacity: 100,
              committed: 100,
              completed: 0,
              status: 'PLANNING',
            },
            // 座舱团队 Sprints
            {
              id: 'sprint-vp-7',
              name: 'VP Sprint 1 (座舱)',
              code: 'SP-VP-CABIN-1',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2025-12-16',
              endDate: '2026-01-15',
              capacity: 150,
              committed: 145,
              completed: 145,
              status: 'DONE',
            },
            {
              id: 'sprint-vp-8',
              name: 'VP Sprint 2 (座舱)',
              code: 'SP-VP-CABIN-2',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2026-01-16',
              endDate: '2026-02-15',
              capacity: 150,
              committed: 150,
              completed: 150,
              status: 'DONE',
            },
            {
              id: 'sprint-vp-9',
              name: 'VP Sprint 3 (座舱)',
              code: 'SP-VP-CABIN-3',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2026-02-16',
              endDate: '2026-03-15',
              capacity: 150,
              committed: 148,
              completed: 100,
              status: 'IN_PROGRESS',
            },
            {
              id: 'sprint-vp-10',
              name: 'VP Sprint 4 (座舱)',
              code: 'SP-VP-CABIN-4',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2026-03-16',
              endDate: '2026-03-31',
              capacity: 150,
              committed: 150,
              completed: 0,
              status: 'PLANNING',
            },
            // 电子电器团队 Sprints
            {
              id: 'sprint-vp-11',
              name: 'VP Sprint 1 (EE)',
              code: 'SP-VP-EE-1',
              teamId: 't-ee',
              teamName: 'EE架构团队',
              startDate: '2025-12-16',
              endDate: '2026-02-15',
              capacity: 200,
              committed: 195,
              completed: 195,
              status: 'DONE',
            },
            {
              id: 'sprint-vp-12',
              name: 'VP Sprint 2 (EE)',
              code: 'SP-VP-EE-2',
              teamId: 't-ee',
              teamName: 'EE架构团队',
              startDate: '2026-02-16',
              endDate: '2026-03-31',
              capacity: 200,
              committed: 200,
              completed: 80,
              status: 'IN_PROGRESS',
            },
          ],
          maturity: 85,
          completion: 70,
        },
        // 8. LR - 投产准备
        {
          id: 'vn-lr',
          projectId: 'proj-dreamcar-adas',
          code: 'LR',
          name: 'LR',
          fullName: 'LR - 投产准备',
          description: '生产线准备，工装测试，供应链准备',
          phase: 'PRODUCTION',
          sequence: 8,
          startDate: '2026-04-01',
          targetDate: '2026-04-30',
          status: 'PLANNING',
          gateways: [
            {
              id: 'gw-1pp',
              vehicleNodeId: 'vn-lr',
              code: '1PP',
              name: '1PP - 投产就绪 (First Pre-Production)',
              date: '2026-04-15',
              criteria: '生产线就绪，工装测试通过',
              status: 'PENDING',
              importance: 'HIGH',
            },
            {
              id: 'gw-tt',
              vehicleNodeId: 'vn-lr',
              code: 'TT',
              name: 'TT - 工装测试 (Tooling Trial)',
              date: '2026-04-30',
              criteria: '工装测试完成，质量验证通过',
              status: 'PENDING',
              importance: 'MEDIUM',
            },
          ],
          productVersions: [
            {
              id: 'pv-lr-noa',
              baselineId: 'vn-lr',
              productVersionId: 'pv-noa-1.5',
              productName: '城市NOA',
              version: 'V1.5',
              targetDate: '2026-04-30',
              status: 'PLANNING',
              completion: 0,
              estimatedHours: 8000,
              sprints: ['sprint-lr-1', 'sprint-lr-2'],
            },
            {
              id: 'pv-lr-cabin',
              baselineId: 'vn-lr',
              productVersionId: 'pv-cabin-1.5',
              productName: '智能座舱',
              version: 'V1.5',
              targetDate: '2026-04-30',
              status: 'PLANNING',
              completion: 0,
              estimatedHours: 6000,
              sprints: ['sprint-lr-3'],
            },
          ],
          sprints: [
            {
              id: 'sprint-lr-1',
              name: 'LR Sprint 1',
              code: 'SP-LR-1',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-04-01',
              endDate: '2026-04-15',
              capacity: 80,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
            {
              id: 'sprint-lr-2',
              name: 'LR Sprint 2',
              code: 'SP-LR-2',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-04-16',
              endDate: '2026-04-30',
              capacity: 80,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
            {
              id: 'sprint-lr-3',
              name: 'LR Sprint 1 (座舱)',
              code: 'SP-LR-CABIN-1',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2026-04-01',
              endDate: '2026-04-30',
              capacity: 120,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
          ],
          maturity: 50,
          completion: 0,
        },
        // 9. LS - 投产验收
        {
          id: 'vn-ls',
          projectId: 'proj-dreamcar-adas',
          code: 'LS',
          name: 'LS',
          fullName: 'LS - 投产验收',
          description: '投产验收检查，试生产执行，质量确认',
          phase: 'PRODUCTION',
          sequence: 9,
          startDate: '2026-05-01',
          targetDate: '2026-05-31',
          status: 'PLANNING',
          gateways: [
            {
              id: 'gw-2pp',
              vehicleNodeId: 'vn-ls',
              code: '2PP',
              name: '2PP/SOP - 投产签收 (Second Pre-Production)',
              date: '2026-05-20',
              criteria: '试生产完成，质量达标',
              status: 'PENDING',
              importance: 'HIGH',
            },
            {
              id: 'gw-pp',
              vehicleNodeId: 'vn-ls',
              code: 'PP',
              name: 'PP - 试生产 (Pilot Production)',
              date: '2026-05-31',
              criteria: '试生产验证通过',
              status: 'PENDING',
              importance: 'MEDIUM',
            },
          ],
          productVersions: [
            {
              id: 'pv-ls-noa',
              baselineId: 'vn-ls',
              productVersionId: 'pv-noa-2.0',
              productName: '城市NOA',
              version: 'V2.0',
              targetDate: '2026-05-31',
              status: 'PLANNING',
              completion: 0,
              estimatedHours: 5000,
              sprints: ['sprint-ls-1', 'sprint-ls-2'],
            },
            {
              id: 'pv-ls-cabin',
              baselineId: 'vn-ls',
              productVersionId: 'pv-cabin-2.0',
              productName: '智能座舱',
              version: 'V2.0',
              targetDate: '2026-05-31',
              status: 'PLANNING',
              completion: 0,
              estimatedHours: 4000,
              sprints: ['sprint-ls-3'],
            },
          ],
          sprints: [
            {
              id: 'sprint-ls-1',
              name: 'LS Sprint 1',
              code: 'SP-LS-1',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-05-01',
              endDate: '2026-05-15',
              capacity: 60,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
            {
              id: 'sprint-ls-2',
              name: 'LS Sprint 2',
              code: 'SP-LS-2',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-05-16',
              endDate: '2026-05-31',
              capacity: 60,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
            {
              id: 'sprint-ls-3',
              name: 'LS Sprint 1 (座舱)',
              code: 'SP-LS-CABIN-1',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2026-05-01',
              endDate: '2026-05-31',
              capacity: 100,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
          ],
          maturity: 40,
          completion: 0,
        },
        // 10. J1 - 量产准备
        {
          id: 'vn-j1',
          projectId: 'proj-dreamcar-adas',
          code: 'J1',
          name: 'J1',
          fullName: 'J1 - 量产准备',
          description: '正式量产启动，批量生产开始，质量持续监控',
          phase: 'PRODUCTION',
          sequence: 10,
          startDate: '2026-06-01',
          targetDate: '2026-06-30',
          status: 'PLANNING',
          gateways: [
            {
              id: 'gw-sop',
              vehicleNodeId: 'vn-j1',
              code: 'SOP',
              name: 'SOP - 批量生产启动 (Start Of Production)',
              date: '2026-06-30',
              criteria: '所有质量门禁通过，量产条件满足，正式交付客户',
              status: 'PENDING',
              importance: 'HIGH',
            },
          ],
          productVersions: [
            {
              id: 'pv-j1-noa',
              baselineId: 'vn-j1',
              productVersionId: 'pv-noa-2.5',
              productName: '城市NOA',
              version: 'V2.5 (量产版本)',
              targetDate: '2026-06-30',
              status: 'PLANNING',
              completion: 0,
              estimatedHours: 3000,
              sprints: ['sprint-j1-1', 'sprint-j1-2'],
            },
            {
              id: 'pv-j1-cabin',
              baselineId: 'vn-j1',
              productVersionId: 'pv-cabin-2.5',
              productName: '智能座舱',
              version: 'V2.5 (量产版本)',
              targetDate: '2026-06-30',
              status: 'PLANNING',
              completion: 0,
              estimatedHours: 2500,
              sprints: ['sprint-j1-3'],
            },
          ],
          sprints: [
            {
              id: 'sprint-j1-1',
              name: 'J1 Sprint 1',
              code: 'SP-J1-1',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-06-01',
              endDate: '2026-06-15',
              capacity: 50,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
            {
              id: 'sprint-j1-2',
              name: 'J1 Sprint 2',
              code: 'SP-J1-2',
              teamId: 't-noa',
              teamName: 'NOA团队',
              startDate: '2026-06-16',
              endDate: '2026-06-30',
              capacity: 50,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
            {
              id: 'sprint-j1-3',
              name: 'J1 Sprint 1 (座舱)',
              code: 'SP-J1-CABIN-1',
              teamId: 't-cabin',
              teamName: '座舱团队',
              startDate: '2026-06-01',
              endDate: '2026-06-30',
              capacity: 80,
              committed: 0,
              completed: 0,
              status: 'PLANNING',
            },
          ],
          maturity: 30,
          completion: 0,
        },
        // 11. OKTB - 销售批准
        {
          id: 'vn-oktb',
          projectId: 'proj-dreamcar-adas',
          code: 'OKTB',
          name: 'OKTB',
          fullName: 'OKTB - 销售批准',
          description: '产品最终验证，销售授权，市场准备',
          phase: 'LAUNCH',
          sequence: 11,
          startDate: '2026-07-01',
          targetDate: '2026-07-31',
          status: 'PLANNING',
          gateways: [],
          productVersions: [],
          sprints: [],
          maturity: 20,
          completion: 0,
        },
        // 12. FSR - 最终状态报告/项目关闭
        {
          id: 'vn-fsr',
          projectId: 'proj-dreamcar-adas',
          code: 'FSR',
          name: 'FSR',
          fullName: 'FSR - 项目关闭',
          description: '项目总结，经验教训，项目归档',
          phase: 'CLOSED',
          sequence: 12,
          startDate: '2026-08-01',
          targetDate: '2026-08-31',
          status: 'PLANNING',
          gateways: [],
          productVersions: [],
          sprints: [],
          maturity: 0,
          completion: 0,
        },
      ],
    },
  ]
}

export const mockProjectTreeData = generateProjectTreeData()
