/**
 * 迭代看板视图 (Sprint Kanban)
 * 核心功能：
 * 1. 看板列：To Do, In Progress, Testing, Done
 * 2. 泳道：按需求(Stories)或人员划分
 * 3. 拖拽：支持拖拽改变状态 (模拟)
 */

import React, { useState } from 'react'
import { Card, Row, Col, Tag, Avatar, Space, Button, Select, Divider, Tooltip } from 'antd'
import {
    CheckCircleOutlined,
    SyncOutlined,
    ClockCircleOutlined,
    UserOutlined,
    PlusOutlined,
    MoreOutlined
} from '@ant-design/icons'
import { mockStories, mockTasks, type Story, type Task } from '@/mock/planning'

interface SprintKanbanViewProps {
    planId: string
    sprintId?: string
}

// 看板列定义
const COLUMNS = [
    { key: 'todo', title: 'To Do', color: '#d9d9d9', icon: <ClockCircleOutlined /> },
    { key: 'in-progress', title: 'In Progress', color: '#1890ff', icon: <SyncOutlined spin /> },
    { key: 'testing', title: 'Testing', color: '#722ed1', icon: <CheckCircleOutlined /> },
    { key: 'done', title: 'Done', color: '#52c41a', icon: <CheckCircleOutlined /> }
]

export const SprintKanbanView: React.FC<SprintKanbanViewProps> = ({ planId, sprintId }) => {
    const [groupBy, setGroupBy] = useState<'story' | 'assignee'>('story')
    const [selectedSprint, setSelectedSprint] = useState(sprintId || 'sprint-2026-01')

    // 模拟过滤当前迭代的数据
    const activeStories = mockStories
    const activeTasks = mockTasks

    // 渲染任务卡片
    const renderTaskCard = (task: Task) => (
        <Card
            key={task.id}
            size="small"
            className="kanban-card"
            style={{ marginBottom: 8, cursor: 'move', borderLeft: `3px solid ${getPriorityColor('high')}` }}
            hoverable
        >
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{task.title}</div>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space size={4}>
                    <Tooltip title={task.assignee}>
                        <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                    </Tooltip>
                    <span style={{ fontSize: 12, color: '#999' }}>{task.assignee}</span>
                </Space>
                <span style={{ fontSize: 12, color: '#999' }}>{task.estimatedHours}h</span>
            </Space>
        </Card>
    )

    // 渲染泳道 (按Story划分)
    const renderStorySwimlane = (story: Story) => {
        return (
            <Card key={story.id} style={{ marginBottom: 16 }} bodyStyle={{ padding: '12px 24px' }}>
                {/* 泳道头 - Story信息 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <Tag color="gold">Story</Tag>
                    <span style={{ fontWeight: 600, fontSize: 15, marginRight: 12 }}>{story.title}</span>
                    <Space>
                        <Tag>{story.priority}</Tag>
                        <Tag color={story.status === 'done' ? 'green' : 'blue'}>{story.status}</Tag>
                        <span style={{ fontSize: 12, color: '#999' }}>
                            进度: {story.completedTaskCount}/{story.taskCount} 任务
                        </span>
                    </Space>
                    <Button type="text" icon={<PlusOutlined />} style={{ marginLeft: 'auto' }}>
                        添加任务
                    </Button>
                </div>

                {/* 看板列 */}
                <Row gutter={16} style={{ background: '#f5f5f5', padding: 12, borderRadius: 8 }}>
                    {COLUMNS.map(col => {
                        // 筛选该Story下的任务，且状态匹配列
                        const colTasks = activeTasks.filter(t => t.storyId === story.id && t.status === col.key)

                        return (
                            <Col key={col.key} span={6}>
                                <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', color: '#666' }}>
                                    <span style={{ marginRight: 6 }}>{col.icon}</span>
                                    <span style={{ fontWeight: 600 }}>{col.title}</span>
                                    <Tag style={{ marginLeft: 8, borderRadius: 10 }}>{colTasks.length}</Tag>
                                </div>
                                <div style={{ minHeight: 100 }}>
                                    {colTasks.map(task => renderTaskCard(task))}
                                    {colTasks.length === 0 && (
                                        <div style={{
                                            height: 60,
                                            border: '1px dashed #d9d9d9',
                                            borderRadius: 4,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#ccc',
                                            fontSize: 12
                                        }}>
                                            无任务
                                        </div>
                                    )}
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Card>
        )
    }

    return (
        <div className="sprint-kanban-view">
            {/* 工具栏 */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                    <span style={{ fontWeight: 600 }}>当前迭代:</span>
                    <Select
                        value={selectedSprint}
                        onChange={setSelectedSprint}
                        style={{ width: 160 }}
                        options={[
                            { value: 'sprint-2026-01', label: '2026-01 (进行中)' },
                            { value: 'sprint-2026-02', label: '2026-02 (规划中)' },
                        ]}
                    />
                    <Divider type="vertical" />
                    <span>视图:</span>
                    <Select
                        value={groupBy}
                        onChange={setGroupBy}
                        options={[
                            { value: 'story', label: '按需求 (Story)' },
                            { value: 'assignee', label: '按成员' },
                        ]}
                    />
                </Space>

                <Space>
                    <Button>配置看板</Button>
                    <Button type="primary" icon={<PlusOutlined />}>新建工作项</Button>
                </Space>
            </div>

            {/* 看板区域 */}
            <div className="kanban-board">
                {activeStories.map(story => renderStorySwimlane(story))}
            </div>
        </div>
    )
}

function getPriorityColor(priority: string) {
    switch (priority) {
        case 'high': return '#ff4d4f'
        case 'medium': return '#faad14'
        case 'low': return '#52c41a'
        default: return '#1890ff'
    }
}
