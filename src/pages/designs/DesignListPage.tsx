/**
 * C2方案设计 - 列表页面
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Tag, Button } from 'antd'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import ListPage from '@/components/common/ListPage'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockDesigns, type Design } from '@/mock/designs'
import { mockListQuery } from '@/utils/mockData'

export const DesignListPage: React.FC = () => {
  const { openDetail } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Design[]>([])
  const [total, setTotal] = useState(0)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({ page: 1, pageSize: 10 })

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await mockListQuery(mockDesigns, queryParams)
      setDataSource(result.list)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [queryParams])

  useEffect(() => { loadData() }, [loadData])

  const columns: TableColumn<Design>[] = [
    { key: 'code', title: '设计编号', dataIndex: 'code', width: 150, sorter: true },
    {
      key: 'name',
      title: '设计名称',
      dataIndex: 'name',
      width: 200,
      sorter: true,
      render: (text: string, record: Design) => (
        <Button type="link" onClick={() => openDetail(record.id)}>{text}</Button>
      ),
    },
    {
      key: 'type',
      title: '类型',
      dataIndex: 'type',
      width: 120,
      filters: [
        { text: '架构设计', value: '架构设计' },
        { text: '组件设计', value: '组件设计' },
        { text: '接口设计', value: '接口设计' },
      ],
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 120,
      filters: [
        { text: '草稿', value: '草稿' },
        { text: '设计中', value: '设计中' },
        { text: '评审中', value: '评审中' },
        { text: '已评审', value: '已评审' },
        { text: '已发布', value: '已发布' },
      ],
      render: (status: string) => <Tag color="blue">{status}</Tag>,
    },
    { key: 'designer', title: '设计师', dataIndex: 'designer', width: 120 },
    { key: 'project', title: '所属项目', dataIndex: 'project', width: 150 },
    { key: 'version', title: '版本', dataIndex: 'version', width: 100 },
    { key: 'createdAt', title: '创建时间', dataIndex: 'createdAt', width: 120, sorter: true },
  ]

  const filters: FilterConfig[] = [
    {
      key: 'type',
      label: '类型',
      type: 'select',
      options: [
        { label: '架构设计', value: '架构设计' },
        { label: '组件设计', value: '组件设计' },
        { label: '接口设计', value: '接口设计' },
      ],
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '草稿', value: '草稿' },
        { label: '设计中', value: '设计中' },
        { label: '评审中', value: '评审中' },
        { label: '已评审', value: '已评审' },
        { label: '已发布', value: '已发布' },
      ],
    },
  ]

  const actions: ActionButton[] = [
    { key: 'view', label: '查看', icon: <EyeOutlined />, onClick: (record) => openDetail(record.id) },
    { key: 'edit', label: '编辑', icon: <EditOutlined />, onClick: (record) => console.log('编辑', record) },
  ]

  return (
    <ListPage<Design>
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

export default DesignListPage
