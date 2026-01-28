/**
 * EmptyPlaceholder - 空状态占位符组件
 * 用于显示"还在加速研发中..."的提示
 */

import React from 'react'
import { Empty } from 'antd'
import { RocketOutlined } from '@ant-design/icons'
import './EmptyPlaceholder.css'

interface EmptyPlaceholderProps {
  title?: string
  description?: string
}

export const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({ 
  title = '功能开发中',
  description = '还在加速研发中...'
}) => {
  return (
    <div className="empty-placeholder">
      <Empty
        image={<RocketOutlined style={{ fontSize: 64, color: '#1890ff' }} />}
        imageStyle={{ height: 80 }}
        description={
          <div className="empty-placeholder-content">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        }
      />
    </div>
  )
}

export default EmptyPlaceholder
