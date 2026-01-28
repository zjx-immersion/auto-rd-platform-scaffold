/**
 * 路由配置
 * 定义应用的所有路由映射
 */

import type { RouteObject } from 'react-router-dom'

/**
 * 路由配置接口
 */
export interface RouteConfig {
  /** 路由路径 */
  path?: string
  /** 路由名称 */
  name?: string
  /** 面包屑名称 */
  breadcrumb?: string
  /** 路由元素 */
  element?: React.ReactNode | null
  /** 是否需要权限 */
  requireAuth?: boolean
  /** 子路由 */
  children?: RouteConfig[]
}

/**
 * 动态生成模块路由
 * @param moduleKey 模块key (c0-c7)
 * @param moduleName 模块名称
 */
const generateModuleRoutes = (moduleKey: string, moduleName: string): RouteConfig[] => {
  return [
    // 列表视图路由
    {
      path: `/${moduleKey}`,
      name: `${moduleName}-列表`,
      breadcrumb: moduleName,
      element: null, // 在App.tsx中动态加载
    },
    // 详情视图路由
    {
      path: `/${moduleKey}/:id`,
      name: `${moduleName}-详情`,
      breadcrumb: moduleName,
      children: [
        {
          path: 'overview',
          name: `${moduleName}-概览`,
          breadcrumb: '概览',
        },
        {
          path: '*',
          name: `${moduleName}-子页面`,
          breadcrumb: '详情',
        },
      ],
    },
  ]
}

/**
 * 应用路由配置
 */
export const APP_ROUTES: RouteConfig[] = [
  // 首页
  {
    path: '/',
    name: '首页',
    breadcrumb: '首页',
  },
  // C0: 项目管理
  ...generateModuleRoutes('c0', '项目管理'),
  // C1: 需求管理
  ...generateModuleRoutes('c1', '需求管理'),
  // C2: 方案设计
  ...generateModuleRoutes('c2', '方案设计'),
  // C3: 开发执行
  ...generateModuleRoutes('c3', '开发执行'),
  // C4: 质量内建
  ...generateModuleRoutes('c4', '质量内建'),
  // C5: 交付发布
  ...generateModuleRoutes('c5', '交付发布'),
  // C6: DevOps
  ...generateModuleRoutes('c6', 'DevOps'),
  // C7: 分析治理
  ...generateModuleRoutes('c7', '分析治理'),
  // 404
  {
    path: '*',
    name: '404',
    breadcrumb: '页面未找到',
  },
]

/**
 * 根据路径获取路由配置
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  const findRoute = (routes: RouteConfig[], targetPath: string): RouteConfig | undefined => {
    for (const route of routes) {
      if (route.path === targetPath) {
        return route
      }
      if (route.children) {
        const found = findRoute(route.children, targetPath)
        if (found) return found
      }
    }
    return undefined
  }
  return findRoute(APP_ROUTES, path)
}

/**
 * 根据模块key获取默认路由
 */
export const getDefaultRouteByModule = (moduleKey: string): string => {
  return `/${moduleKey}`
}

/**
 * 根据路径生成面包屑
 */
export const generateBreadcrumb = (path: string): Array<{ name: string; path: string }> => {
  const segments = path.split('/').filter(Boolean)
  const breadcrumbs: Array<{ name: string; path: string }> = [
    { name: '首页', path: '/' },
  ]

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    const route = getRouteByPath(currentPath)
    if (route && route.breadcrumb) {
      breadcrumbs.push({
        name: route.breadcrumb,
        path: currentPath,
      })
    }
  }

  return breadcrumbs
}
