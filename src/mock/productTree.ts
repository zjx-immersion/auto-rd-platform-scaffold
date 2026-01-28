/**
 * 产品树Mock数据
 * 用于C3规划协调页面的产品多团队迭代树
 * 从auto-rd-platform-web迁移并构建独立数据
 */

export interface FeatureVersion {
  id: string
  featureId: string
  version: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE' | 'RELEASED'
  targetDate: string
  moduleVersions?: ModuleVersion[]
}

export interface ModuleVersion {
  id: string
  featureVersionId: string
  moduleId: string
  moduleName: string
  version: string
  teamId: string
  teamName: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE'
}

export interface Feature {
  id: string
  productId: string
  name: string
  code: string
  description: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'DONE' | 'RELEASED'
  maturity: number // 0-100
  completion: number // 0-100
  isFrozen: boolean
  processStage: string
  owner: string
  featureVersions?: FeatureVersion[]
}

export interface ProductVersion {
  id: string
  productId: string
  version: string
  releaseDate: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'RELEASED'
  baselineId?: string
  features?: Feature[]
}

export interface Product {
  id: string
  productLineId: string
  name: string
  code: string
  description: string
  owner: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'RELEASED'
  versions?: ProductVersion[]
}

export interface ProductLine {
  id: string
  name: string
  code: string
  description: string
  products?: Product[]
}

/**
 * 生成产品树数据（用于规划协调）
 * 结构：产品线 → 产品 → 产品版本 → Feature → Feature版本 → 模块版本
 */
export function generateProductTreeData(): ProductLine[] {
  return [
    {
      id: 'pl-adas',
      name: '智能驾驶产品线',
      code: 'ADAS',
      description: '涵盖L2-L4级别的智能驾驶产品',
      products: [
        // 产品1：城市NOA
        {
          id: 'p-noa',
          productLineId: 'pl-adas',
          name: '城市NOA',
          code: 'NOA-CITY',
          description: '城市道路导航辅助驾驶',
          owner: '王五（VPM）',
          status: 'IN_PROGRESS',
          versions: [
            // 版本1.0（已发布）
            {
              id: 'pv-noa-1.0',
              productId: 'p-noa',
              version: 'V1.0',
              releaseDate: '2025-12-01',
              status: 'RELEASED',
              baselineId: 'bl-sop-2025',
              features: [
                {
                  id: 'feat-lka',
                  productId: 'p-noa',
                  name: 'LKA车道保持',
                  code: 'FEAT-LKA',
                  description: '车道保持辅助功能',
                  status: 'DONE',
                  maturity: 100,
                  completion: 100,
                  isFrozen: true,
                  processStage: 'S9',
                  owner: '张三（PO）',
                  featureVersions: [
                    {
                      id: 'fv-lka-1.0',
                      featureId: 'feat-lka',
                      version: 'V1.0',
                      status: 'RELEASED',
                      targetDate: '2025-12-01',
                      moduleVersions: [
                        {
                          id: 'mv-lka-perception-1.0',
                          featureVersionId: 'fv-lka-1.0',
                          moduleId: 'm-perception',
                          moduleName: '感知模块',
                          version: 'V1.0',
                          teamId: 'team-perception',
                          teamName: '感知团队',
                          status: 'DONE',
                        },
                        {
                          id: 'mv-lka-control-1.0',
                          featureVersionId: 'fv-lka-1.0',
                          moduleId: 'm-control',
                          moduleName: '控制模块',
                          version: 'V1.0',
                          teamId: 'team-control',
                          teamName: '控制团队',
                          status: 'DONE',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            // 版本1.1（进行中）
            {
              id: 'pv-noa-1.1',
              productId: 'p-noa',
              version: 'V1.1',
              releaseDate: '2026-06-30',
              status: 'IN_PROGRESS',
              baselineId: 'bl-sop-2026',
              features: [
                {
                  id: 'feat-lka-v1.1',
                  productId: 'p-noa',
                  name: 'LKA车道保持',
                  code: 'FEAT-LKA',
                  description: '增强版车道保持',
                  status: 'IN_PROGRESS',
                  maturity: 85,
                  completion: 60,
                  isFrozen: false,
                  processStage: 'S6',
                  owner: '张三（PO）',
                  featureVersions: [
                    {
                      id: 'fv-lka-1.1',
                      featureId: 'feat-lka-v1.1',
                      version: 'V1.1',
                      status: 'IN_PROGRESS',
                      targetDate: '2026-06-30',
                      moduleVersions: [
                        {
                          id: 'mv-lka-perception-1.1',
                          featureVersionId: 'fv-lka-1.1',
                          moduleId: 'm-perception',
                          moduleName: '感知模块',
                          version: 'V1.1',
                          teamId: 'team-perception',
                          teamName: '感知团队',
                          status: 'IN_PROGRESS',
                        },
                        {
                          id: 'mv-lka-control-1.1',
                          featureVersionId: 'fv-lka-1.1',
                          moduleId: 'm-control',
                          moduleName: '控制模块',
                          version: 'V1.1',
                          teamId: 'team-control',
                          teamName: '控制团队',
                          status: 'IN_PROGRESS',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'feat-acc',
                  productId: 'p-noa',
                  name: 'ACC自适应巡航',
                  code: 'FEAT-ACC',
                  description: '自适应巡航控制',
                  status: 'IN_PROGRESS',
                  maturity: 92,
                  completion: 75,
                  isFrozen: false,
                  processStage: 'S7',
                  owner: '李四（PO）',
                  featureVersions: [
                    {
                      id: 'fv-acc-1.1',
                      featureId: 'feat-acc',
                      version: 'V1.1',
                      status: 'IN_PROGRESS',
                      targetDate: '2026-06-30',
                      moduleVersions: [
                        {
                          id: 'mv-acc-perception-1.1',
                          featureVersionId: 'fv-acc-1.1',
                          moduleId: 'm-perception',
                          moduleName: '感知模块',
                          version: 'V1.1',
                          teamId: 'team-perception',
                          teamName: '感知团队',
                          status: 'IN_PROGRESS',
                        },
                        {
                          id: 'mv-acc-planning-1.1',
                          featureVersionId: 'fv-acc-1.1',
                          moduleId: 'm-planning',
                          moduleName: '规划模块',
                          version: 'V1.1',
                          teamId: 'team-planning',
                          teamName: '规划团队',
                          status: 'IN_PROGRESS',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'feat-aeb',
                  productId: 'p-noa',
                  name: 'AEB自动紧急制动',
                  code: 'FEAT-AEB',
                  description: '自动紧急制动系统',
                  status: 'IN_PROGRESS',
                  maturity: 88,
                  completion: 50,
                  isFrozen: false,
                  processStage: 'S6',
                  owner: '王五（PO）',
                  featureVersions: [
                    {
                      id: 'fv-aeb-1.1',
                      featureId: 'feat-aeb',
                      version: 'V1.1',
                      status: 'IN_PROGRESS',
                      targetDate: '2026-06-30',
                      moduleVersions: [
                        {
                          id: 'mv-aeb-perception-1.1',
                          featureVersionId: 'fv-aeb-1.1',
                          moduleId: 'm-perception',
                          moduleName: '感知模块',
                          version: 'V1.1',
                          teamId: 'team-perception',
                          teamName: '感知团队',
                          status: 'IN_PROGRESS',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 产品2：自动泊车
        {
          id: 'p-apa',
          productLineId: 'pl-adas',
          name: '自动泊车',
          code: 'APA',
          description: '自动泊车辅助系统',
          owner: '赵六（VPM）',
          status: 'IN_PROGRESS',
          versions: [
            {
              id: 'pv-apa-1.0',
              productId: 'p-apa',
              version: 'V1.0',
              releaseDate: '2026-03-31',
              status: 'IN_PROGRESS',
              baselineId: 'bl-apa-2026',
              features: [
                {
                  id: 'feat-apa-park',
                  productId: 'p-apa',
                  name: 'APA自动泊车',
                  code: 'FEAT-APA-PARK',
                  description: '垂直泊车功能',
                  status: 'IN_PROGRESS',
                  maturity: 90,
                  completion: 80,
                  isFrozen: false,
                  processStage: 'S7',
                  owner: '孙七（PO）',
                  featureVersions: [
                    {
                      id: 'fv-apa-1.0',
                      featureId: 'feat-apa-park',
                      version: 'V1.0',
                      status: 'IN_PROGRESS',
                      targetDate: '2026-03-31',
                      moduleVersions: [
                        {
                          id: 'mv-apa-perception-1.0',
                          featureVersionId: 'fv-apa-1.0',
                          moduleId: 'm-perception',
                          moduleName: '感知模块（APA）',
                          version: 'V1.0',
                          teamId: 'team-perception',
                          teamName: '感知团队',
                          status: 'IN_PROGRESS',
                        },
                        {
                          id: 'mv-apa-planning-1.0',
                          featureVersionId: 'fv-apa-1.0',
                          moduleId: 'm-planning',
                          moduleName: '规划模块（APA）',
                          version: 'V1.0',
                          teamId: 'team-planning',
                          teamName: '规划团队',
                          status: 'IN_PROGRESS',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 产品3：高速NOA
        {
          id: 'p-hnoa',
          productLineId: 'pl-adas',
          name: '高速NOA',
          code: 'NOA-HIGHWAY',
          description: '高速公路导航辅助驾驶',
          owner: '周八（VPM）',
          status: 'IN_PROGRESS',
          versions: [
            {
              id: 'pv-hnoa-2.0',
              productId: 'p-hnoa',
              version: 'V2.0',
              releaseDate: '2026-09-30',
              status: 'IN_PROGRESS',
              baselineId: 'bl-hnoa-2026',
              features: [
                {
                  id: 'feat-hnoa-cruise',
                  productId: 'p-hnoa',
                  name: '高速巡航',
                  code: 'FEAT-HNOA-CRUISE',
                  description: '高速公路自动巡航',
                  status: 'IN_PROGRESS',
                  maturity: 88,
                  completion: 70,
                  isFrozen: false,
                  processStage: 'S6',
                  owner: '吴九（PO）',
                  featureVersions: [
                    {
                      id: 'fv-hnoa-cruise-2.0',
                      featureId: 'feat-hnoa-cruise',
                      version: 'V2.0',
                      status: 'IN_PROGRESS',
                      targetDate: '2026-09-30',
                      moduleVersions: [
                        {
                          id: 'mv-hnoa-perception-2.0',
                          featureVersionId: 'fv-hnoa-cruise-2.0',
                          moduleId: 'm-perception',
                          moduleName: '感知模块',
                          version: 'V2.0',
                          teamId: 'team-perception',
                          teamName: '感知团队',
                          status: 'IN_PROGRESS',
                        },
                        {
                          id: 'mv-hnoa-planning-2.0',
                          featureVersionId: 'fv-hnoa-cruise-2.0',
                          moduleId: 'm-planning',
                          moduleName: '规划模块',
                          version: 'V2.0',
                          teamId: 'team-planning',
                          teamName: '规划团队',
                          status: 'IN_PROGRESS',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}

export const mockProductTreeData = generateProductTreeData()
