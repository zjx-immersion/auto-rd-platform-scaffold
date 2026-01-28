/**
 * HeaderWithNav - 带二级导航的Header组件
 * 将二级导航集成到Header中显示
 */

import React from 'react'
import { Layout, Input, Badge, Avatar, Space, Dropdown, Button, Select, Tabs } from 'antd'
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  AppstoreOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  SkinOutlined,
  GlobalOutlined,
  HomeOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import { useTheme } from '@/context/ThemeContext'
import type { NavigationModule } from '@/config/navigation'
import QuickCreatePanel from './QuickCreatePanel'
import NotificationPanel from './NotificationPanel'
import HelpPanel from './HelpPanel'
import './Header.css'

const { Header: AntHeader } = Layout
const { Search } = Input

// 详情视图Header组件
interface DetailViewHeaderProps {
  currentModule?: NavigationModule
  onBackToList: () => void
}

const DetailViewHeader: React.FC<DetailViewHeaderProps> = ({ currentModule, onBackToList }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedModule } = useNavigation()

  // 根据模块类型渲染不同的选择器
  const renderSelector = () => {
    // C3规划协调模块 - 显示规划选择器
    if (selectedModule === 'c3') {
      // 这里应该从mock数据或API获取规划列表
      const planOptions = [
        { value: 'plan-001', label: '2024 Q1 迭代规划' },
        { value: 'plan-002', label: '2024 Q1 端到端规划' },
        { value: 'plan-003', label: '2024 Q1 数据平台规划' },
        { value: 'plan-004', label: '2023 Q4 规控团队规划' },
        { value: 'plan-005', label: '2024 Q2 规控团队规划' },
      ]
      
      return (
        <Select
          value={id}
          style={{ width: 240 }}
          options={planOptions}
          placeholder="选择迭代规划"
          onChange={(planId) => {
            // 切换到对应规划的详情页，保持当前Tab
            const currentPath = window.location.pathname
            const pathSegments = currentPath.split('/')
            const currentTab = pathSegments[3] || 'plan-name'
            navigate(`/c3/${planId}/${currentTab}`)
          }}
        />
      )
    }
    
    // 默认项目选择器（C0等模块）
    return (
      <Select
        defaultValue={id || 'project-1'}
        style={{ width: 240 }}
        options={[
          { value: 'proj-001', label: '🚗 岚图梦想家 - ADAS项目' },
          { value: 'proj-002', label: '🎬 岚图追光 - 智能座舱' },
          { value: 'proj-003', label: '⚡ 岚图FREE - 动力系统' },
        ]}
        placeholder="选择项目"
        onChange={(projectId) => {
          const currentPath = window.location.pathname
          const pathSegments = currentPath.split('/')
          const currentTab = pathSegments[3] || 'overview'
          navigate(`/${selectedModule}/${projectId}/${currentTab}`)
        }}
      />
    )
  }

  return (
    <>
      {/* 返回列表按钮 - 使用房子图标 */}
      <Button
        type="text"
        icon={<HomeOutlined />}
        onClick={onBackToList}
        title="返回列表"
      />

      {/* 项目/规划选择器 */}
      {renderSelector()}
    </>
  )
}

interface HeaderWithNavProps {
  onToggleDrawer?: () => void
  navState?: 'expanded' | 'collapsed' | 'hidden'
}

export const HeaderWithNav: React.FC<HeaderWithNavProps> = ({ 
  onToggleDrawer, 
  navState = 'expanded' 
}) => {
  const {
    currentModule,
    viewMode,
    selectedSecondaryTab,
    switchSecondaryTab,
    switchViewMode,
  } = useNavigation()
  
  const { setThemeMode } = useTheme()

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人设置',
      icon: <SettingOutlined />,
    },
    {
      key: 'theme-submenu',
      label: '主题设置',
      icon: <SkinOutlined />,
      children: [
        {
          key: 'theme-blue',
          label: '青蓝色主题',
        },
        {
          key: 'theme-orange',
          label: '橙色主题',
        },
        {
          key: 'theme-purple',
          label: '紫色主题',
        },
      ],
    },
    {
      key: 'language',
      label: '语言切换',
      icon: <GlobalOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  const handleSearch = (value: string) => {
    console.log('搜索:', value)
  }

  const handleQuickCreate = (key: string) => {
    console.log('快速创建:', key)
  }

  const handleUserMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'theme-blue') {
      setThemeMode('blue')
    } else if (e.key === 'theme-orange') {
      setThemeMode('orange')
    } else if (e.key === 'theme-purple') {
      setThemeMode('purple')
    } else {
      console.log('用户菜单:', e.key)
    }
  }

  const handleBackToList = () => {
    switchViewMode('list')
  }

  // 获取二级导航配置
  const secondaryNavItems = React.useMemo(() => {
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

  return (
    <AntHeader className="app-header">
      {/* 左侧：菜单按钮、一级标题或二级导航 */}
      <div className="header-left">
        {/* 列表视图 */}
        {viewMode === 'list' && (
          <>
            {/* 导航隐藏时显示菜单按钮 */}
            {navState === 'hidden' && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={onToggleDrawer}
                className="nav-toggle-btn"
                title="显示导航菜单"
              />
            )}
            
            {/* 显示一级导航标题 */}
            {currentModule && (
              <div className="header-module-title">
                <span className="module-icon">{currentModule.icon}</span>
                <span className="module-title">{currentModule.title}</span>
              </div>
            )}
          </>
        )}
        
        {/* 详情视图时在左侧显示返回和项目/规划选择器 */}
        {viewMode === 'detail' && secondaryNavItems.length > 0 && (
          <DetailViewHeader 
            currentModule={currentModule}
            onBackToList={handleBackToList}
          />
        )}
      </div>

      {/* 中间：二级导航Tabs（详情视图时显示） */}
      <div className="header-center">
        {viewMode === 'detail' && secondaryNavItems.length > 0 && (
          <Tabs
            activeKey={selectedSecondaryTab}
            items={secondaryNavItems}
            onChange={handleTabChange}
            size="large"
            className="header-tabs"
          />
        )}
      </div>

      {/* 右侧：搜索、快速创建、帮助、通知、用户 */}
      <div className="header-right">
        <Space size="large">
          {/* 搜索框 */}
          <Search
            placeholder="搜索功能、页面..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />

          {/* 快速创建 */}
          <Dropdown
            dropdownRender={() => <QuickCreatePanel onClick={handleQuickCreate} />}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button type="primary" icon={<PlusOutlined />} style={{ cursor: 'pointer' }}>
              创建
            </Button>
          </Dropdown>

          {/* 帮助 */}
          <Dropdown
            dropdownRender={() => <HelpPanel />}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button icon={<QuestionCircleOutlined />} />
          </Dropdown>

          {/* 通知 */}
          <Dropdown
            dropdownRender={() => <NotificationPanel />}
            trigger={['click']}
            placement="bottomRight"
          >
            <Badge count={5} offset={[8, 0]}>
              <BellOutlined
                style={{ fontSize: '18px', color: 'rgba(0,0,0,0.65)', cursor: 'pointer' }}
              />
            </Badge>
          </Dropdown>

          {/* 用户信息 */}
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
          >
            <Avatar
              style={{ backgroundColor: 'var(--color-primary)', cursor: 'pointer' }}
              icon={<UserOutlined />}
            >
              U
            </Avatar>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  )
}

export default HeaderWithNav
