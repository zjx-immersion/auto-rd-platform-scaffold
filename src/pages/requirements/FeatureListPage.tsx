/**
 * Feature列表页面
 * 展示所有Feature需求，支持筛选、搜索、查看详情
 */
import React, { useState } from 'react'
import { Table, Button, Tag, Space, Input, Select, Card, Statistic, Row, Col } from 'antd'
import { PlusOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { features, ucs, getUCById, getFeaturesByStatus, getFeaturesByTeam } from '@/data'
import type { Feature } from '@/data'

const { Search } = Input

export const FeatureListPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [teamFilter, setTeamFilter] = useState<string>('all')

    // 筛选数据
    const filteredData = features.filter(feature => {
        const matchesSearch = feature.name.toLowerCase().includes(searchText.toLowerCase()) ||
            feature.id.toLowerCase().includes(searchText.toLowerCase())
        const matchesStatus = statusFilter === 'all' || feature.status === statusFilter
        const matchesTeam = teamFilter === 'all' || feature.team === teamFilter
        return matchesSearch && matchesStatus && matchesTeam
    })

    // 统计数据
    const stats = {
        total: features.length,
        draft: features.filter(f => f.status === '草稿').length,
        inProgress: features.filter(f => f.status === '设计中' || f.status === '开发中').length,
        completed: features.filter(f => f.status === '已完成' || f.status === '已通过').length
    }

    // 表格列定义
    const columns = [
        {
            title: 'Feature ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (id: string) => (
                <span style={{ fontFamily: 'monospace', color: '#1890ff', cursor: 'pointer' }}
                    onClick={() => navigate(`/requirements/features/${id}`)}
                >
                    {id}
                </span>
            )
        },
        {
            title: 'Feature名称',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            ellipsis: true
        },
        {
            title: '关联UC',
            dataIndex: 'ucId',
            key: 'ucId',
            width: 200,
            render: (ucId: string) => {
                const uc = getUCById(ucId)
                return uc ? (
                    <div>
                        <div style={{ fontSize: 12, color: '#999' }}>{ucId}</div>
                        <div style={{ fontSize: 13 }}>{uc.name}</div>
                    </div>
                ) : ucId
            }
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            width: 90,
            render: (priority: string) => {
                const colorMap: Record<string, string> = {
                    'P0': 'red',
                    'P1': 'orange',
                    'P2': 'blue'
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
                    '草稿': 'default',
                    '设计中': 'processing',
                    '评审中': 'warning',
                    '已通过': 'success',
                    '开发中': 'cyan',
                    '已完成': 'success'
                }
                return <Tag color={colorMap[status] || 'default'}>{status}</Tag>
            }
        },
        {
            title: '负责团队',
            dataIndex: 'team',
            key: 'team',
            width: 120
        },
        {
            title: '负责人',
            dataIndex: 'owner',
            key: 'owner',
            width: 100
        },
        {
            title: '计划时间',
            key: 'schedule',
            width: 180,
            render: (_: any, record: Feature) => (
                <div style={{ fontSize: 12 }}>
                    {record.startDate && record.endDate ? (
                        <>
                            <div>{record.startDate}</div>
                            <div style={{ color: '#999' }}>至 {record.endDate}</div>
                        </>
                    ) : (
                        <span style={{ color: '#999' }}>未设置</span>
                    )}
                </div>
            )
        },
        {
            title: '操作',
            key: 'actions',
            width: 150,
            fixed: 'right' as const,
            render: (_: any, record: Feature) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/requirements/features/${record.id}`)}
                    >
                        查看
                    </Button>
                    <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                    >
                        编辑
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <div style={{ padding: 24, background: '#fff', height: '100%' }}>
            {/* 页面标题 */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>Feature需求管理</h2>
                <div style={{ color: '#666', fontSize: 14 }}>管理所有Feature需求，查看PRD、拆分SSTS</div>
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
                        <Statistic title="草稿" value={stats.draft} valueStyle={{ color: '#999' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="进行中" value={stats.inProgress} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="已完成" value={stats.completed} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
            </Row>

            {/* 筛选和操作栏 */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                    <Button type="primary" icon={<PlusOutlined />}>
                        新建Feature
                    </Button>
                    <Search
                        placeholder="搜索Feature"
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
                            { label: '草稿', value: '草稿' },
                            { label: '设计中', value: '设计中' },
                            { label: '评审中', value: '评审中' },
                            { label: '已通过', value: '已通过' },
                            { label: '开发中', value: '开发中' },
                            { label: '已完成', value: '已完成' }
                        ]}
                    />
                    <Select
                        style={{ width: 150 }}
                        placeholder="筛选团队"
                        value={teamFilter}
                        onChange={setTeamFilter}
                        options={[
                            { label: '全部团队', value: 'all' },
                            { label: '感知团队', value: '感知团队' },
                            { label: '规划团队', value: '规划团队' },
                            { label: '控制团队', value: '控制团队' },
                            { label: 'HMI团队', value: 'HMI团队' }
                        ]}
                    />
                </Space>
                <Space>
                    <Tag color="blue">筛选结果: {filteredData.length}</Tag>
                </Space>
            </div>

            {/* Feature列表表格 */}
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

export default FeatureListPage
