/**
 * Mock数据服务
 * 生成完整的领域模型实例数据
 */

import type {
  ProductLine, Product, ProductVersion, Feature, Module,
  Epic, FeatureRequirement, ModuleRequirement, SSTS,
  DomainProject, Baseline, Milestone, ProductVersionPlan, ModuleVersionPlan,
  PI, Sprint, WorkItem,
  Asset, AssetUsage,
  FeatureProcessStatus
} from '../types/domain'

class MockDataService {
  /**
   * 生成产品树完整数据
   */
  generateProductTree(): ProductLine[] {
    return [
      {
        id: 'pl-adas',
        name: '智能驾驶产品线',
        code: 'ADAS',
        type: 'ADAS',
        description: '自动驾驶相关产品',
        products: [
          {
            id: 'p-noa',
            productLineId: 'pl-adas',
            name: '城市NOA',
            code: 'NOA',
            description: 'Navigation on Autopilot城市导航辅助驾驶',
            owner: '张三（VPM）',
            status: 'IN_PROGRESS',
            versions: [
              {
                id: 'pv-noa-1.0',
                productId: 'p-noa',
                version: 'V1.0',
                status: 'RELEASED',
                releaseDate: '2025-12-30',
              },
              {
                id: 'pv-noa-1.1',
                productId: 'p-noa',
                version: 'V1.1',
                baselineId: 'bl-sop',
                status: 'IN_PROGRESS',
                releaseDate: '2026-03-31',
              },
              {
                id: 'pv-noa-2.0',
                productId: 'p-noa',
                version: 'V2.0',
                status: 'PLANNING',
                releaseDate: '2026-06-30',
              },
            ],
            features: this.generateFeatures('p-noa'),
          },
          {
            id: 'p-apa',
            productLineId: 'pl-adas',
            name: '自动泊车',
            code: 'APA',
            description: 'Automated Parking Assist自动泊车辅助',
            owner: '李四（VPM）',
            status: 'IN_PROGRESS',
            versions: [
              {
                id: 'pv-apa-1.0',
                productId: 'p-apa',
                version: 'V1.0',
                status: 'IN_PROGRESS',
                releaseDate: '2026-02-28',
              },
            ],
            features: this.generateFeaturesForAPA(),
          },
        ],
      },
    ]
  }

  /**
   * 生成Feature数据（城市NOA）
   */
  private generateFeatures(productId: string): Feature[] {
    return [
      {
        id: 'f-lka',
        productId: productId,
        productVersionId: 'pv-noa-1.1',
        name: 'LKA车道保持',
        code: 'ADAS-F-LKA',
        description: 'Lane Keeping Assist车道保持辅助功能',
        epicId: 'epic-l2plus',
        status: 'IN_PROGRESS',
        maturity: 85,
        maturityPrd: 100, // PRD已完成
        maturityReview: true, // 评审已通过
        maturitySsts: 70, // SSTS拆解度70% ⚠️
        completion: 60,
        isFrozen: false,
        processStage: 'S2',
        processStatus: {
          s2: {
            featureCreated: true,
            prdWritten: true,
            prdApproved: true,
            sstsDecomposed: false, // ⚠️ 需要完成
          },
          s3: {
            architectureDesigned: false,
            interfaceDesigned: false,
          },
          s6: {
            mrDeveloping: true,
            mrCompleted: 2,
            mrTotal: 5,
          },
          s7: {
            tested: false,
            defectResolved: false,
          },
        },
        owner: '王五（PO）',
        participants: ['张三', '李四'],
        modules: [
          {
            id: 'm-lka-perception',
            featureId: 'f-lka',
            name: 'LKA感知模块',
            code: 'LKA-PERCEPTION',
            ownerTeamId: 'team-a',
            description: '车道线检测和识别',
          },
          {
            id: 'm-lka-planning',
            featureId: 'f-lka',
            name: 'LKA规划模块',
            code: 'LKA-PLANNING',
            ownerTeamId: 'team-a',
            description: '路径规划',
          },
          {
            id: 'm-lka-control',
            featureId: 'f-lka',
            name: 'LKA控制模块',
            code: 'LKA-CONTROL',
            ownerTeamId: 'team-a',
            description: '车辆控制执行',
          },
        ],
        createdAt: '2026-01-01',
        updatedAt: '2026-01-22',
        createdBy: '王五',
      },
      {
        id: 'f-acc',
        productId: productId,
        productVersionId: 'pv-noa-1.1',
        name: 'ACC自适应巡航',
        code: 'ADAS-F-ACC',
        description: 'Adaptive Cruise Control自适应巡航控制',
        epicId: 'epic-l2plus',
        status: 'IN_PROGRESS',
        maturity: 92,
        maturityPrd: 100,
        maturityReview: true,
        maturitySsts: 95, // ✅ 已完成拆解
        completion: 75,
        isFrozen: false,
        processStage: 'S6',
        processStatus: {
          s2: {
            featureCreated: true,
            prdWritten: true,
            prdApproved: true,
            sstsDecomposed: true, // ✅ 已完成
          },
          s3: {
            architectureDesigned: true,
            interfaceDesigned: true,
          },
          s6: {
            mrDeveloping: true,
            mrCompleted: 4,
            mrTotal: 5,
          },
          s7: {
            tested: true,
            defectResolved: false,
          },
        },
        owner: '王五（PO）',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-22',
      },
      {
        id: 'f-aeb',
        productId: productId,
        productVersionId: 'pv-noa-1.1',
        name: 'AEB自动紧急制动',
        code: 'ADAS-F-AEB',
        description: 'Automatic Emergency Braking自动紧急制动',
        epicId: 'epic-l2plus',
        status: 'IN_PROGRESS',
        maturity: 88,
        maturityPrd: 100,
        maturityReview: true,
        maturitySsts: 80,
        completion: 50,
        isFrozen: false,
        processStage: 'S3',
        processStatus: {
          s2: {
            featureCreated: true,
            prdWritten: true,
            prdApproved: true,
            sstsDecomposed: true,
          },
          s3: {
            architectureDesigned: true,
            interfaceDesigned: false, // ⚠️ 待完成
          },
          s6: {
            mrDeveloping: false,
            mrCompleted: 0,
            mrTotal: 3,
          },
          s7: {
            tested: false,
            defectResolved: false,
          },
        },
        owner: '王五（PO）',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-22',
      },
      {
        id: 'f-noa-core',
        productId: productId,
        productVersionId: 'pv-noa-1.1',
        name: '城市NOA核心功能',
        code: 'ADAS-F-NOA-CORE',
        description: '城市道路导航辅助核心功能',
        epicId: 'epic-noa',
        status: 'PLANNING',
        maturity: 65,
        maturityPrd: 80,
        maturityReview: false, // ⚠️ 评审未通过
        maturitySsts: 40, // ⚠️ 拆解不足
        completion: 20,
        isFrozen: false,
        processStage: 'S2',
        processStatus: {
          s2: {
            featureCreated: true,
            prdWritten: true,
            prdApproved: false, // ⚠️ 评审未通过
            sstsDecomposed: false,
          },
          s3: {
            architectureDesigned: false,
            interfaceDesigned: false,
          },
          s6: {
            mrDeveloping: false,
            mrCompleted: 0,
            mrTotal: 0,
          },
          s7: {
            tested: false,
            defectResolved: false,
          },
        },
        owner: '王五（PO）',
        createdAt: '2026-01-10',
        updatedAt: '2026-01-22',
      },
      {
        id: 'f-lane-change',
        productId: productId,
        productVersionId: 'pv-noa-1.1',
        name: '自动变道',
        code: 'ADAS-F-LANE-CHANGE',
        description: '智能变道辅助功能',
        epicId: 'epic-noa',
        status: 'PLANNING',
        maturity: 45,
        maturityPrd: 60,
        maturityReview: false,
        maturitySsts: 30,
        completion: 10,
        isFrozen: false,
        processStage: 'S2',
        processStatus: {
          s2: {
            featureCreated: true,
            prdWritten: true,
            prdApproved: false,
            sstsDecomposed: false,
          },
          s3: {
            architectureDesigned: false,
            interfaceDesigned: false,
          },
          s6: {
            mrDeveloping: false,
            mrCompleted: 0,
            mrTotal: 0,
          },
          s7: {
            tested: false,
            defectResolved: false,
          },
        },
        owner: '王五（PO）',
        createdAt: '2026-01-15',
        updatedAt: '2026-01-22',
      },
    ]
  }

  /**
   * 生成自动泊车Feature
   */
  private generateFeaturesForAPA(): Feature[] {
    return [
      {
        id: 'f-apa-park',
        productId: 'p-apa',
        productVersionId: 'pv-apa-1.0',
        name: 'APA自动泊车',
        code: 'ADAS-F-APA',
        description: '自动寻找车位并泊车',
        status: 'IN_PROGRESS',
        maturity: 90,
        maturityPrd: 100,
        maturityReview: true,
        maturitySsts: 95,
        completion: 80,
        isFrozen: false,
        processStage: 'S6',
        processStatus: {
          s2: {
            featureCreated: true,
            prdWritten: true,
            prdApproved: true,
            sstsDecomposed: true,
          },
          s3: {
            architectureDesigned: true,
            interfaceDesigned: true,
          },
          s6: {
            mrDeveloping: true,
            mrCompleted: 8,
            mrTotal: 10,
          },
          s7: {
            tested: true,
            defectResolved: true,
          },
        },
        owner: '赵六（PO）',
        createdAt: '2025-12-01',
        updatedAt: '2026-01-22',
      },
    ]
  }

  /**
   * 生成需求树数据
   */
  generateRequirementTree(): Epic[] {
    return [
      {
        id: 'epic-l2plus',
        productId: 'p-noa',
        fipId: 'fip-2026-001',
        name: 'L2+自动驾驶',
        description: 'L2级别增强自动驾驶功能',
        ownerId: 'user-po-1',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: '2025-12-01',
        featureRequirements: [
          {
            id: 'fr-lka-001',
            epicId: 'epic-l2plus',
            featureId: 'f-lka',
            name: 'FR-LKA-001: 直线道路车道保持',
            description: '在直线道路上保持车辆在车道中央行驶',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            maturity: 85,
            maturityPrd: 100,
            maturityReview: true,
            maturitySsts: 80,
            completion: 60,
            isFrozen: false,
            moduleRequirements: [
              {
                id: 'mr-lka-001',
                featureRequirementId: 'fr-lka-001',
                moduleId: 'm-lka-perception',
                name: 'MR-LKA-001: 车道线检测',
                description: '检测和识别车道线',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ownerTeamId: 'team-a',
                ssts: [
                  {
                    id: 'ssts-lka-001',
                    moduleRequirementId: 'mr-lka-001',
                    name: 'SSTS-LKA-001: 直线车道线检测',
                    description: '在直线道路上检测车道线',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '检测准确率≥95%',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                    assets: [
                      {
                        id: 'au-001',
                        assetId: 'asset-lane-detection',
                        assetName: '车道线检测算法',
                        assetVersion: 'V2.0',
                        sstsId: 'ssts-lka-001',
                        usageType: 'REUSE',
                        reuseRate: 85,
                        notes: '复用现有算法，微调参数',
                      },
                    ],
                    testCases: [
                      {
                        id: 'tc-lka-001',
                        sstsId: 'ssts-lka-001',
                        name: 'TC-LKA-001: 直线车道检测测试',
                        type: 'UNIT',
                        status: 'PASSED',
                        priority: 'HIGH',
                      },
                    ],
                  },
                  {
                    id: 'ssts-lka-002',
                    moduleRequirementId: 'mr-lka-001',
                    name: 'SSTS-LKA-002: 弯道车道线检测',
                    description: '在弯道上检测车道线',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '检测准确率≥90%',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
                workItems: [
                  {
                    id: 'wi-lka-001',
                    moduleRequirementId: 'mr-lka-001',
                    sstsId: 'ssts-lka-001',
                    name: 'WI-LKA-001: 实现车道线检测算法',
                    type: 'TASK',
                    description: '实现基于CNN的车道线检测算法',
                    assignee: '张三（DEV）',
                    storyPoints: 5,
                    status: 'DONE',
                    workLogs: [
                      {
                        id: 'wl-001',
                        workItemId: 'wi-lka-001',
                        userId: 'user-dev-1',
                        hours: 8,
                        date: '2026-01-16',
                        description: '初始实现',
                      },
                      {
                        id: 'wl-002',
                        workItemId: 'wi-lka-001',
                        userId: 'user-dev-1',
                        hours: 4,
                        date: '2026-01-17',
                        description: 'Bug修复',
                      },
                    ],
                    codeCommits: [
                      {
                        id: 'commit-001',
                        workItemId: 'wi-lka-001',
                        commitId: 'abc123',
                        message: 'feat: 实现车道线检测算法',
                        author: '张三',
                        timestamp: '2026-01-16T10:30:00Z',
                      },
                    ],
                  },
                  {
                    id: 'wi-lka-002',
                    moduleRequirementId: 'mr-lka-001',
                    sstsId: 'ssts-lka-001',
                    name: 'WI-LKA-002: 单元测试',
                    type: 'TASK',
                    description: '编写单元测试',
                    assignee: '李四（DEV）',
                    storyPoints: 3,
                    status: 'IN_PROGRESS',
                  },
                ],
              },
              {
                id: 'mr-lka-002',
                featureRequirementId: 'fr-lka-001',
                moduleId: 'm-lka-planning',
                name: 'MR-LKA-002: 路径规划',
                description: '规划车辆在车道内的行驶路径',
                type: 'FUNCTIONAL',
                status: 'PLANNING',
                ownerTeamId: 'team-a',
                ssts: [
                  {
                    id: 'ssts-lka-003',
                    moduleRequirementId: 'mr-lka-002',
                    name: 'SSTS-LKA-003: 路径规划算法（待补充）',
                    description: '待补充详细描述',
                    type: 'FUNCTIONAL',
                    architectureDesigned: false,
                    interfaceDesigned: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'fr-lka-002',
            epicId: 'epic-l2plus',
            featureId: 'f-lka',
            name: 'FR-LKA-002: 弯道车道保持（待分解）',
            description: '在弯道上保持车辆在车道中央行驶',
            priority: 'HIGH',
            status: 'DRAFT',
            maturity: 40,
            maturityPrd: 60,
            maturityReview: false,
            maturitySsts: 0,
            completion: 0,
            isFrozen: false,
          },
        ],
      },
      {
        id: 'epic-noa',
        productId: 'p-noa',
        fipId: 'fip-2026-002',
        name: '城市NOA',
        description: '城市道路导航辅助驾驶功能',
        ownerId: 'user-po-1',
        priority: 'HIGH',
        status: 'PLANNING',
        createdAt: '2026-01-10',
      },
    ]
  }

  /**
   * 生成项目计划树数据
   */
  generateProjectPlanTree(): DomainProject[] {
    return [
      {
        id: 'proj-dreamcar-adas',
        name: '岚图梦想家 ADAS项目',
        code: 'DREAMCAR-ADAS',
        description: '岚图梦想家车型的智能驾驶系统项目',
        domain: 'ADAS',
        startDate: '2025-12-01',
        endDate: '2026-06-30',
        status: 'IN_PROGRESS',
        baselines: [
          {
            id: 'bl-sop',
            projectId: 'proj-dreamcar-adas',
            name: 'SOP基线计划',
            code: 'BL-SOP-2026',
            targetDate: '2026-06-30',
            status: 'INITIAL_FROZEN',
            maturity: 82,
            completion: 55,
            milestones: [
              {
                id: 'ms-sop',
                baselineId: 'bl-sop',
                name: 'SOP节点',
                type: 'SOP',
                targetDate: '2026-06-30',
                status: 'PLANNING',
              },
              {
                id: 'ms-pv',
                baselineId: 'bl-sop',
                name: 'PV节点',
                type: 'PV',
                targetDate: '2026-05-01',
                status: 'PLANNING',
              },
              {
                id: 'ms-dv',
                baselineId: 'bl-sop',
                name: 'DV节点',
                type: 'DV',
                targetDate: '2026-03-01',
                status: 'PLANNING',
              },
            ],
            productVersions: [
              {
                id: 'pvp-noa-1.1',
                baselineId: 'bl-sop',
                productVersionId: 'pv-noa-1.1',
                productName: '城市NOA',
                version: 'V1.1',
                targetDate: '2026-03-31',
                status: 'IN_PROGRESS',
                sprints: ['sprint-3', 'sprint-4', 'sprint-5', 'sprint-6', 'sprint-7'],
              },
              {
                id: 'pvp-apa-1.0',
                baselineId: 'bl-sop',
                productVersionId: 'pv-apa-1.0',
                productName: '自动泊车',
                version: 'V1.0',
                targetDate: '2026-02-28',
                status: 'IN_PROGRESS',
                sprints: ['sprint-1', 'sprint-2', 'sprint-3'],
              },
            ],
            moduleVersions: [
              {
                id: 'mvp-lka',
                productVersionPlanId: 'pvp-noa-1.1',
                moduleId: 'm-lka-perception',
                moduleName: 'LKA模块',
                version: 'V1.1',
                teamId: 'team-a',
                teamName: '团队A',
                sprints: this.generateSprintsForTeamA(),
              },
              {
                id: 'mvp-acc',
                productVersionPlanId: 'pvp-noa-1.1',
                moduleId: 'm-acc',
                moduleName: 'ACC模块',
                version: 'V1.1',
                teamId: 'team-b',
                teamName: '团队B',
              },
              {
                id: 'mvp-aeb',
                productVersionPlanId: 'pvp-noa-1.1',
                moduleId: 'm-aeb',
                moduleName: 'AEB模块',
                version: 'V1.1',
                teamId: 'team-c',
                teamName: '团队C',
              },
            ],
          },
        ],
        pis: [
          {
            id: 'pi-2026-q1',
            projectId: 'proj-dreamcar-adas',
            name: 'PI 2026-Q1',
            code: 'PI-2026-Q1',
            startDate: '2026-01-01',
            endDate: '2026-03-31',
            status: 'IN_PROGRESS',
          },
          {
            id: 'pi-2026-q2',
            projectId: 'proj-dreamcar-adas',
            name: 'PI 2026-Q2',
            code: 'PI-2026-Q2',
            startDate: '2026-04-01',
            endDate: '2026-06-30',
            status: 'PLANNING',
          },
        ],
      },
    ]
  }

  /**
   * 生成团队A的Sprint数据
   */
  private generateSprintsForTeamA(): Sprint[] {
    return [
      {
        id: 'sprint-1',
        piId: 'pi-2026-q1',
        name: 'Sprint 1',
        code: 'S1-2026',
        teamId: 'team-a',
        teamName: '团队A',
        startDate: '2026-01-01',
        endDate: '2026-01-14',
        capacity: 40,
        committed: 35,
        completed: 35,
        status: 'DONE',
      },
      {
        id: 'sprint-2',
        piId: 'pi-2026-q1',
        name: 'Sprint 2',
        code: 'S2-2026',
        teamId: 'team-a',
        teamName: '团队A',
        startDate: '2026-01-15',
        endDate: '2026-01-28',
        capacity: 40,
        committed: 32,
        completed: 32,
        status: 'DONE',
      },
      {
        id: 'sprint-3',
        piId: 'pi-2026-q1',
        name: 'Sprint 3',
        code: 'S3-2026',
        teamId: 'team-a',
        teamName: '团队A',
        startDate: '2026-01-15',
        endDate: '2026-01-29',
        capacity: 40,
        committed: 30,
        completed: 23,
        status: 'IN_PROGRESS',
        workItems: [
          {
            id: 'wi-lka-001',
            sprintId: 'sprint-3',
            name: 'WI-LKA-001: 实现车道线检测算法',
            type: 'TASK',
            description: '实现基于CNN的车道线检测算法',
            assignee: '张三（DEV）',
            storyPoints: 5,
            status: 'DONE',
          },
          {
            id: 'wi-lka-002',
            sprintId: 'sprint-3',
            name: 'WI-LKA-002: 单元测试',
            type: 'TASK',
            description: '编写单元测试',
            assignee: '李四（DEV）',
            storyPoints: 3,
            status: 'IN_PROGRESS',
          },
          {
            id: 'wi-lka-003',
            sprintId: 'sprint-3',
            name: 'WI-LKA-003: 代码评审',
            type: 'TASK',
            description: '代码评审和优化',
            assignee: '王五（DL）',
            storyPoints: 2,
            status: 'CODE_REVIEW',
          },
          {
            id: 'wi-lka-004',
            sprintId: 'sprint-3',
            name: 'WI-LKA-004: 集成测试',
            type: 'TASK',
            description: '集成测试',
            storyPoints: 5,
            status: 'TODO',
          },
        ],
      },
      {
        id: 'sprint-4',
        piId: 'pi-2026-q1',
        name: 'Sprint 4',
        code: 'S4-2026',
        teamId: 'team-a',
        teamName: '团队A',
        startDate: '2026-01-30',
        endDate: '2026-02-13',
        capacity: 40,
        committed: 0,
        completed: 0,
        status: 'PLANNING',
      },
      {
        id: 'sprint-5',
        piId: 'pi-2026-q1',
        name: 'Sprint 5',
        code: 'S5-2026',
        teamId: 'team-a',
        teamName: '团队A',
        startDate: '2026-02-14',
        endDate: '2026-02-28',
        capacity: 40,
        committed: 0,
        completed: 0,
        status: 'PLANNING',
      },
    ]
  }

  /**
   * 获取角色权限配置
   */
  getRolePermissions() {
    return {
      VPM: {
        visibleTrees: ['ProductTree', 'ProjectPlanTree'],
        visibleLevels: {
          ProductTree: ['ProductLine', 'Product', 'ProductVersion'],
          ProjectPlanTree: ['DomainProject', 'Baseline', 'Product_Version'],
        },
        canCreate: ['ProductLine', 'Product', 'ProductVersion', 'Baseline', 'PI'],
        canEdit: ['ProductLine', 'Product', 'ProductVersion', 'Baseline'],
        canDelete: [],
        canApprove: ['Baseline', 'ProductVersion'],
      },
      PO: {
        visibleTrees: ['ProductTree', 'RequirementTree'],
        visibleLevels: {
          ProductTree: ['Product', 'ProductVersion', 'Feature'],
          RequirementTree: ['Epic', 'FeatureRequirement'],
        },
        canCreate: ['Epic', 'Feature', 'FeatureRequirement'],
        canEdit: ['Epic', 'Feature', 'FeatureRequirement'],
        canDelete: ['Epic', 'Feature'],
        canApprove: ['Epic', 'Feature'],
        canReview: ['SSTS'],
      },
      SE: {
        visibleTrees: ['RequirementTree', 'ProductTree'],
        visibleLevels: {
          RequirementTree: ['Feature', 'FeatureRequirement', 'SSTS', 'ModuleRequirement'],
          ProductTree: ['Feature', 'Module'],
        },
        canCreate: ['SSTS', 'ModuleRequirement'],
        canEdit: ['SSTS', 'ModuleRequirement'],
        canDelete: ['SSTS'],
        canApprove: ['SSTS'],
      },
      SO: {
        visibleTrees: ['ProjectPlanTree', 'RequirementTree'],
        visibleLevels: {
          ProjectPlanTree: ['Sprint', 'Module_Version'],
          RequirementTree: ['ModuleRequirement', 'WorkItem'],
        },
        canCreate: ['Sprint', 'WorkItem'],
        canEdit: ['Sprint', 'WorkItem'],
        canDelete: ['WorkItem'],
      },
      DEV: {
        visibleTrees: ['ProjectPlanTree', 'RequirementTree'],
        visibleLevels: {
          ProjectPlanTree: ['Sprint'],
          RequirementTree: ['WorkItem'],
        },
        canCreate: ['WorkItem', 'CodeCommit', 'WorkLog'],
        canEdit: ['WorkItem'],
        canDelete: [],
      },
    }
  }
}

export default new MockDataService()
