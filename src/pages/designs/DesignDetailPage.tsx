/**
 * C2方案设计 - 详情页面
 */

import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { useParams } from 'react-router-dom'
import DetailPage from '@/components/common/DetailPage'
import { mockDesigns, type Design } from '@/mock/designs'

export const DesignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Design | undefined>()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setTimeout(() => {
        setData(mockDesigns.find((d) => d.id === id))
        setLoading(false)
      }, 300)
    }
  }, [id])

  const fields = [
    { key: 'code', label: '设计编号' },
    { key: 'name', label: '设计名称' },
    { key: 'type', label: '类型', render: (type: string) => <Tag>{type}</Tag> },
    { key: 'status', label: '状态', render: (status: string) => <Tag color="blue">{status}</Tag> },
    { key: 'designer', label: '设计师' },
    { key: 'project', label: '所属项目' },
    { key: 'version', label: '版本' },
    { key: 'description', label: '描述', span: 2 },
    { key: 'createdAt', label: '创建时间' },
    { key: 'updatedAt', label: '更新时间' },
  ]

  return (
    <DetailPage<Design>
      data={data}
      loading={loading}
      fields={fields}
      editing={editing}
      onEditToggle={setEditing}
      onSave={(updatedData) => {
        console.log('保存设计:', updatedData)
        setData(updatedData)
      }}
    />
  )
}

export default DesignDetailPage
