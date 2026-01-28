/**
 * C7分析治理 - 详情页面
 */

import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { useParams } from 'react-router-dom'
import DetailPage from '@/components/common/DetailPage'
import { mockAnalytics, type Analytics } from '@/mock/analytics'

export const AnalyticsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Analytics | undefined>()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setTimeout(() => {
        setData(mockAnalytics.find((a) => a.id === id))
        setLoading(false)
      }, 300)
    }
  }, [id])

  const fields = [
    { key: 'code', label: '报告编号' },
    { key: 'name', label: '报告名称' },
    { key: 'type', label: '类型', render: (type: string) => <Tag>{type}</Tag> },
    { key: 'period', label: '周期', render: (period: string) => <Tag color="blue">{period}</Tag> },
    {
      key: 'status',
      label: '状态',
      render: (status: string) => {
        const colorMap: Record<string, string> = { '已完成': 'green', '生成中': 'blue', '失败': 'red' }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    { key: 'score', label: '得分' },
    { key: 'indicatorCount', label: '指标数' },
    { key: 'analyst', label: '分析师' },
    { key: 'project', label: '所属项目' },
    { key: 'createdAt', label: '创建时间' },
    { key: 'description', label: '描述', span: 2 },
  ]

  return (
    <DetailPage<Analytics>
      data={data}
      loading={loading}
      fields={fields}
      editing={editing}
      onEditToggle={setEditing}
      onSave={(updatedData) => {
        console.log('保存分析报告:', updatedData)
        setData(updatedData)
      }}
    />
  )
}

export default AnalyticsDetailPage
