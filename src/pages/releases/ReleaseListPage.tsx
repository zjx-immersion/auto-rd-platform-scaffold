/**
 * C5交付发布 - 列表页面
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Tag, Button } from 'antd'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import ListPage from '@/components/common/ListPage'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockReleases, type Release } from '@/mock/releases'
import { mockListQuery } from '@/utils/mockData'

export const ReleaseListPage: React.FC = () => {
  const { openDetail } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Release[]>([])
  const [total, setTotal] = useState(0)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({ page: 1, pageSize: 10 })

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await mockListQuery(mockReleases, queryParams)
      setDataSource(result.list)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [queryParams])

  useEffect(() => { loadData() }, [loadData])

  const columns: TableColumn<Release>[] = [
    { key: 'version', title: '版本号', dataIndex: 'version', width: 120, sorter: true },
    {
      key: 'name',
      title: '版本名称',
      dataIndex: 'name',
      width: 180,
      sorter: true,
      render: (text: string, record: Release) => (
        <Button type="link" onClick={() => openDetail(record.id)}>{text}</Button>
      ),
    },
    {
      key: 'type',
      title: '类型',
      dataIndex: 'type',
      width: 100,
      filters: [
        { text: 'Major', value: 'Major' },
        { text: 'Minor', value: 'Minor' },
        { text: 'Patch', value: 'Patch' },
      ],
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      filters: [
        { text: '计划中', value: '计划中' },
        { text: '开发中', value: '开发中' },
        { text: '测试中', value: '测试中' },
        { text: '待发布', value: '待发布' },
        { text: '已发布', value: '已发布' },
      ],
      render: (status: string) => {
        const colorMap: Record<string, string> = { '已发布': 'green', '待发布': 'blue', '测试中': 'orange', '开发中': 'default', '计划中': 'default' }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    {
      key: 'environment',
      title: '环境',
      dataIndex: 'environment',
      width: 100,
      filters: [
        { text: '开发', value: '开发' },
        { text: '测试', value: '测试' },
        { text: '预发布', value: '预发布' },
        { text: '生产', value: '生产' },
      ],
      render: (env: string) => {
        const colorMap: Record<string, string> = { '生产': 'red', '预发布': 'orange', '测试': 'blue', '开发': 'default' }
        return <Tag color={colorMap[env]}>{env}</Tag>
      },
    },
    { key: 'features', title: '新功能数', dataIndex: 'features', width: 100, sorter: true },
    { key: 'bugfixes', title: '修复Bug数', dataIndex: 'bugfixes', width: 120, sorter: true },
    { key: 'owner', title: '发布负责人', dataIndex: 'owner', width: 120 },
    { key: 'project', title: '所属项目', dataIndex: 'project', width: 150 },
    { key: 'releaseDate', title: '发布日期', dataIndex: 'releaseDate', width: 120, sorter: true },
  ]

  const filters: FilterConfig[] = [
    {
      key: 'type',
      label: '类型',
      type: 'select',
      options: [
        { label: 'Major', value: 'Major' },
        { label: 'Minor', value: 'Minor' },
        { label: 'Patch', value: 'Patch' },
      ],
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '计划中', value: '计划中' },
        { label: '开发中', value: '开发中' },
        { label: '测试中', value: '测试中' },
        { label: '待发布', value: '待发布' },
        { label: '已发布', value: '已发布' },
      ],
    },
  ]

  const actions: ActionButton[] = [
    { key: 'view', label: '查看', icon: <EyeOutlined />, onClick: (record) => openDetail(record.id) },
    { key: 'edit', label: '编辑', icon: <EditOutlined />, onClick: (record) => console.log('编辑', record) },
  ]

  return (
    <ListPage<Release>
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

export default ReleaseListPage
