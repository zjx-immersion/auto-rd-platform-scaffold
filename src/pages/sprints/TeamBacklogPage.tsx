/**
 * 团队Plan Backlog页面
 * 展示团队的工作项，包含MR类型和其他类型的工作项
 */
import React, { useState } from 'react'
import { Card, Table, Button, Tag, Space, Select, Modal, Form, Input, InputNumber, message, Row, Col, Statistic } from 'antd'
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'
import {
    workItems,
    teams,
    getWorkItemsByTeamId,
    getWorkItemsBySprint,
    getWorkItemsByStatus,
    createWorkItem
} from '@/data'
import type { WorkItem, Team } from '@/data'

const { TextArea } = Input

// 创建工作项对话框
const CreateWorkItemModal: React.FC<{
    visible: boolean
    teamId: string
    onClose: () => void
    onSuccess: () => void
}> = ({ visible, teamId, onClose, onSuccess }) => {
    const [form] = Form.useForm()

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const newWorkItem = createWorkItem({
                type: values.type,
                title: values.title,
                description: values.description,
                teamId,
                assignee: values.assignee,
                priority: values.priority,
                status: '待办',
                sprint: values.sprint,
                effort: values.effort
            })

            message.success(`成功创建工作项: ${newWorkItem.id}`)
            form.resetFields()
            onClose()
            onSuccess()
        })
    }

    return (
        <Modal
            title="创建工作项"
            open={visible}
            onCancel={onClose}
            onOk={handleSubmit}
            width={600}
            okText="创建"
            cancelText="取消"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="type"
                    label="工作项类型"
                    rules={[{ required: true, message: '请选择工作项类型' }]}
                >
                    <Select
                        placeholder="请选择类型"
                        options={[
                            { label: 'MR需求', value: 'MR需求' },
                            { label: '缺陷修复', value: '缺陷修复' },
                            { label: '技术任务', value: '技术任务' },
                            { label: '风险', value: '风险' }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="title"
                    label="标题"
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <Input placeholder="请输入工作项标题" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="描述"
                    rules={[{ required: true, message: '请输入描述' }]}
                >
                    <TextArea rows={4} placeholder="请输入工作项描述" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="assignee"
                            label="负责人"
                            rules={[{ required: true, message: '请输入负责人' }]}
                        >
                            <Input placeholder="请输入负责人" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="priority"
                            label="优先级"
                            initialValue="中"
                            rules={[{ required: true, message: '请选择优先级' }]}
                        >
                            <Select
                                options={[
                                    { label: '高', value: '高' },
                                    { label: '中', value: '中' },
                                    { label: '低', value: '低' }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="sprint"
                            label="Sprint"
                            initialValue={1}
                            rules={[{ required: true, message: '请输入Sprint' }]}
                        >
                            <InputNumber min={1} max={10} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="effort"
                            label="工作量（人天）"
                            initialValue={3}
                            rules={[{ required: true, message: '请输入工作量' }]}
                        >
                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export const TeamBacklogPage: React.FC = () => {
    const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]?.id || '')
    const [selectedSprint, setSelectedSprint] = useState<number>(1)
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [typeFilter, setTypeFilter] = useState<string>('all')
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    // 筛选数据
    const filteredData = workItems.filter(item => {
        const matchesTeam = item.teamId === selectedTeam
        const matchesSprint = item.sprint === selectedSprint
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter
        const matchesType = typeFilter === 'all' || item.type === typeFilter
        return matchesTeam && matchesSprint && matchesStatus && matchesType
    })

    // 统计数据
    const teamWorkItems = getWorkItemsByTeamId(selectedTeam)
    const sprintWorkItems = teamWorkItems.filter(item => item.sprint === selectedSprint)
    const stats = {
        total: sprintWorkItems.length,
        todo: sprintWorkItems.filter(item => item.status === '待办').length,
        inProgress: sprintWorkItems.filter(item => item.status === '进行中').length,
        completed: sprintWorkItems.filter(item => item.status === '已完成').length,
        totalEffort: sprintWorkItems.reduce((sum, item) => sum + item.effort, 0)
    }

    // 表格列定义
    const columns = [
        {
            title: '工作项ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            render: (id: string, record: WorkItem) => (
                <Space direction="vertical" size={0}>
                    <span style={{ fontFamily: 'monospace', color: '#1890ff' }}>{id}</span>
                    {record.mrId && (
                        <a
                            onClick={() => window.open(`/requirements/mrs/${record.mrId}`, '_blank')}
                            style={{ fontSize: 11, color: '#999' }}
                        >
                            来自 {record.mrId}
                        </a>
                    )}
                </Space>
            )
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type: string) => {
                const colorMap: Record<string, string> = {
                    'MR需求': 'blue',
                    '缺陷修复': 'red',
                    '技术任务': 'green',
                    '风险': 'orange'
                }
                return <Tag color={colorMap[type] || 'default'}>{type}</Tag>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            width: 90,
            render: (priority: string) => {
                const colorMap: Record<string, string> = {
                    '高': 'red',
                    '中': 'orange',
                    '低': 'default'
                }
                return <Tag color={colorMap[priority] || 'default'}>{priority}</Tag>
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string) => {
                const colorMap: Record<string, string> = {
                    '待办': 'default',
                    '进行中': 'processing',
                    '已完成': 'success'
                }
                return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
            }
        },
        {
            title: '负责人',
            dataIndex: 'assignee',
            key: 'assignee',
            width: 100
        },
        {
            title: '工作量',
            dataIndex: 'effort',
            key: 'effort',
            width: 100,
            render: (effort: number) => `${effort}人天`
        },
        {
            title: '操作',
            key: 'actions',
            width: 100,
            render: (_: any, record: WorkItem) => (
                <Button
                    type="link"
                    size="small"
                    icon={<EyeOutlined />}
                >
                    查看
                </Button>
            )
        }
    ]

    const selectedTeamData = teams.find(t => t.id === selectedTeam)

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
            {/* 页面标题 */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>团队Plan Backlog</h2>
                <div style={{ color: '#666', fontSize: 14 }}>管理团队工作项，跟踪Sprint执行进度</div>
            </div>

            {/* 团队和Sprint选择 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={12}>
                    <Card>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ fontSize: 14, color: '#666' }}>选择团队</div>
                            <Select
                                style={{ width: '100%' }}
                                value={selectedTeam}
                                onChange={setSelectedTeam}
                                options={teams.map(team => ({
                                    label: `${team.name} (容量: ${team.capacity}人天)`,
                                    value: team.id
                                }))}
                            />
                            {selectedTeamData && (
                                <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                                    团队成员: {selectedTeamData.members.join('、')}
                                </div>
                            )}
                        </Space>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ fontSize: 14, color: '#666' }}>选择Sprint</div>
                            <Select
                                style={{ width: '100%' }}
                                value={selectedSprint}
                                onChange={setSelectedSprint}
                                options={[1, 2, 3, 4].map(sprint => ({
                                    label: `Sprint ${sprint}`,
                                    value: sprint
                                }))}
                            />
                        </Space>
                    </Card>
                </Col>
            </Row>

            {/* 统计卡片 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic title="总工作项" value={stats.total} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="待办" value={stats.todo} valueStyle={{ color: '#999' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="进行中" value={stats.inProgress} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="总工作量" value={stats.totalEffort} suffix="人天" valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
            </Row>

            {/* 工作项列表 */}
            <Card
                title={`${selectedTeamData?.name || ''} - Sprint ${selectedSprint} 工作项`}
                extra={
                    <Space>
                        <Select
                            style={{ width: 120 }}
                            placeholder="筛选类型"
                            value={typeFilter}
                            onChange={setTypeFilter}
                            options={[
                                { label: '全部类型', value: 'all' },
                                { label: 'MR需求', value: 'MR需求' },
                                { label: '缺陷修复', value: '缺陷修复' },
                                { label: '技术任务', value: '技术任务' },
                                { label: '风险', value: '风险' }
                            ]}
                        />
                        <Select
                            style={{ width: 120 }}
                            placeholder="筛选状态"
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={[
                                { label: '全部状态', value: 'all' },
                                { label: '待办', value: '待办' },
                                { label: '进行中', value: '进行中' },
                                { label: '已完成', value: '已完成' }
                            ]}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setCreateModalVisible(true)}
                        >
                            新建工作项
                        </Button>
                    </Space>
                }
            >
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: 15,
                        showSizeChanger: true,
                        showTotal: (total) => `共 ${total} 条记录`
                    }}
                />
            </Card>

            {/* 创建工作项对话框 */}
            <CreateWorkItemModal
                visible={createModalVisible}
                teamId={selectedTeam}
                onClose={() => setCreateModalVisible(false)}
                onSuccess={() => {
                    setRefreshKey(prev => prev + 1)
                }}
            />
        </div>
    )
}

export default TeamBacklogPage
