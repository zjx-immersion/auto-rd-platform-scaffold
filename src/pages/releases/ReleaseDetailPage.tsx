/**
 * C5交付发布 - 详情页面
 */

import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { useParams } from 'react-router-dom'
import DetailPage from '@/components/common/DetailPage'
import { mockReleases, type Release } from '@/mock/releases'

export const ReleaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Release | undefined>()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setTimeout(() => {
        setData(mockReleases.find((r) => r.id === id))
        setLoading(false)
      }, 300)
    }
  }, [id])

  const fields = [
    { key: 'version', label: '版本号' },
    { key: 'name', label: '版本名称' },
    { key: 'type', label: '类型', render: (type: string) => <Tag>{type}</Tag> },
    {
      key: 'status',
      label: '状态',
      render: (status: string) => {
        const colorMap: Record<string, string> = { '已发布': 'green', '待发布': 'blue', '测试中': 'orange', '开发中': 'default', '计划中': 'default' }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    {
      key: 'environment',
      label: '环境',
      render: (env: string) => {
        const colorMap: Record<string, string> = { '生产': 'red', '预发布': 'orange', '测试': 'blue', '开发': 'default' }
        return <Tag color={colorMap[env]}>{env}</Tag>
      },
    },
    { key: 'features', label: '新功能数' },
    { key: 'bugfixes', label: '修复Bug数' },
    { key: 'owner', label: '发布负责人' },
    { key: 'project', label: '所属项目' },
    { key: 'releaseDate', label: '发布日期' },
    { key: 'description', label: '描述', span: 2 },
  ]

  return (
    <DetailPage<Release>
      data={data}
      loading={loading}
      fields={fields}
      editing={editing}
      onEditToggle={setEditing}
      onSave={(updatedData) => {
        console.log('保存发布:', updatedData)
        setData(updatedData)
      }}
    />
  )
}

export default ReleaseDetailPage
