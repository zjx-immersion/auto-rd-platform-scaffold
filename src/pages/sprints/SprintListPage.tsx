/**
 * C4迭代执行 - 列表页面
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Tag, Button, Progress } from 'antd'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import ListPage from '@/components/common/ListPage'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockSprints, type Sprint } from '@/mock/sprints'
import { mockListQuery } from '@/utils/mockData'

export const SprintListPage: React.FC = () => {
  const { openDetail, selectedTertiaryItem } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Sprint[]>([])
  const [total, setTotal] = useState(0)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({ page: 1, pageSize: 10 })

  // 根据三级导航筛选数据
  const filteredSprints = useMemo(() => {
    let filtered = mockSprints

    // 根据三级导航筛选
    switch (selectedTertiaryItem) {
      case 'all':
        // 全部迭代 - 不筛选
        break
      case 'active':
        // 进行中
        filtered = filtered.filter(s => s.status === '进行中')
        break
      case 'planning':
        // 规划中
        filtered = filtered.filter(s => s.status === '未开始')
        break
      case 'completed':
        // 已完成
        filtered = filtered.filter(s => s.status === '已完成')
        break
      default:
        break
    }

    return filtered
  }, [selectedTertiaryItem])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await mockListQuery(filteredSprints, queryParams)
      setDataSource(result.list)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [queryParams, filteredSprints])

  useEffect(() => { loadData() }, [loadData])

  // 渲染内容
  const renderContent = () => {
    // 默认显示列表
    return renderSprintList()
  }

  const renderSprintList = () => {
    const columns: TableColumn<Sprint>[] = [
      { key: 'code', title: 'Sprint编号', dataIndex: 'code', width: 150, sorter: true },
      {
        key: 'name',
        title: 'Sprint名称',
        dataIndex: 'name',
        width: 180,
        sorter: true,
        render: (text: string, record: Sprint) => (
          <Button type="link" onClick={() => openDetail(record.id)}>{text}</Button>
        ),
      },
      {
        key: 'status',
        title: '状态',
        dataIndex: 'status',
        width: 100,
        filters: [
          { text: '未开始', value: '未开始' },
          { text: '进行中', value: '进行中' },
          { text: '已完成', value: '已完成' },
          { text: '已延期', value: '已延期' },
        ],
        render: (status: string) => {
          const colorMap: Record<string, string> = { '未开始': 'default', '进行中': 'blue', '已完成': 'green', '已延期': 'red' }
          return <Tag color={colorMap[status]}>{status}</Tag>
        },
      },
      {
        key: 'progress',
        title: '进度',
        dataIndex: 'progress',
        width: 150,
        sorter: true,
        render: (progress: number) => <Progress percent={progress} size="small" />,
      },
      {
        key: 'taskCompleted',
        title: '任务完成',
        dataIndex: ['taskCompleted', 'taskTotal'],
        width: 120,
        render: (_, record) => `${record.taskCompleted}/${record.taskTotal}`,
      },
      { key: 'teamSize', title: '团队规模', dataIndex: 'teamSize', width: 100, sorter: true },
      { key: 'owner', title: '负责人', dataIndex: 'owner', width: 140 },
      { key: 'project', title: '所属项目', dataIndex: 'project', width: 150 },
      { key: 'startDate', title: '开始时间', dataIndex: 'startDate', width: 120, sorter: true },
      { key: 'endDate', title: '结束时间', dataIndex: 'endDate', width: 120, sorter: true },
    ]

    const filters: FilterConfig[] = [
      {
        key: 'status',
        label: '状态',
        type: 'select',
        options: [
          { label: '未开始', value: '未开始' },
          { label: '进行中', value: '进行中' },
          { label: '已完成', value: '已完成' },
          { label: '已延期', value: '已延期' },
        ],
      },
    ]

    const actions: ActionButton[] = [
      { key: 'view', label: '查看', icon: <EyeOutlined />, onClick: (record) => openDetail(record.id) },
      { key: 'edit', label: '编辑', icon: <EditOutlined />, onClick: (record) => console.log('编辑', record) },
    ]

    return (
      <ListPage<Sprint>
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

export default SprintListPage
