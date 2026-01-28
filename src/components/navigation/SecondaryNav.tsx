/**
 * SecondaryNav - 二级导航组件
 * 右侧顶部Tabs导航（详情视图的子页签）
 * 1:1还原 auto-rd-main-frame 的二级导航
 */

import React, { useMemo } from 'react'
import { Tabs } from 'antd'
import { useNavigation } from '@/context/NavigationContext'
import './SecondaryNav.css'

export const SecondaryNav: React.FC = () => {
  const { 
    currentModule, 
    viewMode, 
    selectedSecondaryTab, 
    switchSecondaryTab 
  } = useNavigation()

  // 获取二级导航配置
  const secondaryNavItems = useMemo(() => {
    if (viewMode !== 'detail' || !currentModule?.detailSecondaryNav) {
      return []
    }
    
    return currentModule.detailSecondaryNav.map((item) => ({
      key: item.id,
      label: item.text,
    }))
  }, [currentModule, viewMode])

  // 处理Tab切换
  const handleTabChange = (activeKey: string) => {
    switchSecondaryTab(activeKey)
  }

  // 列表视图时不显示二级导航
  if (viewMode !== 'detail' || secondaryNavItems.length === 0) {
    return null
  }

  return (
    <div className="secondary-nav">
      <Tabs
        activeKey={selectedSecondaryTab}
        items={secondaryNavItems}
        onChange={handleTabChange}
        size="large"
      />
    </div>
  )
}

export default SecondaryNav
