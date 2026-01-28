/**
 * ThemeContext - 主题上下文
 * 管理主题切换状态
 */

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ThemeConfig } from 'antd'
import { blueTheme, orangeTheme, purpleTheme } from '@/theme'

export type ThemeMode = 'blue' | 'orange' | 'purple'

interface ThemeContextType {
  themeMode: ThemeMode
  themeConfig: ThemeConfig
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 从localStorage读取主题设置
const getStoredTheme = (): ThemeMode => {
  try {
    const stored = localStorage.getItem('theme-mode')
    if (stored === 'orange' || stored === 'purple') return stored as ThemeMode
    return 'blue'
  } catch {
    return 'blue'
  }
}

// 保存主题设置到localStorage
const setStoredTheme = (mode: ThemeMode) => {
  try {
    localStorage.setItem('theme-mode', mode)
  } catch (e) {
    console.error('Failed to save theme mode:', e)
  }
}

// 获取主题配置
const getThemeConfig = (mode: ThemeMode): ThemeConfig => {
  switch (mode) {
    case 'orange':
      return orangeTheme
    case 'purple':
      return purpleTheme
    default:
      return blueTheme
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getStoredTheme)
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(getThemeConfig(themeMode))

  // 设置主题模式
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
    setStoredTheme(mode)
    setThemeConfig(getThemeConfig(mode))
    
    // 更新HTML的data-theme属性，用于CSS变量
    document.documentElement.setAttribute('data-theme', mode)
  }

  // 切换主题（循环切换）
  const toggleTheme = () => {
    const modes: ThemeMode[] = ['blue', 'orange', 'purple']
    const currentIndex = modes.indexOf(themeMode)
    const nextIndex = (currentIndex + 1) % modes.length
    setThemeMode(modes[nextIndex])
  }

  // 初始化时设置HTML属性
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
  }, [themeMode])

  return (
    <ThemeContext.Provider value={{ themeMode, themeConfig, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 自定义Hook
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
