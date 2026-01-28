/**
 * PlanTemplateView - 规划模版视图
 * 管理和应用迭代规划模版
 */

import React from 'react'
import { Card, Button, Space, Empty } from 'antd'
import { FileTextOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons'
import './PlanTemplateView.css'

const PlanTemplateView: React.FC = () => {
  const templates = [
    {
      id: 'template-001',
      name: '标准迭代规划模版',
      description: '适用于常规功能开发的标准迭代规划模版',
      featureCount: 8,
      storyCount: 32,
      duration: '3个月',
    },
    {
      id: 'template-002',
      name: '短周期冲刺模版',
      description: '适用于紧急需求或小型功能的短周期迭代模版',
      featureCount: 3,
      storyCount: 12,
      duration: '1个月',
    },
    {
      id: 'template-003',
      name: '大型项目规划模版',
      description: '适用于跨团队协作的大型项目迭代规划',
      featureCount: 15,
      storyCount: 60,
      duration: '6个月',
    },
  ]

  return (
    <div className="plan-template-view">
      <div className="template-header">
        <div className="header-title">
          <FileTextOutlined style={{ marginRight: 8 }} />
          <span>规划模版管理</span>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          创建模版
        </Button>
      </div>

      <div className="template-grid">
        {templates.map((template) => (
          <Card
            key={template.id}
            title={template.name}
            extra={
              <Space>
                <Button
                  type="link"
                  size="small"
                  icon={<CopyOutlined />}
                >
                  应用
                </Button>
              </Space>
            }
            className="template-card"
            hoverable
          >
            <p className="template-description">{template.description}</p>
            <div className="template-stats">
              <div className="stat-item">
                <span className="stat-label">Feature数量:</span>
                <span className="stat-value">{template.featureCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Story数量:</span>
                <span className="stat-value">{template.storyCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">建议周期:</span>
                <span className="stat-value">{template.duration}</span>
              </div>
            </div>
            <div className="template-actions">
              <Button size="small">查看详情</Button>
              <Button size="small">编辑</Button>
              <Button size="small" danger>删除</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card
        title="自定义模版"
        style={{ marginTop: 24 }}
      >
        <Empty
          image={<FileTextOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />}
          description="暂无自定义模版"
        >
          <Button type="primary" icon={<PlusOutlined />}>
            创建第一个自定义模版
          </Button>
        </Empty>
      </Card>
    </div>
  )
}

export default PlanTemplateView
