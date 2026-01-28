/**
 * 导航上下文
 * 管理三级导航的状态
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getNavigationModule } from '@/config/navigation'
import type { NavigationModule } from '@/config/navigation'

/**
 * 视图模式
 */
export type ViewMode = 'list' | 'detail'

/**
 * 导航状态接口
 */
export interface NavigationState {
  /** 当前选中的一级导航模块 (c0-c7) */
  selectedModule: string
  /** 当前视图模式 */
  viewMode: ViewMode
  /** 当前选中的二级导航tab */
  selectedSecondaryTab: string
  /** 当前选中的三级导航项 */
  selectedTertiaryItem: string
  /** 当前详情ID */
  detailId: string | null
}

/**
 * 导航上下文接口
 */
export interface NavigationContextType extends NavigationState {
  /** 获取当前模块配置 */
  currentModule: NavigationModule | undefined
  /** 三级导航选中项（别名，与 selectedTertiaryItem 相同） */
  selectedTertiaryTab: string
  /** 切换一级导航 */
  switchModule: (moduleKey: string) => void
  /** 切换视图模式 */
  switchViewMode: (mode: ViewMode) => void
  /** 切换二级导航 */
  switchSecondaryTab: (tabKey: string) => void
  /** 切换三级导航 */
  switchTertiaryItem: (itemKey: string) => void
  /** 打开详情 */
  openDetail: (id: string) => void
  /** 关闭详情 */
  closeDetail: () => void
}

/**
 * 创建导航上下文
 */
const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

/**
 * 导航Provider Props
 */
interface NavigationProviderProps {
  children: React.ReactNode
}

/**
 * 导航Provider组件
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  // 从URL解析初始状态
  const parseStateFromUrl = useCallback(() => {
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    
    const moduleKey = segments[0] || 'c0'
    const detailId = segments[1] || null
    const viewMode: ViewMode = detailId ? 'detail' : 'list'
    const secondaryTab = segments[2] || 'overview'
    
    // 如果是列表视图且没有三级导航参数，设置默认三级导航为第一项
    let tertiaryItem = segments[3] || ''
    if (viewMode === 'list' && !tertiaryItem) {
      const module = getNavigationModule(moduleKey)
      const firstTertiaryNav = module?.listTertiaryNav?.[0]
      tertiaryItem = firstTertiaryNav?.id || ''
    }

    return {
      selectedModule: moduleKey,
      viewMode,
      selectedSecondaryTab: secondaryTab,
      selectedTertiaryItem: tertiaryItem,
      detailId,
    }
  }, [location.pathname])

  // 初始化状态
  const [state, setState] = useState<NavigationState>(parseStateFromUrl)

  // 监听URL变化，自动更新状态
  React.useEffect(() => {
    const newState = parseStateFromUrl()
    setState(newState)
  }, [parseStateFromUrl])

  // 获取当前模块配置
  const currentModule = useMemo(
    () => getNavigationModule(state.selectedModule),
    [state.selectedModule]
  )

  // 切换一级导航
  const switchModule = useCallback(
    (moduleKey: string) => {
      // 获取模块配置，自动设置第一个三级导航为默认选中
      const module = getNavigationModule(moduleKey)
      const firstTertiaryNav = module?.listTertiaryNav?.[0]
      const defaultTertiaryItem = firstTertiaryNav?.id || ''
      
      setState((prev) => ({
        ...prev,
        selectedModule: moduleKey,
        viewMode: 'list',
        selectedSecondaryTab: '',
        selectedTertiaryItem: defaultTertiaryItem,
        detailId: null,
      }))
      navigate(`/${moduleKey}`)
    },
    [navigate]
  )

  // 切换视图模式
  const switchViewMode = useCallback(
    (mode: ViewMode) => {
      setState((prev) => {
        // 如果切换到列表模式且没有三级导航，设置默认三级导航
        let tertiaryItem = prev.selectedTertiaryItem
        if (mode === 'list' && !tertiaryItem) {
          const module = getNavigationModule(prev.selectedModule)
          const firstTertiaryNav = module?.listTertiaryNav?.[0]
          tertiaryItem = firstTertiaryNav?.id || ''
        }
        
        return {
          ...prev,
          viewMode: mode,
          selectedSecondaryTab: mode === 'detail' ? 'overview' : '',
          selectedTertiaryItem: mode === 'detail' ? '' : tertiaryItem,
          detailId: mode === 'list' ? null : prev.detailId,
        }
      })
      
      // 如果切换到列表模式，导航到列表页
      if (mode === 'list') {
        navigate(`/${state.selectedModule}`)
      }
    },
    [navigate, state.selectedModule]
  )

  // 切换二级导航
  const switchSecondaryTab = useCallback(
    (tabKey: string) => {
      setState((prev) => ({
        ...prev,
        selectedSecondaryTab: tabKey,
        selectedTertiaryItem: '',
      }))
      
      if (state.detailId) {
        navigate(`/${state.selectedModule}/${state.detailId}/${tabKey}`)
      }
    },
    [navigate, state.detailId, state.selectedModule]
  )

  // 切换三级导航
  const switchTertiaryItem = useCallback(
    (itemKey: string) => {
      setState((prev) => ({
        ...prev,
        selectedTertiaryItem: itemKey,
      }))
    },
    []
  )

  // 打开详情
  const openDetail = useCallback(
    (id: string) => {
      setState((prev) => ({
        ...prev,
        viewMode: 'detail',
        detailId: id,
        selectedSecondaryTab: 'overview',
        selectedTertiaryItem: '',
      }))
      navigate(`/${state.selectedModule}/${id}/overview`)
    },
    [navigate, state.selectedModule]
  )

  // 关闭详情
  const closeDetail = useCallback(() => {
    setState((prev) => ({
      ...prev,
      viewMode: 'list',
      detailId: null,
      selectedSecondaryTab: '',
      selectedTertiaryItem: '',
    }))
    navigate(`/${state.selectedModule}`)
  }, [navigate, state.selectedModule])

  // Context值
  const value: NavigationContextType = {
    ...state,
    currentModule,
    selectedTertiaryTab: state.selectedTertiaryItem, // 别名，保持向后兼容
    switchModule,
    switchViewMode,
    switchSecondaryTab,
    switchTertiaryItem,
    openDetail,
    closeDetail,
  }

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

/**
 * 使用导航上下文的Hook
 */
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
