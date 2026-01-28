/**
 * C3开发执行 - 列表页面
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Tag, Button, Progress } from 'antd'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import ListPage from '@/components/common/ListPage'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockSprints, type Sprint } from '@/mock/sprints'
import { mockListQuery } from '@/utils/mockData'

export const SprintListPage: React.FC = () => {
  const { openDetail } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Sprint[]>([])
  const [total, setTotal] = useState(0)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({ page: 1, pageSize: 10 })

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await mockListQuery(mockSprints, queryParams)
      setDataSource(result.list)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [queryParams])

  useEffect(() => { loadData() }, [loadData])

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

export default SprintListPage
