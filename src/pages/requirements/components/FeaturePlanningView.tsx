import React, { useState, useMemo } from 'react'
import { Row, Col, Card, Tree, Empty, Tag } from 'antd'
import { FolderOutlined, FileTextOutlined } from '@ant-design/icons'
import { FeatureDetailPanel } from './FeatureDetailPanel'
import { mockRequirementTreeData } from '@/mock/requirementTree'

export const FeaturePlanningView: React.FC = () => {
    const [selectedKey, setSelectedKey] = useState<string>('')

    // Transform mock data to TreeData
    const treeData = useMemo(() => {
        return mockRequirementTreeData.epics.map(epic => ({
            title: epic.name,
            key: epic.id,
            icon: <FolderOutlined />,
            children: epic.features?.map(feat => ({
                title: (
                    <span>
                        {feat.name} <Tag color={feat.status === '评审中' ? 'orange' : 'blue'}>{feat.status}</Tag>
                    </span>
                ),
                key: feat.id,
                icon: <FileTextOutlined />,
                isLeaf: true,
                data: feat // Pass full feature data
            }))
        }))
    }, [])

    // Find selected feature data
    const selectedFeature = useMemo(() => {
        for (const epic of mockRequirementTreeData.epics) {
            const feat = epic.features?.find(f => f.id === selectedKey)
            if (feat) return feat
        }
        return null
    }, [selectedKey])

    return (
        <div style={{ padding: 16 }}>
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Feature Tree" style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                        <Tree
                            showIcon
                            defaultExpandAll
                            treeData={treeData}
                            onSelect={(keys) => setSelectedKey(keys[0] as string)}
                        />
                    </Card>
                </Col>
                <Col span={18}>
                    {selectedFeature ? (
                        <FeatureDetailPanel feature={selectedFeature} />
                    ) : (
                        <Card style={{ height: 'calc(100vh - 200px)' }}>
                            <Empty description="Select a Feature to view context" style={{ marginTop: 100 }} />
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    )
}
