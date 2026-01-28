/**
 * Header - 顶部栏组件
 * 包含：Logo、搜索框、工作范围、用户角色、快速创建、帮助、通知、用户信息
 * 1:1还原 auto-rd-main-frame 的Header
 */

import React from 'react'
import { Layout, Input, Badge, Avatar, Space, Dropdown, Select, Button } from 'antd'
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
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import QuickCreatePanel from './QuickCreatePanel'
import NotificationPanel from './NotificationPanel'
import HelpPanel from './HelpPanel'
import './Header.css'

const { Header: AntHeader } = Layout
const { Search } = Input

export const Header: React.FC = () => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人设置',
      icon: <SettingOutlined />,
    },
    {
      key: 'theme',
      label: '主题切换',
      icon: <SkinOutlined />,
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
    console.log('用户菜单:', e.key)
  }

  return (
    <AntHeader className="app-header">
      {/* 左侧：Logo + 平台名称 */}
      <div className="header-left">
        <div className="logo">
          <AppstoreOutlined style={{ fontSize: '24px', color: 'var(--color-primary)' }} />
          <span className="logo-text">Auto R&amp;D Platform</span>
        </div>
      </div>

      {/* 中间：预留给二级导航 */}
      <div className="header-center">
        {/* 二级导航将在这里显示 */}
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
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ cursor: 'pointer' }}
            >
              创建
            </Button>
          </Dropdown>

          {/* 帮助 */}
          <Dropdown
            dropdownRender={() => <HelpPanel />}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              icon={<QuestionCircleOutlined />}
              style={{
                color: 'rgba(255,255,255,0.85)',
                borderColor: 'rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
              }}
            />
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

export default Header
