/**
 * 需求池页面
 * 管理Epic需求池（自管理Epic + FIP表导入）
 */
import React, { useState } from 'react'
import { Tabs, Table, Button, Tag, Space, Input, Modal, Form, Select, message } from 'antd'
import { PlusOutlined, UploadOutlined, ExportOutlined, EditOutlined, DeleteOutlined, BranchesOutlined } from '@ant-design/icons'
import { ucs, features, getUCById, getFeaturesByUCId, createSplitFeatures } from '@/data'
import type { UC, Feature } from '@/data'

const { Search } = Input
const { TextArea } = Input

// UC拆分对话框组件
const SplitUCModal: React.FC<{
    visible: boolean
    uc: UC | null
    onClose: () => void
    onSuccess: () => void
}> = ({ visible, uc, onClose, onSuccess }) => {
    const [form] = Form.useForm()
    const [featureCount, setFeatureCount] = useState(3)

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (!uc) return

            const featureNames: string[] = []
            for (let i = 1; i <= featureCount; i++) {
                if (values[`feature_${i}`]) {
                    featureNames.push(values[`feature_${i}`])
                }
            }

            if (featureNames.length === 0) {
                message.error('请至少添加一个Feature')
                return
            }

            // 创建Features（这里模拟创建，实际应调用数据创建函数）
            message.success(`成功将UC "${uc.name}" 拆分为 ${featureNames.length} 个Feature`)
            form.resetFields()
            onClose()
            onSuccess()
        })
    }

    return (
        <Modal
            title={`拆分UC: ${uc?.name || ''}`}
            open={visible}
            onCancel={onClose}
            onOk={handleSubmit}
            width={600}
            okText="确认拆分"
            cancelText="取消"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="UC信息">
                    <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
                        <div><strong>ID:</strong> {uc?.id}</div>
                        <div><strong>名称:</strong> {uc?.name}</div>
                        <div><strong>优先级:</strong> {uc?.priority}</div>
                    </div>
                </Form.Item>

                <Form.Item label="拆分为Feature">
                    <div style={{ marginBottom: 8 }}>
                        <Button size="small" onClick={() => setFeatureCount(Math.max(1, featureCount - 1))}>-</Button>
                        <span style={{ margin: '0 12px' }}>Feature数量: {featureCount}</span>
                        <Button size="small" onClick={() => setFeatureCount(Math.min(10, featureCount + 1))}>+</Button>
                    </div>
                </Form.Item>

                {Array.from({ length: featureCount }).map((_, index) => (
                    <Form.Item
                        key={index}
                        name={`feature_${index + 1}`}
                        label={`Feature ${index + 1}`}
                        rules={[{ required: true, message: '请输入Feature名称' }]}
                    >
                        <Input placeholder={`请输入Feature ${index + 1}的名称`} />
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    )
}

export const RequirementPoolPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('self-managed')
    const [searchText, setSearchText] = useState('')
    const [splitModalVisible, setSplitModalVisible] = useState(false)
    const [selectedUC, setSelectedUC] = useState<UC | null>(null)

    // 筛选数据
    const dataSource = ucs.filter(uc => {
        const isSelfManaged = activeTab === 'self-managed' ? uc.source !== 'FIP表' : uc.source === 'FIP表'
        const matchesSearch = uc.name.toLowerCase().includes(searchText.toLowerCase()) ||
            uc.id.toLowerCase().includes(searchText.toLowerCase())
        return isSelfManaged && matchesSearch
    })

    // 处理UC拆分
    const handleSplitUC = (uc: UC) => {
        setSelectedUC(uc)
        setSplitModalVisible(true)
    }

    // UC列表列定义
    const ucColumns = [
        {
            title: 'UC ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (id: string) => <span style={{ fontFamily: 'monospace', color: '#1890ff' }}>{id}</span>
        },
        {
            title: 'UC名称',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            ellipsis: true
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
                    '待评审': 'default',
                    '评审中': 'processing',
                    '已通过': 'success',
                    '已拒绝': 'error'
                }
                return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
            }
        },
        {
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            width: 120
        },
        {
            title: '负责人',
            dataIndex: 'owner',
            key: 'owner',
            width: 100
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120
        },
        {
            title: '操作',
            key: 'actions',
            width: 200,
            fixed: 'right' as const,
            render: (_: any, record: UC) => {
                const relatedFeatures = getFeaturesByUCId(record.id)
                return (
                    <Space size="small">
                        <Button
                            type="link"
                            size="small"
                            icon={<BranchesOutlined />}
                            onClick={() => handleSplitUC(record)}
                        >
                            拆分 ({relatedFeatures.length})
                        </Button>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => message.info('编辑功能开发中')}
                        />
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={() => message.info('删除功能开发中')}
                        />
                    </Space>
                )
            }
        }
    ]

    // FIP表列定义
    const fipColumns = [
        {
            title: 'FIP ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            render: (id: string) => <span style={{ fontFamily: 'monospace' }}>{id}</span>
        },
        {
            title: '需求描述',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (priority: string) => <Tag color={priority === 'Must' ? 'red' : 'blue'}>{priority}</Tag>
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string) => <Tag>{status}</Tag>
        },
        {
            title: '操作',
            key: 'actions',
            width: 150,
            render: () => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => message.info('批注功能开发中')}
                    >
                        添加批注
                    </Button>
                </Space>
            )
        }
    ]

    const items = [
        {
            key: 'self-managed',
            label: '自管理UC池',
            children: (
                <>
                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                        <Space>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => message.info('创建UC功能开发中')}
                            >
                                新建UC
                            </Button>
                            <Search
                                placeholder="搜索UC"
                                onSearch={setSearchText}
                                onChange={e => setSearchText(e.target.value)}
                                style={{ width: 250 }}
                                allowClear
                            />
                        </Space>
                        <Space>
                            <Tag color="blue">总计: {dataSource.length}</Tag>
                            <Tag color="green">已通过: {dataSource.filter(e => e.status === '已通过').length}</Tag>
                        </Space>
                    </div>
                    <Table
                        dataSource={dataSource}
                        columns={ucColumns}
                        rowKey="id"
                        scroll={{ x: 1200 }}
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `共 ${total} 条记录`
                        }}
                    />
                </>
            ),
        },
        {
            key: 'fip-imports',
            label: 'FIP表导入池',
            children: (
                <>
                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                        <Space>
                            <Button
                                icon={<UploadOutlined />}
                                onClick={() => message.info('导入FIP表功能开发中')}
                            >
                                导入FIP表
                            </Button>
                            <Button
                                icon={<ExportOutlined />}
                                onClick={() => message.info('导出功能开发中')}
                            >
                                导出（含批注）
                            </Button>
                            <Search
                                placeholder="搜索FIP"
                                onSearch={setSearchText}
                                onChange={e => setSearchText(e.target.value)}
                                style={{ width: 250 }}
                                allowClear
                            />
                        </Space>
                    </div>
                    <Table
                        dataSource={dataSource}
                        columns={fipColumns}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `共 ${total} 条记录`
                        }}
                    />
                </>
            ),
        },
    ]

    return (
        <div style={{ padding: 24, background: '#fff', height: '100%' }}>
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ margin: 0 }}>需求池</h2>
                <div style={{ color: '#666', fontSize: 14 }}>管理UC需求池，支持自管理UC和FIP表导入</div>
            </div>
            <Tabs
                activeKey={activeTab}
                items={items}
                onChange={setActiveTab}
            />

            {/* UC拆分对话框 */}
            <SplitUCModal
                visible={splitModalVisible}
                uc={selectedUC}
                onClose={() => {
                    setSplitModalVisible(false)
                    setSelectedUC(null)
                }}
                onSuccess={() => {
                    // 刷新数据或其他操作
                }}
            />
        </div>
    )
}

export default RequirementPoolPage
