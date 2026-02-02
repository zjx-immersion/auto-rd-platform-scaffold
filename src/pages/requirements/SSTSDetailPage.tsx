/**
 * SSTS详情页面
 * 展示SSTS详细信息，支持批量创建MR
 */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Button, Space, Table, Modal, Form, Select, InputNumber, message, Divider } from 'antd'
import { ArrowLeftOutlined, BranchesOutlined, PlusOutlined } from '@ant-design/icons'
import {
    getSSTSById,
    getFeatureById,
    getMRsBySSTSId,
    modules,
    createMRBatch
} from '@/data'
import type { SSTS, Feature, MR, Module } from '@/data'

// 创建MR对话框
const CreateMRModal: React.FC<{
    visible: boolean
    ssts: SSTS | null
    onClose: () => void
    onSuccess: () => void
}> = ({ visible, ssts, onClose, onSuccess }) => {
    const [form] = Form.useForm()
    const [selectedModules, setSelectedModules] = useState<string[]>([])

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (!ssts) return

            if (selectedModules.length === 0) {
                message.error('请至少选择一个模块')
                return
            }

            // 创建MR
            const newMRs = createMRBatch(ssts.id, selectedModules, values.effort || 5)
            message.success(`成功创建 ${newMRs.length} 个MR`)
            form.resetFields()
            setSelectedModules([])
            onClose()
            onSuccess()
        })
    }

    return (
        <Modal
            title={`创建MR: ${ssts?.name || ''}`}
            open={visible}
            onCancel={onClose}
            onOk={handleSubmit}
            width={600}
            okText="确认创建"
            cancelText="取消"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="SSTS信息">
                    <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
                        <div><strong>ID:</strong> {ssts?.id}</div>
                        <div><strong>名称:</strong> {ssts?.name}</div>
                    </div>
                </Form.Item>

                <Form.Item
                    name="modules"
                    label="选择关联模块"
                    rules={[{ required: true, message: '请选择至少一个模块' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="请选择模块"
                        value={selectedModules}
                        onChange={setSelectedModules}
                        options={modules.map(m => ({
                            label: `${m.name} (${m.teamId})`,
                            value: m.id
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="effort"
                    label="预估工作量（人天）"
                    initialValue={5}
                    rules={[{ required: true, message: '请输入工作量' }]}
                >
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                </Form.Item>

                <div style={{ color: '#666', fontSize: 12 }}>
                    将为每个选中的模块创建一个MR，共 {selectedModules.length} 个MR
                </div>
            </Form>
        </Modal>
    )
}

export const SSTSDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [ssts, setSsts] = useState<SSTS | null>(null)
    const [feature, setFeature] = useState<Feature | null>(null)
    const [mrs, setMrs] = useState<MR[]>([])
    const [createMRModalVisible, setCreateMRModalVisible] = useState(false)

    // 加载数据
    useEffect(() => {
        if (id) {
            const sstsData = getSSTSById(id)
            if (sstsData) {
                setSsts(sstsData)

                // 加载Feature
                const featureData = getFeatureById(sstsData.featureId)
                setFeature(featureData || null)

                // 加载MR
                const mrsData = getMRsBySSTSId(id)
                setMrs(mrsData)
            }
        }
    }, [id])

    // MR表格列
    const mrColumns = [
        {
            title: 'MR ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (id: string) => (
                <a
                    onClick={() => navigate(`/requirements/mrs/${id}`)}
                    style={{ fontFamily: 'monospace', color: '#1890ff', cursor: 'pointer' }}
                >
                    {id}
                </a>
            )
        },
        {
            title: 'MR名称',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true
        },
        {
            title: '关联模块',
            dataIndex: 'moduleId',
            key: 'moduleId',
            width: 150,
            render: (moduleId: string) => {
                const module = modules.find(m => m.id === moduleId)
                return module ? module.name : moduleId
            }
        },
        {
            title: '工作量',
            dataIndex: 'effort',
            key: 'effort',
            width: 100,
            render: (effort: number) => `${effort}人天`
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string) => {
                const colorMap: Record<string, string> = {
                    '待分配': 'default',
                    '已分配': 'processing',
                    '开发中': 'cyan',
                    '已完成': 'success'
                }
                return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
            }
        },
        {
            title: '迭代',
            dataIndex: 'iterationId',
            key: 'iterationId',
            width: 120,
            render: (iterationId?: string) => iterationId || <span style={{ color: '#999' }}>未分配</span>
        }
    ]

    if (!ssts) {
        return (
            <div style={{ padding: 24, textAlign: 'center' }}>
                <div>SSTS不存在</div>
                <Button onClick={() => navigate(-1)} style={{ marginTop: 16 }}>
                    返回
                </Button>
            </div>
        )
    }

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
            {/* 页面头部 */}
            <div style={{ marginBottom: 24 }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    style={{ marginBottom: 16 }}
                >
                    返回
                </Button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ margin: 0 }}>{ssts.name}</h2>
                        <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
                            {ssts.id} · 版本 {ssts.version}
                        </div>
                    </div>
                    <Tag color={ssts.reviewStatus === '已通过' ? 'success' : 'processing'}>
                        {ssts.reviewStatus}
                    </Tag>
                </div>
            </div>

            <Divider />

            {/* SSTS基本信息 */}
            <Card title="SSTS信息" style={{ marginBottom: 24 }}>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="SSTS ID">{ssts.id}</Descriptions.Item>
                    <Descriptions.Item label="SSTS名称">{ssts.name}</Descriptions.Item>
                    <Descriptions.Item label="关联Feature">
                        {feature ? (
                            <div>
                                <div style={{ fontSize: 12, color: '#999' }}>{feature.id}</div>
                                <div>{feature.name}</div>
                            </div>
                        ) : ssts.featureId}
                    </Descriptions.Item>
                    <Descriptions.Item label="场景描述">
                        <div style={{ whiteSpace: 'pre-wrap' }}>{ssts.scenario}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="技术规格">
                        <div style={{ whiteSpace: 'pre-wrap' }}>{ssts.techSpec}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="验收标准">
                        <div style={{ whiteSpace: 'pre-wrap' }}>{ssts.acceptanceCriteria}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="评审状态">
                        <Tag color={ssts.reviewStatus === '已通过' ? 'success' : 'processing'}>
                            {ssts.reviewStatus}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="版本">{ssts.version}</Descriptions.Item>
                </Descriptions>
            </Card>

            {/* MR列表 */}
            <Card
                title={`模块需求 (MR) - 共 ${mrs.length} 个`}
                extra={
                    <Button
                        type="primary"
                        icon={<BranchesOutlined />}
                        onClick={() => setCreateMRModalVisible(true)}
                    >
                        批量创建MR
                    </Button>
                }
            >
                <Table
                    dataSource={mrs}
                    columns={mrColumns}
                    rowKey="id"
                    pagination={false}
                />
            </Card>

            {/* 创建MR对话框 */}
            <CreateMRModal
                visible={createMRModalVisible}
                ssts={ssts}
                onClose={() => setCreateMRModalVisible(false)}
                onSuccess={() => {
                    const mrsData = getMRsBySSTSId(ssts.id)
                    setMrs(mrsData)
                }}
            />
        </div>
    )
}

export default SSTSDetailPage
