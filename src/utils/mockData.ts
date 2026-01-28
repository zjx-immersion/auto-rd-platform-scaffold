/**
 * Mock数据工具
 * 用于开发和测试阶段的数据模拟
 */

import type { BaseListItem, ListQueryParams, ListResponse } from '@/types/common'

/**
 * 模拟API延迟
 */
export const mockDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 模拟列表查询
 */
export async function mockListQuery<T extends BaseListItem>(
  allData: T[],
  params: ListQueryParams = {}
): Promise<ListResponse<T>> {
  await mockDelay(300)

  const { page = 1, pageSize = 10, keyword, ...filters } = params

  // 关键词搜索
  let filteredData = allData
  if (keyword) {
    filteredData = allData.filter((item) => {
      return Object.values(item).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(keyword.toLowerCase())
        }
        return false
      })
    })
  }

  // 筛选
  Object.keys(filters).forEach((key) => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      filteredData = filteredData.filter((item) => {
        const value = item[key]
        const filterValue = filters[key]
        if (Array.isArray(filterValue)) {
          return filterValue.includes(value)
        }
        return value === filterValue
      })
    }
  })

  // 排序
  if (params.sortField) {
    filteredData.sort((a, b) => {
      const aVal = a[params.sortField!]
      const bVal = b[params.sortField!]
      if (params.sortOrder === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    })
  }

  // 分页
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = filteredData.slice(start, end)

  return {
    list,
    total: filteredData.length,
    page,
    pageSize,
  }
}

/**
 * 生成Mock ID
 */
export function generateMockId(prefix: string = 'mock'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 生成Mock日期
 */
export function generateMockDate(daysAgo: number = 0): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}
