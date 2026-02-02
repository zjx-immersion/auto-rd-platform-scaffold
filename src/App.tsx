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
import RequirementPoolPage from './pages/requirements/RequirementPoolPage'
import FeatureDetailPage from './pages/requirements/FeatureDetailPage'
import SSTSDetailPage from './pages/requirements/SSTSDetailPage'
import MRDetailPage from './pages/requirements/MRDetailPage'
import SprintListPage from './pages/sprints/SprintListPage'
import SprintDetailPage from './pages/sprints/SprintDetailPage'
import TeamBacklogPage from './pages/sprints/TeamBacklogPage'
import SprintBoardPage from './pages/sprints/SprintBoardPage'
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
import IterationPlanningPage from './pages/planning/IterationPlanningPage'
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

              {/* 需求池 */}
              <Route path="pool" element={<RequirementPoolPage />} />

              {/* C1: 产品需求 */}
              <Route path="c1" element={<RequirementListPage />} />
              <Route path="c1/:id/:tab" element={<RequirementDetailPage />} />
              {/* Feature、SSTS、MR详情页（独立路由） */}
              <Route path="requirements/features/:id" element={<FeatureDetailPage />} />
              <Route path="requirements/ssts/:id" element={<SSTSDetailPage />} />
              <Route path="requirements/mrs/:id" element={<MRDetailPage />} />

              {/* C2: 规划协调 */}
              <Route path="c2" element={<PlanningListPage />} />
              <Route path="c2/:id/:tab" element={<PlanningDetailPage />} />
              <Route path="planning/iterations" element={<IterationPlanningPage />} />

              {/* C3: 迭代执行 */}
              <Route path="c3" element={<SprintListPage />} />
              <Route path="c3/:id/:tab" element={<SprintDetailPage />} />
              <Route path="sprints/backlog" element={<TeamBacklogPage />} />
              <Route path="sprints/board" element={<SprintBoardPage />} />

              {/* C4: 测试验收 */}
              <Route path="c4" element={<QualityListPage />} />
              <Route path="c4/:id/:tab" element={<QualityDetailPage />} />

              {/* C5: DevOps */}
              <Route path="c5" element={<DevOpsListPage />} />
              <Route path="c5/:id/:tab" element={<DevOpsDetailPage />} />

              {/* C6: 分析治理 */}
              <Route path="c6" element={<AnalyticsListPage />} />
              <Route path="c6/:id/:tab" element={<AnalyticsDetailPage />} />

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
