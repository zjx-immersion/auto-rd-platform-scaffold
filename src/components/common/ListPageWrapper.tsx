/**
 * 通用列表页包装器
 * 为所有列表页添加三级导航占位符支持
 */

import React from 'react'
import { useNavigation } from '@/context/NavigationContext'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'

interface ListPageWrapperProps {
  children: React.ReactNode
  /** 需要显示实际内容的三级导航ID列表 */
  activeTabIds?: string[]
  /** 三级导航标题映射 */
  tabTitles?: Record<string, string>
}

export const ListPageWrapper: React.FC<ListPageWrapperProps> = ({ 
  children, 
  activeTabIds = ['all'],
  tabTitles = {}
}) => {
  const { selectedTertiaryTab } = useNavigation()

  // 如果当前三级导航不在激活列表中，显示占位符
  const shouldShowPlaceholder = selectedTertiaryTab && !activeTabIds.includes(selectedTertiaryTab)

  if (shouldShowPlaceholder) {
    return (
      <EmptyPlaceholder 
        title={tabTitles[selectedTertiaryTab] || '功能开发中'}
        description="还在加速研发中..."
      />
    )
  }

  return <>{children}</>
}

export default ListPageWrapper
