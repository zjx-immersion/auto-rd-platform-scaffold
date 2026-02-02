import React, { useState } from 'react'
import { Tabs, Descriptions, Tag, Button, Input, Table, Space, Card, Empty } from 'antd'
import { EditOutlined, FileTextOutlined, BranchesOutlined } from '@ant-design/icons'

interface FeatureDetailPanelProps {
    feature: any
}

export const FeatureDetailPanel: React.FC<FeatureDetailPanelProps> = ({ feature }) => {
    const [activeTab, setActiveTab] = useState('info')

    if (!feature) return <Empty description="Select a feature to view details" />

    const sstsColumns = [
        { title: 'Code', dataIndex: 'code', key: 'code', width: 120 },
        { title: 'SSTS Name', dataIndex: 'name', key: 'name' },
        { title: 'Status', dataIndex: 'status', key: 'status', width: 100 },
        {
            title: 'MR数量',
            dataIndex: 'mrCount',
            key: 'mrCount',
            width: 100,
            render: (count: number) => <Tag color="blue">{count || 0} MRs</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            // 展开显示该SSTS的MR列表
                            console.log('Expand MRs for', record.code)
                        }}
                    >
                        查看MR
                    </Button>
                    <Button type="link" size="small">拆分MR</Button>
                </Space>
            )
        }
    ]

    const items = [
        {
            key: 'info',
            label: 'Base Info',
            children: (
                <Space orientation="vertical" style={{ width: '100%' }}>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Code">{feature.code}</Descriptions.Item>
                        <Descriptions.Item label="Source Epic">
                            {feature.epicId ? <Tag color="blue">{feature.epicId}</Tag> : <span style={{ color: '#999' }}>未关联</span>}
                        </Descriptions.Item>
                        <Descriptions.Item label="Priority">{feature.priority}</Descriptions.Item>
                        <Descriptions.Item label="Status">{feature.status}</Descriptions.Item>
                        <Descriptions.Item label="Target Version">{feature.targetVersion || '-'}</Descriptions.Item>
                        <Descriptions.Item label="Description" span={2}>{feature.description}</Descriptions.Item>
                    </Descriptions>
                </Space>
            )
        },
        {
            key: 'design',
            label: 'Design Doc (PRD)',
            icon: <FileTextOutlined />,
            children: (
                <Input.TextArea
                    rows={15}
                    defaultValue="# Feature Design\n\n## 1. Background\n..."
                    placeholder="Markdown content..."
                />
            )
        },
        {
            key: 'ssts',
            label: 'SSTS Splitting',
            icon: <BranchesOutlined />,
            children: (
                <Space orientation="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="primary" icon={<BranchesOutlined />}>New SSTS</Button>
                    </div>
                    <Table
                        dataSource={feature.ssts || []}
                        columns={sstsColumns}
                        rowKey="id"
                        pagination={false}
                    />
                </Space>
            )
        }
    ]

    return (
        <Card title={feature.name} extra={<Button icon={<EditOutlined />}>Edit</Button>}>
            <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
        </Card>
    )
}
