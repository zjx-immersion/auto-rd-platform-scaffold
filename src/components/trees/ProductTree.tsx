/**
 * 产品树组件 - 用于规划协调页面
 * 从auto-rd-platform-web迁移
 * 结构：产品线 → 产品 → 产品版本 → Feature → Feature版本 → 模块版本
 */

import React, { useState, useMemo } from 'react'
import { Row, Col, Tree, Card, Descriptions, Space, Button, Tag, Statistic, Progress, Input } from 'antd'
import {
  FolderOutlined,
  AppstoreOutlined,
  TagOutlined,
  StarOutlined,
  BuildOutlined,
  WarningOutlined,
  RocketOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { DataNode } from 'antd/es/tree'
import {
  mockProductTreeData,
  type ProductLine,
  type Product,
  type ProductVersion,
  type Feature,
  type FeatureVersion,
  type ModuleVersion,
} from '@/mock/productTree'

export interface ProductTreeProps {
  height?: number
}

const ProductTree: React.FC<ProductTreeProps> = ({ height = 650 }) => {
  const productLines = mockProductTreeData

  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('feat-lka-v1.1')
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['pl-adas', 'p-noa', 'pv-noa-1.1', 'feat-lka-v1.1'])

  /**
   * 获取Feature图标颜色
   */
  function getFeatureIconColor(feature: Feature): string {
    if (feature.maturity >= 90) return '#52c41a'
    if (feature.maturity >= 70) return '#faad14'
    return '#ff4d4f'
  }

  /**
   * 构建树形数据
   */
  const treeData = useMemo((): DataNode[] => {
    return productLines.map((pl) => ({
      key: pl.id,
      title: pl.name,
      icon: <FolderOutlined />,
      children: pl.products?.map((p) => ({
        key: p.id,
        title: p.name,
        icon: <AppstoreOutlined />,
        children: p.versions?.map((pv) => ({
          key: pv.id,
          title: (
            <Space>
              <span>{pv.version}</span>
              {pv.status === 'IN_PROGRESS' && <Tag color="blue">进行中</Tag>}
              {pv.status === 'RELEASED' && <Tag color="green">已发布</Tag>}
            </Space>
          ),
          icon: <TagOutlined />,
          children: pv.features?.map((feat) => ({
            key: feat.id,
            title: (
              <Space>
                <span>{feat.name}</span>
                {feat.maturity < 70 && <WarningOutlined style={{ color: '#ff4d4f' }} />}
                {feat.isFrozen && <Tag color="purple">已冻结</Tag>}
              </Space>
            ),
            icon: <StarOutlined style={{ color: getFeatureIconColor(feat) }} />,
            children: feat.featureVersions?.map((fv) => ({
              key: fv.id,
              title: (
                <Space>
                  <span>Feature版本 {fv.version}</span>
                  {fv.status === 'IN_PROGRESS' && <Tag color="blue">进行中</Tag>}
                  {fv.status === 'RELEASED' && <Tag color="green">已发布</Tag>}
                </Space>
              ),
              icon: <RocketOutlined />,
              children: fv.moduleVersions?.map((mv) => ({
                key: mv.id,
                title: (
                  <Space>
                    <span>
                      {mv.moduleName} {mv.version}
                    </span>
                    <Tag color="cyan">{mv.teamName}</Tag>
                  </Space>
                ),
                icon: <BuildOutlined />,
                isLeaf: true,
              })),
            })),
          })),
        })),
      })),
    }))
  }, [productLines])

  /**
   * 获取选中节点的数据
   */
  const selectedNode = useMemo(() => {
    if (!selectedNodeKey) return null

    for (const pl of productLines) {
      for (const p of pl.products || []) {
        if (p.id === selectedNodeKey) {
          return { type: 'product', data: p }
        }

        for (const pv of p.versions || []) {
          if (pv.id === selectedNodeKey) {
            return { type: 'productVersion', data: pv, product: p }
          }

          for (const feat of pv.features || []) {
            if (feat.id === selectedNodeKey) {
              return { type: 'feature', data: feat, productVersion: pv, product: p }
            }

            for (const fv of feat.featureVersions || []) {
              if (fv.id === selectedNodeKey) {
                return { type: 'featureVersion', data: fv, feature: feat, productVersion: pv, product: p }
              }

              for (const mv of fv.moduleVersions || []) {
                if (mv.id === selectedNodeKey) {
                  return { type: 'moduleVersion', data: mv, featureVersion: fv, feature: feat, productVersion: pv, product: p }
                }
              }
            }
          }
        }
      }
    }

    return null
  }, [selectedNodeKey, productLines])

  /**
   * 渲染Product详情
   */
  const renderProductDetail = (product: Product) => {
    return (
      <Card title="📦 产品信息">
        <Descriptions column={2}>
          <Descriptions.Item label="产品名称">{product.name}</Descriptions.Item>
          <Descriptions.Item label="产品代码">{product.code}</Descriptions.Item>
          <Descriptions.Item label="负责人">{product.owner}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color="blue">{product.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="版本数" span={2}>
            {product.versions?.length || 0} 个
          </Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>
            {product.description}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }

  /**
   * 渲染Feature详情
   */
  const renderFeatureDetail = (feature: Feature, productVersion: ProductVersion, product: Product) => {
    const featureVersions = feature.featureVersions || []

    return (
      <div>
        <Card title="✨ Feature信息">
          <Descriptions column={2}>
            <Descriptions.Item label="Feature名称">{feature.name}</Descriptions.Item>
            <Descriptions.Item label="Feature代码">{feature.code}</Descriptions.Item>
            <Descriptions.Item label="所属产品">
              {product.name} {productVersion.version}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={feature.status === 'IN_PROGRESS' ? 'blue' : feature.status === 'DONE' ? 'green' : 'default'}>
                {feature.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="负责人">{feature.owner}</Descriptions.Item>
            <Descriptions.Item label="流程阶段">{feature.processStage}</Descriptions.Item>
            <Descriptions.Item label="描述" span={2}>
              {feature.description}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="成熟度"
                value={feature.maturity}
                suffix="%"
                styles={{ content: {color: feature.maturity >= 90 ? '#52c41a' : feature.maturity >= 70 ? '#faad14' : '#ff4d4f'} }}
              />
              <Progress percent={feature.maturity} strokeColor={feature.maturity >= 90 ? '#52c41a' : '#faad14'} />
            </Col>
            <Col span={12}>
              <Statistic title="完成度" value={feature.completion} suffix="%" />
              <Progress percent={feature.completion} />
            </Col>
          </Row>
        </Card>

        <Card title={`🚀 Feature版本（${featureVersions.length}个）`} style={{ marginTop: 16 }}>
          <Space orientation="vertical" style={{ width: '100%' }}>
            {featureVersions.map((fv) => (
              <Card key={fv.id} size="small" hoverable onClick={() => setSelectedNodeKey(fv.id)} style={{ cursor: 'pointer' }}>
                <Row justify="space-between">
                  <Col>
                    <Space>
                      <RocketOutlined />
                      <span style={{ fontWeight: 600 }}>Feature版本 {fv.version}</span>
                      <Tag color={fv.status === 'IN_PROGRESS' ? 'blue' : fv.status === 'RELEASED' ? 'green' : 'default'}>
                        {fv.status}
                      </Tag>
                    </Space>
                  </Col>
                  <Col>
                    <span style={{ color: '#666' }}>目标：{fv.targetDate}</span>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </Card>
      </div>
    )
  }

  /**
   * 渲染FeatureVersion详情
   */
  const renderFeatureVersionDetail = (fv: FeatureVersion, feature: Feature, productVersion: ProductVersion, product: Product) => {
    const moduleVersions = fv.moduleVersions || []

    return (
      <div>
        <Card title="🚀 Feature版本信息">
          <Descriptions column={2}>
            <Descriptions.Item label="Feature">{feature.name}</Descriptions.Item>
            <Descriptions.Item label="版本">{fv.version}</Descriptions.Item>
            <Descriptions.Item label="所属产品">
              {product.name} {productVersion.version}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={fv.status === 'IN_PROGRESS' ? 'blue' : fv.status === 'RELEASED' ? 'green' : 'default'}>
                {fv.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="目标日期">{fv.targetDate}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={`🧩 模块版本列表（${moduleVersions.length}个）`} style={{ marginTop: 16 }}>
          <Space orientation="vertical" style={{ width: '100%' }}>
            {moduleVersions.map((mv) => (
              <Card key={mv.id} size="small" hoverable onClick={() => setSelectedNodeKey(mv.id)} style={{ cursor: 'pointer' }}>
                <Space>
                  <BuildOutlined />
                  <span style={{ fontWeight: 600 }}>
                    {mv.moduleName} {mv.version}
                  </span>
                  <Tag color="cyan">{mv.teamName}</Tag>
                  <Tag color={mv.status === 'IN_PROGRESS' ? 'blue' : mv.status === 'DONE' ? 'green' : 'default'}>
                    {mv.status}
                  </Tag>
                </Space>
              </Card>
            ))}
          </Space>
        </Card>
      </div>
    )
  }

  /**
   * 渲染ModuleVersion详情
   */
  const renderModuleVersionDetail = (mv: ModuleVersion, fv: FeatureVersion, feature: Feature, productVersion: ProductVersion, product: Product) => {
    return (
      <div>
        <Card title="🧩 模块版本信息">
          <Descriptions column={2}>
            <Descriptions.Item label="模块名称">{mv.moduleName}</Descriptions.Item>
            <Descriptions.Item label="版本">{mv.version}</Descriptions.Item>
            <Descriptions.Item label="归属Feature">
              {feature.name} {fv.version}
            </Descriptions.Item>
            <Descriptions.Item label="所属产品">
              {product.name} {productVersion.version}
            </Descriptions.Item>
            <Descriptions.Item label="负责团队">
              <Space>
                <TeamOutlined />
                <span>{mv.teamName}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={mv.status === 'IN_PROGRESS' ? 'blue' : mv.status === 'DONE' ? 'green' : 'default'}>
                {mv.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    )
  }

  /**
   * 渲染详情面板
   */
  const renderDetailPanel = () => {
    if (!selectedNode) {
      return (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            <AppstoreOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>请在左侧树中选择一个节点查看详情</div>
          </div>
        </Card>
      )
    }

    switch (selectedNode.type) {
      case 'product':
        return renderProductDetail(selectedNode.data as Product)
      case 'feature':
        return renderFeatureDetail(selectedNode.data as Feature, selectedNode.productVersion as ProductVersion, selectedNode.product as Product)
      case 'featureVersion':
        return renderFeatureVersionDetail(
          selectedNode.data as FeatureVersion,
          selectedNode.feature as Feature,
          selectedNode.productVersion as ProductVersion,
          selectedNode.product as Product
        )
      case 'moduleVersion':
        return renderModuleVersionDetail(
          selectedNode.data as ModuleVersion,
          selectedNode.featureVersion as FeatureVersion,
          selectedNode.feature as Feature,
          selectedNode.productVersion as ProductVersion,
          selectedNode.product as Product
        )
      default:
        return <Card>节点类型：{selectedNode.type}</Card>
    }
  }

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={10} lg={10}>
          <Card
            title="🌲 产品全生命周期树"
            extra={
              <Space>
                <Button size="small" onClick={() => setExpandedKeys([])}>
                  全部收起
                </Button>
                <Button size="small" onClick={() => setExpandedKeys(['pl-adas', 'p-noa', 'pv-noa-1.1', 'feat-lka-v1.1'])}>
                  展开示例
                </Button>
              </Space>
            }
          >
            <Input.Search placeholder="搜索产品、Feature、模块..." style={{ marginBottom: 16 }} />
            <Tree
              showIcon
              treeData={treeData}
              selectedKeys={[selectedNodeKey]}
              expandedKeys={expandedKeys}
              onSelect={(keys) => setSelectedNodeKey(keys[0] as string)}
              onExpand={(keys) => setExpandedKeys(keys as string[])}
              height={height}
              style={{ background: '#fafafa', padding: 16, borderRadius: 4 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={14} lg={14}>
          {renderDetailPanel()}
        </Col>
      </Row>
    </div>
  )
}

export default ProductTree
