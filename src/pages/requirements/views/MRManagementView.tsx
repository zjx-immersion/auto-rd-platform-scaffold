/**
 * MR Management View
 * 模块需求(Module Requirements)管理页面
 */

import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Space, Input, Select, Card, Descriptions, Drawer } from 'antd'
import { SearchOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import { mrs, getIterationById, getWorkItemsByMRId, getSSTSById, getFeatureById, getModuleById } from '@/data'
import type { MR, WorkItem } from '@/data'

const { Search } = Input

export const MRManagementView: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedMR, setSelectedMR] = useState<MR | null>(null)
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [workItems, setWorkItems] = useState<WorkItem[]>([])

    // 当选中MR变化时，加载关联的工作票
    useEffect(() => {
        if (selectedMR) {
            const items = getWorkItemsByMRId(selectedMR.id)
            setWorkItems(items)
        } else {
            setWorkItems([])
        }
    }, [selectedMR])

    // 过滤数据
    const filteredData = mrs.filter(mr => {
        const matchesSearch = mr.name.includes(searchText) || mr.id.includes(searchText)
        const matchesStatus = selectedStatus === 'all' || mr.status === selectedStatus
        return matchesSearch && matchesStatus
    })

    // 表格列定义
    const columns = [
        {
            title: 'MR ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (text: string) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'MR名称',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: '所属SSTS',
            dataIndex: 'sstsId',
            key: 'sstsId',
            width: 150,
            render: (sstsId: string) => {
                const ssts = getSSTSById(sstsId)
                return (
                    <div>
                        <div style={{ fontSize: 12, color: '#999' }}>{sstsId}</div>
                        <div>{ssts?.name || '-'}</div>
                    </div>
                )
            }
        },
        {
            title: '所属模块',
            dataIndex: 'moduleId',
            key: 'moduleId',
            width: 150,
            render: (moduleId: string) => {
                const module = getModuleById(moduleId)
                return <Tag color="purple">{module?.name || moduleId}</Tag>
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
            render: (iterationId?: string) => {
                if (!iterationId) return <span style={{ color: '#999' }}>未分配</span>
                const iteration = getIterationById(iterationId)
                return iteration?.name || iterationId
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            fixed: 'right' as const,
            render: (_: any, record: MR) => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedMR(record)
                            setDrawerVisible(true)
                        }}
                    >
                        查看
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <div style={{ padding: 24, background: '#fff' }}>
            <Card>
                {/* 工具栏 */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Space>
                        <Search
                            placeholder="搜索MR名称或编码"
                            onSearch={setSearchText}
                            style={{ width: 250 }}
                            prefix={<SearchOutlined />}
                        />
                        <Select
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                            style={{ width: 150 }}
                            options={[
                                { value: 'all', label: '全部状态' },
                                { value: '待分配', label: '待分配' },
                                { value: '已分配', label: '已分配' },
                                { value: '开发中', label: '开发中' },
                                { value: '已完成', label: '已完成' },
                            ]}
                        />
                    </Space>
                    <Button type="primary" icon={<PlusOutlined />}>
                        新建MR
                    </Button>
                </div>

                {/* 统计信息 */}
                <div style={{ marginBottom: 16, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
                    <Space size="large">
                        <span>总计: <strong>{mrs.length}</strong> 个MR</span>
                        <span>待分配: <strong>{mrs.filter((mr: MR) => mr.status === '待分配').length}</strong></span>
                        <span>已分配: <strong>{mrs.filter((mr: MR) => mr.status === '已分配').length}</strong></span>
                        <span>开发中: <strong>{mrs.filter((mr: MR) => mr.status === '开发中').length}</strong></span>
                        <span>已完成: <strong>{mrs.filter((mr: MR) => mr.status === '已完成').length}</strong></span>
                    </Space>
                </div>

                {/* MR列表表格 */}
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

            {/* MR详情抽屉 */}
            <Drawer
                title={`MR详情: ${selectedMR?.id}`}
                placement="right"
                width={700}
                open={drawerVisible}
                onClose={() => setDrawerVisible(false)}
            >
                {selectedMR && (() => {
                    const ssts = getSSTSById(selectedMR.sstsId)
                    const feature = ssts ? getFeatureById(ssts.featureId) : null
                    const module = getModuleById(selectedMR.moduleId)
                    const iteration = selectedMR.iterationId ? getIterationById(selectedMR.iterationId) : null

                    return (
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Card title="基本信息" size="small">
                                <Descriptions column={1} bordered>
                                    <Descriptions.Item label="MR ID">{selectedMR.id}</Descriptions.Item>
                                    <Descriptions.Item label="MR名称">{selectedMR.name}</Descriptions.Item>
                                    <Descriptions.Item label="所属SSTS">
                                        <div>
                                            <Tag color="blue">{selectedMR.sstsId}</Tag>
                                            {ssts && <div style={{ marginTop: 4 }}>{ssts.name}</div>}
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="所属Feature">
                                        {feature ? (
                                            <div>
                                                <Tag color="green">{feature.id}</Tag>
                                                <div style={{ marginTop: 4 }}>{feature.name}</div>
                                            </div>
                                        ) : '-'}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="所属模块">
                                        <Tag color="purple">{module?.name || selectedMR.moduleId}</Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="状态">
                                        <Tag color={selectedMR.status === '已完成' ? 'green' : selectedMR.status === '开发中' ? 'blue' : 'default'}>
                                            {selectedMR.status}
                                        </Tag>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            <Card title="工作量信息" size="small">
                                <Descriptions column={1} bordered>
                                    <Descriptions.Item label="预估工作量">{selectedMR.effort} 人天</Descriptions.Item>
                                    <Descriptions.Item label="所属迭代">
                                        {iteration ? (
                                            <div>
                                                <Tag color="cyan">{iteration.id}</Tag>
                                                <div style={{ marginTop: 4 }}>{iteration.name}</div>
                                                <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                                                    Sprint {iteration.sprint} | 容量: {iteration.allocated}/{iteration.capacity} 人天
                                                </div>
                                            </div>
                                        ) : <span style={{ color: '#999' }}>未分配</span>}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            <Card title="需求描述" size="small">
                                <p>{selectedMR.description}</p>
                            </Card>

                            <Card title={`关联工作票 (${workItems.length})`} size="small">
                                {workItems.length > 0 ? (
                                    <Table
                                        dataSource={workItems}
                                        rowKey="id"
                                        pagination={false}
                                        size="small"
                                        columns={[
                                            {
                                                title: '工作票ID',
                                                dataIndex: 'id',
                                                key: 'id',
                                                width: 120,
                                                render: (id: string) => <Tag>{id}</Tag>
                                            },
                                            {
                                                title: '标题',
                                                dataIndex: 'title',
                                                key: 'title',
                                            },
                                            {
                                                title: '类型',
                                                dataIndex: 'type',
                                                key: 'type',
                                                width: 100,
                                                render: (type: string) => {
                                                    const colorMap: Record<string, string> = {
                                                        'MR开发': 'blue',
                                                        '缺陷修复': 'red',
                                                        '技术任务': 'purple'
                                                    }
                                                    return <Tag color={colorMap[type] || 'default'}>{type}</Tag>
                                                }
                                            },
                                            {
                                                title: '状态',
                                                dataIndex: 'status',
                                                key: 'status',
                                                width: 100,
                                                render: (status: string) => {
                                                    const colorMap: Record<string, string> = {
                                                        '待处理': 'default',
                                                        '进行中': 'processing',
                                                        '已完成': 'success',
                                                        '已关闭': 'default'
                                                    }
                                                    return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
                                                }
                                            },
                                            {
                                                title: '负责人',
                                                dataIndex: 'assignee',
                                                key: 'assignee',
                                                width: 100,
                                            }
                                        ]}
                                    />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
                                        暂无关联工作票
                                    </div>
                                )}
                            </Card>
                        </Space>
                    )
                })()}
            </Drawer>
        </div>
    )
}

export default MRManagementView
