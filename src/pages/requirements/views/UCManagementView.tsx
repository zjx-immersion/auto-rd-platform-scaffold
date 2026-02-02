/**
 * UC Management View
 * UC管理视图 - 整合需求池功能
 */

import React, { useState, useMemo } from 'react'
import { Table, Tag, Button, Space, Input, Select, Card, Row, Col, Statistic, Modal, Form, message } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, SplitCellsOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ucs, createUC, updateUC } from '@/data/ucs'
import { createSplitFeatures } from '@/data/features'
import type { UC } from '@/data/types'

const { Search } = Input
const { TextArea } = Input

interface UCManagementViewProps {
    productLineId?: string
}

export const UCManagementView: React.FC<UCManagementViewProps> = ({ productLineId }) => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [selectedPriority, setSelectedPriority] = useState<string>('all')
    const [selectedSource, setSelectedSource] = useState<string>('all')
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [splitModalVisible, setSplitModalVisible] = useState(false)
    const [selectedUC, setSelectedUC] = useState<UC | null>(null)
    const [featureCount, setFeatureCount] = useState(3)
    const [form] = Form.useForm()
    const [splitForm] = Form.useForm()

    // 过滤数据
    const filteredData = useMemo(() => {
        return ucs.filter(uc => {
            const matchesSearch = uc.name.includes(searchText) || uc.id.includes(searchText)
            const matchesPriority = selectedPriority === 'all' || uc.priority === selectedPriority
            const matchesSource = selectedSource === 'all' || uc.source === selectedSource
            const matchesProduct = !productLineId || uc.productId === productLineId
            return matchesSearch && matchesPriority && matchesSource && matchesProduct
        })
    }, [searchText, selectedPriority, selectedSource, productLineId])

    // 统计数据
    const statistics = useMemo(() => {
        const total = filteredData.length
        const must = filteredData.filter(e => e.priority === 'Must').length
        const should = filteredData.filter(e => e.priority === 'Should').length
        const could = filteredData.filter(e => e.priority === 'Could').length
        return { total, must, should, could }
    }, [filteredData])

    // 处理创建UC
    const handleCreate = async () => {
        try {
            const values = await form.validateFields()
            const newUC = createUC({
                name: values.name,
                description: values.description,
                priority: values.priority,
                owner: values.owner,
                source: values.source,
                productId: productLineId || values.productId
            })
            message.success(`UC ${newUC.id} 创建成功！`)
            setCreateModalVisible(false)
            form.resetFields()
        } catch (error) {
            console.error('创建失败:', error)
        }
    }

    // 处理编辑UC
    const handleEdit = async () => {
        if (!selectedUC) return
        try {
            const values = await form.validateFields()
            updateUC(selectedUC.id, values)
            message.success(`UC ${selectedUC.id} 更新成功！`)
            setEditModalVisible(false)
            setSelectedUC(null)
            form.resetFields()
        } catch (error) {
            console.error('更新失败:', error)
        }
    }

    // 处理拆分UC
    const handleSplit = async () => {
        if (!selectedUC) return
        try {
            const values = await splitForm.validateFields()
            const featureNames = Object.keys(values)
                .filter(key => key.startsWith('feature_'))
                .map(key => values[key])

            const newFeatures = createSplitFeatures(selectedUC.id, featureNames)
            message.success(`成功从 ${selectedUC.id} 拆分出 ${newFeatures.length} 个Feature！`)
            setSplitModalVisible(false)
            setSelectedUC(null)
            splitForm.resetFields()
            setFeatureCount(3)
        } catch (error) {
            console.error('拆分失败:', error)
        }
    }

    // 打开编辑对话框
    const openEditModal = (uc: UC) => {
        setSelectedUC(uc)
        form.setFieldsValue({
            name: uc.name,
            description: uc.description,
            priority: uc.priority,
            owner: uc.owner,
            source: uc.source
        })
        setEditModalVisible(true)
    }

    // 打开拆分对话框
    const openSplitModal = (uc: UC) => {
        setSelectedUC(uc)
        setSplitModalVisible(true)
    }

    // 表格列定义
    const columns = [
        {
            title: 'UC ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (text: string) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'UC名称',
            dataIndex: 'name',
            key: 'name',
            width: 250,
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (priority: string) => {
                const colorMap: Record<string, string> = {
                    'Must': 'red',
                    'Should': 'orange',
                    'Could': 'blue',
                    "Won't": 'default'
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
                    '评审中': 'blue',
                    '已通过': 'green',
                    '开发中': 'cyan',
                    '已完成': 'success'
                }
                return <Tag color={colorMap[status]}>{status}</Tag>
            }
        },
        {
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            width: 100,
            render: (source: string) => (
                <Tag color={source === '自管理' ? 'green' : 'purple'}>{source}</Tag>
            )
        },
        {
            title: '负责人',
            dataIndex: 'owner',
            key: 'owner',
            width: 100,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right' as const,
            render: (_: any, record: UC) => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record)}
                    >
                        编辑
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        icon={<SplitCellsOutlined />}
                        onClick={() => openSplitModal(record)}
                    >
                        拆分
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
                            <Statistic title="总计" value={statistics.total} suffix="个UC" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Must Have"
                                value={statistics.must}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Should Have"
                                value={statistics.should}
                                valueStyle={{ color: '#fa8c16' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Could Have"
                                value={statistics.could}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* 工具栏 */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Space>
                        <Search
                            placeholder="搜索UC名称或ID"
                            onSearch={setSearchText}
                            onChange={e => setSearchText(e.target.value)}
                            style={{ width: 250 }}
                            prefix={<SearchOutlined />}
                        />
                        <Select
                            value={selectedPriority}
                            onChange={setSelectedPriority}
                            style={{ width: 150 }}
                            options={[
                                { value: 'all', label: '全部优先级' },
                                { value: 'Must', label: 'Must Have' },
                                { value: 'Should', label: 'Should Have' },
                                { value: 'Could', label: 'Could Have' },
                                { value: "Won't", label: "Won't Have" },
                            ]}
                        />
                        <Select
                            value={selectedSource}
                            onChange={setSelectedSource}
                            style={{ width: 150 }}
                            options={[
                                { value: 'all', label: '全部来源' },
                                { value: '自管理', label: '自管理' },
                                { value: 'FIP表', label: 'FIP表导入' },
                            ]}
                        />
                    </Space>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setCreateModalVisible(true)}
                    >
                        创建UC
                    </Button>
                </div>

                {/* UC列表表格 */}
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `共 ${total} 条`
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            {/* 创建UC对话框 */}
            <Modal
                title="创建UC"
                open={createModalVisible}
                onOk={handleCreate}
                onCancel={() => {
                    setCreateModalVisible(false)
                    form.resetFields()
                }}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="UC名称"
                        rules={[{ required: true, message: '请输入UC名称' }]}
                    >
                        <Input placeholder="请输入UC名称" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                        rules={[{ required: true, message: '请输入描述' }]}
                    >
                        <TextArea rows={4} placeholder="请输入UC描述" />
                    </Form.Item>
                    <Form.Item
                        name="priority"
                        label="优先级"
                        rules={[{ required: true, message: '请选择优先级' }]}
                        initialValue="Must"
                    >
                        <Select>
                            <Select.Option value="Must">Must Have</Select.Option>
                            <Select.Option value="Should">Should Have</Select.Option>
                            <Select.Option value="Could">Could Have</Select.Option>
                            <Select.Option value="Won't">Won't Have</Select.Option>
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
                        name="source"
                        label="来源"
                        rules={[{ required: true, message: '请选择来源' }]}
                        initialValue="自管理"
                    >
                        <Select>
                            <Select.Option value="自管理">自管理</Select.Option>
                            <Select.Option value="FIP表">FIP表导入</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 编辑UC对话框 */}
            <Modal
                title={`编辑UC: ${selectedUC?.id}`}
                open={editModalVisible}
                onOk={handleEdit}
                onCancel={() => {
                    setEditModalVisible(false)
                    setSelectedUC(null)
                    form.resetFields()
                }}
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="UC名称"
                        rules={[{ required: true, message: '请输入UC名称' }]}
                    >
                        <Input placeholder="请输入UC名称" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                        rules={[{ required: true, message: '请输入描述' }]}
                    >
                        <TextArea rows={4} placeholder="请输入UC描述" />
                    </Form.Item>
                    <Form.Item
                        name="priority"
                        label="优先级"
                        rules={[{ required: true, message: '请选择优先级' }]}
                    >
                        <Select>
                            <Select.Option value="Must">Must Have</Select.Option>
                            <Select.Option value="Should">Should Have</Select.Option>
                            <Select.Option value="Could">Could Have</Select.Option>
                            <Select.Option value="Won't">Won't Have</Select.Option>
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
                        name="source"
                        label="来源"
                        rules={[{ required: true, message: '请选择来源' }]}
                    >
                        <Select>
                            <Select.Option value="自管理">自管理</Select.Option>
                            <Select.Option value="FIP表">FIP表导入</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 拆分UC为Feature对话框 */}
            <Modal
                title={`拆分UC为Feature`}
                open={splitModalVisible}
                onOk={handleSplit}
                onCancel={() => {
                    setSplitModalVisible(false)
                    setSelectedUC(null)
                    splitForm.resetFields()
                    setFeatureCount(3)
                }}
                width={700}
            >
                <div style={{ marginBottom: 16 }}>
                    <p><strong>UC ID:</strong> {selectedUC?.id}</p>
                    <p><strong>UC名称:</strong> {selectedUC?.name}</p>
                    <p><strong>描述:</strong> {selectedUC?.description}</p>
                </div>

                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>Feature数量:</span>
                    <Button
                        size="small"
                        icon={<MinusCircleOutlined />}
                        onClick={() => setFeatureCount(Math.max(1, featureCount - 1))}
                        disabled={featureCount <= 1}
                    />
                    <span style={{ margin: '0 8px', fontWeight: 'bold' }}>{featureCount}</span>
                    <Button
                        size="small"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setFeatureCount(Math.min(10, featureCount + 1))}
                        disabled={featureCount >= 10}
                    />
                </div>

                <Form form={splitForm} layout="vertical">
                    {Array.from({ length: featureCount }, (_, index) => (
                        <Form.Item
                            key={index}
                            name={`feature_${index}`}
                            label={`Feature ${index + 1}`}
                            rules={[{ required: true, message: '请输入Feature名称' }]}
                        >
                            <Input placeholder={`请输入Feature ${index + 1}的名称`} />
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    )
}

export default UCManagementView
