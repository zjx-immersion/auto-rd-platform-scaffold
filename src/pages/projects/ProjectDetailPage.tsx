/**
 * ProjectDetailPage - 项目管理详情页面
 * C0能力域的详情视图，支持多Tab切换
 */

import React, { useState, useEffect } from 'react'
import { Tag, Progress } from 'antd'
import { useParams } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import DetailPage from '@/components/common/DetailPage'
import ProjectTreeView from './views/ProjectTreeView'
import { mockProjects, type Project } from '@/mock/projects'
import './ProjectDetailPage.css'

export const ProjectDetailPage: React.FC = () => {
  const { id, tab } = useParams<{ id: string; tab: string }>()
  const { selectedSecondaryTab } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Project | undefined>()
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      // 模拟API调用
      setTimeout(() => {
        const project = mockProjects.find((p) => p.id === id)
        setData(project)
        setLoading(false)
      }, 300)
    }
  }, [id])

  const fields = [
    {
      key: 'code',
      label: '项目编码',
    },
    {
      key: 'name',
      label: '项目名称',
    },
    {
      key: 'description',
      label: '描述',
      span: 2,
    },
    {
      key: 'status',
      label: '状态',
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
      label: '负责人',
    },
    {
      key: 'progress',
      label: '进度',
      render: (progress: number) => <Progress percent={progress} />,
    },
    {
      key: 'teamSize',
      label: '团队规模',
    },
    {
      key: 'startDate',
      label: '开始日期',
    },
    {
      key: 'endDate',
      label: '结束日期',
    },
  ]

  // 根据当前选中的二级导航Tab渲染对应的视图
  const renderContent = () => {
    const currentTab = selectedSecondaryTab || tab || 'overview'

    if (loading || !data) {
      return (
        <div className="project-detail-loading">
          <div className="loading-spinner">加载中...</div>
        </div>
      )
    }

    switch (currentTab) {
      case 'overview':
        return (
          <DetailPage<Project>
            data={data}
            loading={loading}
            fields={fields}
            editing={editing}
            onEditToggle={setEditing}
            onSave={(updatedData) => {
              console.log('保存项目:', updatedData)
              setData(updatedData)
            }}
          />
        )
      case 'plan':
        return <ProjectTreeView />
      case 'requirements':
      case 'testing':
      case 'iteration':
      case 'release':
        // 这些Tab暂时显示占位符
        return (
          <div className="tab-placeholder" style={{ padding: 24, textAlign: 'center' }}>
            <p>该功能正在开发中...</p>
          </div>
        )
      default:
        return (
          <DetailPage<Project>
            data={data}
            loading={loading}
            fields={fields}
            editing={editing}
            onEditToggle={setEditing}
            onSave={(updatedData) => {
              console.log('保存项目:', updatedData)
              setData(updatedData)
            }}
          />
        )
    }
  }

  return (
    <div className="project-detail-page">
      {/* 顶部标题区域 */}
      {data && !loading && (
        <div className="detail-page-header">
          <div className="header-icon">📊</div>
          <h2 className="header-title">{data.name}</h2>
        </div>
      )}
      {renderContent()}
    </div>
  )
}

export default ProjectDetailPage
