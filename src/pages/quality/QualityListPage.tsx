/**
 * C4质量内建 - 列表页面
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Tag, Button } from 'antd'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import ListPage from '@/components/common/ListPage'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockTestCases, type TestCase } from '@/mock/quality'
import { mockListQuery } from '@/utils/mockData'

export const QualityListPage: React.FC = () => {
  const { openDetail } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<TestCase[]>([])
  const [total, setTotal] = useState(0)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({ page: 1, pageSize: 10 })

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await mockListQuery(mockTestCases, queryParams)
      setDataSource(result.list)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [queryParams])

  useEffect(() => { loadData() }, [loadData])

  const columns: TableColumn<TestCase>[] = [
    { key: 'code', title: '用例编号', dataIndex: 'code', width: 150, sorter: true },
    {
      key: 'name',
      title: '用例名称',
      dataIndex: 'name',
      width: 200,
      sorter: true,
      render: (text: string, record: TestCase) => (
        <Button type="link" onClick={() => openDetail(record.id)}>{text}</Button>
      ),
    },
    {
      key: 'type',
      title: '类型',
      dataIndex: 'type',
      width: 120,
      filters: [
        { text: '功能测试', value: '功能测试' },
        { text: '性能测试', value: '性能测试' },
        { text: '安全测试', value: '安全测试' },
        { text: '兼容性测试', value: '兼容性测试' },
      ],
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      key: 'priority',
      title: '优先级',
      dataIndex: 'priority',
      width: 100,
      filters: [
        { text: '高', value: '高' },
        { text: '中', value: '中' },
        { text: '低', value: '低' },
      ],
      render: (priority: string) => {
        const colorMap: Record<string, string> = { '高': 'red', '中': 'orange', '低': 'default' }
        return <Tag color={colorMap[priority]}>{priority}</Tag>
      },
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      filters: [
        { text: '待执行', value: '待执行' },
        { text: '执行中', value: '执行中' },
        { text: '通过', value: '通过' },
        { text: '失败', value: '失败' },
        { text: '阻塞', value: '阻塞' },
      ],
      render: (status: string) => {
        const colorMap: Record<string, string> = { '通过': 'green', '失败': 'red', '执行中': 'blue', '待执行': 'default', '阻塞': 'orange' }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    { key: 'passRate', title: '通过率', dataIndex: 'passRate', width: 100, sorter: true, render: (v: number) => `${v}%` },
    { key: 'defectCount', title: '缺陷数', dataIndex: 'defectCount', width: 100, sorter: true },
    { key: 'tester', title: '测试人员', dataIndex: 'tester', width: 120 },
    { key: 'project', title: '所属项目', dataIndex: 'project', width: 150 },
    { key: 'createdAt', title: '创建时间', dataIndex: 'createdAt', width: 120, sorter: true },
  ]

  const filters: FilterConfig[] = [
    {
      key: 'type',
      label: '类型',
      type: 'select',
      options: [
        { label: '功能测试', value: '功能测试' },
        { label: '性能测试', value: '性能测试' },
        { label: '安全测试', value: '安全测试' },
        { label: '兼容性测试', value: '兼容性测试' },
      ],
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '待执行', value: '待执行' },
        { label: '执行中', value: '执行中' },
        { label: '通过', value: '通过' },
        { label: '失败', value: '失败' },
      ],
    },
  ]

  const actions: ActionButton[] = [
    { key: 'view', label: '查看', icon: <EyeOutlined />, onClick: (record) => openDetail(record.id) },
    { key: 'edit', label: '编辑', icon: <EditOutlined />, onClick: (record) => console.log('编辑', record) },
  ]

  return (
    <ListPage<TestCase>
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

export default QualityListPage
