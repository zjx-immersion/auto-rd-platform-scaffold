/**
 * Zustand全局状态管理
 * 统一管理应用状态
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * 应用状态接口
 */
interface AppState {
  // 用户信息
  user: {
    id: string
    name: string
    email: string
    role: string
  } | null
  
  // 主题
  theme: 'light' | 'dark'
  
  // 语言
  locale: 'zh-CN' | 'en-US'
  
  // 侧边栏折叠状态
  sidebarCollapsed: boolean
  
  // Actions
  setUser: (user: AppState['user']) => void
  clearUser: () => void
  setTheme: (theme: AppState['theme']) => void
  setLocale: (locale: AppState['locale']) => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

/**
 * 创建全局Store
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 初始状态
      user: null,
      theme: 'light',
      locale: 'zh-CN',
      sidebarCollapsed: false,

      // Actions
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
