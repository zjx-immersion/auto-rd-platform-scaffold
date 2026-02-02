/**
 * Feature List View
 * Feature列表视图
 */

import React, { useState, useMemo } from 'react'
import { Table, Tag, Button, Space, Input, Select, Card, Row, Col, Statistic, Modal, Form, message } from 'antd'
import { SearchOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { features, updateFeature } from '@/data/features'
import { ucs } from '@/data/ucs'
import { getProductsByProductLineId } from '@/data/products'
import type { Feature } from '@/data/types'

const { Search } = Input
const { TextArea } = Input

interface FeatureListViewProps {
    productLineId?: string
}

export const FeatureListView: React.FC<FeatureListViewProps> = ({ productLineId }) => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedTeam, setSelectedTeam] = useState<string>('all')
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
    const [form] = Form.useForm()

    // 过滤数据
    const filteredData = useMemo(() => {
        // 如果有productLineId，先获取该产品线下的所有产品ID
        let productIds: string[] = []
        if (productLineId) {
            const products = getProductsByProductLineId(productLineId)
            productIds = products.map(p => p.id)
        }

        return features.filter(feature => {
            const matchesSearch = feature.name.includes(searchText) || feature.id.includes(searchText)
            const matchesStatus = selectedStatus === 'all' || feature.status === selectedStatus
            const matchesTeam = selectedTeam === 'all' || feature.team === selectedTeam
            const matchesProduct = !productLineId || productIds.includes(feature.productId || '')
            return matchesSearch && matchesStatus && matchesTeam && matchesProduct
        })
    }, [searchText, selectedStatus, selectedTeam, productLineId])

    // 统计数据
    const statistics = useMemo(() => {
        const total = filteredData.length
        const draft = filteredData.filter(f => f.status === '草稿').length
        const inProgress = filteredData.filter(f => f.status === '设计中' || f.status === '开发中').length
        const done = filteredData.filter(f => f.status === '已完成').length
        return { total, draft, inProgress, done }
    }, [filteredData])

    // 处理编辑Feature
    const handleEdit = async () => {
        if (!selectedFeature) return
        try {
            const values = await form.validateFields()
            updateFeature(selectedFeature.id, values)
            message.success(`Feature ${selectedFeature.id} 更新成功！`)
            setEditModalVisible(false)
            setSelectedFeature(null)
            form.resetFields()
        } catch (error) {
            console.error('更新失败:', error)
        }
    }

    // 打开编辑对话框
    const openEditModal = (feature: Feature) => {
        setSelectedFeature(feature)
        form.setFieldsValue({
            name: feature.name,
            priority: feature.priority,
            status: feature.status,
            owner: feature.owner,
            team: feature.team,
            startDate: feature.startDate,
            endDate: feature.endDate
        })
        setEditModalVisible(true)
    }

    // 查看Feature详情
    const viewFeatureDetail = (featureId: string) => {
        navigate(`/requirements/features/${featureId}`)
    }

    // 表格列定义
    const columns = [
        {
            title: 'Feature ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (text: string) => <Tag color="green">{text}</Tag>
        },
        {
            title: 'Feature名称',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: '关联UC',
            dataIndex: 'ucId',
            key: 'ucId',
            width: 180,
            render: (ucId: string) => {
                const uc = ucs.find(e => e.id === ucId)
                return (
                    <div>
                        <div style={{ fontSize: 12, color: '#999' }}>{ucId}</div>
                        <div>{uc?.name || '-'}</div>
                    </div>
                )
            }
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            width: 80,
            render: (priority: string) => {
                const colorMap: Record<string, string> = {
                    'P0': 'red',
                    'P1': 'orange',
                    'P2': 'blue'
                }
                return <Tag color={colorMap[priority]}>{priority}</Tag>
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string) => {
                const colorMap: Record<string, string> = {
                    '草稿': 'default',
                    '设计中': 'blue',
                    '评审中': 'orange',
                    '已通过': 'cyan',
                    '开发中': 'processing',
                    '已完成': 'success'
                }
                return <Tag color={colorMap[status]}>{status}</Tag>
            }
        },
        {
            title: '负责人',
            dataIndex: 'owner',
            key: 'owner',
            width: 100,
        },
        {
            title: '负责团队',
            dataIndex: 'team',
            key: 'team',
            width: 120,
            render: (team: string) => <Tag color="purple">{team}</Tag>
        },
        {
            title: '计划时间',
            key: 'schedule',
            width: 180,
            render: (_: any, record: Feature) => (
                <div style={{ fontSize: 12 }}>
                    <div>开始: {record.startDate}</div>
                    <div>结束: {record.endDate}</div>
                </div>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 180,
            fixed: 'right' as const,
            render: (_: any, record: Feature) => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => viewFeatureDetail(record.id)}
                    >
                        查看
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record)}
                    >
                        编辑
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <div style={{ padding: 24, background: '#fff' }}>
            <Card>
                {/* 统计卡片 */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={6}>
                        <Card>
                            <Statistic title="总计" value={statistics.total} suffix="个Feature" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="草稿"
                                value={statistics.draft}
                                valueStyle={{ color: '#8c8c8c' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="进行中"
                                value={statistics.inProgress}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="已完成"
                                value={statistics.done}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* 工具栏 */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Space>
                        <Search
                            placeholder="搜索Feature名称或ID"
                            onSearch={setSearchText}
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 250 }}
                            prefix={<SearchOutlined />}
                        />
                        <Select
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                            style={{ width: 150 }}
                            options={[
                                { value: 'all', label: '全部状态' },
                                { value: '草稿', label: '草稿' },
                                { value: '设计中', label: '设计中' },
                                { value: '评审中', label: '评审中' },
                                { value: '已通过', label: '已通过' },
                                { value: '开发中', label: '开发中' },
                                { value: '已完成', label: '已完成' },
                            ]}
                        />
                        <Select
                            value={selectedTeam}
                            onChange={setSelectedTeam}
                            style={{ width: 150 }}
                            options={[
                                { value: 'all', label: '全部团队' },
                                { value: '感知团队', label: '感知团队' },
                                { value: '规划团队', label: '规划团队' },
                                { value: '控制团队', label: '控制团队' },
                                { value: 'HMI团队', label: 'HMI团队' },
                            ]}
                        />
                    </Space>
                </div>

                {/* Feature列表表格 */}
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `共 ${total} 条`
                    }}
                    scroll={{ x: 1400 }}
                />
            </Card>

            {/* 编辑Feature对话框 */}
            <Modal
                title={`编辑Feature: ${selectedFeature?.id}`}
                open={editModalVisible}
                onOk={handleEdit}
                onCancel={() => {
                    setEditModalVisible(false)
                    setSelectedFeature(null)
                    form.resetFields()
                }}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Feature名称"
                        rules={[{ required: true, message: '请输入Feature名称' }]}
                    >
                        <Input placeholder="请输入Feature名称" />
                    </Form.Item>
                    <Form.Item
                        name="priority"
                        label="优先级"
                        rules={[{ required: true, message: '请选择优先级' }]}
                    >
                        <Select>
                            <Select.Option value="P0">P0</Select.Option>
                            <Select.Option value="P1">P1</Select.Option>
                            <Select.Option value="P2">P2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="状态"
                        rules={[{ required: true, message: '请选择状态' }]}
                    >
                        <Select>
                            <Select.Option value="草稿">草稿</Select.Option>
                            <Select.Option value="设计中">设计中</Select.Option>
                            <Select.Option value="评审中">评审中</Select.Option>
                            <Select.Option value="已通过">已通过</Select.Option>
                            <Select.Option value="开发中">开发中</Select.Option>
                            <Select.Option value="已完成">已完成</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="owner"
                        label="负责人"
                        rules={[{ required: true, message: '请输入负责人' }]}
                    >
                        <Input placeholder="请输入负责人" />
                    </Form.Item>
                    <Form.Item
                        name="team"
                        label="负责团队"
                        rules={[{ required: true, message: '请选择负责团队' }]}
                    >
                        <Select>
                            <Select.Option value="感知团队">感知团队</Select.Option>
                            <Select.Option value="规划团队">规划团队</Select.Option>
                            <Select.Option value="控制团队">控制团队</Select.Option>
                            <Select.Option value="HMI团队">HMI团队</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="startDate"
                        label="计划开始时间"
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="计划结束时间"
                    >
                        <Input type="date" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default FeatureListView
