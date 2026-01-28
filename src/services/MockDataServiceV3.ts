/**
 * Mock数据服务 V3
 * 修复：
 * 1. 产品树添加模块版本层级
 * 2. 需求树遵循三层模型（Epic → FR（包含SSTS） → MR在详情中）
 * 3. 扩充智能驾驶领域数据
 */

import type {
  ProductLine, Product, ProductVersion, Feature, Module,
  Epic, FeatureRequirement, SSTS,
  DomainProject, Baseline, Sprint
} from '../types/domain'

// 新增：模块版本类型
export interface ModuleVersion {
  id: string
  productVersionId: string
  moduleId: string
  moduleName: string
  version: string
  teamId: string
  teamName: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE'
  features?: Feature[]
}

class MockDataServiceV3 {
  /**
   * 生成产品树完整数据（新增模块版本层级）
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
          // 产品1：城市NOA
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
          },
          // 产品2：自动泊车
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
          },
          // 产品3：高速NOA
          {
            id: 'p-hnoa',
            productLineId: 'pl-adas',
            name: '高速NOA',
            code: 'HNOA',
            description: 'Highway Navigation on Autopilot高速导航辅助驾驶',
            owner: '王五（VPM）',
            status: 'IN_PROGRESS',
            versions: [
              {
                id: 'pv-hnoa-1.0',
                productId: 'p-hnoa',
                version: 'V1.0',
                status: 'RELEASED',
                releaseDate: '2025-09-30',
              },
              {
                id: 'pv-hnoa-2.0',
                productId: 'p-hnoa',
                version: 'V2.0',
                status: 'IN_PROGRESS',
                releaseDate: '2026-05-31',
              },
            ],
          },
        ],
      },
    ]
  }

  /**
   * 生成模块版本数据（新增）
   */
  generateModuleVersions(productVersionId: string): ModuleVersion[] {
    const moduleVersionsMap: Record<string, ModuleVersion[]> = {
      'pv-noa-1.1': [
        {
          id: 'mv-noa-1.1-perception',
          productVersionId: 'pv-noa-1.1',
          moduleId: 'm-perception',
          moduleName: '感知模块',
          version: 'V1.1',
          teamId: 'team-perception',
          teamName: '感知团队',
          status: 'IN_PROGRESS',
        },
        {
          id: 'mv-noa-1.1-planning',
          productVersionId: 'pv-noa-1.1',
          moduleId: 'm-planning',
          moduleName: '规划模块',
          version: 'V1.1',
          teamId: 'team-planning',
          teamName: '规划团队',
          status: 'IN_PROGRESS',
        },
        {
          id: 'mv-noa-1.1-control',
          productVersionId: 'pv-noa-1.1',
          moduleId: 'm-control',
          moduleName: '控制模块',
          version: 'V1.1',
          teamId: 'team-control',
          teamName: '控制团队',
          status: 'IN_PROGRESS',
        },
        {
          id: 'mv-noa-1.1-map',
          productVersionId: 'pv-noa-1.1',
          moduleId: 'm-map',
          moduleName: '地图定位模块',
          version: 'V1.1',
          teamId: 'team-map',
          teamName: '地图团队',
          status: 'PLANNING',
        },
      ],
      'pv-apa-1.0': [
        {
          id: 'mv-apa-1.0-vision',
          productVersionId: 'pv-apa-1.0',
          moduleId: 'm-apa-vision',
          moduleName: 'APA视觉模块',
          version: 'V1.0',
          teamId: 'team-perception',
          teamName: '感知团队',
          status: 'IN_PROGRESS',
        },
        {
          id: 'mv-apa-1.0-ultrasonic',
          productVersionId: 'pv-apa-1.0',
          moduleId: 'm-apa-ultrasonic',
          moduleName: 'APA超声波模块',
          version: 'V1.0',
          teamId: 'team-perception',
          teamName: '感知团队',
          status: 'IN_PROGRESS',
        },
        {
          id: 'mv-apa-1.0-planning',
          productVersionId: 'pv-apa-1.0',
          moduleId: 'm-apa-planning',
          moduleName: 'APA规划模块',
          version: 'V1.0',
          teamId: 'team-planning',
          teamName: '规划团队',
          status: 'IN_PROGRESS',
        },
      ],
      'pv-hnoa-2.0': [
        {
          id: 'mv-hnoa-2.0-perception',
          productVersionId: 'pv-hnoa-2.0',
          moduleId: 'm-perception',
          moduleName: '感知模块',
          version: 'V2.0',
          teamId: 'team-perception',
          teamName: '感知团队',
          status: 'IN_PROGRESS',
        },
        {
          id: 'mv-hnoa-2.0-planning',
          productVersionId: 'pv-hnoa-2.0',
          moduleId: 'm-planning',
          moduleName: '规划模块',
          version: 'V2.0',
          teamId: 'team-planning',
          teamName: '规划团队',
          status: 'IN_PROGRESS',
        },
      ],
    }

    return moduleVersionsMap[productVersionId] || []
  }

  /**
   * 生成Feature数据（扩充）
   */
  generateFeatures(productId: string, productVersionId: string): Feature[] {
    const featuresMap: Record<string, Feature[]> = {
      'p-noa_pv-noa-1.1': [
        {
          id: 'f-lka',
          productId: 'p-noa',
          productVersionId: 'pv-noa-1.1',
          name: 'LKA车道保持',
          code: 'ADAS-F-LKA',
          description: 'Lane Keeping Assist车道保持辅助功能',
          epicId: 'epic-l2plus',
          status: 'IN_PROGRESS',
          maturity: 85,
          maturityPrd: 100,
          maturityReview: true,
          maturitySsts: 70,
          completion: 60,
          isFrozen: false,
          processStage: 'S2',
          processStatus: {
            s2: { featureCreated: true, prdWritten: true, prdApproved: true, sstsDecomposed: false },
            s3: { architectureDesigned: false, interfaceDesigned: false },
            s6: { mrDeveloping: true, mrCompleted: 2, mrTotal: 5 },
            s7: { tested: false, defectResolved: false },
          },
          owner: '王五（PO）',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-22',
        },
        {
          id: 'f-acc',
          productId: 'p-noa',
          productVersionId: 'pv-noa-1.1',
          name: 'ACC自适应巡航',
          code: 'ADAS-F-ACC',
          description: 'Adaptive Cruise Control自适应巡航控制',
          epicId: 'epic-l2plus',
          status: 'IN_PROGRESS',
          maturity: 92,
          maturityPrd: 100,
          maturityReview: true,
          maturitySsts: 95,
          completion: 75,
          isFrozen: false,
          processStage: 'S6',
          processStatus: {
            s2: { featureCreated: true, prdWritten: true, prdApproved: true, sstsDecomposed: true },
            s3: { architectureDesigned: true, interfaceDesigned: true },
            s6: { mrDeveloping: true, mrCompleted: 4, mrTotal: 5 },
            s7: { tested: true, defectResolved: false },
          },
          owner: '王五（PO）',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-22',
        },
        {
          id: 'f-aeb',
          productId: 'p-noa',
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
            s2: { featureCreated: true, prdWritten: true, prdApproved: true, sstsDecomposed: true },
            s3: { architectureDesigned: true, interfaceDesigned: false },
            s6: { mrDeveloping: false, mrCompleted: 0, mrTotal: 3 },
            s7: { tested: false, defectResolved: false },
          },
          owner: '王五（PO）',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-22',
        },
        {
          id: 'f-lane-change',
          productId: 'p-noa',
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
            s2: { featureCreated: true, prdWritten: true, prdApproved: false, sstsDecomposed: false },
            s3: { architectureDesigned: false, interfaceDesigned: false },
            s6: { mrDeveloping: false, mrCompleted: 0, mrTotal: 0 },
            s7: { tested: false, defectResolved: false },
          },
          owner: '王五（PO）',
          createdAt: '2026-01-15',
          updatedAt: '2026-01-22',
        },
      ],
      'p-apa_pv-apa-1.0': [
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
            s2: { featureCreated: true, prdWritten: true, prdApproved: true, sstsDecomposed: true },
            s3: { architectureDesigned: true, interfaceDesigned: true },
            s6: { mrDeveloping: true, mrCompleted: 8, mrTotal: 10 },
            s7: { tested: true, defectResolved: true },
          },
          owner: '赵六（PO）',
          createdAt: '2025-12-01',
          updatedAt: '2026-01-22',
        },
        {
          id: 'f-apa-remote',
          productId: 'p-apa',
          productVersionId: 'pv-apa-1.0',
          name: 'APA遥控泊车',
          code: 'ADAS-F-APA-REMOTE',
          description: '通过手机遥控车辆泊车',
          status: 'IN_PROGRESS',
          maturity: 75,
          maturityPrd: 100,
          maturityReview: true,
          maturitySsts: 85,
          completion: 50,
          isFrozen: false,
          processStage: 'S6',
          processStatus: {
            s2: { featureCreated: true, prdWritten: true, prdApproved: true, sstsDecomposed: true },
            s3: { architectureDesigned: true, interfaceDesigned: true },
            s6: { mrDeveloping: true, mrCompleted: 3, mrTotal: 6 },
            s7: { tested: false, defectResolved: false },
          },
          owner: '赵六（PO）',
          createdAt: '2025-12-15',
          updatedAt: '2026-01-22',
        },
      ],
      'p-hnoa_pv-hnoa-2.0': [
        {
          id: 'f-hnoa-cruise',
          productId: 'p-hnoa',
          productVersionId: 'pv-hnoa-2.0',
          name: '高速巡航',
          code: 'ADAS-F-HNOA-CRUISE',
          description: '高速公路自动巡航功能',
          status: 'IN_PROGRESS',
          maturity: 88,
          maturityPrd: 100,
          maturityReview: true,
          maturitySsts: 90,
          completion: 70,
          isFrozen: false,
          processStage: 'S6',
          processStatus: {
            s2: { featureCreated: true, prdWritten: true, prdApproved: true, sstsDecomposed: true },
            s3: { architectureDesigned: true, interfaceDesigned: true },
            s6: { mrDeveloping: true, mrCompleted: 5, mrTotal: 7 },
            s7: { tested: true, defectResolved: false },
          },
          owner: '孙七（PO）',
          createdAt: '2025-10-01',
          updatedAt: '2026-01-22',
        },
        {
          id: 'f-hnoa-overtake',
          productId: 'p-hnoa',
          productVersionId: 'pv-hnoa-2.0',
          name: '自动超车',
          code: 'ADAS-F-HNOA-OVERTAKE',
          description: '高速公路自动超车功能',
          status: 'PLANNING',
          maturity: 50,
          maturityPrd: 70,
          maturityReview: false,
          maturitySsts: 40,
          completion: 15,
          isFrozen: false,
          processStage: 'S2',
          processStatus: {
            s2: { featureCreated: true, prdWritten: true, prdApproved: false, sstsDecomposed: false },
            s3: { architectureDesigned: false, interfaceDesigned: false },
            s6: { mrDeveloping: false, mrCompleted: 0, mrTotal: 0 },
            s7: { tested: false, defectResolved: false },
          },
          owner: '孙七（PO）',
          createdAt: '2025-11-01',
          updatedAt: '2026-01-22',
        },
      ],
    }

    const key = `${productId}_${productVersionId}`
    return featuresMap[key] || []
  }

  /**
   * 生成需求树数据（重构为三层模型）
   * Epic → Feature Requirement（包含SSTS列表）
   * MR不在树中，在详情中体现
   */
  generateRequirementTree(): Epic[] {
    return [
      {
        id: 'epic-l2plus',
        productId: 'p-noa',
        fipId: 'FIP-2026-001',
        name: 'Epic: L2+自动驾驶',
        description: 'L2级别增强自动驾驶功能',
        ownerId: 'user-po-1',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: '2025-12-01',
        featureRequirements: [
          // FR-1: LKA车道保持
          {
            id: 'fr-lka-001',
            epicId: 'epic-l2plus',
            featureId: 'f-lka',
            name: 'FR-LKA-001: 车道保持功能需求',
            description: '车辆在车道中央保持行驶，支持直线和弯道',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            maturity: 85,
            maturityPrd: 100,
            maturityReview: true,
            maturitySsts: 80,
            completion: 60,
            isFrozen: false,
            // SSTS列表（在树中作为子节点）
            moduleRequirements: [
              {
                id: 'ssts-lka-001',
                featureRequirementId: 'fr-lka-001',
                name: 'SSTS-LKA-001: 直线车道保持',
                description: '在直线道路上保持车辆在车道中央行驶',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ssts: [
                  {
                    id: 'ssts-lka-001-detail',
                    moduleRequirementId: 'ssts-lka-001',
                    name: 'SSTS-LKA-001: 直线车道保持',
                    description: '检测直线车道线并控制车辆居中行驶',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '车道线检测准确率≥95%，横向偏移≤0.1m',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
              },
              {
                id: 'ssts-lka-002',
                featureRequirementId: 'fr-lka-001',
                name: 'SSTS-LKA-002: 弯道车道保持',
                description: '在弯道上保持车辆在车道中央行驶',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ssts: [
                  {
                    id: 'ssts-lka-002-detail',
                    moduleRequirementId: 'ssts-lka-002',
                    name: 'SSTS-LKA-002: 弯道车道保持',
                    description: '检测弯道车道线并控制车辆沿弯道居中行驶',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '弯道半径≥200m，横向偏移≤0.15m',
                    architectureDesigned: true,
                    interfaceDesigned: false,
                  },
                ],
              },
              {
                id: 'ssts-lka-003',
                featureRequirementId: 'fr-lka-001',
                name: 'SSTS-LKA-003: 车道偏离预警',
                description: '车辆偏离车道时发出预警',
                type: 'FUNCTIONAL',
                status: 'PLANNING',
                ssts: [
                  {
                    id: 'ssts-lka-003-detail',
                    moduleRequirementId: 'ssts-lka-003',
                    name: 'SSTS-LKA-003: 车道偏离预警',
                    description: '检测车辆偏离并发出视觉和听觉预警',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '预警响应时间≤200ms',
                    architectureDesigned: false,
                    interfaceDesigned: false,
                  },
                ],
              },
            ],
          },
          // FR-2: ACC自适应巡航
          {
            id: 'fr-acc-001',
            epicId: 'epic-l2plus',
            featureId: 'f-acc',
            name: 'FR-ACC-001: 自适应巡航功能需求',
            description: '根据前车速度自动调整车速，保持安全距离',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            maturity: 92,
            maturityPrd: 100,
            maturityReview: true,
            maturitySsts: 95,
            completion: 75,
            isFrozen: false,
            moduleRequirements: [
              {
                id: 'ssts-acc-001',
                featureRequirementId: 'fr-acc-001',
                name: 'SSTS-ACC-001: 前车跟随',
                description: '检测前车并保持安全跟车距离',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ssts: [
                  {
                    id: 'ssts-acc-001-detail',
                    moduleRequirementId: 'ssts-acc-001',
                    name: 'SSTS-ACC-001: 前车跟随',
                    description: '雷达检测前车并控制车速保持2s跟车时距',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '跟车距离误差≤0.5m',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
              },
              {
                id: 'ssts-acc-002',
                featureRequirementId: 'fr-acc-001',
                name: 'SSTS-ACC-002: 速度调节',
                description: '平滑调节车速，避免急加速和急减速',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ssts: [
                  {
                    id: 'ssts-acc-002-detail',
                    moduleRequirementId: 'ssts-acc-002',
                    name: 'SSTS-ACC-002: 速度调节',
                    description: '平滑调节纵向加速度',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '加速度≤2m/s², 减速度≤3m/s²',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
              },
            ],
          },
          // FR-3: AEB自动紧急制动
          {
            id: 'fr-aeb-001',
            epicId: 'epic-l2plus',
            featureId: 'f-aeb',
            name: 'FR-AEB-001: 自动紧急制动功能需求',
            description: '检测碰撞风险并自动制动',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            maturity: 88,
            maturityPrd: 100,
            maturityReview: true,
            maturitySsts: 80,
            completion: 50,
            isFrozen: false,
            moduleRequirements: [
              {
                id: 'ssts-aeb-001',
                featureRequirementId: 'fr-aeb-001',
                name: 'SSTS-AEB-001: 碰撞检测',
                description: '检测前方障碍物和碰撞风险',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ssts: [
                  {
                    id: 'ssts-aeb-001-detail',
                    moduleRequirementId: 'ssts-aeb-001',
                    name: 'SSTS-AEB-001: 碰撞检测',
                    description: '多传感器融合检测前方障碍物',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: 'TTC<1.5s时触发预警',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
              },
              {
                id: 'ssts-aeb-002',
                featureRequirementId: 'fr-aeb-001',
                name: 'SSTS-AEB-002: 紧急制动',
                description: '执行紧急制动避免碰撞',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ssts: [
                  {
                    id: 'ssts-aeb-002-detail',
                    moduleRequirementId: 'ssts-aeb-002',
                    name: 'SSTS-AEB-002: 紧急制动',
                    description: '最大制动减速度控制',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '制动响应时间≤300ms',
                    architectureDesigned: true,
                    interfaceDesigned: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      // Epic-2: 城市NOA
      {
        id: 'epic-noa',
        productId: 'p-noa',
        fipId: 'FIP-2026-002',
        name: 'Epic: 城市NOA',
        description: '城市道路导航辅助驾驶功能',
        ownerId: 'user-po-1',
        priority: 'HIGH',
        status: 'PLANNING',
        createdAt: '2026-01-10',
        featureRequirements: [
          {
            id: 'fr-lane-change-001',
            epicId: 'epic-noa',
            featureId: 'f-lane-change',
            name: 'FR-LANE-CHANGE-001: 自动变道功能需求',
            description: '根据导航信息自动变道',
            priority: 'HIGH',
            status: 'PLANNING',
            maturity: 45,
            maturityPrd: 60,
            maturityReview: false,
            maturitySsts: 30,
            completion: 10,
            isFrozen: false,
            moduleRequirements: [
              {
                id: 'ssts-lane-change-001',
                featureRequirementId: 'fr-lane-change-001',
                name: 'SSTS-LANE-CHANGE-001: 变道决策（待补充）',
                description: '待补充详细描述',
                type: 'FUNCTIONAL',
                status: 'DRAFT',
                ssts: [
                  {
                    id: 'ssts-lane-change-001-detail',
                    moduleRequirementId: 'ssts-lane-change-001',
                    name: 'SSTS-LANE-CHANGE-001: 变道决策',
                    description: '待补充',
                    type: 'FUNCTIONAL',
                    architectureDesigned: false,
                    interfaceDesigned: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      // Epic-3: APA自动泊车
      {
        id: 'epic-apa',
        productId: 'p-apa',
        fipId: 'FIP-2025-003',
        name: 'Epic: APA自动泊车',
        description: '自动泊车辅助功能',
        ownerId: 'user-po-2',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: '2025-12-01',
        featureRequirements: [
          {
            id: 'fr-apa-park-001',
            epicId: 'epic-apa',
            featureId: 'f-apa-park',
            name: 'FR-APA-001: 垂直泊车功能需求',
            description: '自动完成垂直车位泊车',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            maturity: 90,
            maturityPrd: 100,
            maturityReview: true,
            maturitySsts: 95,
            completion: 80,
            isFrozen: false,
            moduleRequirements: [
              {
                id: 'ssts-apa-001',
                featureRequirementId: 'fr-apa-park-001',
                name: 'SSTS-APA-001: 车位识别',
                description: '识别垂直车位并判断是否可停',
                type: 'FUNCTIONAL',
                status: 'DONE',
                ssts: [
                  {
                    id: 'ssts-apa-001-detail',
                    moduleRequirementId: 'ssts-apa-001',
                    name: 'SSTS-APA-001: 车位识别',
                    description: '超声波+视觉融合识别垂直车位',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '车位识别准确率≥95%',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
              },
              {
                id: 'ssts-apa-002',
                featureRequirementId: 'fr-apa-park-001',
                name: 'SSTS-APA-002: 泊车轨迹规划',
                description: '规划最优泊车轨迹',
                type: 'FUNCTIONAL',
                status: 'DONE',
                ssts: [
                  {
                    id: 'ssts-apa-002-detail',
                    moduleRequirementId: 'ssts-apa-002',
                    name: 'SSTS-APA-002: 泊车轨迹规划',
                    description: '多段式泊车轨迹规划',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '泊车成功率≥98%',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      // Epic-4: 高速NOA
      {
        id: 'epic-hnoa',
        productId: 'p-hnoa',
        fipId: 'FIP-2025-004',
        name: 'Epic: 高速NOA',
        description: '高速公路导航辅助驾驶',
        ownerId: 'user-po-3',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: '2025-10-01',
        featureRequirements: [
          {
            id: 'fr-hnoa-cruise-001',
            epicId: 'epic-hnoa',
            featureId: 'f-hnoa-cruise',
            name: 'FR-HNOA-CRUISE-001: 高速巡航功能需求',
            description: '高速公路自动巡航',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            maturity: 88,
            maturityPrd: 100,
            maturityReview: true,
            maturitySsts: 90,
            completion: 70,
            isFrozen: false,
            moduleRequirements: [
              {
                id: 'ssts-hnoa-001',
                featureRequirementId: 'fr-hnoa-cruise-001',
                name: 'SSTS-HNOA-001: 高速车道保持',
                description: '高速公路车道保持',
                type: 'FUNCTIONAL',
                status: 'IN_PROGRESS',
                ssts: [
                  {
                    id: 'ssts-hnoa-001-detail',
                    moduleRequirementId: 'ssts-hnoa-001',
                    name: 'SSTS-HNOA-001: 高速车道保持',
                    description: '高速场景下的车道保持功能',
                    type: 'FUNCTIONAL',
                    acceptanceCriteria: '横向偏移≤0.08m',
                    architectureDesigned: true,
                    interfaceDesigned: true,
                  },
                ],
              },
            ],
          },
        ],
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
        baselines: [],
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
          ProductTree: ['ProductLine', 'Product', 'ProductVersion', 'ModuleVersion'],
          ProjectPlanTree: ['DomainProject', 'Baseline', 'Product_Version'],
        },
        canCreate: ['ProductLine', 'Product', 'ProductVersion', 'ModuleVersion', 'Baseline', 'PI'],
        canEdit: ['ProductLine', 'Product', 'ProductVersion', 'ModuleVersion', 'Baseline'],
        canDelete: [],
        canApprove: ['Baseline', 'ProductVersion'],
      },
      PO: {
        visibleTrees: ['ProductTree', 'RequirementTree'],
        visibleLevels: {
          ProductTree: ['Product', 'ProductVersion', 'Feature', 'ModuleVersion'],
          RequirementTree: ['Epic', 'FeatureRequirement', 'SSTS'],
        },
        canCreate: ['Epic', 'Feature', 'FeatureRequirement', 'SSTS'],
        canEdit: ['Epic', 'Feature', 'FeatureRequirement', 'SSTS'],
        canDelete: ['Epic', 'Feature'],
        canApprove: ['Epic', 'Feature'],
        canReview: ['SSTS'],
      },
    }
  }
}

export default new MockDataServiceV3()
export { MockDataServiceV3, type ModuleVersion }
