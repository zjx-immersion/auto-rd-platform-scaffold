/**
 * SecondaryNav - 二级导航组件
 * 右侧顶部Tabs导航（详情视图的子页签）
 * 1:1还原 auto-rd-main-frame 的二级导航
 */

import React, { useMemo } from 'react'
import { Tabs, Select } from 'antd'
import { useNavigation } from '@/context/NavigationContext'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllProductLines } from '@/data/productLinesMock'
import './SecondaryNav.css'

// 产品线/产品选择器的Props
interface ProductSelectorProps {
  currentId?: string
  productLines?: Array<{ id: string; name: string; children?: Array<{ id: string; name: string }> }>
}

// 产品线/产品选择器组件
const ProductSelector: React.FC<ProductSelectorProps> = ({ currentId, productLines = [] }) => {
  const navigate = useNavigate()

  // 构建选项列表
  const options = useMemo(() => {
    const result: Array<{ label: string; value: string; type: 'line' | 'product' }> = []

    productLines.forEach(line => {
      result.push({
        label: `📁 ${line.name}`,
        value: line.id,
        type: 'line'
      })

      if (line.children) {
        line.children.forEach(product => {
          result.push({
            label: `   📦 ${product.name}`,
            value: product.id,
            type: 'product'
          })
        })
      }
    })

    return result
  }, [productLines])

  const handleChange = (value: string) => {
    navigate(`/c1/${value}/epics`)
  }

  if (!currentId || productLines.length === 0) {
    return null
  }

  return (
    <Select
      value={currentId}
      onChange={handleChange}
      style={{ width: 200, marginRight: 16 }}
      options={options}
      size="large"
    />
  )
}

export const SecondaryNav: React.FC = () => {
  const {
    currentModule,
    viewMode,
    selectedSecondaryTab,
    switchSecondaryTab
  } = useNavigation()
  const { id } = useParams<{ id: string }>()

  // 使用共享的产品线数据
  const mockProductLines = getAllProductLines()

  // 获取二级导航配置
  const secondaryNavItems = useMemo(() => {
    if (viewMode !== 'detail' || !currentModule?.detailSecondaryNav) {
      return []
    }

    return currentModule.detailSecondaryNav.map((item) => ({
      key: item.id,
      label: item.text,
    }))
  }, [currentModule, viewMode])

  // 处理Tab切换
  const handleTabChange = (activeKey: string) => {
    switchSecondaryTab(activeKey)
  }

  // 列表视图时不显示二级导航
  if (viewMode !== 'detail' || secondaryNavItems.length === 0) {
    return null
  }

  return (
    <div className="secondary-nav">
      <div className="secondary-nav-content">
        <ProductSelector currentId={id} productLines={mockProductLines} />
        <Tabs
          activeKey={selectedSecondaryTab}
          items={secondaryNavItems}
          onChange={handleTabChange}
          size="large"
        />
      </div>
    </div>
  )
}

export default SecondaryNav
