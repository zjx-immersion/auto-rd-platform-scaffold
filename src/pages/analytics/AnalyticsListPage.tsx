/**
 * Metrics页面 - 需求、开发、质量指标分析
 */

import React, { useState } from 'react'
import { Card, Tabs, Row, Col, Statistic, Progress, Table, Tag, Select, Space } from 'antd'
import {
  BarChartOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BugOutlined,
  CodeOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'

const Metrics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week')

  // 需求指标数据
  const requirementMetrics = {
    total: 156,
    completed: 128,
    inProgress: 23,
    blocked: 5,
    completionRate: 82,
    avgCycleTime: 8.5,
    trend: 'up',
  }

  // 开发效能数据
  const devMetrics = {
    codeCommits: 342,
    mrCreated: 89,
    mrMerged: 76,
    mrReviewTime: 4.2,
    buildSuccessRate: 94.5,
    codeQuality: 88,
  }

  // 质量指标数据
  const qualityMetrics = {
    totalBugs: 45,
    criticalBugs: 3,
    highBugs: 12,
    mediumBugs: 20,
    lowBugs: 10,
    bugFixRate: 91,
    testCoverage: 76,
  }

  // 需求完成趋势
  const requirementTrendData = [
    { sprint: 'Sprint 1', planned: 20, completed: 18 },
    { sprint: 'Sprint 2', planned: 22, completed: 20 },
    { sprint: 'Sprint 3', planned: 25, completed: 22 },
    { sprint: 'Sprint 4', planned: 23, completed: 23 },
  ]

  // Bug分布数据
  const bugDistributionData = [
    { module: 'LKA模块', critical: 1, high: 3, medium: 5, low: 2 },
    { module: 'ACC模块', critical: 1, high: 4, medium: 6, low: 3 },
    { module: '感知模块', critical: 1, high: 5, medium: 9, low: 5 },
  ]

  // 代码提交活跃度
  const commitActivityData = [
    { developer: '张三', commits: 89, linesAdded: 3250, linesDeleted: 1200, mrs: 12 },
    { developer: '李四', commits: 76, linesAdded: 2890, linesDeleted: 980, mrs: 10 },
    { developer: '王五', commits: 65, linesAdded: 2340, linesDeleted: 850, mrs: 9 },
  ]

  // 需求趋势表格列
  const requirementTrendColumns = [
    { title: 'Sprint', dataIndex: 'sprint', key: 'sprint', width: 150 },
    { title: '计划需求', dataIndex: 'planned', key: 'planned', width: 120 },
    { title: '完成需求', dataIndex: 'completed', key: 'completed', width: 120 },
    {
      title: '完成率',
      key: 'rate',
      render: (_: any, record: any) => {
        const rate = Math.round((record.completed / record.planned) * 100)
        return <Progress percent={rate} size="small" style={{ width: 100 }} />
      },
    },
  ]

  // Bug分布表格列
  const bugDistributionColumns = [
    { title: '模块', dataIndex: 'module', key: 'module', width: 200 },
    {
      title: '严重',
      dataIndex: 'critical',
      key: 'critical',
      width: 100,
      render: (count: number) => <Tag color="red">{count}</Tag>,
    },
    {
      title: '高',
      dataIndex: 'high',
      key: 'high',
      width: 100,
      render: (count: number) => <Tag color="orange">{count}</Tag>,
    },
    {
      title: '中',
      dataIndex: 'medium',
      key: 'medium',
      width: 100,
      render: (count: number) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: '低',
      dataIndex: 'low',
      key: 'low',
      width: 100,
      render: (count: number) => <Tag color="default">{count}</Tag>,
    },
    {
      title: '总计',
      key: 'total',
      render: (_: any, record: any) => {
        const total = record.critical + record.high + record.medium + record.low
        return <span style={{ fontWeight: 600 }}>{total}</span>
      },
    },
  ]

  // 代码提交活跃度表格列
  const commitActivityColumns = [
    { title: '开发者', dataIndex: 'developer', key: 'developer', width: 150 },
    { title: '提交次数', dataIndex: 'commits', key: 'commits', width: 120 },
    { title: '新增行数', dataIndex: 'linesAdded', key: 'linesAdded', width: 120 },
    { title: '删除行数', dataIndex: 'linesDeleted', key: 'linesDeleted', width: 120 },
    { title: 'MR数量', dataIndex: 'mrs', key: 'mrs', width: 100 },
  ]

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* 页头 */}
      <div style={{ padding: 24, background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space align="center">
              <BarChartOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>分析治理</h2>
                <p style={{ color: '#666', marginBottom: 0 }}>需求、开发、质量指标分析 | C7 | 全阶段</p>
              </div>
            </Space>
          </Col>
          <Col>
            <Select
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 150 }}
              options={[
                { label: '最近一周', value: 'week' },
                { label: '最近一月', value: 'month' },
                { label: '最近一季', value: 'quarter' },
              ]}
            />
          </Col>
        </Row>
      </div>

      {/* 主内容区 */}
      <div style={{ flex: 1, padding: 24, overflow: 'auto', background: '#f0f2f5' }}>
        <Tabs
          items={[
            {
              key: 'requirement',
              label: (
                <span>
                  <FileTextOutlined /> 需求指标
                </span>
              ),
              children: (
                <div>
                  {/* 需求概览卡片 */}
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="需求总数"
                          value={requirementMetrics.total}
                          suffix="个"
                          prefix={<FileTextOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="已完成"
                          value={requirementMetrics.completed}
                          suffix="个"
                          prefix={<CheckCircleOutlined />}
                          styles={{ content: {color: '#52c41a'} }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="完成率"
                          value={requirementMetrics.completionRate}
                          suffix="%"
                          prefix={
                            requirementMetrics.trend === 'up' ? (
                              <RiseOutlined style={{ color: '#52c41a' }} />
                            ) : (
                              <FallOutlined style={{ color: '#ff4d4f' }} />
                            )
                          }
                          styles={{ content: {color: requirementMetrics.trend === 'up' ? '#52c41a' : '#ff4d4f',} }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="平均周期(天)"
                          value={requirementMetrics.avgCycleTime}
                          precision={1}
                          prefix={<ClockCircleOutlined />}
                        />
                      </Card>
                    </Col>
                  </Row>

                  {/* 需求完成趋势 */}
                  <Card title="需求完成趋势" style={{ marginBottom: 16 }}>
                    <Table
                      columns={requirementTrendColumns}
                      dataSource={requirementTrendData}
                      rowKey="sprint"
                      pagination={false}
                    />
                  </Card>

                  {/* 需求状态分布 */}
                  <Card title="需求状态分布">
                    <Row gutter={16}>
                      <Col span={12}>
                        <div style={{ textAlign: 'center', padding: 24 }}>
                          <Progress
                            type="circle"
                            percent={requirementMetrics.completionRate}
                            format={(percent) => (
                              <div>
                                <div style={{ fontSize: 24, fontWeight: 600 }}>{percent}%</div>
                                <div style={{ fontSize: 12, color: '#666' }}>完成率</div>
                              </div>
                            )}
                            width={180}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ padding: 24 }}>
                          <Space orientation="vertical" style={{ width: '100%' }} size="large">
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color="success">已完成</Tag>
                                <span style={{ float: 'right', fontWeight: 600 }}>
                                  {requirementMetrics.completed}个
                                </span>
                              </div>
                              <Progress
                                percent={
                                  (requirementMetrics.completed / requirementMetrics.total) * 100
                                }
                                showInfo={false}
                                strokeColor="#52c41a"
                              />
                            </div>
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color="processing">进行中</Tag>
                                <span style={{ float: 'right', fontWeight: 600 }}>
                                  {requirementMetrics.inProgress}个
                                </span>
                              </div>
                              <Progress
                                percent={
                                  (requirementMetrics.inProgress / requirementMetrics.total) * 100
                                }
                                showInfo={false}
                                strokeColor="#1890ff"
                              />
                            </div>
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color="error">阻塞</Tag>
                                <span style={{ float: 'right', fontWeight: 600 }}>
                                  {requirementMetrics.blocked}个
                                </span>
                              </div>
                              <Progress
                                percent={
                                  (requirementMetrics.blocked / requirementMetrics.total) * 100
                                }
                                showInfo={false}
                                strokeColor="#ff4d4f"
                              />
                            </div>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              ),
            },
            {
              key: 'development',
              label: (
                <span>
                  <CodeOutlined /> 开发效能
                </span>
              ),
              children: (
                <div>
                  {/* 开发效能概览 */}
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="代码提交"
                          value={devMetrics.codeCommits}
                          suffix="次"
                          prefix={<CodeOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="MR合并"
                          value={devMetrics.mrMerged}
                          suffix={`/ ${devMetrics.mrCreated}`}
                          prefix={<ThunderboltOutlined />}
                          styles={{ content: {color: '#52c41a'} }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="MR评审时间(h)"
                          value={devMetrics.mrReviewTime}
                          precision={1}
                          prefix={<ClockCircleOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="构建成功率"
                          value={devMetrics.buildSuccessRate}
                          suffix="%"
                          prefix={<CheckCircleOutlined />}
                          styles={{ content: {color: '#52c41a'} }}
                        />
                      </Card>
                    </Col>
                  </Row>

                  {/* 代码提交活跃度 */}
                  <Card title="代码提交活跃度" style={{ marginBottom: 16 }}>
                    <Table
                      columns={commitActivityColumns}
                      dataSource={commitActivityData}
                      rowKey="developer"
                      pagination={false}
                    />
                  </Card>

                  {/* 代码质量指标 */}
                  <Card title="代码质量指标">
                    <Row gutter={16}>
                      <Col span={12}>
                        <div style={{ textAlign: 'center', padding: 24 }}>
                          <Progress
                            type="circle"
                            percent={devMetrics.codeQuality}
                            format={(percent) => (
                              <div>
                                <div style={{ fontSize: 24, fontWeight: 600 }}>{percent}</div>
                                <div style={{ fontSize: 12, color: '#666' }}>质量分</div>
                              </div>
                            )}
                            width={180}
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ padding: 24 }}>
                          <Space orientation="vertical" style={{ width: '100%' }} size="large">
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <span>代码规范</span>
                                <span style={{ float: 'right', fontWeight: 600 }}>92分</span>
                              </div>
                              <Progress percent={92} showInfo={false} strokeColor="#52c41a" />
                            </div>
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <span>复杂度控制</span>
                                <span style={{ float: 'right', fontWeight: 600 }}>85分</span>
                              </div>
                              <Progress percent={85} showInfo={false} strokeColor="#1890ff" />
                            </div>
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <span>注释覆盖</span>
                                <span style={{ float: 'right', fontWeight: 600 }}>78分</span>
                              </div>
                              <Progress percent={78} showInfo={false} strokeColor="#faad14" />
                            </div>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              ),
            },
            {
              key: 'quality',
              label: (
                <span>
                  <BugOutlined /> 质量指标
                </span>
              ),
              children: (
                <div>
                  {/* 质量指标概览 */}
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="Bug总数"
                          value={qualityMetrics.totalBugs}
                          suffix="个"
                          prefix={<BugOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="严重Bug"
                          value={qualityMetrics.criticalBugs}
                          suffix="个"
                          prefix={<BugOutlined />}
                          styles={{ content: {color: '#ff4d4f'} }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="Bug修复率"
                          value={qualityMetrics.bugFixRate}
                          suffix="%"
                          prefix={<CheckCircleOutlined />}
                          styles={{ content: {color: '#52c41a'} }}
                        />
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card>
                        <Statistic
                          title="测试覆盖率"
                          value={qualityMetrics.testCoverage}
                          suffix="%"
                          prefix={<CheckCircleOutlined />}
                        />
                      </Card>
                    </Col>
                  </Row>

                  {/* Bug分布 */}
                  <Card title="Bug分布（按模块）" style={{ marginBottom: 16 }}>
                    <Table
                      columns={bugDistributionColumns}
                      dataSource={bugDistributionData}
                      rowKey="module"
                      pagination={false}
                    />
                  </Card>

                  {/* Bug严重程度分布 */}
                  <Card title="Bug严重程度分布">
                    <Row gutter={16}>
                      <Col span={12}>
                        <div style={{ textAlign: 'center', padding: 24 }}>
                          <Progress
                            type="circle"
                            percent={qualityMetrics.bugFixRate}
                            format={(percent) => (
                              <div>
                                <div style={{ fontSize: 24, fontWeight: 600 }}>{percent}%</div>
                                <div style={{ fontSize: 12, color: '#666' }}>修复率</div>
                              </div>
                            )}
                            width={180}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ padding: 24 }}>
                          <Space orientation="vertical" style={{ width: '100%' }} size="large">
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color="red">严重</Tag>
                                <span style={{ float: 'right', fontWeight: 600 }}>
                                  {qualityMetrics.criticalBugs}个
                                </span>
                              </div>
                              <Progress
                                percent={
                                  (qualityMetrics.criticalBugs / qualityMetrics.totalBugs) * 100
                                }
                                showInfo={false}
                                strokeColor="#ff4d4f"
                              />
                            </div>
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color="orange">高</Tag>
                                <span style={{ float: 'right', fontWeight: 600 }}>
                                  {qualityMetrics.highBugs}个
                                </span>
                              </div>
                              <Progress
                                percent={(qualityMetrics.highBugs / qualityMetrics.totalBugs) * 100}
                                showInfo={false}
                                strokeColor="#faad14"
                              />
                            </div>
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color="blue">中</Tag>
                                <span style={{ float: 'right', fontWeight: 600 }}>
                                  {qualityMetrics.mediumBugs}个
                                </span>
                              </div>
                              <Progress
                                percent={
                                  (qualityMetrics.mediumBugs / qualityMetrics.totalBugs) * 100
                                }
                                showInfo={false}
                                strokeColor="#1890ff"
                              />
                            </div>
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color="default">低</Tag>
                                <span style={{ float: 'right', fontWeight: 600 }}>
                                  {qualityMetrics.lowBugs}个
                                </span>
                              </div>
                              <Progress
                                percent={(qualityMetrics.lowBugs / qualityMetrics.totalBugs) * 100}
                                showInfo={false}
                                strokeColor="#d9d9d9"
                              />
                            </div>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Metrics
export { Metrics }
