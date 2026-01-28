/**
 * PlanningListPage - 规划协调列表页面
 * C3: 迭代规划管理列表视图
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Tag, Progress, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import ListPage from '@/components/common/ListPage'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockPlans, type IterationPlan } from '@/mock/planning'
import { mockListQuery } from '@/utils/mockData'
import './PlanningListPage.css'

export const PlanningListPage: React.FC = () => {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState<IterationPlan[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({
    page: 1,
    pageSize: 10,
  })

  const loadData = useCallback(async () => {
    setLoading(true)
    // 模拟API调用
    const result = await mockListQuery(mockPlans, queryParams)
    setDataSource(result.list)
    setTotal(result.total)
    setLoading(false)
  }, [queryParams])

  useEffect(() => {
    loadData()
  }, [loadData])

  // 表格列定义
  const columns: TableColumn<IterationPlan>[] = [
    {
      key: 'code',
      title: '规划编码',
      dataIndex: 'code',
      width: 150,
    },
    {
      key: 'name',
      title: '规划名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      key: 'teamName',
      title: '团队',
      dataIndex: 'teamName',
      width: 120,
      render: (_, record) => {
        const teamTypeMap: Record<string, { color: string; icon: string }> = {
          control: { color: 'blue', icon: '🎯' },
          'e2e': { color: 'purple', icon: '🔗' },
          'data-platform': { color: 'cyan', icon: '📊' },
          other: { color: 'default', icon: '📁' },
        }
        const config = teamTypeMap[record.teamType] || teamTypeMap.other
        return (
          <span>
            <span style={{ marginRight: 4 }}>{config.icon}</span>
            <Tag color={config.color}>{record.teamName}</Tag>
          </span>
        )
      },
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          planning: { color: 'blue', text: '规划中' },
          active: { color: 'green', text: '进行中' },
          completed: { color: 'default', text: '已完成' },
        }
        const config = statusMap[status] || { color: 'default', text: status }
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      key: 'progress',
      title: '进度',
      dataIndex: 'progress',
      width: 150,
      render: (progress: number) => <Progress percent={progress} size="small" />,
    },
    {
      key: 'capacity',
      title: '容量/已分配',
      width: 150,
      render: (_, record) => {
        const percentage = Math.round((record.allocated / record.capacity) * 100)
        return (
          <div>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              {record.allocated} / {record.capacity} 人天
            </div>
            <Progress percent={percentage} size="small" />
          </div>
        )
      },
    },
    {
      key: 'velocity',
      title: '速率',
      dataIndex: 'velocity',
      width: 80,
      render: (velocity: number) => (
        <span style={{ color: velocity > 80 ? '#52c41a' : '#faad14' }}>
          {velocity}%
        </span>
      ),
    },
    {
      key: 'memberCount',
      title: '成员数',
      dataIndex: 'memberCount',
      width: 80,
      align: 'center',
    },
    {
      key: 'features',
      title: 'Feature/Story',
      width: 130,
      render: (_, record) => (
        <div style={{ fontSize: 12 }}>
          <div>Feature: {record.featureCount}</div>
          <div style={{ color: '#666' }}>Story: {record.storyCount}</div>
        </div>
      ),
    },
    {
      key: 'startDate',
      title: '开始日期',
      dataIndex: 'startDate',
      width: 110,
    },
    {
      key: 'endDate',
      title: '结束日期',
      dataIndex: 'endDate',
      width: 110,
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
      width: 200,
    },
  ]

  // 筛选条件
  const filters: FilterConfig[] = [
    {
      key: 'teamType',
      type: 'select',
      label: '团队类型',
      options: [
        { label: '全部', value: '' },
        { label: '规控团队', value: 'control' },
        { label: '端到端团队', value: 'e2e' },
        { label: '数据平台团队', value: 'data-platform' },
      ],
    },
    {
      key: 'status',
      type: 'select',
      label: '状态',
      options: [
        { label: '全部', value: '' },
        { label: '规划中', value: 'planning' },
        { label: '进行中', value: 'active' },
        { label: '已完成', value: 'completed' },
      ],
    },
    {
      key: 'keyword',
      type: 'input',
      label: '关键词',
      placeholder: '搜索规划名称或编码',
    },
  ]

  // 操作按钮
  const actions: ActionButton[] = [
    {
      key: 'create',
      label: '创建迭代规划',
      type: 'primary',
      onClick: () => {
        console.log('创建迭代规划')
      },
    },
    {
      key: 'template',
      label: '规划模版',
      type: 'default',
      onClick: () => {
        console.log('规划模版')
      },
    },
    {
      key: 'export',
      label: '导出',
      type: 'default',
      onClick: () => {
        console.log('导出数据')
      },
    },
  ]

  return (
    <div className="planning-list-page">
      <ListPage<IterationPlan>
        dataSource={dataSource}
        total={total}
        columns={columns}
        filters={filters}
        actions={actions}
        loading={loading}
        queryParams={queryParams}
        onQueryChange={(params) => setQueryParams(params)}
        onRefresh={loadData}
        customActions={(record) => (
          <Button
            type="link"
            onClick={() => {
              // 点击查看进入详情页，默认显示第一个Tab（plan-name）
              navigate(`/c3/${record.id}/plan-name`)
            }}
          >
            查看详情
          </Button>
        )}
      />
    </div>
  )
}

export default PlanningListPage
