/**
 * MR列表页面
 * 展示所有模块需求(MR)，支持筛选、搜索
 */
import React, { useState } from 'react'
import { Table, Button, Tag, Space, Input, Select, Card, Statistic, Row, Col } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { mrs, modules, ssts, getMRsByModuleId, getMRsByStatus } from '@/data'
import type { MR } from '@/data'

const { Search } = Input

export const MRListPage: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [moduleFilter, setModuleFilter] = useState<string>('all')

    // 筛选数据
    const filteredData = mrs.filter(mr => {
        const matchesSearch = mr.name.toLowerCase().includes(searchText.toLowerCase()) ||
            mr.id.toLowerCase().includes(searchText.toLowerCase())
        const matchesStatus = statusFilter === 'all' || mr.status === statusFilter
        const matchesModule = moduleFilter === 'all' || mr.moduleId === moduleFilter
        return matchesSearch && matchesStatus && matchesModule
    })

    // 统计数据
    const stats = {
        total: mrs.length,
        unassigned: mrs.filter(m => m.status === '待分配').length,
        assigned: mrs.filter(m => m.status === '已分配').length,
        inProgress: mrs.filter(m => m.status === '开发中').length,
        completed: mrs.filter(m => m.status === '已完成').length
    }

    // 表格列定义
    const columns = [
        {
            title: 'MR ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (id: string) => <span style={{ fontFamily: 'monospace', color: '#1890ff' }}>{id}</span>
        },
        {
            title: 'MR名称',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            ellipsis: true
        },
        {
            title: '关联SSTS',
            dataIndex: 'sstsId',
            key: 'sstsId',
            width: 200,
            render: (sstsId: string) => {
                const sstsItem = ssts.find(s => s.id === sstsId)
                return sstsItem ? (
                    <div>
                        <div style={{ fontSize: 12, color: '#999' }}>{sstsId}</div>
                        <div style={{ fontSize: 13 }}>{sstsItem.name}</div>
                    </div>
                ) : sstsId
            }
        },
        {
            title: '关联模块',
            dataIndex: 'moduleId',
            key: 'moduleId',
            width: 150,
            render: (moduleId: string) => {
                const module = modules.find(m => m.id === moduleId)
                return module ? (
                    <div>
                        <div>{module.name}</div>
                        <div style={{ fontSize: 12, color: '#999' }}>{module.teamId}</div>
                    </div>
                ) : moduleId
            }
        },
        {
            title: '工作量',
            dataIndex: 'effort',
            key: 'effort',
            width: 100,
            render: (effort: number) => <Tag color="blue">{effort}人天</Tag>
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
            title: '分配迭代',
            dataIndex: 'iterationId',
            key: 'iterationId',
            width: 120,
            render: (iterationId?: string) => iterationId || <span style={{ color: '#999' }}>未分配</span>
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
            width: 100,
            fixed: 'right' as const,
            render: (_: any, record: MR) => (
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

    return (
        <div style={{ padding: 24, background: '#fff', height: '100%' }}>
            {/* 页面标题 */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>模块需求 (MR) 管理</h2>
                <div style={{ color: '#666', fontSize: 14 }}>管理所有模块需求，跟踪开发进度</div>
            </div>

            {/* 统计卡片 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic title="总计" value={stats.total} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="待分配" value={stats.unassigned} valueStyle={{ color: '#999' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="已分配" value={stats.assigned} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="开发中" value={stats.inProgress} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
            </Row>

            {/* 筛选和操作栏 */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                    <Search
                        placeholder="搜索MR"
                        onSearch={setSearchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />
                    <Select
                        style={{ width: 150 }}
                        placeholder="筛选状态"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={[
                            { label: '全部状态', value: 'all' },
                            { label: '待分配', value: '待分配' },
                            { label: '已分配', value: '已分配' },
                            { label: '开发中', value: '开发中' },
                            { label: '已完成', value: '已完成' }
                        ]}
                    />
                    <Select
                        style={{ width: 150 }}
                        placeholder="筛选模块"
                        value={moduleFilter}
                        onChange={setModuleFilter}
                        options={[
                            { label: '全部模块', value: 'all' },
                            ...modules.map(m => ({ label: m.name, value: m.id }))
                        ]}
                    />
                </Space>
                <Space>
                    <Tag color="blue">筛选结果: {filteredData.length}</Tag>
                </Space>
            </div>

            {/* MR列表表格 */}
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="id"
                scroll={{ x: 1400 }}
                pagination={{
                    pageSize: 15,
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条记录`
                }}
            />
        </div>
    )
}

export default MRListPage
