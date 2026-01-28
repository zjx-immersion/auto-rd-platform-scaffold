/**
 * C1产品需求 - 详情页面
 * 支持产品线/产品的详情视图，包含需求分层树
 */

import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Descriptions, Tag, Space, Button, Statistic, Row, Col } from 'antd'
import { EditOutlined, FolderOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useNavigation } from '@/context/NavigationContext'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import RequirementTree from '@/components/trees/RequirementTree'

// 产品线类型
interface ProductLine {
  id: string
  code: string
  name: string
  description: string
  owner: string
  productCount: number
  epicCount?: number
  featureCount?: number
}

// 产品类型
interface Product {
  id: string
  code: string
  name: string
  description: string
  owner: string
  status: string
  productLineId: string
  epicCount?: number
  featureCount?: number
}

// Mock 产品线数据
const mockProductLines: ProductLine[] = [
  {
    id: 'line-001',
    code: 'LANTU-LINE',
    name: '岚图梦想家',
    description: '岚图梦想家产品线',
    owner: '张三',
    productCount: 3,
    epicCount: 8,
    featureCount: 32
  },
  {
    id: 'line-002',
    code: 'FREE-LINE',
    name: '岚图FREE',
    description: '岚图FREE产品线',
    owner: '孙七',
    productCount: 2,
    epicCount: 5,
    featureCount: 20
  }
]

// Mock 产品数据
const mockProducts: Product[] = [
  {
    id: 'product-001',
    code: 'ADAS-PROD',
    name: 'ADAS系统',
    description: '高级驾驶辅助系统',
    owner: '李四',
    status: '开发中',
    productLineId: 'line-001',
    epicCount: 3,
    featureCount: 12
  },
  {
    id: 'product-002',
    code: 'CABIN-PROD',
    name: '智能座舱',
    description: '智能座舱系统',
    owner: '王五',
    status: '开发中',
    productLineId: 'line-001',
    epicCount: 3,
    featureCount: 15
  },
  {
    id: 'product-003',
    code: 'POWER-PROD',
    name: '动力系统',
    description: '动力控制系统',
    owner: '赵六',
    status: '规划中',
    productLineId: 'line-001',
    epicCount: 2,
    featureCount: 5
  },
  {
    id: 'product-004',
    code: 'CHASSIS-PROD',
    name: '底盘系统',
    description: '底盘控制系统',
    owner: '周八',
    status: '已完成',
    productLineId: 'line-002',
    epicCount: 2,
    featureCount: 8
  },
  {
    id: 'product-005',
    code: 'BODY-PROD',
    name: '车身控制',
    description: '车身控制系统',
    owner: '吴九',
    status: '开发中',
    productLineId: 'line-002',
    epicCount: 3,
    featureCount: 12
  }
]

export const RequirementDetailPage: React.FC = () => {
  const { id, tab } = useParams<{ id: string; tab: string }>()
  const { selectedSecondaryTab } = useNavigation()
  const [loading, setLoading] = useState(false)
  
  // 判断当前是产品线还是产品
  const currentData = useMemo(() => {
    const productLine = mockProductLines.find(pl => pl.id === id)
    if (productLine) {
      return { type: 'productLine', data: productLine }
    }
    
    const product = mockProducts.find(p => p.id === id)
    if (product) {
      return { type: 'product', data: product }
    }
    
    return null
  }, [id])

  // 当前激活的Tab
  const currentTab = selectedSecondaryTab || tab || 'overview'

  // 渲染概览Tab
  const renderOverview = () => {
    if (!currentData) {
      return <EmptyPlaceholder title="未找到数据" description="请返回列表页重新选择" />
    }

    if (currentData.type === 'productLine') {
      const line = currentData.data as ProductLine
      return (
        <Card>
          <Space orientation="vertical" style={{ width: '100%' }} size="large">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Space>
                  <FolderOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                  <h2 style={{ margin: 0 }}>{line.name}</h2>
                </Space>
                <Button icon={<EditOutlined />}>编辑</Button>
              </div>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="产品线编码">{line.code}</Descriptions.Item>
                <Descriptions.Item label="负责人">{line.owner}</Descriptions.Item>
                <Descriptions.Item label="描述" span={2}>{line.description}</Descriptions.Item>
              </Descriptions>
            </div>

            <Card title="📊 统计信息" size="small">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="产品数量" value={line.productCount} suffix="个" />
                </Col>
                <Col span={8}>
                  <Statistic title="Epic数量" value={line.epicCount || 0} suffix="个" />
                </Col>
                <Col span={8}>
                  <Statistic title="Feature数量" value={line.featureCount || 0} suffix="个" />
                </Col>
              </Row>
            </Card>

            <Card title="🎯 产品列表" size="small">
              <Space orientation="vertical" style={{ width: '100%' }}>
                {mockProducts
                  .filter(p => p.productLineId === line.id)
                  .map(product => (
                    <Card key={product.id} size="small" hoverable>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Space>
                          <AppstoreOutlined style={{ color: '#52c41a' }} />
                          <span style={{ fontWeight: 500 }}>{product.name}</span>
                          <Tag>{product.code}</Tag>
                          <Tag color={product.status === '开发中' ? 'blue' : product.status === '已完成' ? 'green' : 'default'}>
                            {product.status}
                          </Tag>
                        </Space>
                        <Space>
                          <span style={{ color: '#666' }}>Epic: {product.epicCount || 0}</span>
                          <span style={{ color: '#666' }}>Feature: {product.featureCount || 0}</span>
                        </Space>
                      </div>
                    </Card>
                  ))}
              </Space>
            </Card>
          </Space>
        </Card>
      )
    } else {
      const product = currentData.data as Product
      const parentLine = mockProductLines.find(pl => pl.id === product.productLineId)
      
      return (
        <Card>
          <Space orientation="vertical" style={{ width: '100%' }} size="large">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Space>
                  <AppstoreOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                  <h2 style={{ margin: 0 }}>{product.name}</h2>
                </Space>
                <Button icon={<EditOutlined />}>编辑</Button>
              </div>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="产品编码">{product.code}</Descriptions.Item>
                <Descriptions.Item label="所属产品线">{parentLine?.name || '-'}</Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color={product.status === '开发中' ? 'blue' : product.status === '已完成' ? 'green' : 'default'}>
                    {product.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="负责人">{product.owner}</Descriptions.Item>
                <Descriptions.Item label="描述" span={2}>{product.description}</Descriptions.Item>
              </Descriptions>
            </div>

            <Card title="📊 统计信息" size="small">
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Epic数量" value={product.epicCount || 0} suffix="个" />
                </Col>
                <Col span={12}>
                  <Statistic title="Feature数量" value={product.featureCount || 0} suffix="个" />
                </Col>
              </Row>
            </Card>
          </Space>
        </Card>
      )
    }
  }

  // 渲染需求分层树Tab
  const renderRequirementTree = () => {
    return <RequirementTree />
  }

  // 渲染其他Tab的占位符
  const renderPlaceholder = (title: string) => {
    return <EmptyPlaceholder title={title} description="功能开发中..." />
  }

  // 根据当前Tab渲染内容
  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return renderOverview()
      case 'req-tree':
        return renderRequirementTree()
      case 'epics':
        return renderPlaceholder('Epic管理')
      case 'features':
        return renderPlaceholder('Feature列表')
      case 'ssts':
        return renderPlaceholder('SSTS管理')
      case 'mrs':
        return renderPlaceholder('MR管理')
      default:
        return renderOverview()
    }
  }

  return (
    <div style={{ padding: 0 }}>
      {renderContent()}
    </div>
  )
}

export default RequirementDetailPage
