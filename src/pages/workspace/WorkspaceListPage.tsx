/**
 * WorkspaceListPage - 工作台列表页面
 * 根据三级导航显示：我的工作台、团队工作台、项目工作台
 */

import React, { useMemo } from 'react'
import { Card, Row, Col, Space, Statistic, List, Tag, Button, Empty } from 'antd'
import {
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  TeamOutlined,
  RiseOutlined,
} from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import './WorkspaceListPage.css'

export const WorkspaceListPage: React.FC = () => {
  const { selectedTertiaryTab } = useNavigation()

  // 根据三级导航渲染不同内容
  const renderContent = () => {
    switch (selectedTertiaryTab) {
      case 'my-workspace':
        return <MyWorkspace />
      case 'team-workspace':
        return <TeamWorkspace />
      case 'project-workspace':
        return <ProjectWorkspace />
      default:
        return <MyWorkspace />
    }
  }

  return (
    <div className="workspace-list-page">
      {renderContent()}
    </div>
  )
}

// 我的工作台
const MyWorkspace: React.FC = () => {
  return (
    <div className="workspace-content">
      <div className="workspace-header">
        <h2>🏠 工作台</h2>
        <p>欢迎回来，！</p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card className="stat-card stat-card-blue">
            <Statistic
              title="进行中的Feature"
              value={5}
              prefix={<ProjectOutlined />}
              suffix={
                <span className="stat-trend">
                  <RiseOutlined />
                  <span>+2</span>
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card stat-card-orange">
            <Statistic
              title="待完成Task"
              value={12}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card stat-card-red">
            <Statistic
              title="成熟度不足Feature"
              value={3}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card stat-card-green">
            <Statistic
              title="本周完成Story Points"
              value={35}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 我的待办 */}
        <Col span={12}>
          <Card
            title="📋 我的待办"
            extra={<Button type="link">查看全部</Button>}
          >
            <List
              dataSource={[
                {
                  id: '1',
                  priority: 'HIGH',
                  type: 'Feature',
                  title: 'LKA车道保持：SSTS拆解度不足，需补充到90%',
                },
                {
                  id: '2',
                  priority: 'HIGH',
                  type: 'Review',
                  title: 'PRD评审：城市NOA核心功能',
                },
                {
                  id: '3',
                  priority: 'NORMAL',
                  type: 'Sprint',
                  title: 'Sprint 3：分配5个待分配Task',
                },
                {
                  id: '4',
                  priority: 'NORMAL',
                  type: 'Baseline',
                  title: '基线冻结：SOP基线成熟度82%，距离90%还差8%',
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <Tag color={item.priority === 'HIGH' ? 'red' : 'blue'}>
                      {item.priority}
                    </Tag>
                    <Tag>{item.type}</Tag>
                    <span>{item.title}</span>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 最近活动 */}
        <Col span={12}>
          <Card
            title="🕒 最近活动"
            extra={<Button type="link">查看全部</Button>}
          >
            <List
              dataSource={[
                {
                  id: '1',
                  user: '张三',
                  action: '完成了 Task WI-LKA-001',
                  time: '2026-01-22 10:30',
                },
                {
                  id: '2',
                  user: '李四',
                  action: '更新了 Feature LKA车道保持的SSTS拆解度',
                  time: '2026-01-22 09:15',
                },
                {
                  id: '3',
                  user: '王五',
                  action: '提交了 PRD评审 城市NOA核心功能',
                  time: '2026-01-21 16:45',
                },
                {
                  id: '4',
                  user: '赵六',
                  action: '创建了 Sprint 4',
                  time: '2026-01-21 14:20',
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.user} ${item.action}`}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 快速入口 */}
      <Card title="🚀 快速入口" style={{ marginTop: 16 }}>
        <Space size="large">
          <Button icon={<ProjectOutlined />} size="large">
            查看产品树
          </Button>
          <Button icon={<ProjectOutlined />} size="large">
            查看需求树
          </Button>
          <Button icon={<ClockCircleOutlined />} size="large">
            查看我的Sprint
          </Button>
          <Button icon={<WarningOutlined />} size="large">
            查看成熟度不足Feature
          </Button>
        </Space>
      </Card>
    </div>
  )
}

// 团队工作台
const TeamWorkspace: React.FC = () => {
  return (
    <div className="workspace-content">
      <Empty
        description="团队工作台功能开发中..."
        style={{ padding: '60px 0' }}
      />
    </div>
  )
}

// 项目工作台
const ProjectWorkspace: React.FC = () => {
  return (
    <div className="workspace-content">
      <Empty
        description="项目工作台功能开发中..."
        style={{ padding: '60px 0' }}
      />
    </div>
  )
}

export default WorkspaceListPage
