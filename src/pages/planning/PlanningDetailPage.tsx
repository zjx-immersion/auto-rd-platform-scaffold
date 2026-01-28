/**
 * PlanningDetailPage - 规划协调详情页面
 * C3: 迭代规划管理详情视图，含二级导航切换
 */

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import { mockPlans, type IterationPlan } from '@/mock/planning'
import PlanNameView from './views/PlanNameView'
import ProductTreeView from './views/ProductTreeView'
import IterationPlanView from './views/IterationPlanView'
import TeamCapacityView from './views/TeamCapacityView'
import IterationProgressView from './views/IterationProgressView'
import PlanTemplateView from './views/PlanTemplateView'
import './PlanningDetailPage.css'

export const PlanningDetailPage: React.FC = () => {
  const { id, tab } = useParams<{ id: string; tab: string }>()
  const { selectedSecondaryTab } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IterationPlan | undefined>()

  useEffect(() => {
    if (id) {
      setLoading(true)
      // 模拟API调用
      setTimeout(() => {
        const plan = mockPlans.find((p) => p.id === id)
        setData(plan)
        setLoading(false)
      }, 300)
    }
  }, [id])

  // 根据当前选中的二级导航Tab渲染对应的视图
  const renderContent = () => {
    const currentTab = selectedSecondaryTab || tab || 'plan-name'

    if (loading || !data) {
      return (
        <div className="planning-detail-loading">
          <div className="loading-spinner">加载中...</div>
        </div>
      )
    }

    switch (currentTab) {
      case 'plan-name':
        return <PlanNameView data={data} onDataChange={setData} />
      case 'product-tree':
        return <ProductTreeView />
      case 'iteration-plan':
        return <IterationPlanView planId={data.id} />
      case 'team-capacity':
        return <TeamCapacityView planId={data.id} teamId={data.teamId} />
      case 'iteration-progress':
        return <IterationProgressView planId={data.id} data={data} />
      case 'plan-template':
        return <PlanTemplateView />
      default:
        return <PlanNameView data={data} onDataChange={setData} />
    }
  }

  return (
    <div className="planning-detail-page">
      {/* 顶部标题区域 */}
      {data && !loading && (
        <div className="detail-page-header">
          <div className="header-icon">📅</div>
          <h2 className="header-title">{data.name}</h2>
        </div>
      )}
      {renderContent()}
    </div>
  )
}

export default PlanningDetailPage
