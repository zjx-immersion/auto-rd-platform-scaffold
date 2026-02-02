/**
 * 产品迭代计划视图
 * 以产品为主视角的多迭代周期计划
 * 横轴：时间轴（迭代周期）
 * 纵轴：模块团队
 */

import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Card, Row, Col, Select, Table, Tag, Space, Divider } from 'antd'
import {
  TeamOutlined,
  RocketOutlined,
  FlagOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import type { UserRole } from '@/types/domain' // Fixed import path if needed, or assume global types
// If domain types are missing, define here or import from checking
import { SprintKanbanView } from './SprintKanbanView'

// 临时解决 import type error
interface UserRole {
  id: string;
  name: string;
}

const ProductIterationPlan: React.FC = () => {
  const { currentRole } = useOutletContext<{ currentRole: UserRole; currentWorkspace: string }>()

  const [viewMode, setViewMode] = useState<'matrix' | 'kanban'>('matrix')
  const [selectedProduct, setSelectedProduct] = useState('p-noa')
  const [selectedVersion, setSelectedVersion] = useState('pv-noa-1.1')

  // 模拟数据：产品选项
  const productOptions = [
    { value: 'p-noa', label: '城市NOA' },
    { value: 'p-apa', label: '自动泊车' },
    { value: 'p-hnoa', label: '高速NOA' },
  ]

  // 模拟数据：版本选项
  const versionOptions = [
    { value: 'pv-noa-1.0', label: 'V1.0' },
    { value: 'pv-noa-1.1', label: 'V1.1' },
    { value: 'pv-noa-2.0', label: 'V2.0' },
  ]

  // 模拟数据：时间轴（迭代周期）
  const iterations = [
    { id: 'sprint-2026-01', name: '2026年1月', period: '2026-01-06 ~ 2026-01-31' },
    { id: 'sprint-2026-02', name: '2026年2月', period: '2026-02-01 ~ 2026-02-28' },
    { id: 'sprint-2026-03', name: '2026年3月', period: '2026-03-01 ~ 2026-03-31' },
    { id: 'sprint-2026-04', name: '2026年4月', period: '2026-04-01 ~ 2026-04-30' },
    { id: 'sprint-2026-05', name: '2026年5月', period: '2026-05-01 ~ 2026-05-31' },
    { id: 'sprint-2026-06', name: '2026年6月', period: '2026-06-01 ~ 2026-06-30' },
  ]

  // 模拟数据：里程碑和Gateway（与迭代对齐）
  const milestones = [
    { id: 'ms-vff', name: 'VFF', date: '2025-12-15', iteration: 'sprint-2026-01', type: 'milestone' },
    { id: 'gw-g2', name: 'G2-需求评审', date: '2026-02-15', iteration: 'sprint-2026-02', type: 'gateway' },
    { id: 'gw-g3', name: 'G3-设计评审', date: '2026-03-30', iteration: 'sprint-2026-03', type: 'gateway' },
    { id: 'ms-sop', name: 'SOP', date: '2026-06-30', iteration: 'sprint-2026-06', type: 'milestone' },
  ]

  // 模拟数据：团队迭代计划
  const teamPlans = [
    {
      team: '感知团队',
      teamId: 'team-perception',
      sprints: [
        { iterationId: 'sprint-2026-01', mrs: ['MR-LKA-P-001', 'MR-ACC-P-001'], completion: 95 },
        { iterationId: 'sprint-2026-02', mrs: ['MR-AEB-P-001'], completion: 70 },
        { iterationId: 'sprint-2026-03', mrs: ['MR-LKA-P-002'], completion: 50 },
        { iterationId: 'sprint-2026-04', mrs: ['MR-APA-P-001'], completion: 30 },
        { iterationId: 'sprint-2026-05', mrs: ['MR-ACC-P-002'], completion: 0 },
        { iterationId: 'sprint-2026-06', mrs: [], completion: 0 },
      ],
    },
    {
      team: '规划团队',
      teamId: 'team-planning',
      sprints: [
        { iterationId: 'sprint-2026-01', mrs: [], completion: 0 },
        { iterationId: 'sprint-2026-02', mrs: ['MR-ACC-PL-001'], completion: 80 },
        { iterationId: 'sprint-2026-03', mrs: ['MR-APA-PL-001'], completion: 60 },
        { iterationId: 'sprint-2026-04', mrs: ['MR-APA-PL-002'], completion: 40 },
        { iterationId: 'sprint-2026-05', mrs: ['MR-NOA-PL-001'], completion: 20 },
        { iterationId: 'sprint-2026-06', mrs: [], completion: 0 },
      ],
    },
    {
      team: '控制团队',
      teamId: 'team-control',
      sprints: [
        { iterationId: 'sprint-2026-01', mrs: ['MR-LKA-C-001'], completion: 75 },
        { iterationId: 'sprint-2026-02', mrs: ['MR-ACC-C-001'], completion: 65 },
        { iterationId: 'sprint-2026-03', mrs: ['MR-AEB-C-001'], completion: 55 },
        { iterationId: 'sprint-2026-04', mrs: ['MR-LKA-C-002'], completion: 35 },
        { iterationId: 'sprint-2026-05', mrs: ['MR-ACC-C-002'], completion: 15 },
        { iterationId: 'sprint-2026-06', mrs: [], completion: 0 },
      ],
    },
    {
      team: '地图定位团队',
      teamId: 'team-map',
      sprints: [
        { iterationId: 'sprint-2026-01', mrs: [], completion: 0 },
        { iterationId: 'sprint-2026-02', mrs: ['MR-MAP-001'], completion: 85 },
        { iterationId: 'sprint-2026-03', mrs: ['MR-MAP-002'], completion: 70 },
        { iterationId: 'sprint-2026-04', mrs: ['MR-LOC-001'], completion: 50 },
        { iterationId: 'sprint-2026-05', mrs: ['MR-MAP-003'], completion: 25 },
        { iterationId: 'sprint-2026-06', mrs: [], completion: 0 },
      ],
    },
  ]

  // 构建表格列（横轴：迭代）
  const columns = [
    {
      title: '团队',
      dataIndex: 'team',
      key: 'team',
      fixed: 'left' as const,
      width: 150,
      render: (text: string) => (
        <Space>
          <TeamOutlined />
          <span style={{ fontWeight: 600 }}>{text}</span>
        </Space>
      ),
    },
    ...iterations.map(iter => ({
      title: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600 }}>{iter.name}</div>
          <div style={{ fontSize: 11, color: '#999' }}>{iter.period}</div>
        </div>
      ),
      dataIndex: iter.id,
      key: iter.id,
      width: 180,
      render: (_: any, record: any) => {
        const sprint = record.sprints.find((s: any) => s.iterationId === iter.id)
        if (!sprint || sprint.mrs.length === 0) {
          return <div style={{ textAlign: 'center', color: '#ccc' }}>-</div>
        }
        return (
          <div style={{ padding: '4px 0' }}>
            <Space orientation="vertical" size="small" style={{ width: '100%' }}>
              {sprint.mrs.map((mr: string) => (
                <Tag key={mr} color="blue" style={{ margin: 0 }}>
                  {mr}
                </Tag>
              ))}
              <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
                完成度: {sprint.completion}%
              </div>
            </Space>
          </div>
        )
      },
    })),
  ]

  // 渲染矩阵视图（原内容）
  const renderMatrixView = () => (
    <Card>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题和选择器 */}
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <RocketOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              <span style={{ fontSize: 20, fontWeight: 600 }}>产品迭代计划视图</span>
            </Space>
          </Col>
          <Col>
            <Space>
              {/* 视图切换 */}
              <Tag.CheckableTag
                checked={viewMode === 'matrix'}
                onChange={() => setViewMode('matrix')}
              >
                矩阵视图
              </Tag.CheckableTag>
              <Tag.CheckableTag
                checked={viewMode === 'kanban'}
                onChange={() => setViewMode('kanban')}
              >
                看板视图
              </Tag.CheckableTag>
              <Divider type="vertical" />
              <span>产品：</span>
              <Select
                value={selectedProduct}
                onChange={setSelectedProduct}
                style={{ width: 150 }}
                options={productOptions}
              />
              {/* ... existing selectors ... */}
              <span>版本：</span>
              <Select
                value={selectedVersion}
                onChange={setSelectedVersion}
                style={{ width: 120 }}
                options={versionOptions}
              />
            </Space>
          </Col>
        </Row>

        <Divider />
        {/* ... existing matrix content ... */}
        {/* 里程碑对齐轴 - 横排显示且对齐迭代列 */}
        <Card size="small" title="🎯 关键里程碑与Gateway" style={{ background: '#fafafa', marginBottom: 16 }}>
          {/* ... content of milestones ... */}
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ width: 150, flexShrink: 0 }}></div>
            {iterations.map(iter => {
              const milestone = milestones.find(ms => ms.iteration === iter.id)
              return (
                <div key={iter.id} style={{ width: 180, textAlign: 'center', padding: '8px 0' }}>
                  {milestone ? (
                    <Space orientation="vertical" size="small">
                      {milestone.type === 'milestone' ? (
                        <FlagOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />
                      ) : (
                        <CheckCircleOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                      )}
                      <Tag
                        color={milestone.type === 'milestone' ? 'red' : 'blue'}
                        style={{ margin: 0 }}
                      >
                        {milestone.name}
                      </Tag>
                      <div style={{ fontSize: 11, color: '#999' }}>{milestone.date}</div>
                    </Space>
                  ) : (
                    <div style={{ height: 60 }}></div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* 团队迭代计划表格 */}
        <div style={{ background: '#fff' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontWeight: 600, fontSize: 14 }}>
            <TeamOutlined /> 团队迭代分工计划（模块需求排期）
          </div>
          <Table
            dataSource={teamPlans}
            columns={columns}
            rowKey="teamId"
            pagination={false}
            scroll={{ x: 1400 }}
            bordered
          />
        </div>

        {/* ... existing explanation ... */}
        {/* 说明 */}
        <Card size="small" style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}>
          <Space orientation="vertical" size="small">
            <div><strong>视图说明：</strong></div>
            <div>• <strong>横轴</strong>：产品版本的迭代周期（月度Sprint）</div>
            <div>• <strong>纵轴</strong>：各模块团队的迭代分工</div>
            <div>• <strong>里程碑对齐</strong>：产品迭代的关键里程碑（VFF、SOP等）与整车节点、Gateway对齐</div>
            <div>• <strong>模块需求</strong>：每个团队在每个迭代中计划的模块需求（MR）</div>
          </Space>
        </Card>
      </Space>
    </Card>
  )

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      {viewMode === 'matrix' ? renderMatrixView() : (
        <Card>
          <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <Space>
                <RocketOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                <span style={{ fontSize: 20, fontWeight: 600 }}>迭代执行看板</span>
              </Space>
            </Col>
            <Col>
              <Space>
                <Tag.CheckableTag
                  checked={viewMode === 'matrix'}
                  onChange={() => setViewMode('matrix')}
                >
                  矩阵视图
                </Tag.CheckableTag>
                <Tag.CheckableTag
                  checked={viewMode === 'kanban'}
                  onChange={() => setViewMode('kanban')}
                >
                  看板视图
                </Tag.CheckableTag>
              </Space>
            </Col>
          </Row>
          <Divider />
          <SprintKanbanView planId="" />
        </Card>
      )}
    </div>
  )
}

export default ProductIterationPlan
