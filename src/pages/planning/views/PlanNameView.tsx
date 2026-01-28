/**
 * PlanNameView - 规划名称视图
 * 显示当前规划信息，支持切换其他规划
 */

import React, { useState } from 'react'
import { Card, Descriptions, Tag, Select, Button, Space, Progress } from 'antd'
import { SwapOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { mockPlans, type IterationPlan } from '@/mock/planning'
import './PlanNameView.css'

interface PlanNameViewProps {
  data: IterationPlan
  onDataChange: (data: IterationPlan) => void
}

const PlanNameView: React.FC<PlanNameViewProps> = ({ data, onDataChange }) => {
  const navigate = useNavigate()
  const [selectedPlanId, setSelectedPlanId] = useState(data.id)

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId)
    // 切换到选中的规划详情页
    navigate(`/c3/${planId}/plan-name`)
  }

  const statusMap: Record<string, { color: string; text: string }> = {
    planning: { color: 'blue', text: '规划中' },
    active: { color: 'green', text: '进行中' },
    completed: { color: 'default', text: '已完成' },
  }

  const teamTypeMap: Record<string, { color: string; icon: string }> = {
    control: { color: 'blue', icon: '🎯' },
    'e2e': { color: 'purple', icon: '🔗' },
    'data-platform': { color: 'cyan', icon: '📊' },
    other: { color: 'default', icon: '📁' },
  }

  const statusConfig = statusMap[data.status] || statusMap.planning
  const teamConfig = teamTypeMap[data.teamType] || teamTypeMap.other

  return (
    <div className="plan-name-view">
      <Card
        title={
          <div className="plan-selector-header">
            <SwapOutlined style={{ marginRight: 8 }} />
            <span>切换规划</span>
          </div>
        }
        extra={
          <Space>
            <Button icon={<EditOutlined />}>编辑规划</Button>
          </Space>
        }
      >
        <div className="plan-selector">
          <div className="selector-label">选择迭代规划：</div>
          <Select
            value={selectedPlanId}
            onChange={handlePlanChange}
            style={{ width: 400 }}
            size="large"
            options={mockPlans.map((plan) => ({
              label: (
                <div>
                  <strong>{plan.name}</strong>
                  <span style={{ marginLeft: 8, color: '#999', fontSize: 12 }}>
                    {plan.teamName} | {plan.code}
                  </span>
                </div>
              ),
              value: plan.id,
            }))}
          />
        </div>
      </Card>

      <Card
        title="当前规划信息"
        style={{ marginTop: 16 }}
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label="规划名称" span={2}>
            <strong style={{ fontSize: 16 }}>{data.name}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="规划编码">
            {data.code}
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="团队">
            <span style={{ marginRight: 4 }}>{teamConfig.icon}</span>
            <Tag color={teamConfig.color}>{data.teamName}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="团队成员">
            {data.memberCount} 人
          </Descriptions.Item>
          <Descriptions.Item label="开始日期">
            {data.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="结束日期">
            {data.endDate}
          </Descriptions.Item>
          <Descriptions.Item label="整体进度">
            <Progress percent={data.progress} style={{ maxWidth: 300 }} />
          </Descriptions.Item>
          <Descriptions.Item label="团队速率">
            <span style={{ color: data.velocity > 80 ? '#52c41a' : '#faad14', fontSize: 16, fontWeight: 600 }}>
              {data.velocity}%
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="容量情况" span={2}>
            <div>
              <div style={{ marginBottom: 8 }}>
                总容量: <strong>{data.capacity}</strong> 人天 | 
                已分配: <strong>{data.allocated}</strong> 人天 | 
                剩余: <strong>{data.capacity - data.allocated}</strong> 人天
              </div>
              <Progress
                percent={Math.round((data.allocated / data.capacity) * 100)}
                strokeColor={data.allocated > data.capacity ? '#ff4d4f' : 'var(--color-primary)'}
                style={{ maxWidth: 500 }}
              />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="需求统计" span={2}>
            <Space size="large">
              <span>Feature: <strong style={{ color: 'var(--color-primary)', fontSize: 16 }}>{data.featureCount}</strong></span>
              <span>Story: <strong style={{ color: '#52c41a', fontSize: 16 }}>{data.storyCount}</strong></span>
              <span>Task: <strong style={{ color: '#faad14', fontSize: 16 }}>{data.taskCount}</strong></span>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>
            {data.description}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default PlanNameView
