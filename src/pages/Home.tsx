/**
 * Dashboard V2.0 - 工作台首页
 */

import React from 'react'
import { Row, Col, Card, Statistic, Space, Tag, Button, List, Timeline } from 'antd'
import {
  ProjectOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  RiseOutlined,
  FallOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useOutletContext } from 'react-router-dom'
import type { UserRole } from '../types/domain'

const DashboardV2: React.FC = () => {
  const { currentRole } = useOutletContext<{ currentRole: UserRole }>()

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h2>🏠 工作台</h2>
        <div style={{ color: '#666' }}>欢迎回来，{currentRole}！</div>
      </div>

      {/* 关键指标卡片 - 响应式 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="进行中的Feature"
              value={5}
              styles={{ content: { color: '#1890ff' } }}
              prefix={<ProjectOutlined />}
              suffix={
                <Space style={{ fontSize: 14 }}>
                  <RiseOutlined style={{ color: '#52c41a' }} />
                  <span style={{ color: '#52c41a' }}>+2</span>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="待完成Task"
              value={12}
              styles={{ content: { color: '#faad14' } }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="成熟度不足Feature"
              value={3}
              styles={{ content: { color: '#ff4d4f' } }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="本周完成Story Points"
              value={35}
              styles={{ content: { color: '#52c41a' } }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* 我的待办 - 响应式 */}
        <Col xs={24} sm={24} md={24} lg={12}>
          <Card title="📋 我的待办" extra={<Button type="link">查看全部</Button>}>
            <List
              dataSource={[
                {
                  title: 'LKA车道保持：SSTS拆解度不足，需补充到90%',
                  priority: 'HIGH',
                  type: 'Feature',
                },
                {
                  title: 'PRD评审：城市NOA核心功能',
                  priority: 'HIGH',
                  type: 'Review',
                },
                {
                  title: 'Sprint 3：分配5个待分配Task',
                  priority: 'NORMAL',
                  type: 'Sprint',
                },
                {
                  title: '基线冻结：SOP基线成熟度82%，距离90%还差8%',
                  priority: 'NORMAL',
                  type: 'Baseline',
                },
              ]}
              renderItem={item => (
                <List.Item>
                  <Space orientation="vertical" style={{ width: '100%' }}>
                    <Space>
                      <Tag color={item.priority === 'HIGH' ? 'red' : 'blue'}>{item.priority}</Tag>
                      <Tag>{item.type}</Tag>
                    </Space>
                    <div>{item.title}</div>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 最近活动 - 响应式 */}
        <Col xs={24} sm={24} md={24} lg={12}>
          <Card title="🕒 最近活动" extra={<Button type="link">查看全部</Button>}>
            <Timeline
              items={[
                {
                  color: 'green',
                  children: (
                    <div>
                      <div>张三 完成了 Task WI-LKA-001</div>
                      <div style={{ fontSize: 12, color: '#999' }}>2026-01-22 10:30</div>
                    </div>
                  ),
                },
                {
                  color: 'blue',
                  children: (
                    <div>
                      <div>李四 更新了 Feature LKA车道保持的SSTS拆解度</div>
                      <div style={{ fontSize: 12, color: '#999' }}>2026-01-22 09:15</div>
                    </div>
                  ),
                },
                {
                  color: 'orange',
                  children: (
                    <div>
                      <div>王五 提交了 PRD评审 城市NOA核心功能</div>
                      <div style={{ fontSize: 12, color: '#999' }}>2026-01-21 16:45</div>
                    </div>
                  ),
                },
                {
                  color: 'gray',
                  children: (
                    <div>
                      <div>赵六 创建了 Sprint 4</div>
                      <div style={{ fontSize: 12, color: '#999' }}>2026-01-21 14:20</div>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      {/* 快速入口 */}
      <Card title="🚀 快速入口" style={{ marginTop: 16 }}>
        <Space wrap>
          <Button type="primary" icon={<ProjectOutlined />}>
            查看产品树
          </Button>
          <Button icon={<FileTextOutlined />}>查看需求树</Button>
          <Button icon={<ClockCircleOutlined />}>查看我的Sprint</Button>
          <Button icon={<WarningOutlined />}>查看成熟度不足Feature</Button>
        </Space>
      </Card>
    </div>
  )
}

export default DashboardV2
