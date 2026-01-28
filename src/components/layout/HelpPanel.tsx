/**
 * HelpPanel - 帮助中心面板
 * 提供使用文档、视频教程、快捷键说明等
 */

import React from 'react'
import { List, Input, Collapse, Typography } from 'antd'
import {
  BookOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  KeyOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons'
import './HelpPanel.css'

const { Search } = Input
const { Link } = Typography

interface HelpItem {
  key: string
  icon: React.ReactNode
  title: string
  description: string
}

const helpCategories: HelpItem[] = [
  {
    key: 'docs',
    icon: <BookOutlined />,
    title: '使用文档',
    description: '查看详细的功能说明和操作指南',
  },
  {
    key: 'videos',
    icon: <PlayCircleOutlined />,
    title: '视频教程',
    description: '观看操作演示视频，快速上手',
  },
  {
    key: 'faq',
    icon: <QuestionCircleOutlined />,
    title: '常见问题',
    description: '查看常见问题的解答',
  },
  {
    key: 'release',
    icon: <FileTextOutlined />,
    title: '发布说明',
    description: '查看最新版本的更新内容',
  },
  {
    key: 'shortcuts',
    icon: <KeyOutlined />,
    title: '快捷键说明',
    description: '查看全部快捷键列表',
  },
  {
    key: 'support',
    icon: <CustomerServiceOutlined />,
    title: '联系支持',
    description: '获取技术支持和帮助',
  },
]

const shortcuts = [
  { key: 'search', shortcut: 'Ctrl+K / ⌘+K', description: '全局搜索' },
  { key: 'create', shortcut: 'Ctrl+N / ⌘+N', description: '快速创建' },
  { key: 'save', shortcut: 'Ctrl+S / ⌘+S', description: '保存' },
  { key: 'refresh', shortcut: 'Ctrl+R / ⌘+R', description: '刷新' },
  { key: 'help', shortcut: 'F1', description: '打开帮助' },
  { key: 'nav', shortcut: 'Ctrl+B / ⌘+B', description: '切换侧边栏' },
]

export const HelpPanel: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log('搜索帮助:', value)
  }

  const handleItemClick = (key: string) => {
    console.log('点击帮助项:', key)
  }

  return (
    <div className="help-panel">
      <div className="help-header">
        <h3 className="help-title">帮助中心</h3>
        <Search
          placeholder="搜索帮助内容..."
          onSearch={handleSearch}
          style={{ marginTop: 12 }}
        />
      </div>

      <div className="help-content">
        <List
          dataSource={helpCategories}
          renderItem={(item) => (
            <List.Item
              className="help-item"
              onClick={() => handleItemClick(item.key)}
            >
              <List.Item.Meta
                avatar={
                  <div className="help-icon" style={{ fontSize: 24, color: 'var(--color-primary)' }}>
                    {item.icon}
                  </div>
                }
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />

        <Collapse
          ghost
          items={[
            {
              key: 'shortcuts',
              label: '快捷键列表',
              children: (
                <div className="shortcuts-list">
                  {shortcuts.map((item) => (
                    <div key={item.key} className="shortcut-item">
                      <span className="shortcut-desc">{item.description}</span>
                      <span className="shortcut-key">{item.shortcut}</span>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      <div className="help-footer">
        <Link>查看完整文档</Link>
        <span className="divider">|</span>
        <Link>提交反馈</Link>
      </div>
    </div>
  )
}

export default HelpPanel
