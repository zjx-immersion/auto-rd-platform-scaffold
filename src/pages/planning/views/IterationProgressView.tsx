/**
 * IterationProgressView - 迭代进展视图
 * 展示燃尽图、速率图等进展数据
 */

import React, { useState } from 'react'
import { Tabs, Card, Row, Col, Statistic, Progress } from 'antd'
import { LineChartOutlined, BarChartOutlined, DashboardOutlined } from '@ant-design/icons'
import type { IterationPlan } from '@/mock/planning'
import './IterationProgressView.css'

interface IterationProgressViewProps {
  planId: string
  data: IterationPlan
}

const IterationProgressView: React.FC<IterationProgressViewProps> = ({ planId, data }) => {
  const [activeKey, setActiveKey] = useState('overview')

  // 计算统计数据
  const completedFeatures = Math.round(data.featureCount * data.progress / 100)
  const completedStories = Math.round(data.storyCount * data.progress / 100)
  const completedTasks = Math.round(data.taskCount * data.progress / 100)

  const tabItems = [
    {
      key: 'overview',
      label: (
        <span>
          <DashboardOutlined />
          进展概览
        </span>
      ),
      children: (
        <div className="tab-content">
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="整体进度"
                  value={data.progress}
                  suffix="%"
                  styles={{ content: {color: 'var(--color-primary)'} }}
                  prefix={<DashboardOutlined />}
                />
                <Progress percent={data.progress} strokeColor="var(--color-primary)" />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Feature完成率"
                  value={Math.round((completedFeatures / data.featureCount) * 100)}
                  suffix="%"
                  styles={{ content: {color: '#52c41a'} }}
                />
                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
                  {completedFeatures} / {data.featureCount} 已完成
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Story完成率"
                  value={Math.round((completedStories / data.storyCount) * 100)}
                  suffix="%"
                  styles={{ content: {color: '#faad14'} }}
                />
                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
                  {completedStories} / {data.storyCount} 已完成
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="任务完成率"
                  value={Math.round((completedTasks / data.taskCount) * 100)}
                  suffix="%"
                  styles={{ content: {color: '#722ed1'} }}
                />
                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
                  {completedTasks} / {data.taskCount} 已完成
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="团队速率">
                <Statistic
                  value={data.velocity}
                  suffix="%"
                  styles={{ content: {fontSize: 48,
                    color: data.velocity > 80 ? '#52c41a' : data.velocity > 60 ? '#faad14' : '#ff4d4f'} }}
                />
                <div style={{ marginTop: 16, color: '#8c8c8c' }}>
                  {data.velocity > 80 ? '团队速率良好，保持节奏' : 
                   data.velocity > 60 ? '团队速率正常，注意风险' : 
                   '团队速率偏低，需要调整'}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="容量利用率">
                <Statistic
                  value={Math.round((data.allocated / data.capacity) * 100)}
                  suffix="%"
                  styles={{ content: {fontSize: 48, color: 'var(--color-primary)'} }}
                />
                <Progress
                  percent={Math.round((data.allocated / data.capacity) * 100)}
                  strokeColor="var(--color-primary)"
                  style={{ marginTop: 16 }}
                />
                <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
                  已分配 {data.allocated} / {data.capacity} 人天
                </div>
              </Card>
            </Col>
          </Row>

          <Card title="时间进度" style={{ marginTop: 16 }}>
            <div className="time-progress">
              <div className="time-info">
                <span>开始日期: {data.startDate}</span>
                <span>结束日期: {data.endDate}</span>
              </div>
              <Progress
                percent={data.progress}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                style={{ marginTop: 16 }}
              />
              <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c', textAlign: 'center' }}>
                当前进度: {data.progress}%
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'burndown',
      label: (
        <span>
          <LineChartOutlined />
          燃尽图
        </span>
      ),
      children: (
        <div className="tab-content">
          <Card title="燃尽图">
            <p style={{ color: '#666' }}>
              燃尽图用于跟踪迭代中剩余工作量随时间的变化趋势，
              帮助团队及时发现进度风险并做出调整。
            </p>
            <div className="chart-placeholder">
              <LineChartOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />
              <div style={{ marginTop: 16, color: '#8c8c8c' }}>
                燃尽图功能开发中...
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#bfbfbf' }}>
                将集成 ECharts 实现数据可视化
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'velocity',
      label: (
        <span>
          <BarChartOutlined />
          速率图
        </span>
      ),
      children: (
        <div className="tab-content">
          <Card title="团队速率趋势">
            <p style={{ color: '#666' }}>
              速率图用于分析团队在多个迭代周期中的开发速率变化，
              帮助团队进行容量规划和效率优化。
            </p>
            <div className="chart-placeholder">
              <BarChartOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />
              <div style={{ marginTop: 16, color: '#8c8c8c' }}>
                速率图功能开发中...
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#bfbfbf' }}>
                将集成 ECharts 实现数据可视化
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div className="iteration-progress-view">
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={tabItems}
        className="progress-tabs"
      />
    </div>
  )
}

export default IterationProgressView
