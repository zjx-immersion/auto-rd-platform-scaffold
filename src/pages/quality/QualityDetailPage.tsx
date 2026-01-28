/**
 * C4质量内建 - 详情页面
 */

import React, { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { useParams } from 'react-router-dom'
import DetailPage from '@/components/common/DetailPage'
import { mockTestCases, type TestCase } from '@/mock/quality'

export const QualityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TestCase | undefined>()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setTimeout(() => {
        setData(mockTestCases.find((t) => t.id === id))
        setLoading(false)
      }, 300)
    }
  }, [id])

  const fields = [
    { key: 'code', label: '用例编号' },
    { key: 'name', label: '用例名称' },
    { key: 'type', label: '类型', render: (type: string) => <Tag>{type}</Tag> },
    {
      key: 'priority',
      label: '优先级',
      render: (priority: string) => {
        const colorMap: Record<string, string> = { '高': 'red', '中': 'orange', '低': 'default' }
        return <Tag color={colorMap[priority]}>{priority}</Tag>
      },
    },
    {
      key: 'status',
      label: '状态',
      render: (status: string) => {
        const colorMap: Record<string, string> = { '通过': 'green', '失败': 'red', '执行中': 'blue', '待执行': 'default', '阻塞': 'orange' }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    { key: 'passRate', label: '通过率', render: (v: number) => `${v}%` },
    { key: 'defectCount', label: '缺陷数' },
    { key: 'tester', label: '测试人员' },
    { key: 'project', label: '所属项目' },
    { key: 'createdAt', label: '创建时间' },
    { key: 'updatedAt', label: '更新时间' },
  ]

  return (
    <DetailPage<TestCase>
      data={data}
      loading={loading}
      fields={fields}
      editing={editing}
      onEditToggle={setEditing}
      onSave={(updatedData) => {
        console.log('保存测试用例:', updatedData)
        setData(updatedData)
      }}
    />
  )
}

export default QualityDetailPage
