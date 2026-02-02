/**
 * SSTS Management View
 * SSTS管理视图
 */

import React, { useState, useMemo } from 'react'
import { Table, Tag, Button, Space, Input, Select, Card, Row, Col, Statistic } from 'antd'
import { SearchOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ssts } from '@/data/ssts'
import { features } from '@/data/features'
import { getProductsByProductLineId } from '@/data/products'
import type { SSTS } from '@/data/types'

const { Search } = Input

interface SSTSManagementViewProps {
    productLineId?: string
}

export const SSTSManagementView: React.FC<SSTSManagementViewProps> = ({ productLineId }) => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')

    // 过滤数据
    const filteredData = useMemo(() => {
        // 如果有productLineId，先获取该产品线下的所有产品ID
        let productIds: string[] = []
        if (productLineId) {
            const products = getProductsByProductLineId(productLineId)
            productIds = products.map(p => p.id)
        }

        return ssts.filter(item => {
            const matchesSearch = item.name.includes(searchText) || item.id.includes(searchText)
            const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
            // 通过featureId关联到productId，再匹配productLineId
            const feature = features.find(f => f.id === item.featureId)
            const matchesProduct = !productLineId || productIds.includes(feature?.productId || '')
            return matchesSearch && matchesStatus && matchesProduct
        })
    }, [searchText, selectedStatus, productLineId])

    // 统计数据
    const statistics = useMemo(() => {
        const total = filteredData.length
        const draft = filteredData.filter(s => s.status === '草稿').length
        const inProgress = filteredData.filter(s => s.status === '设计中' || s.status === '评审中').length
        const done = filteredData.filter(s => s.status === '已完成').length
        return { total, draft, inProgress, done }
    }, [filteredData])

    // 查看SSTS详情
    const viewSSTSDetail = (sstsId: string) => {
        navigate(`/requirements/ssts/${sstsId}`)
    }

    // 表格列定义
    const columns = [
        {
            title: 'SSTS ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (text: string) => <Tag color="orange">{text}</Tag>
        },
        {
            title: 'SSTS名称',
            dataIndex: 'name',
            key: 'name',
            width: 250,
        },
        {
            title: '关联Feature',
            dataIndex: 'featureId',
            key: 'featureId',
            width: 180,
            render: (featureId: string) => {
                const feature = features.find(f => f.id === featureId)
                return (
                    <div>
                        <div style={{ fontSize: 12, color: '#999' }}>{featureId}</div>
                        <div>{feature?.name || '-'}</div>
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
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            fixed: 'right' as const,
            render: (_: any, record: SSTS) => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => viewSSTSDetail(record.id)}
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
                {/* 统计卡片 */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={6}>
                        <Card>
                            <Statistic title="总计" value={statistics.total} suffix="个SSTS" />
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
                            placeholder="搜索SSTS名称或ID"
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
                                { value: '已完成', label: '已完成' },
                            ]}
                        />
                    </Space>
                </div>

                {/* SSTS列表表格 */}
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
        </div>
    )
}

export default SSTSManagementView
