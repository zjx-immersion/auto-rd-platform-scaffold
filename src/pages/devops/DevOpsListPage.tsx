/**
 * DevOps页面 - 管道、制品、部署管理
 */

import React, { useState } from 'react'
import { Card, Tabs, Table, Tag, Progress, Statistic, Row, Col, Timeline, Button, Space, Badge } from 'antd'
import {
  RocketOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  CloudUploadOutlined,
  CodeOutlined,
  BoxPlotOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons'

const DevOps: React.FC = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null)

  // 管道数据
  const pipelineData = [
    {
      id: 'pipeline-1',
      name: 'NOA-LKA-Module-CI/CD',
      product: '城市NOA',
      module: 'LKA模块',
      status: 'running',
      duration: '15min',
      startTime: '2026-01-25 10:30',
      buildNumber: '#125',
      branch: 'feature/lka-v2.1',
      commit: 'feat: LKA车道保持优化',
    },
    {
      id: 'pipeline-2',
      name: 'NOA-ACC-Module-CI/CD',
      product: '城市NOA',
      module: 'ACC模块',
      status: 'success',
      duration: '12min',
      startTime: '2026-01-25 09:45',
      buildNumber: '#89',
      branch: 'main',
      commit: 'fix: ACC速度控制修复',
    },
    {
      id: 'pipeline-3',
      name: 'Cabin-Voice-Module-CI/CD',
      product: '智能座舱',
      module: '语音识别',
      status: 'failed',
      duration: '8min',
      startTime: '2026-01-25 08:15',
      buildNumber: '#47',
      branch: 'feature/voice-v3',
      commit: 'feat: 新增语音指令',
    },
  ]

  // 制品数据
  const artifactData = [
    {
      id: 'artifact-1',
      name: 'noa-lka-module-v2.1.0.so',
      product: '城市NOA',
      version: 'V2.1.0',
      size: '15.2 MB',
      uploadTime: '2026-01-25 10:45',
      status: 'verified',
    },
    {
      id: 'artifact-2',
      name: 'noa-acc-module-v1.8.3.so',
      product: '城市NOA',
      version: 'V1.8.3',
      size: '12.8 MB',
      uploadTime: '2026-01-25 09:57',
      status: 'verified',
    },
    {
      id: 'artifact-3',
      name: 'cabin-voice-module-v3.0.1.so',
      product: '智能座舱',
      version: 'V3.0.1',
      size: '8.5 MB',
      uploadTime: '2026-01-25 08:23',
      status: 'failed',
    },
  ]

  // 部署数据
  const deploymentData = [
    {
      id: 'deploy-1',
      version: 'V2.1.0',
      environment: '生产',
      status: 'running',
      progress: 60,
      startTime: '2026-01-25 11:00',
      duration: '25min',
      type: '蓝绿部署',
    },
    {
      id: 'deploy-2',
      version: 'V2.1.0',
      environment: '预生产',
      status: 'success',
      progress: 100,
      startTime: '2026-01-24 16:00',
      duration: '15min',
      type: '滚动部署',
    },
    {
      id: 'deploy-3',
      version: 'V2.1.0',
      environment: '测试',
      status: 'success',
      progress: 100,
      startTime: '2026-01-23 14:00',
      duration: '12min',
      type: '全量部署',
    },
  ]

  // 管道列表列定义
  const pipelineColumns = [
    {
      title: '流水线名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text: string, record: any) => (
        <Space>
          <CodeOutlined />
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {record.buildNumber} - {record.branch}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: '产品/模块',
      key: 'product',
      width: 200,
      render: (_: any, record: any) => (
        <div>
          <div>{record.product}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{record.module}</div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const config = {
          running: { icon: <SyncOutlined spin />, color: 'processing', text: '运行中' },
          success: { icon: <CheckCircleOutlined />, color: 'success', text: '成功' },
          failed: { icon: <CloseCircleOutlined />, color: 'error', text: '失败' },
        }[status]
        return <Tag icon={config?.icon} color={config?.color}>{config?.text}</Tag>
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 150,
    },
    {
      title: '耗时',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small">日志</Button>
        </Space>
      ),
    },
  ]

  // 制品列定义
  const artifactColumns = [
    {
      title: '制品名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text: string) => (
        <Space>
          <BoxPlotOutlined />
          <span style={{ fontFamily: 'monospace' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '产品',
      dataIndex: 'product',
      key: 'product',
      width: 150,
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 120,
      render: (version: string) => <Tag color="blue">{version}</Tag>,
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const config = {
          verified: { color: 'success', text: '已验证' },
          failed: { color: 'error', text: '验证失败' },
        }[status]
        return <Tag color={config?.color}>{config?.text}</Tag>
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Space>
          <Button type="link" size="small">下载</Button>
          <Button type="link" size="small">详情</Button>
        </Space>
      ),
    },
  ]

  // 部署列定义
  const deploymentColumns = [
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 120,
      render: (version: string) => (
        <Space>
          <DeploymentUnitOutlined />
          <Tag color="purple">{version}</Tag>
        </Space>
      ),
    },
    {
      title: '环境',
      dataIndex: 'environment',
      key: 'environment',
      width: 100,
      render: (env: string) => (
        <Tag color={env === '生产' ? 'red' : env === '预生产' ? 'orange' : 'blue'}>{env}</Tag>
      ),
    },
    {
      title: '部署方式',
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string, record: any) => {
        if (status === 'running') {
          return (
            <div>
              <Tag icon={<SyncOutlined spin />} color="processing">进行中</Tag>
              <Progress percent={record.progress} size="small" style={{ width: 100 }} />
            </div>
          )
        }
        return <Tag icon={<CheckCircleOutlined />} color="success">成功</Tag>
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 150,
    },
    {
      title: '耗时',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">详情</Button>
          {record.status === 'running' && <Button type="link" size="small" danger>暂停</Button>}
        </Space>
      ),
    },
  ]

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* 页头 */}
      <div style={{ padding: 24, background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <Space align="center">
          <RocketOutlined style={{ fontSize: 32, color: '#1890ff' }} />
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>DevOps</h2>
            <p style={{ color: '#666', marginBottom: 0 }}>流水线、制品、部署管理 | C5+C6 | S7/S8/S9阶段</p>
          </div>
        </Space>
      </div>

      {/* 统计卡片 */}
      <div style={{ padding: 24, background: '#f0f2f5' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="流水线总数"
                value={pipelineData.length}
                suffix="个"
                prefix={<CodeOutlined />}
                styles={{ content: {color: '#1890ff'} }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="运行中"
                value={pipelineData.filter(p => p.status === 'running').length}
                suffix="个"
                prefix={<SyncOutlined spin />}
                styles={{ content: {color: '#faad14'} }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="制品数量"
                value={artifactData.length}
                suffix="个"
                prefix={<BoxPlotOutlined />}
                styles={{ content: {color: '#52c41a'} }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="部署中"
                value={deploymentData.filter(d => d.status === 'running').length}
                suffix="个"
                prefix={<DeploymentUnitOutlined />}
                styles={{ content: {color: '#722ed1'} }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 主内容区 */}
      <div style={{ flex: 1, padding: 24, overflow: 'auto', background: '#f0f2f5' }}>
        <Card>
          <Tabs
            items={[
              {
                key: 'pipeline',
                label: (
                  <Badge count={pipelineData.filter(p => p.status === 'running').length} offset={[10, 0]}>
                    <span>流水线</span>
                  </Badge>
                ),
                children: (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <Space>
                        <Button type="primary">触发构建</Button>
                        <Button>刷新</Button>
                      </Space>
                    </div>
                    <Table
                      columns={pipelineColumns}
                      dataSource={pipelineData}
                      rowKey="id"
                      pagination={{ pageSize: 10 }}
                    />
                  </div>
                ),
              },
              {
                key: 'artifact',
                label: '制品',
                children: (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <Space>
                        <Button type="primary" icon={<CloudUploadOutlined />}>上传制品</Button>
                        <Button>筛选</Button>
                      </Space>
                    </div>
                    <Table
                      columns={artifactColumns}
                      dataSource={artifactData}
                      rowKey="id"
                      pagination={{ pageSize: 10 }}
                    />
                  </div>
                ),
              },
              {
                key: 'deployment',
                label: (
                  <Badge count={deploymentData.filter(d => d.status === 'running').length} offset={[10, 0]}>
                    <span>部署管理</span>
                  </Badge>
                ),
                children: (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <Space>
                        <Button type="primary" icon={<DeploymentUnitOutlined />}>新建部署</Button>
                        <Button>刷新</Button>
                      </Space>
                    </div>
                    <Table
                      columns={deploymentColumns}
                      dataSource={deploymentData}
                      rowKey="id"
                      pagination={{ pageSize: 10 }}
                    />
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </div>
  )
}

export default DevOps
export { DevOps }
