/**
 * NotificationPanel - 通知中心面板
 * 显示系统通知、审批提醒等
 */

import React from 'react'
import { List, Badge, Button, Tabs, Empty } from 'antd'
import type { TabsProps } from 'antd'
import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import './NotificationPanel.css'

interface Notification {
  id: string
  type: 'system' | 'approval' | 'reminder'
  title: string
  content: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'PRD评审待审批',
    content: '城市NOA核心功能PRD需要您的审批',
    time: '2小时前',
    read: false,
  },
  {
    id: '2',
    type: 'system',
    title: '基线冻结提醒',
    content: 'SOP基线成熟度已达到90%，可以冻结',
    time: '5小时前',
    read: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Sprint 3即将结束',
    content: 'Sprint 3将在明天结束，请及时完成任务',
    time: '1天前',
    read: false,
  },
  {
    id: '4',
    type: 'system',
    title: 'Feature更新',
    content: 'LKA车道保持Feature已更新SSTS拆解度',
    time: '2天前',
    read: true,
  },
  {
    id: '5',
    type: 'approval',
    title: '变更请求已批准',
    content: '您提交的CCB变更请求已通过审批',
    time: '3天前',
    read: true,
  },
]

export const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = React.useState(mockNotifications)

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    console.log('全部标记为已读')
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return <CheckCircleOutlined style={{ color: 'var(--color-primary)' }} />
      case 'reminder':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />
      case 'system':
      default:
        return <InfoCircleOutlined style={{ color: '#52c41a' }} />
    }
  }

  const renderList = (filterFn?: (n: Notification) => boolean) => {
    const filteredNotifications = filterFn
      ? notifications.filter(filterFn)
      : notifications

    if (filteredNotifications.length === 0) {
      return <Empty description="暂无通知" style={{ padding: '40px 0' }} />
    }

    return (
      <List
        className="notification-list"
        dataSource={filteredNotifications}
        renderItem={(item) => (
          <List.Item
            className={`notification-item ${!item.read ? 'unread' : ''}`}
            extra={!item.read && <Badge dot />}
          >
            <List.Item.Meta
              avatar={getIcon(item.type)}
              title={item.title}
              description={
                <>
                  <div className="notification-content">{item.content}</div>
                  <div className="notification-time">{item.time}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
    )
  }

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `全部 (${notifications.length})`,
      children: renderList(),
    },
    {
      key: 'unread',
      label: `未读 (${notifications.filter((n) => !n.read).length})`,
      children: renderList((n) => !n.read),
    },
    {
      key: 'approval',
      label: '审批',
      children: renderList((n) => n.type === 'approval'),
    },
    {
      key: 'reminder',
      label: '提醒',
      children: renderList((n) => n.type === 'reminder'),
    },
  ]

  return (
    <div className="notification-panel">
      <div className="notification-header">
        <span className="notification-title">
          <BellOutlined style={{ marginRight: 8 }} />
          通知中心
        </span>
        <Button type="link" size="small" onClick={handleMarkAllRead}>
          全部已读
        </Button>
      </div>
      <Tabs items={items} size="small" />
      <div className="notification-footer">
        <Button type="link" block>
          查看全部通知
        </Button>
      </div>
    </div>
  )
}

export default NotificationPanel
