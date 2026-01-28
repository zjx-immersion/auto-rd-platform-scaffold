/**
 * QuickCreatePanel - 快速创建下拉面板
 * 提供快速创建Feature、Task、Bug、Sprint等功能
 */

import React from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  FileTextOutlined,
  CheckSquareOutlined,
  BugOutlined,
  RocketOutlined,
  FolderOutlined,
  BookOutlined,
} from '@ant-design/icons'

export const QuickCreatePanel: React.FC<{ onClick?: (key: string) => void }> = ({ onClick }) => {
  const items: MenuProps['items'] = [
    {
      key: 'feature',
      label: '创建Feature',
      icon: <FileTextOutlined />,
    },
    {
      key: 'task',
      label: '创建Task',
      icon: <CheckSquareOutlined />,
    },
    {
      key: 'bug',
      label: '创建Bug',
      icon: <BugOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'sprint',
      label: '创建Sprint',
      icon: <RocketOutlined />,
    },
    {
      key: 'project',
      label: '创建项目',
      icon: <FolderOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'document',
      label: '创建文档',
      icon: <BookOutlined />,
    },
  ]

  const handleClick: MenuProps['onClick'] = (e) => {
    console.log('快速创建:', e.key)
    onClick?.(e.key)
  }

  return <Menu items={items} onClick={handleClick} style={{ minWidth: 200 }} />
}

export default QuickCreatePanel
