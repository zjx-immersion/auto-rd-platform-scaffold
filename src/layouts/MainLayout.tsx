/**
 * MainLayout - 主布局组件
 * 实现三级导航架构：Header + Sider（一级导航）+ Content（二级/三级导航 + 主内容）
 * 1:1还原 auto-rd-main-frame 的布局结构
 */

import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import HeaderWithNav from '@/components/layout/HeaderWithNav'
import PrimaryNav from '@/components/navigation/PrimaryNav'
import SecondaryNav from '@/components/navigation/SecondaryNav'
import TertiaryNav from '@/components/navigation/TertiaryNav'
import { NAV_WIDTH, loadNavState, saveNavState } from '@/utils/navStorage'
import './MainLayout.css'

const { Sider, Content } = Layout

export const MainLayout: React.FC = () => {
  // 从 localStorage 加载初始状态
  const initialState = loadNavState()
  
  // 分离两个独立的状态
  const [isPinned, setIsPinned] = useState(initialState.isPinned) // 固定/悬浮状态
  const [navWidth, setNavWidth] = useState(initialState.navWidth) // 导航宽度
  const [isResizing, setIsResizing] = useState(false) // 是否正在拖拽
  const [isFloatingVisible, setIsFloatingVisible] = useState(false) // 悬浮面板是否显示
  const { selectedModule, switchModule } = useNavigation()

  // 监听状态变化，自动保存到 localStorage
  useEffect(() => {
    saveNavState(navWidth, isPinned)
  }, [navWidth, isPinned])

  // 底部按钮：切换固定/悬浮
  const handleTogglePin = () => {
    setIsPinned(!isPinned)
    if (!isPinned) {
      // 切换到固定时，隐藏悬浮面板
      setIsFloatingVisible(false)
    }
  }

  // 折叠/展开切换
  const handleToggleCollapse = () => {
    // 在三个宽度档位之间循环切换
    if (navWidth === NAV_WIDTH.COLLAPSED) {
      setNavWidth(NAV_WIDTH.DEFAULT)
    } else if (navWidth === NAV_WIDTH.DEFAULT) {
      setNavWidth(NAV_WIDTH.EXPANDED)
    } else {
      setNavWidth(NAV_WIDTH.COLLAPSED)
    }
  }

  // 左上角菜单按钮：显示/隐藏悬浮面板
  const handleToggleDrawer = () => {
    if (!isPinned) {
      // 悬浮模式下，切换悬浮面板的显示状态
      setIsFloatingVisible(!isFloatingVisible)
    }
  }

  const handleModuleChange = (moduleKey: string) => {
    switchModule(moduleKey)
  }

  // 开始拖拽
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  // 拖拽中
  React.useEffect(() => {
    if (!isResizing) return

    document.body.classList.add('resizing')

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = e.clientX
      
      // 根据拖拽位置判断档位（只调整宽度，不改变固定/悬浮状态）
      if (newWidth < (NAV_WIDTH.COLLAPSED + NAV_WIDTH.DEFAULT) / 2) {
        // 靠近收起档位（小于140px）
        if (navWidth !== NAV_WIDTH.COLLAPSED) {
          setNavWidth(NAV_WIDTH.COLLAPSED)
        }
      } else if (newWidth < (NAV_WIDTH.DEFAULT + NAV_WIDTH.EXPANDED) / 2) {
        // 靠近默认档位（140px-240px之间）
        if (navWidth !== NAV_WIDTH.DEFAULT) {
          setNavWidth(NAV_WIDTH.DEFAULT)
        }
      } else if (newWidth <= NAV_WIDTH.EXPANDED + 40) {
        // 靠近展开档位（240px-320px之间）
        if (navWidth !== NAV_WIDTH.EXPANDED) {
          setNavWidth(NAV_WIDTH.EXPANDED)
        }
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.classList.remove('resizing')
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.classList.remove('resizing')
    }
  }, [isResizing, navWidth])

  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }}>
      {/* 左侧导航 - 固定或悬浮 */}
      {isPinned ? (
        /* 固定模式 */
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            height: '100vh',
            zIndex: 1001,
            display: 'flex',
          }}
        >
          <Sider
            width={navWidth}
            collapsed={false}
            collapsible
            trigger={null}
            style={{
              height: '100vh',
              overflow: 'auto',
              transition: isResizing ? 'none' : 'width 0.2s',
            }}
            theme="light"
          >
            <PrimaryNav
              collapsed={navWidth === NAV_WIDTH.COLLAPSED}
              selectedModule={selectedModule}
              isPinned={isPinned}
              onTogglePin={handleTogglePin}
              onModuleChange={handleModuleChange}
              onToggleCollapse={handleToggleCollapse}
            />
          </Sider>
          
          {/* 拖拽手柄 */}
          <div
            className="nav-resize-handle"
            onMouseDown={handleResizeStart}
            title="拖拽调整导航宽度"
          />
        </div>
      ) : (
        /* 悬浮模式 - 鼠标悬停触发器 + 悬浮面板 */
        <>
          {/* 左侧触发条 */}
          <div
            className="nav-floating-trigger"
            onMouseEnter={() => setIsFloatingVisible(true)}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              width: '8px',
              zIndex: 1001,
              background: 'transparent',
              cursor: 'pointer',
            }}
          />

          {/* 悬浮导航面板 */}
          {isFloatingVisible && (
            <div
              className="nav-floating-overlay"
              onClick={() => setIsFloatingVisible(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1999,
                animation: 'fadeIn 0.2s',
              }}
            >
              <div
                className="nav-floating-panel"
                onClick={(e) => e.stopPropagation()}
                onMouseLeave={() => setIsFloatingVisible(false)}
                style={{
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${navWidth}px`,
                  height: '100vh',
                  background: 'var(--color-bg-primary)',
                  boxShadow: '2px 0 12px rgba(0, 0, 0, 0.2)',
                  zIndex: 2000,
                  animation: 'slideInLeft 0.3s',
                }}
              >
                <Sider
                  width={navWidth}
                  collapsed={false}
                  collapsible
                  trigger={null}
                  style={{
                    height: '100vh',
                    overflow: 'auto',
                    background: 'transparent',
                  }}
                  theme="light"
                >
                  <PrimaryNav
                    collapsed={navWidth === NAV_WIDTH.COLLAPSED}
                    selectedModule={selectedModule}
                    isPinned={isPinned}
                    onTogglePin={handleTogglePin}
                    onModuleChange={(key) => {
                      handleModuleChange(key)
                      setIsFloatingVisible(false)
                    }}
                    onToggleCollapse={handleToggleCollapse}
                  />
                </Sider>
              </div>
            </div>
          )}
        </>
      )}

      {/* 右侧内容区 */}
      <Layout
        style={{
          marginLeft: isPinned ? navWidth + 4 : 0, // 固定时需要margin，悬浮时不需要
          transition: isResizing ? 'none' : 'margin-left 0.2s',
          background: '#f0f2f5',
        }}
      >
        {/* Header（含二级导航）- 仅覆盖右侧 */}
        <HeaderWithNav 
          onToggleDrawer={handleToggleDrawer}
          navState={isPinned ? 'expanded' : 'hidden'}
        />

        {/* 主内容区（三级导航 + 内容） */}
        <Layout
          style={{
            marginTop: 0,
            background: '#f0f2f5',
          }}
        >
          <Content
            style={{
              padding: 0,
              minHeight: 'calc(100vh - 64px)',
              background: '#f0f2f5',
            }}
          >
            {/* 三级导航 + 主内容 */}
            <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
              {/* 三级导航 */}
              <TertiaryNav />
              
              {/* 路由出口：页面内容 */}
              <div style={{ flex: 1, overflow: 'auto' }}>
                <Outlet context={{ selectedModule, onModuleChange: handleModuleChange }} />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
