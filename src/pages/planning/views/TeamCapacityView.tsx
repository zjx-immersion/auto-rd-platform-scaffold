/**
 * TeamCapacityView - 团队容量视图
 * 管理团队成员容量和分配
 */

import React, { useState } from 'react'
import { Tabs, Table, Progress, Card, Row, Col, Statistic } from 'antd'
import { TeamOutlined, UserOutlined, PieChartOutlined } from '@ant-design/icons'
import { mockTeamMembers, type TeamMember } from '@/mock/planning'
import './TeamCapacityView.css'

interface TeamCapacityViewProps {
  planId: string
  teamId: string
}

const TeamCapacityView: React.FC<TeamCapacityViewProps> = ({ planId, teamId }) => {
  const [activeKey, setActiveKey] = useState('overview')

  // 计算总容量统计
  const totalCapacity = mockTeamMembers.reduce((sum, m) => sum + m.capacity, 0)
  const totalAllocated = mockTeamMembers.reduce((sum, m) => sum + m.allocated, 0)
  const totalAvailable = mockTeamMembers.reduce((sum, m) => sum + m.available, 0)
  const utilizationRate = Math.round((totalAllocated / totalCapacity) * 100)

  // 成员列定义
  const memberColumns = [
    {
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 150,
    },
    {
      title: '技能',
      dataIndex: 'skills',
      key: 'skills',
      width: 250,
      render: (skills: string[]) => skills.join(', '),
    },
    {
      title: '总容量',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 100,
      align: 'center' as const,
      render: (capacity: number) => `${capacity}人天`,
    },
    {
      title: '已分配',
      dataIndex: 'allocated',
      key: 'allocated',
      width: 100,
      align: 'center' as const,
      render: (allocated: number) => `${allocated}人天`,
    },
    {
      title: '可用',
      dataIndex: 'available',
      key: 'available',
      width: 100,
      align: 'center' as const,
      render: (available: number) => `${available}人天`,
    },
    {
      title: '利用率',
      key: 'utilization',
      width: 200,
      render: (_: any, record: TeamMember) => {
        const rate = Math.round((record.allocated / record.capacity) * 100)
        return (
          <Progress
            percent={rate}
            strokeColor={rate > 90 ? '#ff4d4f' : rate > 70 ? '#faad14' : '#52c41a'}
            size="small"
          />
        )
      },
    },
  ]

  const tabItems = [
    {
      key: 'overview',
      label: (
        <span>
          <PieChartOutlined />
          容量概览
        </span>
      ),
      children: (
        <div className="tab-content">
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总容量"
                  value={totalCapacity}
                  suffix="人天"
                  styles={{ content: {color: 'var(--color-primary)'} }}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已分配"
                  value={totalAllocated}
                  suffix="人天"
                  styles={{ content: {color: '#52c41a'} }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="剩余可用"
                  value={totalAvailable}
                  suffix="人天"
                  styles={{ content: {color: '#faad14'} }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="利用率"
                  value={utilizationRate}
                  suffix="%"
                  styles={{ content: {color: utilizationRate > 90 ? '#ff4d4f' : utilizationRate > 70 ? '#faad14' : '#52c41a'} }}
                  prefix={<PieChartOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Card title="容量分布" style={{ marginTop: 16 }}>
            <div className="capacity-distribution">
              {mockTeamMembers.map((member) => {
                const rate = Math.round((member.allocated / member.capacity) * 100)
                return (
                  <div key={member.id} className="member-capacity-bar">
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                    <div className="capacity-bar">
                      <Progress
                        percent={rate}
                        strokeColor={rate > 90 ? '#ff4d4f' : rate > 70 ? '#faad14' : '#52c41a'}
                        format={(percent) => `${member.allocated}/${member.capacity}人天 (${percent}%)`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'members',
      label: (
        <span>
          <UserOutlined />
          成员容量
        </span>
      ),
      children: (
        <div className="tab-content">
          <Table
            columns={memberColumns}
            dataSource={mockTeamMembers}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1000 }}
          />
        </div>
      ),
    },
    {
      key: 'allocation',
      label: (
        <span>
          <TeamOutlined />
          容量分配
        </span>
      ),
      children: (
        <div className="tab-content">
          <Card title="容量分配管理">
            <p style={{ color: '#666' }}>
              此功能用于管理团队成员的任务分配，确保负载均衡。
              可以查看每个成员的工作分配情况，并进行调整。
            </p>
            <div style={{ marginTop: 24, padding: 40, background: '#f5f7fa', textAlign: 'center', borderRadius: 8 }}>
              <TeamOutlined style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
              <div style={{ color: '#999' }}>容量分配功能开发中...</div>
            </div>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div className="team-capacity-view">
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={tabItems}
        className="capacity-tabs"
      />
    </div>
  )
}

export default TeamCapacityView
