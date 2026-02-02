/**
 * 需求树V3.0 - 三层需求模型树形视图
 * Epic → FeatureRequirement → SSTS
 * MR不在树中，在SSTS详情中体现归属模块
 */

import React, { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Row, Col, Tree, Card, Descriptions, Space, Button, Tag, Statistic, Select, Input, message, Progress, Modal, Divider } from 'antd'
import {
  FolderOutlined,
  FileTextOutlined,
  FileOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FilterOutlined,
  PlusOutlined,
  EditOutlined,
  BranchesOutlined,
  EyeOutlined,
  CodeOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { DataNode } from 'antd/es/tree'
import type { UserRole, UC, FeatureRequirement, SSTS, ModuleRequirement } from '@/types/domain/requirement'
import MockDataServiceV3 from '@/services/MockDataServiceV3'

const RequirementTreeV3: React.FC = () => {
  const { currentRole } = useOutletContext<{ currentRole: UserRole; currentWorkspace: string }>()

  const allUCs = MockDataServiceV3.generateRequirementTree()
  const productLines = MockDataServiceV3.generateProductTree()

  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('ssts-lka-001')
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['epic-l2plus', 'fr-lka-001'])

  // 筛选器状态
  const [filterProduct, setFilterProduct] = useState<string | undefined>(undefined)
  const [filterModule, setFilterModule] = useState<string | undefined>(undefined)

  // MR详情Modal状态
  const [mrModalVisible, setMrModalVisible] = useState(false)
  const [selectedMR, setSelectedMR] = useState<any>(null)

  /**
   * 根据筛选条件过滤Epic
   */
  const filteredUCs = useMemo(() => {
    if (!filterProduct) return allUCs
    return allUCs.filter(epic => epic.productId === filterProduct)
  }, [allUCs, filterProduct])

  /**
   * 获取SSTS拆解的MR列表（模拟数据）
   * ⚠️ 必须在treeData之前定义，因为treeData会使用此函数
   */
  const getMRListForSSTS = (moduleRequirementId: string) => {
    // 模拟从SSTS拆解出的MR数据
    const mrMap: Record<string, any[]> = {
      'ssts-lka-001': [
        {
          id: 'mr-lka-001-perception',
          sstsId: 'ssts-lka-001',
          moduleId: 'm-perception',
          moduleName: '感知模块',
          name: 'MR-LKA-P-001: 车道线检测算法',
          description: '基于视觉的车道线检测算法实现',
          type: 'FUNCTIONAL',
          status: 'IN_PROGRESS',
          complexity: 'HIGH',
          priority: 'HIGH',
          assignee: '张三（SE）',
          estimatedHours: 120,
          actualHours: 80,
          completionRate: 65,
          dependencies: [],
          acceptanceCriteria: '检测准确率≥95%，帧率≥30fps',
        },
        {
          id: 'mr-lka-001-control',
          sstsId: 'ssts-lka-001',
          moduleId: 'm-control',
          moduleName: '控制模块',
          name: 'MR-LKA-C-001: 横向控制算法',
          description: '基于车道线信息的横向控制算法',
          type: 'FUNCTIONAL',
          status: 'IN_PROGRESS',
          complexity: 'MEDIUM',
          priority: 'HIGH',
          assignee: '李四（SE）',
          estimatedHours: 80,
          actualHours: 60,
          completionRate: 75,
          dependencies: ['mr-lka-001-perception'],
          acceptanceCriteria: '横向偏移≤0.1m',
        },
      ],
      'ssts-acc-001': [
        {
          id: 'mr-acc-001-perception',
          sstsId: 'ssts-acc-001',
          moduleId: 'm-perception',
          moduleName: '感知模块',
          name: 'MR-ACC-P-001: 前车检测算法',
          description: '基于毫米波雷达和视觉融合的前车检测',
          type: 'FUNCTIONAL',
          status: 'DONE',
          complexity: 'HIGH',
          priority: 'HIGH',
          assignee: '王五（SE）',
          estimatedHours: 100,
          actualHours: 95,
          completionRate: 100,
          dependencies: [],
          acceptanceCriteria: '检测准确率≥98%，检测距离≥150m',
        },
      ],
      'ssts-apa-001': [
        {
          id: 'mr-apa-001-perception',
          sstsId: 'ssts-apa-001',
          moduleId: 'm-perception',
          moduleName: '感知模块',
          name: 'MR-APA-P-001: 车位识别算法',
          description: '超声波+视觉融合的车位识别算法',
          type: 'FUNCTIONAL',
          status: 'DONE',
          complexity: 'HIGH',
          priority: 'HIGH',
          assignee: '赵六（SE）',
          estimatedHours: 150,
          actualHours: 145,
          completionRate: 100,
          dependencies: [],
          acceptanceCriteria: '车位识别准确率≥95%',
        },
      ],
    }

    return mrMap[moduleRequirementId] || []
  }

  /**
   * 构建树形数据（三层模型）
   */
  const treeData = useMemo((): DataNode[] => {
    return filteredUCs.map(epic => ({
      key: epic.id,
      title: (
        <Space>
          <span>{epic.name}</span>
          <Tag color={epic.priority === 'HIGH' ? 'red' : 'blue'}>{epic.priority}</Tag>
          {epic.fipId && <Tag>{epic.fipId}</Tag>}
        </Space>
      ),
      icon: <FolderOutlined />,
      children: epic.featureRequirements?.map(fr => ({
        key: fr.id,
        title: (
          <Space>
            <span>{fr.name}</span>
            {fr.maturity < 70 && <Tag color="red">成熟度{fr.maturity}%</Tag>}
          </Space>
        ),
        icon: <FileTextOutlined />,
        children: fr.moduleRequirements?.map(mr => {
          // 获取SSTS下的MR列表
          const mrList = getMRListForSSTS(mr.id)

          return {
            key: mr.id,
            title: mr.name,
            icon: <FileOutlined />,
            children: mrList.map(mrItem => ({
              key: mrItem.id,
              title: (
                <Space>
                  <span>{mrItem.name}</span>
                  <Tag color="cyan">{mrItem.moduleName}</Tag>
                  <Tag color={mrItem.status === 'DONE' ? 'green' : mrItem.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                    {mrItem.status}
                  </Tag>
                </Space>
              ),
              icon: <CodeOutlined />,
              isLeaf: true,
            })),
          }
        }),
      })),
    }))
  }, [filteredUCs])

  /**
   * 获取当前选中的节点数据
   */
  const selectedNode = useMemo(() => {
    if (!selectedNodeKey) return null

    for (const epic of filteredUCs) {
      if (epic.id === selectedNodeKey) {
        return { type: 'uc', data: epic }
      }

      for (const fr of epic.featureRequirements || []) {
        if (fr.id === selectedNodeKey) {
          return { type: 'featureRequirement', data: fr, epic }
        }

        for (const mr of fr.moduleRequirements || []) {
          if (mr.id === selectedNodeKey && mr.ssts?.[0]) {
            return { type: 'ssts', data: mr.ssts[0], mr, fr, epic }
          }

          // 查找MR节点
          const mrList = getMRListForSSTS(mr.id)
          for (const mrItem of mrList) {
            if (mrItem.id === selectedNodeKey) {
              return { type: 'mr', data: mrItem, ssts: mr.ssts?.[0], mr, fr, epic }
            }
          }
        }
      }
    }

    return null
  }, [selectedNodeKey, filteredUCs])

  /**
   * 获取产品名称
   */
  const getProductName = (productId?: string) => {
    if (!productId) return '-'
    for (const pl of productLines) {
      for (const p of pl.products || []) {
        if (p.id === productId) return p.name
      }
    }
    return '-'
  }

  /**
   * 获取产品选项
   */
  const productOptions = useMemo(() => {
    const options: Array<{ value: string; label: string }> = [{ value: '', label: '全部产品' }]
    productLines.forEach(pl => {
      pl.products?.forEach(p => {
        options.push({ value: p.id, label: p.name })
      })
    })
    return options
  }, [productLines])

  /**
   * 获取模块选项
   */
  const moduleOptions = [
    { value: '', label: '全部模块' },
    { value: 'm-perception', label: '感知模块' },
    { value: 'm-planning', label: '规划模块' },
    { value: 'm-control', label: '控制模块' },
    { value: 'm-map', label: '地图定位模块' },
  ]

  /**
   * 渲染Epic详情
   */
  const renderUCDetail = (epic: UC) => {
    return (
      <div>
        <Card title="📚 UC信息">
          <Descriptions column={2}>
            <Descriptions.Item label="UC名称">{epic.name}</Descriptions.Item>
            <Descriptions.Item label="FIP">{epic.fipId || '-'}</Descriptions.Item>
            <Descriptions.Item label="所属产品">{getProductName(epic.productId)}</Descriptions.Item>
            <Descriptions.Item label="优先级">
              <Tag color={epic.priority === 'HIGH' ? 'red' : 'blue'}>{epic.priority}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color="blue">{epic.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="负责人">{epic.ownerId}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{epic.createdAt}</Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>描述：</div>
            <div>{epic.description}</div>
          </div>
        </Card>

        <Card title="📊 完成度" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="FR总数" value={epic.featureRequirements?.length || 0} />
            </Col>
            <Col span={8}>
              <Statistic
                title="已完成"
                value={epic.featureRequirements?.filter(fr => fr.status === 'DONE').length || 0}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="完成率"
                value={
                  epic.featureRequirements?.length
                    ? Math.round(
                      (epic.featureRequirements.filter(fr => fr.status === 'DONE').length /
                        epic.featureRequirements.length) * 100
                    )
                    : 0
                }
                suffix="%"
              />
            </Col>
          </Row>
        </Card>

        <Card title="⚡ 快捷操作" style={{ marginTop: 16 }}>
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined />}>新增Feature需求</Button>
            <Button icon={<EditOutlined />}>编辑UC</Button>
            <Button>查看产品路标</Button>
          </Space>
        </Card>
      </div>
    )
  }

  /**
   * 渲染FeatureRequirement详情
   */
  const renderFRDetail = (fr: FeatureRequirement, epic: UC) => {
    return (
      <div>
        <Card title="📋 Feature需求信息">
          <Descriptions column={2}>
            <Descriptions.Item label="FR ID">{fr.id}</Descriptions.Item>
            <Descriptions.Item label="所属UC">{epic.name}</Descriptions.Item>
            <Descriptions.Item label="所属产品">{getProductName(epic.productId)}</Descriptions.Item>
            <Descriptions.Item label="优先级">
              <Tag color={fr.priority === 'HIGH' ? 'red' : 'blue'}>{fr.priority}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={fr.status === 'IN_PROGRESS' ? 'blue' : 'default'}>{fr.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="冻结状态">
              {fr.isFrozen ? <Tag color="purple">已冻结</Tag> : <Tag>未冻结</Tag>}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>描述：</div>
            <div>{fr.description}</div>
          </div>
        </Card>

        <Card style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="成熟度"
                value={fr.maturity}
                suffix="%"
                styles={{ content: { color: fr.maturity >= 90 ? '#52c41a' : fr.maturity >= 70 ? '#faad14' : '#ff4d4f' } }}
              />
              <Progress percent={fr.maturity} strokeColor={fr.maturity >= 90 ? '#52c41a' : '#faad14'} />
            </Col>
            <Col span={8}>
              <Statistic title="SSTS拆解度" value={fr.maturitySsts} suffix="%" />
              <Progress percent={fr.maturitySsts} />
            </Col>
            <Col span={8}>
              <Statistic title="完成度" value={fr.completion} suffix="%" />
              <Progress percent={fr.completion} />
            </Col>
          </Row>
        </Card>

        <Card title="📄 SSTS列表（系统需求）" style={{ marginTop: 16 }}>
          {fr.moduleRequirements && fr.moduleRequirements.length > 0 ? (
            <Space orientation="vertical" style={{ width: '100%' }}>
              {fr.moduleRequirements.map(mr => (
                <Card
                  key={mr.id}
                  size="small"
                  hoverable
                  onClick={() => setSelectedNodeKey(mr.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Space>
                    <FileOutlined />
                    <span>{mr.name}</span>
                    <Tag color="blue">{mr.type}</Tag>
                    <Tag color={mr.status === 'IN_PROGRESS' ? 'blue' : mr.status === 'DONE' ? 'green' : 'default'}>
                      {mr.status}
                    </Tag>
                    {mr.ssts?.[0]?.architectureDesigned && <Tag color="green">架构✓</Tag>}
                    {mr.ssts?.[0]?.interfaceDesigned && <Tag color="green">接口✓</Tag>}
                  </Space>
                </Card>
              ))}
            </Space>
          ) : (
            <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
              暂无SSTS，请拆解
            </div>
          )}
        </Card>

        <Card title="⚡ 快捷操作" style={{ marginTop: 16 }}>
          <Space wrap>
            <Button type="primary" icon={<BranchesOutlined />}>拆解SSTS</Button>
            <Button icon={<EditOutlined />}>编辑FR</Button>
            <Button>查看PRD</Button>
          </Space>
        </Card>
      </div>
    )
  }

  /**
   * 处理查看MR详情
   */
  const handleViewMRDetail = (mr: any) => {
    setSelectedMR(mr)
    setMrModalVisible(true)
  }

  /**
   * 渲染SSTS详情
   */
  const renderSSTSDetail = (ssts: SSTS, mr: any, fr: FeatureRequirement, epic: UC) => {
    const belongsToModule = '感知模块'
    // 使用moduleRequirement的ID而不是ssts的ID
    const mrList = getMRListForSSTS(mr.id)

    return (
      <div>
        <Card title="📄 SSTS信息">
          <Descriptions column={2}>
            <Descriptions.Item label="SSTS ID">{ssts.id}</Descriptions.Item>
            <Descriptions.Item label="SSTS名称">{ssts.name}</Descriptions.Item>
            <Descriptions.Item label="类型">
              <Tag color="blue">{ssts.type}</Tag>
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>描述：</div>
            <div>{ssts.description}</div>
          </div>
          {ssts.acceptanceCriteria && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>验收标准：</div>
              <div style={{ background: '#f0f2f5', padding: 12, borderRadius: 4 }}>
                {ssts.acceptanceCriteria}
              </div>
            </div>
          )}
        </Card>

        <Card title="🔗 归属关系" style={{ marginTop: 16 }}>
          <Descriptions column={1}>
            <Descriptions.Item label="归属产品">
              <Tag color="blue">{getProductName(epic.productId)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="归属模块">
              <Tag color="cyan">{belongsToModule}</Tag>
              <span style={{ marginLeft: 8, color: '#999', fontSize: 12 }}>
                （MR从SSTS中拆解，归属模块在此体现）
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="归属FR">
              <Tag>{fr.name}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="归属UC">
              <Tag>{epic.name}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="🔄 设计状态" style={{ marginTop: 16 }}>
          <Space orientation="vertical" style={{ width: '100%' }}>
            <div>
              <Space>
                {ssts.architectureDesigned ? (
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                ) : (
                  <ClockCircleOutlined />
                )}
                <span>架构设计</span>
              </Space>
              {ssts.architectureDesigned && <Tag color="green" style={{ marginLeft: 24 }}>已完成</Tag>}
            </div>
            <div>
              <Space>
                {ssts.interfaceDesigned ? (
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                ) : (
                  <ClockCircleOutlined />
                )}
                <span>接口设计</span>
              </Space>
              {ssts.interfaceDesigned ? (
                <Tag color="green" style={{ marginLeft: 24 }}>已完成</Tag>
              ) : (
                <Tag color="orange" style={{ marginLeft: 24 }}>待完成</Tag>
              )}
            </div>
          </Space>
        </Card>

        {ssts.assets && ssts.assets.length > 0 && (
          <Card title="🎁 关联资产（C2集成）" style={{ marginTop: 16 }}>
            {ssts.assets.map(asset => (
              <Card key={asset.id} size="small" style={{ marginBottom: 8 }}>
                <Space orientation="vertical" style={{ width: '100%' }}>
                  <Space>
                    <span style={{ fontWeight: 600 }}>{asset.assetName}</span>
                    <Tag>{asset.assetVersion}</Tag>
                    <Tag color="green">{asset.usageType}</Tag>
                  </Space>
                  <div style={{ fontSize: 12, color: '#666' }}>
                    复用率：{asset.reuseRate}% | {asset.notes}
                  </div>
                </Space>
              </Card>
            ))}
          </Card>
        )}

        {ssts.testCases && ssts.testCases.length > 0 && (
          <Card title="🧪 测试用例（C5集成）" style={{ marginTop: 16 }}>
            {ssts.testCases.map(tc => (
              <Card key={tc.id} size="small" style={{ marginBottom: 8 }}>
                <Space>
                  <span>{tc.name}</span>
                  <Tag>{tc.type}</Tag>
                  <Tag color={tc.status === 'PASSED' ? 'green' : tc.status === 'FAILED' ? 'red' : 'default'}>
                    {tc.status}
                  </Tag>
                  <Tag color={tc.priority === 'HIGH' ? 'red' : 'blue'}>{tc.priority}</Tag>
                </Space>
              </Card>
            ))}
          </Card>
        )}

        {/* ⭐ 拆解的模块需求（MR）列表 */}
        <Card
          title={`🔧 拆解的模块需求（MR）（${mrList.length}个）`}
          style={{ marginTop: 16 }}
          extra={
            <Button size="small" type="primary" icon={<PlusOutlined />}>
              新增MR
            </Button>
          }
        >
          {mrList.length > 0 ? (
            <Space orientation="vertical" style={{ width: '100%' }}>
              {mrList.map(mr => (
                <Card
                  key={mr.id}
                  size="small"
                  hoverable
                  style={{ cursor: 'pointer', background: '#fafafa' }}
                >
                  <Row justify="space-between" align="middle">
                    <Col span={18}>
                      <Space orientation="vertical" size="small" style={{ width: '100%' }}>
                        <Space>
                          <CodeOutlined style={{ color: '#1890ff' }} />
                          <span style={{ fontWeight: 600 }}>{mr.name}</span>
                          <Tag color="cyan">{mr.moduleName}</Tag>
                          <Tag color={mr.status === 'DONE' ? 'green' : mr.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                            {mr.status}
                          </Tag>
                        </Space>
                        <div style={{ fontSize: 12, color: '#666', paddingLeft: 20 }}>
                          {mr.description}
                        </div>
                        <Space style={{ paddingLeft: 20, fontSize: 12 }}>
                          <span>负责人：{mr.assignee}</span>
                          <Divider type="vertical" />
                          <span>复杂度：{mr.complexity}</span>
                          <Divider type="vertical" />
                          <span>完成度：{mr.completionRate}%</span>
                          <Divider type="vertical" />
                          <Progress
                            percent={mr.completionRate}
                            size="small"
                            style={{ width: 100 }}
                            strokeColor={mr.completionRate >= 100 ? '#52c41a' : '#1890ff'}
                          />
                        </Space>
                      </Space>
                    </Col>
                    <Col span={6} style={{ textAlign: 'right' }}>
                      <Space>
                        <Button
                          size="small"
                          icon={<EyeOutlined />}
                          onClick={() => handleViewMRDetail(mr)}
                        >
                          查看详情
                        </Button>
                        <Button size="small" icon={<EditOutlined />}>
                          编辑
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          ) : (
            <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
              <CodeOutlined style={{ fontSize: 32, marginBottom: 8 }} />
              <div>暂无模块需求，请从SSTS拆解</div>
              <Button type="link" icon={<BranchesOutlined />} style={{ marginTop: 8 }}>
                开始拆解
              </Button>
            </div>
          )}
        </Card>

        <Card title="⚡ 快捷操作" style={{ marginTop: 16 }}>
          <Space wrap>
            <Button type="primary" icon={<EditOutlined />}>编辑SSTS</Button>
            <Button icon={<BranchesOutlined />}>拆解为MR（归属模块）</Button>
            <Button>查看架构设计</Button>
            <Button>查看接口设计</Button>
            <Button>创建测试用例</Button>
          </Space>
        </Card>
      </div>
    )
  }

  /**
   * 渲染MR详情（新增）
   */
  const renderMRDetail = (mr: any, ssts: any, sstsNode: any, fr: FeatureRequirement, epic: UC) => {
    return (
      <div>
        <Card title="🔧 模块需求（MR）信息">
          <Descriptions column={2}>
            <Descriptions.Item label="MR ID">{mr.id}</Descriptions.Item>
            <Descriptions.Item label="归属模块">
              <Tag color="cyan">{mr.moduleName}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="MR名称" span={2}>
              {mr.name}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={mr.status === 'DONE' ? 'green' : mr.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                {mr.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="优先级">
              <Tag color={mr.priority === 'HIGH' ? 'red' : 'blue'}>
                {mr.priority}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="复杂度">{mr.complexity}</Descriptions.Item>
            <Descriptions.Item label="负责人">{mr.assignee}</Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>描述：</div>
            <div>{mr.description}</div>
          </div>
        </Card>

        <Card title="🔗 归属关系" style={{ marginTop: 16 }}>
          <Descriptions column={1}>
            <Descriptions.Item label="归属SSTS">
              <Tag>{ssts?.name || sstsNode.name}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="归属FR">
              <Tag>{fr.name}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="归属UC">
              <Tag>{epic.name}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="归属产品">
              <Tag color="blue">{getProductName(epic.productId)}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="📊 工作量统计" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="预估工时" value={mr.estimatedHours} suffix="小时" />
            </Col>
            <Col span={8}>
              <Statistic title="实际工时" value={mr.actualHours} suffix="小时" />
            </Col>
            <Col span={8}>
              <Statistic
                title="完成度"
                value={mr.completionRate}
                suffix="%"
                styles={{ content: { color: mr.completionRate >= 100 ? '#52c41a' : '#1890ff' } }}
              />
            </Col>
          </Row>
          <div style={{ marginTop: 16 }}>
            <Progress
              percent={mr.completionRate}
              strokeColor={mr.completionRate >= 100 ? '#52c41a' : '#1890ff'}
            />
          </div>
        </Card>

        <Card title="✅ 验收标准" style={{ marginTop: 16 }}>
          <div style={{ background: '#f0f2f5', padding: 12, borderRadius: 4 }}>
            {mr.acceptanceCriteria}
          </div>
        </Card>

        {mr.dependencies && mr.dependencies.length > 0 && (
          <Card title="🔗 依赖关系" style={{ marginTop: 16 }}>
            <Space orientation="vertical">
              {mr.dependencies.map((depId: string) => (
                <Tag key={depId} icon={<BranchesOutlined />}>
                  依赖：{depId}
                </Tag>
              ))}
            </Space>
          </Card>
        )}

        <Card title="⚡ 快捷操作" style={{ marginTop: 16 }}>
          <Space wrap>
            <Button type="primary" icon={<EditOutlined />}>编辑MR</Button>
            <Button icon={<TeamOutlined />}>分配负责人</Button>
            <Button>查看代码提交</Button>
            <Button>查看测试用例</Button>
          </Space>
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
            <FolderOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>请在左侧树中选择一个节点查看详情</div>
          </div>
        </Card>
      )
    }

    switch (selectedNode.type) {
      case 'uc':
        return renderUCDetail(selectedNode.data as UC)
      case 'featureRequirement':
        return renderFRDetail(selectedNode.data as FeatureRequirement, selectedNode.epic)
      case 'ssts':
        return renderSSTSDetail(selectedNode.data as SSTS, selectedNode.mr, selectedNode.fr, selectedNode.epic)
      case 'mr':
        return renderMRDetail(selectedNode.data, selectedNode.ssts, selectedNode.mr, selectedNode.fr, selectedNode.epic)
      default:
        return <Card>节点类型：{selectedNode.type}</Card>
    }
  }

  return (
    <>
      <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={10} lg={10}>
            <Card
              title="🌲 需求全层次树（三层模型）"
              extra={
                <Space>
                  <Button size="small" onClick={() => setExpandedKeys([])}>全部收起</Button>
                  <Button size="small" onClick={() => setExpandedKeys(['epic-l2plus', 'fr-lka-001'])}>展开示例</Button>
                </Space>
              }
            >
              <Card size="small" style={{ marginBottom: 16, background: '#f9f9f9' }}>
                <Space orientation="vertical" style={{ width: '100%' }} size="small">
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    <FilterOutlined /> 筛选范围
                  </div>
                  <Space>
                    <span style={{ fontSize: 12, color: '#666' }}>产品：</span>
                    <Select
                      value={filterProduct}
                      onChange={setFilterProduct}
                      style={{ width: 180 }}
                      size="small"
                      options={productOptions}
                    />
                  </Space>
                  <Space>
                    <span style={{ fontSize: 12, color: '#666' }}>模块：</span>
                    <Select
                      value={filterModule}
                      onChange={setFilterModule}
                      style={{ width: 180 }}
                      size="small"
                      options={moduleOptions}
                      disabled
                    />
                    <span style={{ fontSize: 12, color: '#999' }}>（开发中）</span>
                  </Space>
                </Space>
              </Card>

              <Input.Search placeholder="搜索Epic、FR、SSTS..." style={{ marginBottom: 16 }} />

              <Tree
                showIcon
                treeData={treeData}
                selectedKeys={[selectedNodeKey]}
                expandedKeys={expandedKeys}
                onSelect={keys => setSelectedNodeKey(keys[0] as string)}
                onExpand={keys => setExpandedKeys(keys as string[])}
                height={600}
                style={{ background: '#fafafa', padding: 16, borderRadius: 4 }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={24} md={14} lg={14}>
            {renderDetailPanel()}
          </Col>
        </Row>
      </div>

      {/* MR详情Modal */}
      <Modal
        title="🔧 模块需求（MR）详情"
        open={mrModalVisible}
        onCancel={() => setMrModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setMrModalVisible(false)}>
            关闭
          </Button>,
          <Button key="edit" type="primary" icon={<EditOutlined />}>
            编辑MR
          </Button>,
        ]}
      >
        {selectedMR && (
          <div>
            <Card size="small" style={{ marginBottom: 16 }}>
              <Descriptions column={2} size="small">
                <Descriptions.Item label="MR ID">{selectedMR.id}</Descriptions.Item>
                <Descriptions.Item label="归属模块">
                  <Tag color="cyan">{selectedMR.moduleName}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="MR名称" span={2}>
                  {selectedMR.name}
                </Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color={selectedMR.status === 'DONE' ? 'green' : selectedMR.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                    {selectedMR.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="优先级">
                  <Tag color={selectedMR.priority === 'HIGH' ? 'red' : 'blue'}>
                    {selectedMR.priority}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="复杂度">{selectedMR.complexity}</Descriptions.Item>
                <Descriptions.Item label="负责人">{selectedMR.assignee}</Descriptions.Item>
              </Descriptions>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>描述：</div>
                <div>{selectedMR.description}</div>
              </div>
            </Card>

            <Card size="small" title="📊 工作量统计" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="预估工时" value={selectedMR.estimatedHours} suffix="小时" />
                </Col>
                <Col span={8}>
                  <Statistic title="实际工时" value={selectedMR.actualHours} suffix="小时" />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="完成度"
                    value={selectedMR.completionRate}
                    suffix="%"
                    styles={{ content: { color: selectedMR.completionRate >= 100 ? '#52c41a' : '#1890ff' } }}
                  />
                </Col>
              </Row>
              <div style={{ marginTop: 16 }}>
                <Progress
                  percent={selectedMR.completionRate}
                  strokeColor={selectedMR.completionRate >= 100 ? '#52c41a' : '#1890ff'}
                />
              </div>
            </Card>

            <Card size="small" title="✅ 验收标准" style={{ marginBottom: 16 }}>
              <div style={{ background: '#f0f2f5', padding: 12, borderRadius: 4 }}>
                {selectedMR.acceptanceCriteria}
              </div>
            </Card>

            {selectedMR.dependencies && selectedMR.dependencies.length > 0 && (
              <Card size="small" title="🔗 依赖关系">
                <Space orientation="vertical">
                  {selectedMR.dependencies.map((depId: string) => (
                    <Tag key={depId} icon={<BranchesOutlined />}>
                      依赖：{depId}
                    </Tag>
                  ))}
                </Space>
              </Card>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}

export default RequirementTreeV3
