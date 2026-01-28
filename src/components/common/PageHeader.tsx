/**
 * PageHeader - 页面标题组件
 * 显示页面标题、副标题和统计信息
 */

import React from 'react'
import './PageHeader.css'

export interface StatCard {
  icon: string
  value: number | string
  label: string
  color?: string
}

export interface PageHeaderProps {
  icon?: string        // 导航图标
  title: string
  subtitle?: string
  stats?: StatCard[]
}

export const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, subtitle, stats }) => {
  return (
    <div className="page-header">
      <div className="page-header-top">
        <div className="page-header-title">
          <h1 className="page-title">
            {icon && <span className="page-title-icon">{icon}</span>}
            {title}
          </h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      
      {stats && stats.length > 0 && (
        <div className="page-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PageHeader
