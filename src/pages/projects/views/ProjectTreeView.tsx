/**
 * ProjectTreeView - 项目树视图
 * 用于项目管理页面的12个造车节点项目树
 */

import React from 'react'
import ProjectTree from '@/components/trees/ProjectTree'
import './ProjectTreeView.css'

export const ProjectTreeView: React.FC = () => {
  return (
    <div className="project-tree-view">
      <ProjectTree />
    </div>
  )
}

export default ProjectTreeView
