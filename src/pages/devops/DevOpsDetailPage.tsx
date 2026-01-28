/**
 * C6 DevOps - 详情页面
 */

import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { useParams } from 'react-router-dom'
import DetailPage from '@/components/common/DetailPage'
import { mockPipelines, type Pipeline } from '@/mock/devops'

export const DevOpsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Pipeline | undefined>()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setTimeout(() => {
        setData(mockPipelines.find((p) => p.id === id))
        setLoading(false)
      }, 300)
    }
  }, [id])

  const fields = [
    { key: 'code', label: '流水线编号' },
    { key: 'name', label: '流水线名称' },
    { key: 'type', label: '类型', render: (type: string) => <Tag>{type}</Tag> },
    {
      key: 'status',
      label: '状态',
      render: (status: string) => {
        const colorMap: Record<string, string> = { '成功': 'green', '失败': 'red', '运行中': 'blue', '等待中': 'default', '已取消': 'default' }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    { key: 'trigger', label: '触发方式' },
    { key: 'duration', label: '耗时(秒)' },
    { key: 'branch', label: '分支' },
    { key: 'commit', label: 'Commit' },
    { key: 'operator', label: '操作人' },
    { key: 'project', label: '所属项目' },
    { key: 'createdAt', label: '创建时间' },
  ]

  return (
    <DetailPage<Pipeline>
      data={data}
      loading={loading}
      fields={fields}
      editing={editing}
      onEditToggle={setEditing}
      onSave={(updatedData) => {
        console.log('保存流水线:', updatedData)
        setData(updatedData)
      }}
    />
  )
}

export default DevOpsDetailPage
