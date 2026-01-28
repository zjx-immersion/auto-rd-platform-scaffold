/**
 * PrimaryNav - 一级导航组件（左侧Sider）
 * C0-C7 能力域导航
 * 1:1还原 auto-rd-main-frame 的一级导航
 */

import React from 'react'
import { Menu } from 'antd'
import {
  ProjectOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  RocketOutlined,
  CalendarOutlined,
  ToolOutlined,
  BarChartOutlined,
  PushpinOutlined,
  PushpinFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { getPrimaryNavigation } from '@/config/navigation'
import type { MenuProps } from 'antd'
import './PrimaryNav.css'

interface PrimaryNavProps {
  collapsed: boolean
  selectedModule: string
  isPinned: boolean
  onTogglePin: () => void
  onModuleChange: (moduleKey: string) => void
  onToggleCollapse?: () => void
}

export const PrimaryNav: React.FC<PrimaryNavProps> = ({
  collapsed,
  selectedModule,
  isPinned,
  onTogglePin,
  onModuleChange,
  onToggleCollapse,
}) => {
  const primaryNav = getPrimaryNavigation()

  // 构建菜单项 - 使用 emoji 图标保持与原版一致
  const menuItems: MenuProps['items'] = primaryNav.map((nav) => ({
    key: nav.key,
    icon: <span style={{ fontSize: '18px' }}>{nav.module.icon}</span>,
    label: (
      <div className="nav-item-content">
        <div className="nav-item-title">{nav.module.title}</div>
        {!collapsed && (
          <div className="nav-item-desc">{nav.module.description}</div>
        )}
      </div>
    ),
  }))

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    onModuleChange(e.key)
  }

  return (
    <div className={`primary-nav ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo + 平台名称 */}
      <div className="nav-logo">
        <div className="logo-icon">🚗</div>
        {!collapsed && <span className="logo-text">研发协同</span>}
      </div>

      {/* 导航菜单 */}
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedModule]}
        items={menuItems}
        onClick={handleMenuClick}
        inlineCollapsed={collapsed}
        className="primary-nav-menu"
      />

      {/* 底部按钮区域：固定/悬浮按钮 + 折叠/展开按钮 */}
      <div className="nav-footer">
        <div 
          className="nav-pin-switcher" 
          onClick={onTogglePin} 
          title={isPinned ? "切换为悬浮模式" : "切换为固定模式"}
        >
          {isPinned ? (
            <PushpinFilled className="pin-icon" />
          ) : (
            <PushpinOutlined className="pin-icon" />
          )}
        </div>
        {onToggleCollapse && (
          <div 
            className="nav-collapse-btn"
            onClick={onToggleCollapse}
            title={collapsed ? "展开导航" : "收起导航"}
          >
            {collapsed ? (
              <MenuUnfoldOutlined className="collapse-icon" />
            ) : (
              <MenuFoldOutlined className="collapse-icon" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PrimaryNav
