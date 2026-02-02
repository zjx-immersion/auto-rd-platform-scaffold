/**
 * Feature详情页面
 * 展示Feature基本信息、PRD文档、SSTS列表
 */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Button, Space, Tabs, Table, Modal, Form, Input, message, Divider } from 'antd'
import { ArrowLeftOutlined, EditOutlined, BranchesOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigation } from '@/context/NavigationContext'
import {
    getFeatureById,
    getUCById,
    getPRDByFeatureId,
    createPRD,
    updatePRD,
    getSSTSByFeatureId,
    createSSTSBatch,
    getMRsBySSTSId
} from '@/data'
import type { Feature, UC, PRD, SSTS } from '@/data'

const { TextArea } = Input

// SSTS拆分对话框
const SplitSSTSModal: React.FC<{
    visible: boolean
    feature: Feature | null
    onClose: () => void
    onSuccess: () => void
}> = ({ visible, feature, onClose, onSuccess }) => {
    const [form] = Form.useForm()
    const [sstsCount, setSstsCount] = useState(3)

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (!feature) return

            const sstsNames: string[] = []
            for (let i = 1; i <= sstsCount; i++) {
                if (values[`ssts_${i}`]) {
                    sstsNames.push(values[`ssts_${i}`])
                }
            }

            if (sstsNames.length === 0) {
                message.error('请至少添加一个SSTS')
                return
            }

            // 创建SSTS
            createSSTSBatch(feature.id, sstsNames)
            message.success(`成功创建 ${sstsNames.length} 个SSTS`)
            form.resetFields()
            onClose()
            onSuccess()
        })
    }

    return (
        <Modal
            title={`拆分SSTS: ${feature?.name || ''}`}
            open={visible}
            onCancel={onClose}
            onOk={handleSubmit}
            width={600}
            okText="确认创建"
            cancelText="取消"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Feature信息">
                    <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
                        <div><strong>ID:</strong> {feature?.id}</div>
                        <div><strong>名称:</strong> {feature?.name}</div>
                    </div>
                </Form.Item>

                <Form.Item label="拆分为SSTS">
                    <div style={{ marginBottom: 8 }}>
                        <Button size="small" onClick={() => setSstsCount(Math.max(1, sstsCount - 1))}>-</Button>
                        <span style={{ margin: '0 12px' }}>SSTS数量: {sstsCount}</span>
                        <Button size="small" onClick={() => setSstsCount(Math.min(10, sstsCount + 1))}>+</Button>
                    </div>
                </Form.Item>

                {Array.from({ length: sstsCount }).map((_, index) => (
                    <Form.Item
                        key={index}
                        name={`ssts_${index + 1}`}
                        label={`SSTS ${index + 1}`}
                        rules={[{ required: true, message: '请输入SSTS名称' }]}
                    >
                        <Input placeholder={`请输入SSTS ${index + 1}的名称`} />
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    )
}

export const FeatureDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { switchViewMode, switchModule } = useNavigation()
    const [feature, setFeature] = useState<Feature | null>(null)
    const [uc, setUC] = useState<UC | null>(null)
    const [prd, setPrd] = useState<PRD | null>(null)
    const [ssts, setSsts] = useState<SSTS[]>([])
    const [prdContent, setPrdContent] = useState('')
    const [prdEditing, setPrdEditing] = useState(false)
    const [splitModalVisible, setSplitModalVisible] = useState(false)

    // 设置为详情视图模式，以显示SecondaryNav
    useEffect(() => {
        switchModule('c1') // 切换到产品需求模块
        switchViewMode('detail') // 切换到详情视图

        // 组件卸载时恢复列表视图
        return () => {
            switchViewMode('list')
        }
    }, [switchViewMode, switchModule])

    // 加载数据
    useEffect(() => {
        if (id) {
            const featureData = getFeatureById(id)
            if (featureData) {
                setFeature(featureData)

                // 加载UC
                const ucData = getUCById(featureData.ucId)
                setUC(ucData || null)

                // 加载PRD
                let prdData = getPRDByFeatureId(id)
                if (!prdData) {
                    // 如果没有PRD，创建一个
                    prdData = createPRD(id)
                }
                setPrd(prdData)
                setPrdContent(prdData.content)

                // 加载SSTS
                const sstsData = getSSTSByFeatureId(id)
                setSsts(sstsData)
            }
        }
    }, [id])

    // 保存PRD
    const handleSavePRD = () => {
        if (feature && prd) {
            updatePRD(feature.id, prdContent)
            message.success('PRD已保存')
            setPrdEditing(false)
        }
    }

    // SSTS表格列
    const sstsColumns = [
        {
            title: 'SSTS ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (id: string) => <span style={{ fontFamily: 'monospace', color: '#1890ff' }}>{id}</span>
        },
        {
            title: 'SSTS名称',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true
        },
        {
            title: '评审状态',
            dataIndex: 'reviewStatus',
            key: 'reviewStatus',
            width: 100,
            render: (status: string) => {
                const colorMap: Record<string, string> = {
                    '草稿': 'default',
                    '评审中': 'processing',
                    '已通过': 'success',
                    '已拒绝': 'error'
                }
                return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
            }
        },
        {
            title: 'MR数量',
            key: 'mrCount',
            width: 100,
            render: (_: any, record: SSTS) => {
                const mrs = getMRsBySSTSId(record.id)
                return <Tag>{mrs.length}</Tag>
            }
        },
        {
            title: '操作',
            key: 'actions',
            width: 150,
            render: (_: any, record: SSTS) => (
                <Space size="small">
                    <Button type="link" size="small">查看</Button>
                    <Button type="link" size="small">创建MR</Button>
                </Space>
            )
        }
    ]

    if (!feature) {
        return (
            <div style={{ padding: 24, textAlign: 'center' }}>
                <div>Feature不存在</div>
                <Button onClick={() => navigate('/requirements/features')} style={{ marginTop: 16 }}>
                    返回列表
                </Button>
            </div>
        )
    }

    const tabItems = [
        {
            key: 'basic',
            label: '基本信息',
            children: (
                <Card>
                    <Descriptions column={2} bordered>
                        <Descriptions.Item label="Feature ID">{feature.id}</Descriptions.Item>
                        <Descriptions.Item label="版本">{feature.version}</Descriptions.Item>
                        <Descriptions.Item label="Feature名称" span={2}>{feature.name}</Descriptions.Item>
                        <Descriptions.Item label="关联UC">
                            {uc ? (
                                <div>
                                    <div style={{ fontSize: 12, color: '#999' }}>{uc.id}</div>
                                    <div>{uc.name}</div>
                                </div>
                            ) : feature.ucId}
                        </Descriptions.Item>
                        <Descriptions.Item label="优先级">
                            <Tag color={feature.priority === 'P0' ? 'red' : 'orange'}>{feature.priority}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="状态">
                            <Tag color="processing">{feature.status}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="负责团队">{feature.team}</Descriptions.Item>
                        <Descriptions.Item label="负责人">{feature.owner}</Descriptions.Item>
                        <Descriptions.Item label="产品ID">{feature.productId}</Descriptions.Item>
                        <Descriptions.Item label="计划开始">{feature.startDate || '未设置'}</Descriptions.Item>
                        <Descriptions.Item label="计划结束">{feature.endDate || '未设置'}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{feature.createdAt}</Descriptions.Item>
                        <Descriptions.Item label="更新时间">{feature.updatedAt}</Descriptions.Item>
                    </Descriptions>
                </Card>
            )
        },
        {
            key: 'prd',
            label: (
                <span>
                    <FileTextOutlined /> PRD文档
                </span>
            ),
            children: (
                <Card
                    title="产品需求文档 (PRD)"
                    extra={
                        <Space>
                            {prdEditing ? (
                                <>
                                    <Button onClick={() => {
                                        setPrdEditing(false)
                                        setPrdContent(prd?.content || '')
                                    }}>
                                        取消
                                    </Button>
                                    <Button type="primary" onClick={handleSavePRD}>
                                        保存
                                    </Button>
                                </>
                            ) : (
                                <Button icon={<EditOutlined />} onClick={() => setPrdEditing(true)}>
                                    编辑
                                </Button>
                            )}
                        </Space>
                    }
                >
                    {prdEditing ? (
                        <ReactQuill
                            value={prdContent}
                            onChange={setPrdContent}
                            style={{ height: 500, marginBottom: 50 }}
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, 3, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['blockquote', 'code-block'],
                                    ['link'],
                                    ['clean']
                                ]
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                minHeight: 400,
                                padding: 16,
                                background: '#fafafa',
                                borderRadius: 4,
                                whiteSpace: 'pre-wrap'
                            }}
                            dangerouslySetInnerHTML={{ __html: prdContent }}
                        />
                    )}
                </Card>
            )
        },
        {
            key: 'ssts',
            label: (
                <span>
                    <BranchesOutlined /> SSTS列表 ({ssts.length})
                </span>
            ),
            children: (
                <Card
                    title="场景化技术规格 (SSTS)"
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setSplitModalVisible(true)}
                        >
                            批量创建SSTS
                        </Button>
                    }
                >
                    <Table
                        dataSource={ssts}
                        columns={sstsColumns}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
            )
        }
    ]

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
            {/* 页面头部 - 简化布局，返回按钮由SecondaryNav处理 */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ margin: 0 }}>{feature.name}</h2>
                        <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
                            {feature.id} · {feature.team} · {feature.owner}
                        </div>
                    </div>
                    <Space>
                        <Tag color={feature.priority === 'P0' ? 'red' : 'orange'}>{feature.priority}</Tag>
                        <Tag color="processing">{feature.status}</Tag>
                    </Space>
                </div>
            </div>

            <Divider />

            {/* 内容区域 */}
            <Tabs items={tabItems} defaultActiveKey="basic" />

            {/* SSTS拆分对话框 */}
            <SplitSSTSModal
                visible={splitModalVisible}
                feature={feature}
                onClose={() => setSplitModalVisible(false)}
                onSuccess={() => {
                    const sstsData = getSSTSByFeatureId(feature.id)
                    setSsts(sstsData)
                }}
            />
        </div>
    )
}

export default FeatureDetailPage
