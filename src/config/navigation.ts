/**
 * 整车软件研发端到端协同平台 - 导航配置
 * 三级导航架构：一级（左侧）→ 二级（右侧顶部Tabs）→ 三级（右侧主区左侧）
 * 
 * 从 auto-rd-main-frame/js/navigation.js 迁移到 React + TypeScript
 */

export interface ActionButton {
  text: string
  icon: string
  type: 'primary' | 'default'
  handler: string
}

export interface NavItem {
  id: string
  icon?: string
  text: string
  url?: string
}

export interface NavigationModule {
  title: string
  icon: string
  description: string
  actions?: ActionButton[]
  listTertiaryNav?: NavItem[]
  detailSecondaryNav?: NavItem[]
  detailTertiaryNav?: Record<string, NavItem[]>
}

export type NavigationConfig = Record<string, NavigationModule>

/**
 * 导航配置
 * 从 Main-Frame 的 navigation.js 迁移而来
 */
export const NAVIGATION_CONFIG: NavigationConfig = {
  // 工作台
  workspace: {
    title: '工作台',
    icon: '🏠',
    description: '我的工作台、团队工作台、项目工作台',
    listTertiaryNav: [
      { id: 'my-workspace', icon: '👤', text: '我的工作台' },
      { id: 'team-workspace', icon: '👥', text: '团队工作台' },
      { id: 'project-workspace', icon: '📊', text: '项目工作台' }
    ]
  },

  // C0: 领域项目管理
  c0: {
    title: '项目管理',
    icon: '📊',
    description: '领域项目管理、三级计划体系、基线管理',
    actions: [
      { text: '创建项目', icon: '➕', type: 'primary', handler: 'showCreateDomainProject' },
      { text: '导入', icon: '📥', type: 'default', handler: 'showImport' }
    ],
    listTertiaryNav: [
      { id: 'all', icon: '📁', text: '全部项目' },
      { id: 'my', icon: '👤', text: '我的项目' },
      { id: 'active', icon: '🔄', text: '进行中' },
      { id: 'archived', icon: '📦', text: '已归档' }
    ],
    detailSecondaryNav: [
      { id: 'overview', text: '概览', url: '/c0/:id/overview' },
      { id: 'plan', text: '规划', url: '/c0/:id/plan' },
      { id: 'requirements', text: '需求', url: '/c0/:id/requirements' },
      { id: 'testing', text: '验收', url: '/c0/:id/testing' },
      { id: 'iteration', text: '迭代', url: '/c0/:id/iteration' },
      { id: 'release', text: '发布', url: '/c0/:id/release' }
    ],
    detailTertiaryNav: {
      overview: [],
      plan: [], // 规划Tab不显示三级导航，直接显示项目树
      requirements: [
        { id: 'epics', text: 'Epic列表', url: '/c0/:id/requirements/epics' },
        { id: 'features', text: 'Feature列表', url: '/c0/:id/requirements/features' },
        { id: 'ssts', text: 'SSTS列表', url: '/c0/:id/requirements/ssts' }
      ],
      testing: [],
      iteration: [],
      release: []
    }
  },

  // C1: 产品需求（原需求管理）
  c1: {
    title: '产品需求',
    icon: '📝',
    description: '产品线-产品-Epic-Feature四层产品需求体系',
    actions: [
      { text: '创建Epic', icon: '➕', type: 'primary', handler: 'showCreateEpic' }
    ],
    listTertiaryNav: [
      { id: 'all-lines', icon: '🌐', text: '全部产品线' },
      { id: 'my-lines', icon: '📦', text: '我的产品线' },
      { id: 'my-products', icon: '📱', text: '我的产品' },
      { id: 'my-projects', icon: '📊', text: '我的项目' }
    ],
    detailSecondaryNav: [
      { id: 'overview', text: '概览', url: '/c1/:id/overview' },
      { id: 'req-tree', text: '需求分层树', url: '/c1/:id/req-tree' },
      { id: 'epics', text: 'Epic管理', url: '/c1/:id/epics' },
      { id: 'features', text: 'Feature列表', url: '/c1/:id/features' },
      { id: 'ssts', text: 'SSTS管理', url: '/c1/:id/ssts' },
      { id: 'mrs', text: 'MR管理', url: '/c1/:id/mrs' }
    ],
    detailTertiaryNav: {
      overview: [],
      'req-tree': [], // 需求分层树不需要三级导航
      epics: [
        { id: 'all', text: '全部Epic', url: '/c1/:id/epics/all' },
        { id: 'must', text: 'Must Have', url: '/c1/:id/epics/must' },
        { id: 'should', text: 'Should Have', url: '/c1/:id/epics/should' },
        { id: 'could', text: 'Could Have', url: '/c1/:id/epics/could' }
      ],
      features: [
        { id: 'all', text: '全部Feature', url: '/c1/:id/features/all' },
        { id: 'pending', text: '待开发', url: '/c1/:id/features/pending' },
        { id: 'developing', text: '开发中', url: '/c1/:id/features/developing' },
        { id: 'done', text: '已完成', url: '/c1/:id/features/done' }
      ],
      ssts: [],
      mrs: []
    }
  },

  // C2: 方案设计
  c2: {
    title: '方案设计',
    icon: '🎨',
    description: '架构设计、资产管理、接口设计',
    actions: [
      { text: '创建架构', icon: '➕', type: 'primary', handler: 'showCreateArchitecture' },
      { text: '导入组件', icon: '📥', type: 'default', handler: 'showImportComponent' }
    ],
    listTertiaryNav: [
      { id: 'all', icon: '📁', text: '全部设计' },
      { id: 'architecture', icon: '🏗️', text: '架构设计' },
      { id: 'components', icon: '🧩', text: '组件库' },
      { id: 'interfaces', icon: '🔌', text: '接口设计' }
    ],
    detailSecondaryNav: [
      { id: 'overview', text: '概览', url: '/c2/:id/overview' },
      { id: 'architecture', text: '架构', url: '/c2/:id/architecture' },
      { id: 'components', text: '组件', url: '/c2/:id/components' },
      { id: 'interfaces', text: '接口', url: '/c2/:id/interfaces' },
      { id: 'documents', text: '文档', url: '/c2/:id/documents' }
    ],
    detailTertiaryNav: {
      overview: [],
      architecture: [
        { id: 'system', text: '系统架构', url: '/c2/:id/architecture/system' },
        { id: 'module', text: '模块架构', url: '/c2/:id/architecture/module' },
        { id: 'data', text: '数据架构', url: '/c2/:id/architecture/data' }
      ],
      components: [
        { id: 'all', text: '全部组件', url: '/c2/:id/components/all' },
        { id: 'ui', text: 'UI组件', url: '/c2/:id/components/ui' },
        { id: 'logic', text: '逻辑组件', url: '/c2/:id/components/logic' }
      ],
      interfaces: [
        { id: 'all', text: '全部接口', url: '/c2/:id/interfaces/all' },
        { id: 'api', text: 'API接口', url: '/c2/:id/interfaces/api' },
        { id: 'event', text: '事件接口', url: '/c2/:id/interfaces/event' }
      ],
      documents: []
    }
  },

  // C3: 规划协调
  c3: {
    title: '规划协调',
    icon: '📅',
    description: '迭代规划、团队容量、规划模版',
    actions: [
      { text: '创建迭代规划', icon: '➕', type: 'primary', handler: 'showCreateIterationPlan' },
      { text: '规划模版', icon: '📋', type: 'default', handler: 'showPlanTemplate' }
    ],
    listTertiaryNav: [
      { id: 'all', icon: '📁', text: '全部迭代规划' },
      { id: 'my', icon: '👤', text: '我的迭代规划' },
      { id: 'control-team', icon: '🎯', text: '规控团队' },
      { id: 'e2e-team', icon: '🔗', text: '端到端团队' },
      { id: 'data-platform-team', icon: '📊', text: '数据平台团队' }
    ],
    detailSecondaryNav: [
      { id: 'plan-name', text: '规划名称', url: '/c3/:id/plan-name' },
      { id: 'product-tree', text: '产品树', url: '/c3/:id/product-tree' },
      { id: 'iteration-plan', text: '迭代规划', url: '/c3/:id/iteration-plan' },
      { id: 'team-capacity', text: '团队容量', url: '/c3/:id/team-capacity' },
      { id: 'iteration-progress', text: '迭代进展', url: '/c3/:id/iteration-progress' },
      { id: 'plan-template', text: '规划模版', url: '/c3/:id/plan-template' }
    ],
    detailTertiaryNav: {
      'plan-name': [],
      'iteration-plan': [
        { id: 'all', text: '全部需求', url: '/c3/:id/iteration-plan/all' },
        { id: 'feature', text: 'Feature列表', url: '/c3/:id/iteration-plan/feature' },
        { id: 'story', text: 'Story列表', url: '/c3/:id/iteration-plan/story' },
        { id: 'task', text: '任务列表', url: '/c3/:id/iteration-plan/task' }
      ],
      'team-capacity': [
        { id: 'overview', text: '容量概览', url: '/c3/:id/team-capacity/overview' },
        { id: 'members', text: '成员容量', url: '/c3/:id/team-capacity/members' },
        { id: 'allocation', text: '容量分配', url: '/c3/:id/team-capacity/allocation' }
      ],
      'iteration-progress': [
        { id: 'overview', text: '进展概览', url: '/c3/:id/iteration-progress/overview' },
        { id: 'burndown', text: '燃尽图', url: '/c3/:id/iteration-progress/burndown' },
        { id: 'velocity', text: '速率图', url: '/c3/:id/iteration-progress/velocity' }
      ],
      'plan-template': []
    }
  },

  // C4: 迭代执行
  c4: {
    title: '迭代执行',
    icon: '🔄',
    description: 'Sprint管理、任务看板、敏捷开发',
    actions: [
      { text: '创建用例', icon: '➕', type: 'primary', handler: 'showCreateTestCase' },
      { text: '报告缺陷', icon: '🐛', type: 'default', handler: 'showReportDefect' }
    ],
    listTertiaryNav: [
      { id: 'all', icon: '📁', text: '全部迭代' },
      { id: 'active', icon: '🔄', text: '进行中' },
      { id: 'planning', icon: '📋', text: '规划中' },
      { id: 'completed', icon: '✓', text: '已完成' }
    ],
    detailSecondaryNav: [
      { id: 'overview', text: '概览', url: '/c4/:id/overview' },
      { id: 'testcases', text: '用例', url: '/c4/:id/testcases' },
      { id: 'defects', text: '缺陷', url: '/c4/:id/defects' },
      { id: 'execution', text: '执行', url: '/c4/:id/execution' },
      { id: 'reports', text: '报告', url: '/c4/:id/reports' }
    ],
    detailTertiaryNav: {
      overview: [],
      testcases: [
        { id: 'all', text: '全部用例', url: '/c4/:id/testcases/all' },
        { id: 'functional', text: '功能测试', url: '/c4/:id/testcases/functional' },
        { id: 'performance', text: '性能测试', url: '/c4/:id/testcases/performance' },
        { id: 'security', text: '安全测试', url: '/c4/:id/testcases/security' }
      ],
      defects: [
        { id: 'all', text: '全部缺陷', url: '/c4/:id/defects/all' },
        { id: 'critical', text: '严重', url: '/c4/:id/defects/critical' },
        { id: 'major', text: '主要', url: '/c4/:id/defects/major' },
        { id: 'minor', text: '次要', url: '/c4/:id/defects/minor' }
      ],
      execution: [],
      reports: []
    }
  },

  // C5: 测试验收
  c5: {
    title: '测试验收',
    icon: '🧪',
    description: '测试用例、缺陷管理、测试计划',
    actions: [
      { text: '创建发布', icon: '➕', type: 'primary', handler: 'showCreateRelease' },
      { text: '版本规划', icon: '📋', type: 'default', handler: 'showVersionPlanning' }
    ],
    listTertiaryNav: [
      { id: 'all', icon: '📁', text: '全部测试' },
      { id: 'testcases', icon: '🧪', text: '测试用例' },
      { id: 'defects', icon: '🐛', text: '缺陷管理' },
      { id: 'testplans', icon: '📊', text: '测试计划' }
    ],
    detailSecondaryNav: [
      { id: 'overview', text: '概览', url: '/c5/:id/overview' },
      { id: 'releases', text: '发布', url: '/c5/:id/releases' },
      { id: 'versions', text: '版本', url: '/c5/:id/versions' },
      { id: 'deployments', text: '部署', url: '/c5/:id/deployments' },
      { id: 'rollback', text: '回滚', url: '/c5/:id/rollback' }
    ],
    detailTertiaryNav: {
      overview: [],
      releases: [
        { id: 'all', text: '全部发布', url: '/c5/:id/releases/all' },
        { id: 'planned', text: '已规划', url: '/c5/:id/releases/planned' },
        { id: 'releasing', text: '发布中', url: '/c5/:id/releases/releasing' },
        { id: 'released', text: '已发布', url: '/c5/:id/releases/released' }
      ],
      versions: [
        { id: 'all', text: '全部版本', url: '/c5/:id/versions/all' },
        { id: 'major', text: '主版本', url: '/c5/:id/versions/major' },
        { id: 'minor', text: '次版本', url: '/c5/:id/versions/minor' }
      ],
      deployments: [],
      rollback: []
    }
  },

  // C6: DevOps
  c6: {
    title: 'DevOps',
    icon: '🚀',
    description: '流水线、制品库、部署管理',
    actions: [
      { text: '创建流水线', icon: '➕', type: 'primary', handler: 'showCreatePipeline' },
      { text: '配置环境', icon: '⚙️', type: 'default', handler: 'showConfigEnvironment' }
    ],
    listTertiaryNav: [
      { id: 'all', icon: '📁', text: '全部流水线' },
      { id: 'pipelines', icon: '🔄', text: '流水线' },
      { id: 'artifacts', icon: '📦', text: '制品库' },
      { id: 'environments', icon: '🌐', text: '环境管理' },
      { id: 'releases', icon: '📦', text: '发布列表' },
      { id: 'versions', icon: '🏷️', text: '版本管理' },
      { id: 'deployments', icon: '🚀', text: '部署跟踪' }
    ],
    detailSecondaryNav: [
      { id: 'overview', text: '概览', url: '/c6/:id/overview' },
      { id: 'pipeline', text: '流水线', url: '/c6/:id/pipeline' },
      { id: 'artifacts', text: '制品', url: '/c6/:id/artifacts' },
      { id: 'deployment', text: '部署', url: '/c6/:id/deployment' },
      { id: 'monitoring', text: '监控', url: '/c6/:id/monitoring' }
    ],
    detailTertiaryNav: {
      overview: [],
      pipeline: [
        { id: 'all', text: '全部流水线', url: '/c6/:id/pipeline/all' },
        { id: 'build', text: '构建流水线', url: '/c6/:id/pipeline/build' },
        { id: 'test', text: '测试流水线', url: '/c6/:id/pipeline/test' },
        { id: 'deploy', text: '部署流水线', url: '/c6/:id/pipeline/deploy' }
      ],
      artifacts: [
        { id: 'all', text: '全部制品', url: '/c6/:id/artifacts/all' },
        { id: 'docker', text: 'Docker镜像', url: '/c6/:id/artifacts/docker' },
        { id: 'packages', text: '软件包', url: '/c6/:id/artifacts/packages' }
      ],
      deployment: [],
      monitoring: []
    }
  },

  // C7: 分析治理
  c7: {
    title: '分析治理',
    icon: '📈',
    description: '需求分析、开发分析、质量分析',
    actions: [
      { text: '创建报表', icon: '➕', type: 'primary', handler: 'showCreateReport' },
      { text: '导出数据', icon: '📥', type: 'default', handler: 'showExportData' }
    ],
    listTertiaryNav: [
      { id: 'all', icon: '📁', text: '全部报表' },
      { id: 'requirements', icon: '📝', text: '需求分析' },
      { id: 'development', icon: '⚙️', text: '开发分析' },
      { id: 'quality', icon: '🔍', text: '质量分析' }
    ],
    detailSecondaryNav: [
      { id: 'overview', text: '概览', url: '/c7/:id/overview' },
      { id: 'requirements', text: '需求', url: '/c7/:id/requirements' },
      { id: 'development', text: '开发', url: '/c7/:id/development' },
      { id: 'quality', text: '质量', url: '/c7/:id/quality' },
      { id: 'dashboard', text: '仪表板', url: '/c7/:id/dashboard' }
    ],
    detailTertiaryNav: {
      overview: [],
      requirements: [
        { id: 'coverage', text: '需求覆盖率', url: '/c7/:id/requirements/coverage' },
        { id: 'velocity', text: '需求速率', url: '/c7/:id/requirements/velocity' },
        { id: 'maturity', text: '成熟度', url: '/c7/:id/requirements/maturity' }
      ],
      development: [
        { id: 'progress', text: '开发进度', url: '/c7/:id/development/progress' },
        { id: 'efficiency', text: '开发效率', url: '/c7/:id/development/efficiency' },
        { id: 'codeQuality', text: '代码质量', url: '/c7/:id/development/code-quality' }
      ],
      quality: [
        { id: 'defects', text: '缺陷分析', url: '/c7/:id/quality/defects' },
        { id: 'testCoverage', text: '测试覆盖率', url: '/c7/:id/quality/test-coverage' },
        { id: 'passRate', text: '通过率', url: '/c7/:id/quality/pass-rate' }
      ],
      dashboard: []
    }
  }
}

/**
 * 获取一级导航列表
 */
export const getPrimaryNavigation = (): Array<{
  key: string
  module: NavigationModule
}> => {
  return Object.entries(NAVIGATION_CONFIG).map(([key, module]) => ({
    key,
    module
  }))
}

/**
 * 根据模块key获取导航配置
 */
export const getNavigationModule = (key: string): NavigationModule | undefined => {
  return NAVIGATION_CONFIG[key]
}
