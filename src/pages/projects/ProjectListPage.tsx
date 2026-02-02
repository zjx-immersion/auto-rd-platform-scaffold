/**
 * ProjectListPage - 项目管理列表页面
 * C0能力域的列表视图
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Tag, Progress, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import ListPage from '@/components/common/ListPage'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import type { TableColumn, FilterConfig, ActionButton, ListQueryParams } from '@/types/common'
import { mockProjects, type Project } from '@/mock/projects'
import { mockListQuery } from '@/utils/mockData'
import './ProjectListPage.css'

export const ProjectListPage: React.FC = () => {
  const { openDetail, selectedTertiaryItem } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Project[]>([])
  const [total, setTotal] = useState(0)
  const [queryParams, setQueryParams] = useState<ListQueryParams>({
    page: 1,
    pageSize: 10,
  })

  // 根据三级导航筛选项目数据
  const getFilteredProjects = useCallback(() => {
    let filtered = mockProjects

    // 根据三级导航筛选
    switch (selectedTertiaryItem) {
      case 'all':
        // 全部项目 - 不筛选
        break
      case 'my':
        // 我的项目 - 暂时显示负责人为"张三"的项目
        filtered = filtered.filter(p => p.owner === '张三')
        break
      case 'active':
        // 进行中 - 状态为active
        filtered = filtered.filter(p => p.status === 'active')
        break
      case 'archived':
        // 已归档 - 状态为archived
        filtered = filtered.filter(p => p.status === 'archived')
        break
      default:
        break
    }

    return filtered
  }, [selectedTertiaryItem])

  // 加载数据
  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const filteredProjects = getFilteredProjects()
      const result = await mockListQuery(filteredProjects, queryParams)
      setDataSource(result.list)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }, [queryParams, getFilteredProjects])

  useEffect(() => {
    loadData()
  }, [loadData])

  // 如果数据为空且不是搜索/筛选结果，显示占位符
  const shouldShowPlaceholder =
    !loading &&
    dataSource.length === 0 &&
    (selectedTertiaryItem === 'my' || selectedTertiaryItem === 'archived')

  if (shouldShowPlaceholder) {
    const tabTitles: Record<string, string> = {
      'my': '我的项目',
      'archived': '已归档项目',
    }
    return (
      <div className="project-list-page">
        <EmptyPlaceholder
          title={tabTitles[selectedTertiaryItem] || '暂无数据'}
          description="还在加速研发中..."
        />
      </div>
    )
  }

  // 表格列配置
  const columns: TableColumn<Project>[] = [
    {
      key: 'code',
      title: '项目编码',
      dataIndex: 'code',
      width: 180,
      sorter: true,
    },
    {
      key: 'name',
      title: '项目名称',
      dataIndex: 'name',
      width: 250,
      sorter: true,
      render: (text: string, record: Project) => (
        <Button type="link" onClick={() => openDetail(record.id)}>
          {text}
        </Button>
      ),
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
      width: 300,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 120,
      filters: [
        { text: '规划中', value: 'planning' },
        { text: '进行中', value: 'active' },
        { text: '已完成', value: 'completed' },
        { text: '已归档', value: 'archived' },
      ],
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          planning: { color: 'blue', text: '规划中' },
          active: { color: 'green', text: '进行中' },
          completed: { color: 'default', text: '已完成' },
          archived: { color: 'gray', text: '已归档' },
        }
        const config = statusMap[status] || { color: 'default', text: status }
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      key: 'owner',
      title: '负责人',
      dataIndex: 'owner',
      width: 120,
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
      key: 'teamSize',
      title: '团队规模',
      dataIndex: 'teamSize',
      width: 100,
      sorter: true,
    },
    {
      key: 'startDate',
      title: '开始日期',
      dataIndex: 'startDate',
      width: 120,
      sorter: true,
    },
    {
      key: 'endDate',
      title: '结束日期',
      dataIndex: 'endDate',
      width: 120,
      sorter: true,
    },
  ]

  // 筛选器配置
  const filters: FilterConfig[] = [
    {
      key: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '规划中', value: 'planning' },
        { label: '进行中', value: 'active' },
        { label: '已完成', value: 'completed' },
        { label: '已归档', value: 'archived' },
      ],
      placeholder: '请选择状态',
    },
  ]

  // 操作按钮配置
  const actions: ActionButton[] = [
    {
      key: 'view',
      label: '查看',
      icon: <EyeOutlined />,
      onClick: (record) => openDetail(record.id),
    },
    {
      key: 'edit',
      label: '编辑',
      icon: <EditOutlined />,
      onClick: (record) => {
        console.log('编辑项目:', record)
      },
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: (record) => {
        console.log('删除项目:', record)
      },
    },
  ]

  return (
    <ListPage<Project>
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

export default ProjectListPage
