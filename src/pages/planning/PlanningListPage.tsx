/**
 * PlanningListPage - 规划协调列表页面
 * C3: 迭代规划管理列表视图
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Tag, Progress, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import ListPage from '@/components/common/ListPage'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockPlans, type IterationPlan } from '@/mock/planning'
import { mockListQuery } from '@/utils/mockData'
import './PlanningListPage.css'

export const PlanningListPage: React.FC = () => {
  const navigate = useNavigate()
  const { selectedTertiaryItem } = useNavigation()
  const [dataSource, setDataSource] = useState<IterationPlan[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({
    page: 1,
    pageSize: 10,
  })

  // 根据三级导航筛选数据
  const filteredPlans = useMemo(() => {
    let filtered = mockPlans

    // 根据三级导航筛选
    switch (selectedTertiaryItem) {
      case 'all':
        // 全部迭代规划 - 不筛选
        break
      case 'my':
        // 我的迭代规划 - 筛选owner
        filtered = filtered.filter(p => p.owner === '张三') // TODO: 使用实际当前用户
        break
      case 'control-team':
        // 规控团队
        filtered = filtered.filter(p => p.team === '规控团队')
        break
      case 'e2e-team':
        // 端到端团队
        filtered = filtered.filter(p => p.team === '端到端团队')
        break
      case 'data-platform-team':
        // 数据平台团队
        filtered = filtered.filter(p => p.team === '数据平台团队')
        break
      default:
        break
    }

    return filtered
  }, [selectedTertiaryItem])

  const loadData = useCallback(async () => {
    setLoading(true)
    // 模拟API调用
    const result = await mockListQuery(filteredPlans, queryParams)
    setDataSource(result.list)
    setTotal(result.total)
    setLoading(false)
  }, [queryParams, filteredPlans])

  useEffect(() => {
    loadData()
  }, [loadData])

  // 渲染内容
  const renderContent = () => {
    // 对于未实现的团队筛选，显示占位符
    if (selectedTertiaryItem && !['all', 'my'].includes(selectedTertiaryItem) && dataSource.length === 0) {
      const tabTitles: Record<string, string> = {
        'control-team': '规控团队',
        'e2e-team': '端到端团队',
        'data-platform-team': '数据平台团队',
      }
      return (
        <div className="planning-list-page">
          <EmptyPlaceholder
            title={tabTitles[selectedTertiaryItem] || '暂无数据'}
            description="该团队暂无迭代规划..."
          />
        </div>
      )
    }

    return renderPlanningList()
  }

  const renderPlanningList = () => {
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
        render: (text: string, record: IterationPlan) => (
          <Button type="link" onClick={() => navigate(`/c3/${record.id}/iteration-plan`)}>
            {text}
          </Button>
        ),
      },
      {
        key: 'status',
        title: '状态',
        dataIndex: 'status',
        width: 120,
        filters: [
          { text: '规划中', value: '规划中' },
          { text: '进行中', value: '进行中' },
          { text: '已完成', value: '已完成' },
        ],
        render: (status: string) => {
          const statusMap: Record<string, { color: string; text: string }> = {
            '规划中': { color: 'blue', text: '规划中' },
            '进行中': { color: 'green', text: '进行中' },
            '已完成': { color: 'default', text: '已完成' },
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
        key: 'team',
        title: '团队',
        dataIndex: 'team',
        width: 150,
      },
      {
        key: 'owner',
        title: '负责人',
        dataIndex: 'owner',
        width: 120,
      },
      {
        key: 'startDate',
        title: '开始日期',
        dataIndex: 'startDate',
        width: 120,
      },
      {
        key: 'endDate',
        title: '结束日期',
        dataIndex: 'endDate',
        width: 120,
      },
    ]

    // 筛选器配置
    const filters: FilterConfig[] = [
      {
        key: 'status',
        label: '状态',
        type: 'select',
        options: [
          { label: '规划中', value: '规划中' },
          { label: '进行中', value: '进行中' },
          { label: '已完成', value: '已完成' },
        ],
        placeholder: '请选择状态',
      },
    ]

    // 操作按钮配置
    const actions: ActionButton[] = [
      {
        key: 'view',
        label: '查看详情',
        onClick: (record) => navigate(`/c3/${record.id}/iteration-plan`),
      },
    ]

    return (
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
      />
    )
  }

  return renderContent()
}

export default PlanningListPage
