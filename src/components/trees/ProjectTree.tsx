/**
 * 项目树组件 - 12个造车节点架构
 * 用于C0项目管理页面
 * 从auto-rd-platform-web迁移并1:1还原
 */

import React, { useState, useMemo } from 'react'
import { Row, Col, Tree, Card, Descriptions, Space, Button, Tag, Statistic, Progress, Timeline } from 'antd'
import {
  ProjectOutlined,
  BoxPlotOutlined,
  RocketOutlined,
  FlagOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import type { DataNode } from 'antd/es/tree'
import {
  mockProjectTreeData,
  type DomainProject,
  type VehicleNode,
  type Gateway,
  type VPSubPhase,
  type ProductVersionPlan,
  type Sprint,
} from '@/mock/projectTree'

export interface ProjectTreeProps {
  height?: number
}

const ProjectTree: React.FC<ProjectTreeProps> = ({ height = 700 }) => {
  const projects = mockProjectTreeData

  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('vn-vp')
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['proj-dreamcar-adas', 'vn-vp'])

  /**
   * 构建树形数据（12个造车节点）
   */
  const treeData = useMemo((): DataNode[] => {
    return projects.map((proj) => ({
      key: proj.id,
      title: (
        <Space>
          <span>{proj.name}</span>
          <Tag color="blue">{proj.vehicleModel}</Tag>
        </Space>
      ),
      icon: <ProjectOutlined />,
      children: proj.vehicleNodes?.map((vn) => {
        const statusIcon =
          vn.status === 'DONE' ? (
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
          ) : vn.status === 'IN_PROGRESS' ? (
            <SyncOutlined spin style={{ color: '#1890ff' }} />
          ) : (
            <ClockCircleOutlined style={{ color: '#999' }} />
          )

        const baseChildren: DataNode[] = []

        // 1. Gateway节点
        if (vn.gateways && vn.gateways.length > 0) {
          baseChildren.push({
            key: `${vn.id}-gateways`,
            title: `🚪 质量门禁 (${vn.gateways.length}个)`,
            icon: <FlagOutlined style={{ color: '#ff4d4f' }} />,
            children: vn.gateways.map((gw) => ({
              key: gw.id,
              title: (
                <Space>
                  <span>{gw.name}</span>
                  <Tag color={gw.status === 'PASSED' ? 'green' : gw.status === 'PENDING' ? 'orange' : 'default'}>
                    {gw.date}
                  </Tag>
                </Space>
              ),
              icon: <FlagOutlined style={{ color: gw.importance === 'HIGH' ? '#ff4d4f' : '#faad14' }} />,
              isLeaf: true,
            })),
          })
        }

        // 2. VP子阶段（仅VP节点）
        if (vn.subPhases && vn.subPhases.length > 0) {
          baseChildren.push({
            key: `${vn.id}-subphases`,
            title: `🔄 VP子阶段 (VP1/VP2/VP3)`,
            icon: <CarOutlined style={{ color: '#722ed1' }} />,
            children: vn.subPhases.map((sp) => ({
              key: sp.id,
              title: (
                <Space>
                  <span>{sp.name}</span>
                  <Tag color={sp.status === 'DONE' ? 'green' : sp.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                    {sp.targetDate}
                  </Tag>
                </Space>
              ),
              icon: <CarOutlined />,
              children: sp.gateways?.map((gw) => ({
                key: gw.id,
                title: (
                  <Space>
                    <span>{gw.name}</span>
                    <Tag color={gw.status === 'PASSED' ? 'green' : 'orange'}>{gw.date}</Tag>
                  </Space>
                ),
                icon: <FlagOutlined style={{ color: '#ff4d4f' }} />,
                isLeaf: true,
              })),
            })),
          })
        }

        // 3. 产品版本
        if (vn.productVersions && vn.productVersions.length > 0) {
          baseChildren.push({
            key: `${vn.id}-products`,
            title: `📦 产品及版本 (${vn.productVersions.length}个)`,
            icon: <BoxPlotOutlined />,
            children: vn.productVersions.map((pv) => ({
              key: pv.id,
              title: (
                <Space>
                  <span>
                    {pv.productName} {pv.version}
                  </span>
                  <Tag color={pv.status === 'DONE' ? 'green' : pv.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                    {pv.status}
                  </Tag>
                  {pv.completion !== undefined && <Tag>完成{pv.completion}%</Tag>}
                </Space>
              ),
              icon: <BoxPlotOutlined />,
              isLeaf: true,
            })),
          })
        }

        // 4. Sprint列表
        if (vn.sprints && vn.sprints.length > 0) {
          baseChildren.push({
            key: `${vn.id}-sprints`,
            title: `🚀 迭代计划 (${vn.sprints.length}个Sprint)`,
            icon: <RocketOutlined />,
            children: vn.sprints.map((sprint) => ({
              key: sprint.id,
              title: (
                <Space>
                  <span>{sprint.name}</span>
                  <Tag color={sprint.status === 'DONE' ? 'green' : sprint.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                    {sprint.status}
                  </Tag>
                </Space>
              ),
              icon: <RocketOutlined />,
              isLeaf: true,
            })),
          })
        }

        return {
          key: vn.id,
          title: (
            <Space>
              {statusIcon}
              <span style={{ fontWeight: 600 }}>
                {vn.code} - {vn.fullName}
              </span>
              <Tag
                color={
                  vn.phase === 'PLANNING'
                    ? 'default'
                    : vn.phase === 'INITIATION'
                    ? 'blue'
                    : vn.phase === 'DEVELOPMENT'
                    ? 'purple'
                    : vn.phase === 'PRODUCTION'
                    ? 'orange'
                    : vn.phase === 'LAUNCH'
                    ? 'green'
                    : 'default'
                }
              >
                {vn.phase}
              </Tag>
              {vn.maturity !== undefined && <Tag>成熟度{vn.maturity}%</Tag>}
            </Space>
          ),
          icon: <CarOutlined />,
          children: baseChildren.length > 0 ? baseChildren : undefined,
        }
      }),
    }))
  }, [projects])

  /**
   * 获取当前选中的节点数据
   */
  const selectedNode = useMemo(() => {
    if (!selectedNodeKey) return null

    const project = projects.find((p) => p.id === selectedNodeKey)
    if (project) return { type: 'project', data: project }

    for (const proj of projects) {
      const vn = proj.vehicleNodes?.find((v) => v.id === selectedNodeKey)
      if (vn) return { type: 'vehicleNode', data: vn, project: proj }

      for (const vehicleNode of proj.vehicleNodes || []) {
        const gateway = vehicleNode.gateways?.find((g) => g.id === selectedNodeKey)
        if (gateway) return { type: 'gateway', data: gateway, vehicleNode, project: proj }

        const subPhase = vehicleNode.subPhases?.find((sp) => sp.id === selectedNodeKey)
        if (subPhase) return { type: 'vpSubPhase', data: subPhase, vehicleNode, project: proj }

        for (const sp of vehicleNode.subPhases || []) {
          const spGateway = sp.gateways?.find((g) => g.id === selectedNodeKey)
          if (spGateway) return { type: 'gateway', data: spGateway, vpSubPhase: sp, vehicleNode, project: proj }
        }

        const productVersion = vehicleNode.productVersions?.find((pv) => pv.id === selectedNodeKey)
        if (productVersion) return { type: 'productVersion', data: productVersion, vehicleNode, project: proj }

        const sprint = vehicleNode.sprints?.find((s) => s.id === selectedNodeKey)
        if (sprint) return { type: 'sprint', data: sprint, vehicleNode, project: proj }
      }
    }

    return null
  }, [selectedNodeKey, projects])

  /**
   * 渲染DomainProject详情
   */
  const renderProjectDetail = (project: DomainProject) => {
    const completedNodes = project.vehicleNodes?.filter((vn) => vn.status === 'DONE').length || 0
    const inProgressNodes = project.vehicleNodes?.filter((vn) => vn.status === 'IN_PROGRESS').length || 0
    const totalGateways = project.vehicleNodes?.reduce((sum, vn) => sum + (vn.gateways?.length || 0), 0) || 0
    const passedGateways =
      project.vehicleNodes?.reduce((sum, vn) => sum + (vn.gateways?.filter((g) => g.status === 'PASSED').length || 0), 0) || 0

    return (
      <div>
        <Card title="🏢 域项目信息">
          <Descriptions column={2}>
            <Descriptions.Item label="项目名称">{project.name}</Descriptions.Item>
            <Descriptions.Item label="项目代码">{project.code}</Descriptions.Item>
            <Descriptions.Item label="车型">{project.vehicleModel || '-'}</Descriptions.Item>
            <Descriptions.Item label="项目类型">
              <Tag color={project.projectType === 'NEW' ? 'green' : 'blue'}>{project.projectType || 'NEW'}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="所属域">{project.domain}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={project.status === 'IN_PROGRESS' ? 'blue' : 'green'}>{project.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="开始日期">{project.startDate}</Descriptions.Item>
            <Descriptions.Item label="结束日期">{project.endDate}</Descriptions.Item>
            <Descriptions.Item label="描述" span={2}>
              {project.description}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="📊 项目统计" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="造车节点总数" value={project.vehicleNodes?.length || 0} suffix="个" />
            </Col>
            <Col span={6}>
              <Statistic title="已完成节点" value={completedNodes} suffix="个" />
            </Col>
            <Col span={6}>
              <Statistic title="进行中节点" value={inProgressNodes} suffix="个" />
            </Col>
            <Col span={6}>
              <Statistic
                title="Gateway通过率"
                value={totalGateways > 0 ? Math.round((passedGateways / totalGateways) * 100) : 0}
                suffix="%"
              />
            </Col>
          </Row>
        </Card>

        <Card title="🚗 造车节点时间线" style={{ marginTop: 16 }}>
          <Timeline
            mode="left"
            items={project.vehicleNodes
              ?.sort((a, b) => a.sequence - b.sequence)
              .map((vn) => ({
                key: vn.id,
                color: vn.status === 'DONE' ? 'green' : vn.status === 'IN_PROGRESS' ? 'blue' : 'gray',
                dot: vn.status === 'DONE' ? <CheckCircleOutlined /> : vn.status === 'IN_PROGRESS' ? <SyncOutlined spin /> : <ClockCircleOutlined />,
                children: (
                  <Card size="small" hoverable onClick={() => setSelectedNodeKey(vn.id)} style={{ cursor: 'pointer' }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Space>
                          <span style={{ fontWeight: 600 }}>
                            {vn.code} - {vn.fullName}
                          </span>
                          <Tag color={vn.status === 'DONE' ? 'green' : vn.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                            {vn.status}
                          </Tag>
                          {vn.maturity !== undefined && <Tag>成熟度{vn.maturity}%</Tag>}
                        </Space>
                      </Col>
                      <Col>
                        <span style={{ color: '#666' }}>目标：{vn.targetDate}</span>
                      </Col>
                    </Row>
                  </Card>
                ),
              }))}
          />
        </Card>
      </div>
    )
  }

  /**
   * 渲染VehicleNode详情
   */
  const renderVehicleNodeDetail = (vn: VehicleNode, project: DomainProject) => {
    return (
      <div>
        <Card title={`🚗 造车节点：${vn.code} - ${vn.fullName}`}>
          <Descriptions column={2}>
            <Descriptions.Item label="节点代码">{vn.code}</Descriptions.Item>
            <Descriptions.Item label="节点阶段">
              <Tag
                color={
                  vn.phase === 'PLANNING'
                    ? 'default'
                    : vn.phase === 'INITIATION'
                    ? 'blue'
                    : vn.phase === 'DEVELOPMENT'
                    ? 'purple'
                    : vn.phase === 'PRODUCTION'
                    ? 'orange'
                    : vn.phase === 'LAUNCH'
                    ? 'green'
                    : 'default'
                }
              >
                {vn.phase}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="所属项目">{project.name}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={vn.status === 'DONE' ? 'green' : vn.status === 'IN_PROGRESS' ? 'blue' : 'default'}>{vn.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="开始日期">{vn.startDate}</Descriptions.Item>
            <Descriptions.Item label="目标日期">
              <Tag color="blue">{vn.targetDate}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="描述" span={2}>
              {vn.description}
            </Descriptions.Item>
          </Descriptions>

          {(vn.maturity !== undefined || vn.completion !== undefined) && (
            <Row gutter={16} style={{ marginTop: 16 }}>
              {vn.maturity !== undefined && (
                <Col span={12}>
                  <Statistic title="成熟度" value={vn.maturity} suffix="%" />
                  <Progress percent={vn.maturity} strokeColor={vn.maturity >= 90 ? '#52c41a' : '#faad14'} />
                </Col>
              )}
              {vn.completion !== undefined && (
                <Col span={12}>
                  <Statistic title="完成度" value={vn.completion} suffix="%" />
                  <Progress percent={vn.completion} />
                </Col>
              )}
            </Row>
          )}
        </Card>

        {vn.gateways && vn.gateways.length > 0 && (
          <Card title={`🚪 质量门禁 (${vn.gateways.length}个)`} style={{ marginTop: 16 }}>
            <Space orientation="vertical" style={{ width: '100%' }} size="middle">
              {vn.gateways.map((gw) => (
                <Card key={gw.id} size="small" hoverable onClick={() => setSelectedNodeKey(gw.id)} style={{ cursor: 'pointer' }}>
                  <Row justify="space-between" align="middle">
                    <Col span={16}>
                      <Space orientation="vertical">
                        <Space>
                          <FlagOutlined style={{ color: gw.importance === 'HIGH' ? '#ff4d4f' : '#faad14' }} />
                          <span style={{ fontWeight: 600 }}>{gw.name}</span>
                          <Tag color={gw.status === 'PASSED' ? 'green' : gw.status === 'PENDING' ? 'orange' : 'default'}>
                            {gw.status || 'PENDING'}
                          </Tag>
                          <Tag color={gw.importance === 'HIGH' ? 'red' : 'orange'}>{gw.importance}</Tag>
                        </Space>
                        {gw.criteria && <div style={{ fontSize: 12, color: '#666' }}>标准：{gw.criteria}</div>}
                      </Space>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                      <Tag color="blue">{gw.date}</Tag>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          </Card>
        )}

        {vn.subPhases && vn.subPhases.length > 0 && (
          <Card title="🔄 VP子阶段 (VP1/VP2/VP3)" style={{ marginTop: 16 }}>
            <Timeline
              items={vn.subPhases.map((sp) => ({
                key: sp.id,
                color: sp.status === 'DONE' ? 'green' : sp.status === 'IN_PROGRESS' ? 'blue' : 'gray',
                dot: sp.status === 'DONE' ? <CheckCircleOutlined /> : sp.status === 'IN_PROGRESS' ? <SyncOutlined spin /> : <ClockCircleOutlined />,
                children: (
                  <Card size="small" hoverable onClick={() => setSelectedNodeKey(sp.id)} style={{ cursor: 'pointer' }}>
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <Space>
                        <span style={{ fontWeight: 600 }}>{sp.name}</span>
                        <Tag color={sp.status === 'DONE' ? 'green' : sp.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                          {sp.status}
                        </Tag>
                        <Tag color="blue">{sp.targetDate}</Tag>
                      </Space>
                      {sp.gateways && sp.gateways.length > 0 && (
                        <div style={{ fontSize: 12, color: '#666' }}>Gateway: {sp.gateways.map((g) => g.code).join(', ')}</div>
                      )}
                    </Space>
                  </Card>
                ),
              }))}
            />
          </Card>
        )}

        {vn.productVersions && vn.productVersions.length > 0 && (
          <Card title={`📦 产品版本 (${vn.productVersions.length}个)`} style={{ marginTop: 16 }}>
            <Space orientation="vertical" style={{ width: '100%' }}>
              {vn.productVersions.map((pv) => (
                <Card key={pv.id} size="small" hoverable onClick={() => setSelectedNodeKey(pv.id)} style={{ cursor: 'pointer' }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <BoxPlotOutlined />
                        <span style={{ fontWeight: 600 }}>
                          {pv.productName} {pv.version}
                        </span>
                        <Tag color={pv.status === 'DONE' ? 'green' : pv.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                          {pv.status}
                        </Tag>
                        {pv.completion !== undefined && <Tag>完成{pv.completion}%</Tag>}
                      </Space>
                    </Col>
                    <Col>
                      <span style={{ color: '#666' }}>目标：{pv.targetDate}</span>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          </Card>
        )}

        {vn.sprints && vn.sprints.length > 0 && (
          <Card title={`🚀 Sprint列表 (${vn.sprints.length}个)`} style={{ marginTop: 16 }}>
            <Row gutter={[8, 8]}>
              {vn.sprints.map((sprint) => (
                <Col key={sprint.id} span={12}>
                  <Card size="small" hoverable onClick={() => setSelectedNodeKey(sprint.id)} style={{ cursor: 'pointer' }}>
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <Space>
                        <RocketOutlined />
                        <span style={{ fontWeight: 600 }}>{sprint.name}</span>
                        <Tag color={sprint.status === 'DONE' ? 'green' : sprint.status === 'IN_PROGRESS' ? 'blue' : 'default'}>
                          {sprint.status}
                        </Tag>
                      </Space>
                      <div style={{ fontSize: 12, color: '#666' }}>
                        {sprint.startDate} ~ {sprint.endDate}
                      </div>
                      <div>
                        <Progress percent={sprint.committed > 0 ? Math.round((sprint.completed / sprint.committed) * 100) : 0} size="small" />
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        )}

        <Card title="⚡ 快捷操作" style={{ marginTop: 16 }}>
          <Space wrap>
            <Button type="primary">查看详细计划</Button>
            <Button>添加Gateway</Button>
            <Button>添加产品版本</Button>
            <Button>查看迭代轴视图</Button>
          </Space>
        </Card>
      </div>
    )
  }

  /**
   * 渲染Gateway详情
   */
  const renderGatewayDetail = (gateway: Gateway, vehicleNode?: VehicleNode, project?: DomainProject) => {
    return (
      <div>
        <Card title="🚪 质量门禁（Gateway）信息">
          <Descriptions column={2}>
            <Descriptions.Item label="门禁代码">
              <Tag color="red" style={{ fontSize: 14 }}>
                {gateway.code}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="门禁名称">
              <span style={{ fontWeight: 600 }}>{gateway.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="门禁日期">
              <Tag color="blue">{gateway.date}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="门禁状态">
              <Tag color={gateway.status === 'PASSED' ? 'green' : gateway.status === 'PENDING' ? 'orange' : 'default'}>
                {gateway.status || 'PENDING'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="重要性">
              <Tag color={gateway.importance === 'HIGH' ? 'red' : gateway.importance === 'MEDIUM' ? 'orange' : 'blue'}>
                {gateway.importance}
              </Tag>
            </Descriptions.Item>
            {vehicleNode && (
              <Descriptions.Item label="所属节点">
                <Tag>
                  {vehicleNode.code} - {vehicleNode.fullName}
                </Tag>
              </Descriptions.Item>
            )}
            {project && <Descriptions.Item label="所属项目">{project.name}</Descriptions.Item>}
            <Descriptions.Item label="通过标准" span={2}>
              <div style={{ background: '#fff7e6', padding: 12, borderRadius: 4, border: '1px solid #ffd666' }}>
                {gateway.criteria || '待定义'}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    )
  }

  /**
   * 渲染Sprint详情
   */
  const renderSprintDetail = (sprint: Sprint) => {
    return (
      <div>
        <Card title="🚀 Sprint信息">
          <Descriptions column={2}>
            <Descriptions.Item label="Sprint名称">{sprint.name}</Descriptions.Item>
            <Descriptions.Item label="Sprint代码">{sprint.code}</Descriptions.Item>
            <Descriptions.Item label="团队">{sprint.teamName}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={sprint.status === 'IN_PROGRESS' ? 'blue' : sprint.status === 'DONE' ? 'green' : 'default'}>
                {sprint.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="时间">
              {sprint.startDate} ~ {sprint.endDate}
            </Descriptions.Item>
          </Descriptions>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Statistic title="容量" value={sprint.capacity} suffix="SP" />
            </Col>
            <Col span={8}>
              <Statistic title="已承诺" value={sprint.committed} suffix="SP" />
            </Col>
            <Col span={8}>
              <Statistic title="已完成" value={sprint.completed} suffix="SP" />
            </Col>
          </Row>

          <div style={{ marginTop: 16 }}>
            <Progress percent={Math.round((sprint.completed / sprint.committed) * 100)} />
          </div>
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
            <ProjectOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>请在左侧树中选择一个节点查看详情</div>
          </div>
        </Card>
      )
    }

    switch (selectedNode.type) {
      case 'project':
        return renderProjectDetail(selectedNode.data as DomainProject)
      case 'vehicleNode':
        return renderVehicleNodeDetail(selectedNode.data as VehicleNode, selectedNode.project as DomainProject)
      case 'gateway':
        return renderGatewayDetail(selectedNode.data as Gateway, selectedNode.vehicleNode, selectedNode.project)
      case 'sprint':
        return renderSprintDetail(selectedNode.data as Sprint)
      case 'vpSubPhase':
        return renderVehicleNodeDetail(selectedNode.vehicleNode as VehicleNode, selectedNode.project as DomainProject)
      default:
        return <Card>节点类型：{selectedNode.type}</Card>
    }
  }

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={10} lg={10}>
          <Card title="🌲 项目计划树（造车节点架构 - 12个节点）">
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

export default ProjectTree
