/**
 * C3开发执行 - 详情页面
 */

import React, { useState, useEffect } from 'react'
import { Tag, Progress } from 'antd'
import { useParams } from 'react-router-dom'
import DetailPage from '@/components/common/DetailPage'
import { mockSprints, type Sprint } from '@/mock/sprints'

export const SprintDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Sprint | undefined>()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setTimeout(() => {
        setData(mockSprints.find((s) => s.id === id))
        setLoading(false)
      }, 300)
    }
  }, [id])

  const fields = [
    { key: 'code', label: 'Sprint编号' },
    { key: 'name', label: 'Sprint名称' },
    {
      key: 'status',
      label: '状态',
      render: (status: string) => {
        const colorMap: Record<string, string> = { '未开始': 'default', '进行中': 'blue', '已完成': 'green', '已延期': 'red' }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    { key: 'progress', label: '进度', render: (progress: number) => <Progress percent={progress} /> },
    { key: 'teamSize', label: '团队规模' },
    { key: 'taskTotal', label: '任务总数' },
    { key: 'taskCompleted', label: '已完成任务' },
    { key: 'owner', label: '负责人' },
    { key: 'project', label: '所属项目' },
    { key: 'startDate', label: '开始时间' },
    { key: 'endDate', label: '结束时间' },
    { key: 'description', label: '描述', span: 2 },
  ]

  return (
    <DetailPage<Sprint>
      data={data}
      loading={loading}
      fields={fields}
      editing={editing}
      onEditToggle={setEditing}
      onSave={(updatedData) => {
        console.log('保存Sprint:', updatedData)
        setData(updatedData)
      }}
    />
  )
}

export default SprintDetailPage
