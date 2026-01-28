/**
 * 导航状态持久化工具
 * 用于保存和恢复用户的导航偏好设置
 */

// LocalStorage 键名常量
export const STORAGE_KEYS = {
  NAV_WIDTH: 'auto-rd-nav-width',
  IS_PINNED: 'auto-rd-nav-pinned',
} as const

// 导航宽度档位
export const NAV_WIDTH = {
  COLLAPSED: 62,    // 收起：仅显示图标
  DEFAULT: 200,     // 默认：显示标题和描述
  EXPANDED: 280,    // 展开：显示完整内容
} as const

// 导航状态接口
export interface NavState {
  navWidth: number
  isPinned: boolean
}

/**
 * 从 localStorage 读取导航状态
 * @returns 导航状态对象，如果读取失败则返回默认值
 */
export const loadNavState = (): NavState => {
  try {
    const savedWidth = localStorage.getItem(STORAGE_KEYS.NAV_WIDTH)
    const savedPinned = localStorage.getItem(STORAGE_KEYS.IS_PINNED)
    
    return {
      navWidth: savedWidth ? Number(savedWidth) : NAV_WIDTH.DEFAULT,
      isPinned: savedPinned !== null ? savedPinned === 'true' : true,
    }
  } catch (error) {
    console.error('Failed to load nav state from localStorage:', error)
    return {
      navWidth: NAV_WIDTH.DEFAULT,
      isPinned: true,
    }
  }
}

/**
 * 保存导航状态到 localStorage
 * @param width - 导航宽度
 * @param pinned - 是否固定
 */
export const saveNavState = (width: number, pinned: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NAV_WIDTH, String(width))
    localStorage.setItem(STORAGE_KEYS.IS_PINNED, String(pinned))
  } catch (error) {
    console.error('Failed to save nav state to localStorage:', error)
  }
}

/**
 * 清除保存的导航状态
 */
export const clearNavState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.NAV_WIDTH)
    localStorage.removeItem(STORAGE_KEYS.IS_PINNED)
  } catch (error) {
    console.error('Failed to clear nav state from localStorage:', error)
  }
}

/**
 * 检查是否为有效的导航宽度
 * @param width - 要检查的宽度
 * @returns 是否为有效宽度
 */
export const isValidNavWidth = (width: number): boolean => {
  return Object.values(NAV_WIDTH).includes(width)
}

/**
 * 获取最接近的有效导航宽度
 * @param width - 当前宽度
 * @returns 最接近的有效宽度
 */
export const getNearestNavWidth = (width: number): number => {
  const widths = Object.values(NAV_WIDTH)
  return widths.reduce((nearest, current) => {
    return Math.abs(current - width) < Math.abs(nearest - width) ? current : nearest
  })
}
