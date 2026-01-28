/**
 * ProductTreeView - 产品树视图
 * 用于规划协调页面的产品多团队迭代树
 */

import React from 'react'
import ProductTree from '@/components/trees/ProductTree'
import './ProductTreeView.css'

export const ProductTreeView: React.FC = () => {
  return (
    <div className="product-tree-view">
      <ProductTree />
    </div>
  )
}

export default ProductTreeView
