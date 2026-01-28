/**
 * DetailPage - 通用详情页面组件
 * 支持展示、编辑、关联数据
 */

import React, { type ReactNode } from 'react'
import { Card, Descriptions, Button, Space, Divider } from 'antd'
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'
import type { BaseListItem } from '@/types/common'
import './DetailPage.css'

/**
 * DetailPage Props
 */
export interface DetailPageProps<T extends BaseListItem> {
  /** 数据 */
  data?: T
  /** 加载状态 */
  loading?: boolean
  /** 字段配置 */
  fields: Array<{
    key: string
    label: string
    render?: (value: any, record: T) => ReactNode
    span?: number
  }>
  /** 是否编辑模式 */
  editing?: boolean
  /** 编辑模式切换 */
  onEditToggle?: (editing: boolean) => void
  /** 保存回调 */
  onSave?: (data: T) => void
  /** 取消回调 */
  onCancel?: () => void
  /** 自定义操作 */
  actions?: ReactNode
  /** 关联数据区域 */
  relatedData?: ReactNode
}

/**
 * 通用详情页面组件
 */
export function DetailPage<T extends BaseListItem>({
  data,
  loading = false,
  fields,
  editing = false,
  onEditToggle,
  onSave,
  onCancel,
  actions,
  relatedData,
}: DetailPageProps<T>) {
  const handleEdit = () => {
    onEditToggle?.(true)
  }

  const handleSave = () => {
    if (data && onSave) {
      onSave(data)
    }
    onEditToggle?.(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onEditToggle?.(false)
  }

  return (
    <div className="detail-page">
      <Card
        loading={loading}
        title={
          <div className="detail-page-header">
            <span>详情信息</span>
            {!editing && (
              <Space>
                {actions}
                <Button icon={<EditOutlined />} onClick={handleEdit}>
                  编辑
                </Button>
              </Space>
            )}
            {editing && (
              <Space>
                <Button icon={<SaveOutlined />} type="primary" onClick={handleSave}>
                  保存
                </Button>
                <Button icon={<CloseOutlined />} onClick={handleCancel}>
                  取消
                </Button>
              </Space>
            )}
          </div>
        }
      >
        <Descriptions column={2} bordered>
          {fields.map((field) => (
            <Descriptions.Item key={field.key} label={field.label} span={field.span}>
              {field.render ? field.render(data?.[field.key], data!) : data?.[field.key]}
            </Descriptions.Item>
          ))}
        </Descriptions>

        {relatedData && (
          <>
            <Divider />
            {relatedData}
          </>
        )}
      </Card>
    </div>
  )
}

export default DetailPage
