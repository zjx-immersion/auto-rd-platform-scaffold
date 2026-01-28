/**
 * ListPage - 通用列表页面组件
 * 支持表格视图、筛选、排序、分页
 */

import React, { useState, useCallback, useMemo } from 'react'
import { Table, Card, Space, Button, Input, Select, DatePicker } from 'antd'
import type { TableProps, TableColumnsType } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import type { BaseListItem, ListQueryParams, ListResponse, TableColumn, FilterConfig, ActionButton } from '@/types/common'
import './ListPage.css'

const { Search } = Input
const { RangePicker } = DatePicker

/**
 * ListPage Props
 */
export interface ListPageProps<T extends BaseListItem> {
  /** 数据源 */
  dataSource: T[]
  /** 总记录数 */
  total: number
  /** 表格列配置 */
  columns: TableColumn<T>[]
  /** 筛选器配置 */
  filters?: FilterConfig[]
  /** 操作按钮配置 */
  actions?: ActionButton[]
  /** 加载状态 */
  loading?: boolean
  /** 查询参数 */
  queryParams?: ListQueryParams
  /** 查询参数变更回调 */
  onQueryChange?: (params: ListQueryParams) => void
  /** 刷新回调 */
  onRefresh?: () => void
  /** 行选择配置 */
  rowSelection?: TableProps<T>['rowSelection']
  /** 自定义操作列 */
  customActions?: (record: T) => React.ReactNode
}

/**
 * 通用列表页面组件
 */
export function ListPage<T extends BaseListItem>({
  dataSource,
  total,
  columns,
  filters = [],
  actions = [],
  loading = false,
  queryParams = {},
  onQueryChange,
  onRefresh,
  rowSelection,
  customActions,
}: ListPageProps<T>) {
  const [localFilters, setLocalFilters] = useState<Record<string, any>>({})

  // 处理筛选器变更
  const handleFilterChange = useCallback(
    (key: string, value: any) => {
      const newFilters = { ...localFilters, [key]: value }
      setLocalFilters(newFilters)
      onQueryChange?.({ ...queryParams, ...newFilters })
    },
    [localFilters, queryParams, onQueryChange]
  )

  // 处理搜索
  const handleSearch = useCallback(
    (keyword: string) => {
      onQueryChange?.({ ...queryParams, keyword, page: 1 })
    },
    [queryParams, onQueryChange]
  )

  // 处理表格变更（分页、排序、筛选）
  const handleTableChange = useCallback(
    (pagination: any, tableFilters: any, sorter: any) => {
      const newParams: ListQueryParams = {
        ...queryParams,
        page: pagination.current,
        pageSize: pagination.pageSize,
      }

      // 处理排序
      if (sorter.field) {
        newParams.sortField = sorter.field
        newParams.sortOrder = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined
      }

      // 处理筛选
      Object.keys(tableFilters).forEach((key) => {
        if (tableFilters[key]) {
          newParams[key] = tableFilters[key]
        }
      })

      onQueryChange?.(newParams)
    },
    [queryParams, onQueryChange]
  )

  // 渲染筛选器
  const renderFilters = useMemo(() => {
    if (filters.length === 0) return null

    return (
      <div className="list-page-filters">
        {filters.map((filter) => {
          switch (filter.type) {
            case 'input':
              return (
                <Input
                  key={filter.key}
                  placeholder={filter.placeholder || `请输入${filter.label}`}
                  value={localFilters[filter.key]}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  style={{ width: 200 }}
                />
              )
            case 'select':
              return (
                <Select
                  key={filter.key}
                  placeholder={filter.placeholder || `请选择${filter.label}`}
                  value={localFilters[filter.key]}
                  onChange={(value) => handleFilterChange(filter.key, value)}
                  options={filter.options}
                  style={{ width: 200 }}
                  allowClear
                />
              )
            case 'date':
              return (
                <DatePicker
                  key={filter.key}
                  placeholder={filter.placeholder || `请选择${filter.label}`}
                  value={localFilters[filter.key]}
                  onChange={(date) => handleFilterChange(filter.key, date)}
                  style={{ width: 200 }}
                />
              )
            case 'dateRange':
              return (
                <RangePicker
                  key={filter.key}
                  value={localFilters[filter.key]}
                  onChange={(dates) => handleFilterChange(filter.key, dates)}
                  style={{ width: 300 }}
                />
              )
            default:
              return null
          }
        })}
      </div>
    )
  }, [filters, localFilters, handleFilterChange])

  // 转换列配置为Ant Design格式
  const tableColumns: TableColumnsType<T> = useMemo(() => {
    const cols: any[] = columns.map((col) => ({
      key: col.key,
      title: col.title,
      dataIndex: col.dataIndex || col.key,
      width: col.width,
      align: col.align,
      render: col.render,
      sorter: col.sorter,
      filters: col.filters,
      onFilter: col.onFilter,
    }))

    // 添加操作列
    if (actions.length > 0 || customActions) {
      cols.push({
        key: 'actions',
        title: '操作',
        width: 150,
        dataIndex: 'actions',
        render: (_: any, record: T) => {
          if (customActions) {
            return customActions(record)
          }
          return (
            <Space size="small">
              {actions.map((action) => (
                <Button
                  key={action.key}
                  type={action.type || 'link'}
                  size="small"
                  danger={action.danger}
                  disabled={action.disabled?.(record)}
                  onClick={() => action.onClick(record)}
                  icon={action.icon}
                >
                  {action.label}
                </Button>
              ))}
            </Space>
          )
        },
      })
    }

    return cols
  }, [columns, actions, customActions])

  return (
    <div className="list-page">
      <Card>
        {/* 工具栏 */}
        <div className="list-page-toolbar">
          <div className="list-page-toolbar-left">
            {/* 搜索框 */}
            <Search
              placeholder="搜索关键词..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
              enterButton={<SearchOutlined />}
            />
            {/* 筛选器 */}
            {renderFilters}
          </div>
          <div className="list-page-toolbar-right">
            <Space>
              {onRefresh && (
                <Button icon={<ReloadOutlined />} onClick={onRefresh}>
                  刷新
                </Button>
              )}
            </Space>
          </div>
        </div>

        {/* 表格 */}
        <Table<T>
          dataSource={dataSource}
          columns={tableColumns}
          rowKey="id"
          loading={loading}
          rowSelection={rowSelection}
          pagination={{
            current: queryParams.page || 1,
            pageSize: queryParams.pageSize || 10,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  )
}

export default ListPage
