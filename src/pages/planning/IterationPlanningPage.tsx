/**
 * 迭代规划页面
 * 多模块多迭代可视化计划表，支持MR分配到迭代
 */
import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Tag, Modal, Select, InputNumber, message, Space, Statistic, Row, Col } from 'antd'
import { PlusOutlined, DragOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
    iterationPlans,
    iterations,
    modules,
    mrs,
    getMRById,
    getMRsByStatus,
    addMRToIteration,
    removeMRFromIteration
} from '@/data'
import type { IterationPlan, Iteration, MR, Module } from '@/data'

// MR分配对话框
const AssignMRModal: React.FC<{
    visible: boolean
    iteration: Iteration | null
    onClose: () => void
    onSuccess: () => void
}> = ({ visible, iteration, onClose, onSuccess }) => {
    const [selectedMRs, setSelectedMRs] = useState<string[]>([])

    // 获取未分配的MR
    const unassignedMRs = getMRsByStatus('待分配')
    const module = iteration ? modules.find(m => m.id === iteration.moduleId) : null

    const handleSubmit = () => {
        if (!iteration) return

        if (selectedMRs.length === 0) {
            message.error('请至少选择一个MR')
            return
        }

        // 计算总工作量
        let totalEffort = 0
        selectedMRs.forEach(mrId => {
            const mr = getMRById(mrId)
            if (mr) {
                totalEffort += mr.effort
            }
        })

        // 检查容量
        const remainingCapacity = iteration.capacity - iteration.allocated
        if (totalEffort > remainingCapacity) {
            Modal.confirm({
                title: '容量超出',
                content: `选中的MR总工作量(${totalEffort}人天)超出剩余容量(${remainingCapacity}人天)，是否继续？`,
                onOk: () => {
                    assignMRs()
                }
            })
        } else {
            assignMRs()
        }
    }

    const assignMRs = () => {
        if (!iteration) return

        selectedMRs.forEach(mrId => {
            const mr = getMRById(mrId)
            if (mr) {
                addMRToIteration(iteration.id, mrId, mr.effort)
            }
        })

        message.success(`成功分配 ${selectedMRs.length} 个MR到迭代`)
        setSelectedMRs([])
        onClose()
        onSuccess()
    }

    return (
        <Modal
            title={`分配MR到迭代: ${iteration?.name || ''}`}
            open={visible}
            onCancel={onClose}
            onOk={handleSubmit}
            width={700}
            okText="确认分配"
            cancelText="取消"
        >
            <div style={{ marginBottom: 16 }}>
                <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '4px', marginBottom: 16 }}>
                    <div><strong>迭代:</strong> {iteration?.name}</div>
                    <div><strong>模块:</strong> {module?.name}</div>
                    <div><strong>容量:</strong> {iteration?.capacity}人天</div>
                    <div><strong>已分配:</strong> {iteration?.allocated}人天</div>
                    <div><strong>剩余:</strong> {iteration ? iteration.capacity - iteration.allocated : 0}人天</div>
                </div>

                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="选择要分配的MR"
                    value={selectedMRs}
                    onChange={setSelectedMRs}
                    options={unassignedMRs.map(mr => ({
                        label: `${mr.id} - ${mr.name} (${mr.effort}人天)`,
                        value: mr.id
                    }))}
                />

                {selectedMRs.length > 0 && (
                    <div style={{ marginTop: 12, color: '#666' }}>
                        已选择 {selectedMRs.length} 个MR，总工作量: {
                            selectedMRs.reduce((sum, mrId) => {
                                const mr = getMRById(mrId)
                                return sum + (mr?.effort || 0)
                            }, 0)
                        }人天
                    </div>
                )}
            </div>
        </Modal>
    )
}

export const IterationPlanningPage: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<IterationPlan | null>(null)
    const [planIterations, setPlanIterations] = useState<Iteration[]>([])
    const [assignModalVisible, setAssignModalVisible] = useState(false)
    const [selectedIteration, setSelectedIteration] = useState<Iteration | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        // 默认选择第一个规划
        if (iterationPlans.length > 0) {
            setSelectedPlan(iterationPlans[0])
        }
    }, [])

    useEffect(() => {
        if (selectedPlan) {
            const iters = iterations.filter(iter => iter.planId === selectedPlan.id)
            setPlanIterations(iters)
        }
    }, [selectedPlan, refreshKey])

    // 处理分配MR
    const handleAssignMR = (iteration: Iteration) => {
        setSelectedIteration(iteration)
        setAssignModalVisible(true)
    }

    // 构建表格数据
    const buildTableData = () => {
        const moduleIds = [...new Set(planIterations.map(iter => iter.moduleId))]
        return moduleIds.map(moduleId => {
            const module = modules.find(m => m.id === moduleId)
            const moduleIterations = planIterations.filter(iter => iter.moduleId === moduleId)

            const row: any = {
                key: moduleId,
                module: module?.name || moduleId,
                moduleId
            }

            // 为每个Sprint添加数据
            for (let sprint = 1; sprint <= (selectedPlan?.sprints || 4); sprint++) {
                const iteration = moduleIterations.find(iter => iter.sprint === sprint)
                row[`sprint${sprint}`] = iteration
            }

            return row
        })
    }

    // 构建表格列
    const buildColumns = (): ColumnsType<any> => {
        const columns: ColumnsType<any> = [
            {
                title: '模块',
                dataIndex: 'module',
                key: 'module',
                width: 150,
                fixed: 'left',
                render: (text: string) => <strong>{text}</strong>
            }
        ]

        // 为每个Sprint添加列
        for (let sprint = 1; sprint <= (selectedPlan?.sprints || 4); sprint++) {
            columns.push({
                title: `Sprint ${sprint}`,
                dataIndex: `sprint${sprint}`,
                key: `sprint${sprint}`,
                width: 200,
                render: (iteration: Iteration) => {
                    if (!iteration) return <div style={{ color: '#ccc' }}>-</div>

                    const utilizationRate = iteration.capacity > 0
                        ? Math.round((iteration.allocated / iteration.capacity) * 100)
                        : 0

                    const colorMap: Record<string, string> = {
                        low: '#52c41a',    // < 80%
                        medium: '#faad14', // 80-100%
                        high: '#ff4d4f'    // > 100%
                    }

                    let rateColor = colorMap.low
                    if (utilizationRate >= 100) rateColor = colorMap.high
                    else if (utilizationRate >= 80) rateColor = colorMap.medium

                    return (
                        <div
                            style={{
                                padding: 8,
                                background: '#fafafa',
                                borderRadius: 4,
                                border: '1px solid #d9d9d9'
                            }}
                        >
                            <div style={{ marginBottom: 4, fontSize: 12 }}>
                                <Tag color="blue">{iteration.allocated}/{iteration.capacity}人天</Tag>
                                <Tag color={rateColor}>{utilizationRate}%</Tag>
                            </div>
                            <div style={{ marginBottom: 4, fontSize: 12, color: '#666' }}>
                                MR数量: {iteration.mrIds.length}
                            </div>
                            <Button
                                size="small"
                                type="link"
                                icon={<PlusOutlined />}
                                onClick={() => handleAssignMR(iteration)}
                                style={{ padding: 0 }}
                            >
                                分配MR
                            </Button>
                        </div>
                    )
                }
            })
        }

        return columns
    }

    // 统计数据
    const stats = {
        totalCapacity: planIterations.reduce((sum, iter) => sum + iter.capacity, 0),
        totalAllocated: planIterations.reduce((sum, iter) => sum + iter.allocated, 0),
        totalMRs: planIterations.reduce((sum, iter) => sum + iter.mrIds.length, 0),
        unassignedMRs: getMRsByStatus('待分配').length
    }

    const utilizationRate = stats.totalCapacity > 0
        ? Math.round((stats.totalAllocated / stats.totalCapacity) * 100)
        : 0

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
            {/* 页面标题 */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>迭代规划</h2>
                <div style={{ color: '#666', fontSize: 14 }}>多模块多迭代可视化计划，MR分配与容量管理</div>
            </div>

            {/* 统计卡片 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="总容量"
                            value={stats.totalCapacity}
                            suffix="人天"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="已分配"
                            value={stats.totalAllocated}
                            suffix="人天"
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="利用率"
                            value={utilizationRate}
                            suffix="%"
                            valueStyle={{ color: utilizationRate > 100 ? '#ff4d4f' : '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="待分配MR"
                            value={stats.unassignedMRs}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* 迭代规划表格 */}
            <Card
                title={selectedPlan ? `${selectedPlan.name} (${selectedPlan.startDate} ~ ${selectedPlan.endDate})` : '迭代规划'}
                extra={
                    <Space>
                        <Tag color={selectedPlan?.status === '进行中' ? 'processing' : 'default'}>
                            {selectedPlan?.status}
                        </Tag>
                        <Button type="primary" icon={<PlusOutlined />}>
                            新建规划
                        </Button>
                    </Space>
                }
            >
                <Table
                    dataSource={buildTableData()}
                    columns={buildColumns()}
                    pagination={false}
                    bordered
                    scroll={{ x: 1000 }}
                />
            </Card>

            {/* MR分配对话框 */}
            <AssignMRModal
                visible={assignModalVisible}
                iteration={selectedIteration}
                onClose={() => {
                    setAssignModalVisible(false)
                    setSelectedIteration(null)
                }}
                onSuccess={() => {
                    setRefreshKey(prev => prev + 1)
                }}
            />
        </div>
    )
}

export default IterationPlanningPage
