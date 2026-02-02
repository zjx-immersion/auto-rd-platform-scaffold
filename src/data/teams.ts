import type { Team } from './types'

/**
 * 团队Mock数据
 */
export const teams: Team[] = [
    {
        id: 'TEAM-001',
        name: '感知团队',
        capacity: 40,
        members: ['张三', '李四', '王五', '赵六'],
        createdAt: '2026-01-01'
    },
    {
        id: 'TEAM-002',
        name: '规划团队',
        capacity: 35,
        members: ['钱七', '孙八', '周九'],
        createdAt: '2026-01-01'
    },
    {
        id: 'TEAM-003',
        name: '控制团队',
        capacity: 30,
        members: ['吴十', '郑十一', '冯十二'],
        createdAt: '2026-01-01'
    },
    {
        id: 'TEAM-004',
        name: 'HMI团队',
        capacity: 25,
        members: ['陈十三', '褚十四'],
        createdAt: '2026-01-01'
    }
]

export const getTeamById = (id: string): Team | undefined => {
    return teams.find(team => team.id === id)
}

export const getTeamByName = (name: string): Team | undefined => {
    return teams.find(team => team.name === name)
}
