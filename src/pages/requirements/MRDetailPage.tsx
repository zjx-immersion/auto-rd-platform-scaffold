/**
 * MR详情页面
 * 展示MR详细信息、技术方案、关联工作票
 */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Descriptions, Tag, Button, Table, Divider, Timeline } from 'antd'
import { ArrowLeftOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons'
import {
    getMRById,
    getSSTSById,
    getFeatureById,
    getModuleById,
    getWorkItemsByMRId
} from '@/data'
import type { MR, SSTS, Feature, Module, WorkItem } from '@/data'

export const MRDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [mr, setMr] = useState<MR | null>(null)
    const [ssts, setSsts] = useState<SSTS | null>(null)
    const [feature, setFeature] = useState<Feature | null>(null)
    const [module, setModule] = useState<Module | null>(null)
    const [workItems, setWorkItems] = useState<WorkItem[]>([])

    // 加载数据
    useEffect(() => {
        if (id) {
            const mrData = getMRById(id)
            if (mrData) {
                setMr(mrData)

                // 加载SSTS
                const sstsData = getSSTSById(mrData.sstsId)
                setSsts(sstsData || null)

                // 加载Feature
                if (sstsData) {
                    const featureData = getFeatureById(sstsData.featureId)
                    setFeature(featureData || null)
                }

                // 加载Module
                const moduleData = getModuleById(mrData.moduleId)
                setModule(moduleData || null)

                // 加载关联的工作票
                const workItemsData = getWorkItemsByMRId(id)
                setWorkItems(workItemsData)
            }
        }
    }, [id])

    // 工作票表格列
    const workItemColumns = [
        {
            title: '工作票ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (id: string) => <span style={{ fontFamily: 'monospace', color: '#1890ff' }}>{id}</span>
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            render: (type: string) => {
                const colorMap: Record<string, string> = {
                    'MR需求': 'blue',
                    '缺陷修复': 'red',
                    '技术任务': 'cyan',
                    '风险': 'orange'
                }
                return <Tag color={colorMap[type] || 'default'}>{type}</Tag>
            }
        },
        {
            title: '负责人',
            dataIndex: 'assignee',
            key: 'assignee',
            width: 100
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
            title: '工作量',
            dataIndex: 'effort',
            key: 'effort',
            width: 100,
            render: (effort: number) => `${effort}人天`
        }
    ]

    if (!mr) {
        return (
            <div style={{ padding: 24, textAlign: 'center' }}>
                <div>MR不存在</div>
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
                        <h2 style={{ margin: 0 }}>{mr.name}</h2>
                        <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
                            {mr.id}
                        </div>
                    </div>
                    <Tag color={mr.status === '已完成' ? 'success' : 'processing'}>
                        {mr.status}
                    </Tag>
                </div>
            </div>

            <Divider />

            {/* MR基本信息 */}
            <Card title="基本信息" style={{ marginBottom: 24 }}>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="MR ID">{mr.id}</Descriptions.Item>
                    <Descriptions.Item label="状态">
                        <Tag color={mr.status === '已完成' ? 'success' : 'processing'}>
                            {mr.status}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="MR名称" span={2}>{mr.name}</Descriptions.Item>
                    <Descriptions.Item label="关联SSTS" span={2}>
                        {ssts ? (
                            <div>
                                <div style={{ fontSize: 12, color: '#999' }}>{ssts.id}</div>
                                <div>{ssts.name}</div>
                            </div>
                        ) : mr.sstsId}
                    </Descriptions.Item>
                    <Descriptions.Item label="关联Feature" span={2}>
                        {feature ? (
                            <div>
                                <div style={{ fontSize: 12, color: '#999' }}>{feature.id}</div>
                                <div>{feature.name}</div>
                            </div>
                        ) : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="关联模块">
                        {module ? (
                            <div>
                                <div style={{ fontWeight: 500 }}>{module.name}</div>
                                <div style={{ fontSize: 12, color: '#999' }}>{module.id}</div>
                            </div>
                        ) : mr.moduleId}
                    </Descriptions.Item>
                    <Descriptions.Item label="负责团队">
                        {module?.teamId || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="工作量">
                        {mr.effort} 人天
                    </Descriptions.Item>
                    <Descriptions.Item label="迭代">
                        {mr.iterationId || <span style={{ color: '#999' }}>未分配</span>}
                    </Descriptions.Item>
                    <Descriptions.Item label="描述" span={2}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{mr.description}</div>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {/* 技术方案 */}
            <Card
                title={<><FileTextOutlined /> 技术方案</>}
                style={{ marginBottom: 24 }}
                extra={<Button type="link">编辑方案</Button>}
            >
                <div style={{
                    padding: '16px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    minHeight: '200px'
                }}>
                    <div style={{ color: '#666' }}>
                        技术方案文档待完善...
                    </div>
                </div>
            </Card>

            {/* 关联工作票 */}
            <Card
                title={<><TeamOutlined /> 关联工作票 - 共 {workItems.length} 个</>}
                style={{ marginBottom: 24 }}
            >
                {workItems.length > 0 ? (
                    <Table
                        dataSource={workItems}
                        columns={workItemColumns}
                        rowKey="id"
                        pagination={false}
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                        暂无关联工作票
                    </div>
                )}
            </Card>

            {/* 状态历史 */}
            <Card title="状态历史">
                <Timeline>
                    <Timeline.Item color="green">
                        {mr.createdAt} - MR创建
                    </Timeline.Item>
                    {mr.iterationId && (
                        <Timeline.Item color="blue">
                            {mr.updatedAt} - 分配到迭代 {mr.iterationId}
                        </Timeline.Item>
                    )}
                    {mr.status === '开发中' && (
                        <Timeline.Item color="blue">
                            {mr.updatedAt} - 开始开发
                        </Timeline.Item>
                    )}
                    {mr.status === '已完成' && (
                        <Timeline.Item color="green">
                            {mr.updatedAt} - 开发完成
                        </Timeline.Item>
                    )}
                </Timeline>
            </Card>
        </div>
    )
}

export default MRDetailPage
