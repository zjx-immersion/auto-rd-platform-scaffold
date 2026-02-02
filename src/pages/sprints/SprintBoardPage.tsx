/**
 * 迭代看板页面
 * 使用看板视图展示工作票的状态流转
 */
import React, { useState, useMemo } from 'react'
import { Card, Tag, Avatar, Space, Select, Row, Col, Statistic, Badge } from 'antd'
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons'
import {
    workItems,
    teams,
    getWorkItemsByTeamId,
    getWorkItemsBySprint,
    updateWorkItemStatus
} from '@/data'
import type { WorkItem } from '@/data'

// 看板列定义
const BOARD_COLUMNS = [
    { key: '待办', title: '待办', color: '#d9d9d9' },
    { key: '进行中', title: '进行中', color: '#1890ff' },
    { key: '已完成', title: '已完成', color: '#52c41a' }
]

// 工作票卡片组件
const WorkItemCard: React.FC<{ item: WorkItem }> = ({ item }) => {
    const typeColorMap: Record<string, string> = {
        'MR需求': 'blue',
        '缺陷修复': 'red',
        '技术任务': 'green',
        '风险': 'orange'
    }

    const priorityColorMap: Record<string, string> = {
        '高': 'red',
        '中': 'orange',
        '低': 'default'
    }

    return (
        <Card
            size="small"
            hoverable
            style={{
                marginBottom: 12,
                borderLeft: `4px solid ${typeColorMap[item.type] || '#1890ff'}`,
                cursor: 'pointer'
            }}
            bodyStyle={{ padding: 12 }}
        >
            <div style={{ marginBottom: 8 }}>
                <Space size={4}>
                    <Tag color={typeColorMap[item.type]}>{item.type}</Tag>
                    <Tag color={priorityColorMap[item.priority]}>{item.priority}</Tag>
                </Space>
            </div>

            <div style={{
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 8,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
            }}>
                {item.title}
            </div>

            {item.mrId && (
                <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>
                    来自 {item.mrId}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space size={4}>
                    <Avatar size={20} icon={<UserOutlined />} />
                    <span style={{ fontSize: 12 }}>{item.assignee}</span>
                </Space>
                <Space size={4}>
                    <ClockCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                    <span style={{ fontSize: 12, color: '#999' }}>{item.effort}天</span>
                </Space>
            </div>

            <div style={{ fontSize: 11, color: '#999', marginTop: 8 }}>
                {item.id}
            </div>
        </Card>
    )
}

// 看板列组件
const BoardColumn: React.FC<{
    title: string
    status: string
    items: WorkItem[]
    color: string
}> = ({ title, status, items, color }) => {
    const totalEffort = items.reduce((sum, item) => sum + item.effort, 0)

    return (
        <div style={{
            background: '#f5f5f5',
            borderRadius: 8,
            padding: 16,
            minHeight: 600
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: `2px solid ${color}`
            }}>
                <Space>
                    <span style={{ fontSize: 16, fontWeight: 500 }}>{title}</span>
                    <Badge count={items.length} style={{ backgroundColor: color }} />
                </Space>
                <span style={{ fontSize: 12, color: '#999' }}>{totalEffort}人天</span>
            </div>

            <div>
                {items.map(item => (
                    <WorkItemCard key={item.id} item={item} />
                ))}
                {items.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        color: '#999',
                        padding: '40px 0',
                        fontSize: 13
                    }}>
                        暂无工作项
                    </div>
                )}
            </div>
        </div>
    )
}

export const SprintBoardPage: React.FC = () => {
    const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]?.id || '')
    const [selectedSprint, setSelectedSprint] = useState<number>(1)

    // 获取筛选后的工作项
    const filteredWorkItems = useMemo(() => {
        return workItems.filter(item =>
            item.teamId === selectedTeam && item.sprint === selectedSprint
        )
    }, [selectedTeam, selectedSprint])

    // 按状态分组
    const groupedItems = useMemo(() => {
        const groups: Record<string, WorkItem[]> = {
            '待办': [],
            '进行中': [],
            '已完成': []
        }

        filteredWorkItems.forEach(item => {
            if (groups[item.status]) {
                groups[item.status].push(item)
            }
        })

        return groups
    }, [filteredWorkItems])

    // 统计数据
    const stats = useMemo(() => {
        const total = filteredWorkItems.length
        const totalEffort = filteredWorkItems.reduce((sum, item) => sum + item.effort, 0)
        const completedEffort = groupedItems['已完成'].reduce((sum, item) => sum + item.effort, 0)
        const progress = totalEffort > 0 ? Math.round((completedEffort / totalEffort) * 100) : 0

        return {
            total,
            totalEffort,
            completedEffort,
            progress,
            mrCount: filteredWorkItems.filter(item => item.type === 'MR需求').length,
            bugCount: filteredWorkItems.filter(item => item.type === '缺陷修复').length
        }
    }, [filteredWorkItems, groupedItems])

    const selectedTeamData = teams.find(t => t.id === selectedTeam)

    return (
        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
            {/* 页面标题 */}
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ margin: 0 }}>迭代看板</h2>
                <div style={{ color: '#666', fontSize: 14 }}>可视化工作票状态，跟踪Sprint进度</div>
            </div>

            {/* 筛选器 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={12}>
                    <Card>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ fontSize: 14, color: '#666' }}>选择团队</div>
                            <Select
                                style={{ width: '100%' }}
                                value={selectedTeam}
                                onChange={setSelectedTeam}
                                options={teams.map(team => ({
                                    label: `${team.name} (容量: ${team.capacity}人天)`,
                                    value: team.id
                                }))}
                            />
                        </Space>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ fontSize: 14, color: '#666' }}>选择Sprint</div>
                            <Select
                                style={{ width: '100%' }}
                                value={selectedSprint}
                                onChange={setSelectedSprint}
                                options={[1, 2, 3, 4].map(sprint => ({
                                    label: `Sprint ${sprint}`,
                                    value: sprint
                                }))}
                            />
                        </Space>
                    </Card>
                </Col>
            </Row>

            {/* 统计卡片 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="总工作项"
                            value={stats.total}
                            suffix={`/ ${stats.totalEffort}人天`}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="完成进度"
                            value={stats.progress}
                            suffix="%"
                            valueStyle={{ color: stats.progress >= 80 ? '#52c41a' : '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="MR需求"
                            value={stats.mrCount}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="缺陷修复"
                            value={stats.bugCount}
                            valueStyle={{ color: '#ff4d4f' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* 看板视图 */}
            <Card
                title={`${selectedTeamData?.name || ''} - Sprint ${selectedSprint} 看板`}
                bodyStyle={{ padding: 16 }}
            >
                <Row gutter={16}>
                    {BOARD_COLUMNS.map(column => (
                        <Col key={column.key} span={8}>
                            <BoardColumn
                                title={column.title}
                                status={column.key}
                                items={groupedItems[column.key] || []}
                                color={column.color}
                            />
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    )
}

export default SprintBoardPage
