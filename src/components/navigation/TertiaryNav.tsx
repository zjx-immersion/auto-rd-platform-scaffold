/**
 * TertiaryNav - 三级导航组件
 * 左侧Menu菜单（列表视图/详情视图的细分导航）
 * 1:1还原 auto-rd-main-frame 的三级导航
 */

import React, { useMemo } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { FolderOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import './TertiaryNav.css'

export const TertiaryNav: React.FC = () => {
  const navigate = useNavigate()
  const {
    currentModule,
    viewMode,
    selectedSecondaryTab,
    selectedTertiaryItem,
    switchTertiaryItem
  } = useNavigation()

  // 获取三级导航配置
  const tertiaryNavItems = useMemo(() => {
    if (!currentModule) return []

    // 列表视图：使用listTertiaryNav
    if (viewMode === 'list') {
      return currentModule.listTertiaryNav?.map((item) => ({
        key: item.id,
        icon: <FolderOutlined />,
        label: item.text,
        url: item.url, // 保存URL用于导航
      })) || []
    }

    // 详情视图：使用detailTertiaryNav[selectedSecondaryTab]
    if (viewMode === 'detail' && selectedSecondaryTab) {
      const items = currentModule.detailTertiaryNav?.[selectedSecondaryTab] || []
      return items.map((item) => ({
        key: item.id,
        icon: <FolderOutlined />,
        label: item.text,
        url: item.url,
      }))
    }

    return []
  }, [currentModule, viewMode, selectedSecondaryTab])

  // 自动选中第一项
  const defaultSelectedKey = useMemo(() => {
    if (!selectedTertiaryItem && tertiaryNavItems.length > 0) {
      return tertiaryNavItems[0].key
    }
    return selectedTertiaryItem
  }, [selectedTertiaryItem, tertiaryNavItems])

  // 处理菜单点击
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switchTertiaryItem(e.key)

    // 查找对应的导航项并跳转（仅当有URL时）
    const navItem = tertiaryNavItems.find(item => item.key === e.key)
    if (navItem && navItem.url) {
      navigate(navItem.url)
    }
  }

  // 如果没有三级导航项，不渲染
  if (tertiaryNavItems.length === 0) {
    return null
  }

  return (
    <div className="tertiary-nav">
      <Menu
        mode="inline"
        selectedKeys={[defaultSelectedKey]}
        items={tertiaryNavItems}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
      />
    </div>
  )
}

export default TertiaryNav
