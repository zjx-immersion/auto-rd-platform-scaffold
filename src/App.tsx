/**
 * App 主组件
 * 配置 Ant Design、React Router、NavigationContext
 */

import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { NavigationProvider } from './context/NavigationContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import WorkspaceListPage from './pages/workspace/WorkspaceListPage'
import ProjectListPage from './pages/projects/ProjectListPage'
import ProjectDetailPage from './pages/projects/ProjectDetailPage'
import RequirementListPage from './pages/requirements/RequirementListPage'
import RequirementDetailPage from './pages/requirements/RequirementDetailPage'
import DesignListPage from './pages/designs/DesignListPage'
import DesignDetailPage from './pages/designs/DesignDetailPage'
import SprintListPage from './pages/sprints/SprintListPage'
import SprintDetailPage from './pages/sprints/SprintDetailPage'
import QualityListPage from './pages/quality/QualityListPage'
import QualityDetailPage from './pages/quality/QualityDetailPage'
import ReleaseListPage from './pages/releases/ReleaseListPage'
import ReleaseDetailPage from './pages/releases/ReleaseDetailPage'
import DevOpsListPage from './pages/devops/DevOpsListPage'
import DevOpsDetailPage from './pages/devops/DevOpsDetailPage'
import AnalyticsListPage from './pages/analytics/AnalyticsListPage'
import AnalyticsDetailPage from './pages/analytics/AnalyticsDetailPage'
import PlanningListPage from './pages/planning/PlanningListPage'
import PlanningDetailPage from './pages/planning/PlanningDetailPage'
import './styles/global.css'

// App内部组件，使用主题
const AppContent: React.FC = () => {
  const { themeConfig } = useTheme()

  return (
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      <BrowserRouter>
        <NavigationProvider>
          <Routes>
            {/* 主布局路由 */}
            <Route path="/" element={<MainLayout />}>
              {/* 首页 - 重定向到工作台 */}
              <Route index element={<Navigate to="/workspace" replace />} />
              
              {/* 工作台 */}
              <Route path="workspace" element={<WorkspaceListPage />} />
              
              {/* C0: 项目管理 */}
              <Route path="c0" element={<ProjectListPage />} />
              <Route path="c0/:id/:tab" element={<ProjectDetailPage />} />
              
              {/* C1: 需求管理 */}
              <Route path="c1" element={<RequirementListPage />} />
              <Route path="c1/:id/:tab" element={<RequirementDetailPage />} />
              
              {/* C2: 方案设计 */}
              <Route path="c2" element={<DesignListPage />} />
              <Route path="c2/:id/:tab" element={<DesignDetailPage />} />
              
              {/* C3: 规划协调 */}
              <Route path="c3" element={<PlanningListPage />} />
              <Route path="c3/:id/:tab" element={<PlanningDetailPage />} />
              
              {/* C4: 迭代执行 */}
              <Route path="c4" element={<SprintListPage />} />
              <Route path="c4/:id/:tab" element={<SprintDetailPage />} />
              
              {/* C5: 质量保证 */}
              <Route path="c5" element={<QualityListPage />} />
              <Route path="c5/:id/:tab" element={<QualityDetailPage />} />
              
              {/* C6: 发布管理 */}
              <Route path="c6" element={<ReleaseListPage />} />
              <Route path="c6/:id/:tab" element={<ReleaseDetailPage />} />
              
              {/* C7: DevOps */}
              <Route path="c7" element={<DevOpsListPage />} />
              <Route path="c7/:id/:tab" element={<DevOpsDetailPage />} />
              
              {/* C8: 分析治理 */}
              <Route path="c8" element={<AnalyticsListPage />} />
              <Route path="c8/:id/:tab" element={<AnalyticsDetailPage />} />
              
              {/* 其他模块列表视图 */}
              <Route path=":module" element={<Home />} />
              {/* 其他模块详情视图 */}
              <Route path=":module/:id/:tab" element={<Home />} />
            </Route>
            
            {/* 404重定向 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NavigationProvider>
      </BrowserRouter>
    </ConfigProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
