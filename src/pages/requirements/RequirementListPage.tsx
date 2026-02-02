import React, { useState, useMemo } from 'react'
import { Table, Button, Input, Space, Tag } from 'antd'
import { SearchOutlined, ReloadOutlined, EyeOutlined, FolderOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useNavigation } from '@/context/NavigationContext'
import EmptyPlaceholder from '@/components/common/EmptyPlaceholder'
import './RequirementListPage.css'

// 产品线类型
interface ProductLine {
  id: string
  code: string
  name: string
  description: string
  owner: string
  productCount: number
  children?: Product[]
}

// 产品类型
interface Product {
  id: string
  code: string
  name: string
  description: string
  owner: string
  status: string
  productLineId: string
}

// Mock 产品线数据
const mockProductLines: ProductLine[] = [
  {
    id: 'line-001',
    code: 'LANTU-LINE',
    name: '岚图梦想家',
    description: '岚图梦想家产品线',
    owner: '张三',
    productCount: 3,
    children: [
      {
        id: 'product-001',
        code: 'ADAS-PROD',
        name: 'ADAS系统',
        description: '高级驾驶辅助系统',
        owner: '李四',
        status: '开发中',
        productLineId: 'line-001'
      },
      {
        id: 'product-002',
        code: 'CABIN-PROD',
        name: '智能座舱',
        description: '智能座舱系统',
        owner: '王五',
        status: '开发中',
        productLineId: 'line-001'
      },
      {
        id: 'product-003',
        code: 'POWER-PROD',
        name: '动力系统',
        description: '动力控制系统',
        owner: '赵六',
        status: '规划中',
        productLineId: 'line-001'
      }
    ]
  },
  {
    id: 'line-002',
    code: 'FREE-LINE',
    name: '岚图FREE',
    description: '岚图FREE产品线',
    owner: '孙七',
    productCount: 2,
    children: [
      {
        id: 'product-004',
        code: 'CHASSIS-PROD',
        name: '底盘系统',
        description: '底盘控制系统',
        owner: '周八',
        status: '已完成',
        productLineId: 'line-002'
      },
      {
        id: 'product-005',
        code: 'BODY-PROD',
        name: '车身控制',
        description: '车身控制系统',
        owner: '吴九',
        status: '开发中',
        productLineId: 'line-002'
      }
    ]
  }
]

export const RequirementListPage: React.FC = () => {
  const navigate = useNavigate()
  const { selectedTertiaryItem } = useNavigation()
  const [searchText, setSearchText] = useState('')
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

  // 将filteredData提升到组件顶层（修复Hook违规）
  const filteredData = useMemo(() => {
    let data = mockProductLines

    // 搜索筛选
    if (searchText) {
      data = data.filter(
        (line) =>
          line.name.toLowerCase().includes(searchText.toLowerCase()) ||
          line.code.toLowerCase().includes(searchText.toLowerCase()) ||
          line.children?.some(
            (product) =>
              product.name.toLowerCase().includes(searchText.toLowerCase()) ||
              product.code.toLowerCase().includes(searchText.toLowerCase())
          )
      )
    }

    return data
  }, [searchText])

  // 处理行展开/收起
  const handleExpand = (expanded: boolean, record: ProductLine) => {
    const keys = expanded
      ? [...expandedRowKeys, record.id]
      : expandedRowKeys.filter((key) => key !== record.id)
    setExpandedRowKeys(keys)
  }

  // 进入产品线详情
  const handleProductLineClick = (lineId: string) => {
    navigate(`/c1/${lineId}/epics`)
  }

  // 进入产品详情
  const handleProductClick = (productId: string) => {
    navigate(`/c1/${productId}/epics`)
  }

  // 表格列配置
  const columns = [
    {
      key: 'code',
      title: '编码',
      dataIndex: 'code',
      width: 180,
    },
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name',
      width: 250,
      render: (text: string, record: any) => {
        const isProductLine = !record.productLineId
        const icon = isProductLine ? <FolderOutlined /> : <AppstoreOutlined />
        const onClick = isProductLine
          ? () => handleProductLineClick(record.id)
          : () => handleProductClick(record.id)

        return (
          <Button type="link" icon={icon} onClick={onClick}>
            {text}
          </Button>
        )
      },
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
      width: 300,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 120,
      render: (status: string, record: any) => {
        if (record.productLineId) {
          // 产品显示状态
          const statusMap: Record<string, { color: string; text: string }> = {
            '规划中': { color: 'blue', text: '规划中' },
            '开发中': { color: 'green', text: '开发中' },
            '已完成': { color: 'default', text: '已完成' },
          }
          const config = statusMap[status] || { color: 'default', text: status }
          return <Tag color={config.color}>{config.text}</Tag>
        }
        return null
      },
    },
    {
      key: 'owner',
      title: '负责人',
      dataIndex: 'owner',
      width: 120,
    },
    {
      key: 'productCount',
      title: '产品数量',
      dataIndex: 'productCount',
      width: 120,
      render: (count: number, record: any) => {
        if (!record.productLineId) {
          return <Tag color="blue">{count}</Tag>
        }
        return null
      },
    },
    {
      key: 'actions',
      title: '操作',
      width: 150,
      render: (_: any, record: any) => {
        const isProductLine = !record.productLineId
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined />}
              onClick={() =>
                isProductLine
                  ? handleProductLineClick(record.id)
                  : handleProductClick(record.id)
              }
            >
              查看
            </Button>
          </Space>
        )
      },
    },
  ]

  // 渲染产品线列表
  const renderProductLineList = () => {
    return (
      <div className="requirement-list-page">
        {/* 搜索和筛选工具栏 */}
        <div className="toolbar">
          <Space size="middle">
            <Input.Search
              placeholder="搜索关键词..."
              allowClear
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Space>

          <Button icon={<ReloadOutlined />} onClick={() => setSearchText('')}>
            刷新
          </Button>
        </div>

        {/* 产品线层级表格 */}
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            expandable={{
              expandedRowKeys,
              onExpand: handleExpand,
              childrenColumnName: 'children',
              indentSize: 30,
            }}
            pagination={{
              total: filteredData.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
          />
        </div>
      </div>
    )
  }

  // 根据三级导航渲染不同内容
  const renderContent = () => {
    // 如果选中其他未实现的导航项，显示占位符
    if (selectedTertiaryItem && selectedTertiaryItem !== 'all-lines') {
      const tabTitles: Record<string, string> = {
        'my-lines': '我的产品线',
        'my-products': '我的产品',
        'my-projects': '我的项目',
      }
      return (
        <div className="requirement-list-page">
          <EmptyPlaceholder
            title={tabTitles[selectedTertiaryItem] || '功能开发中'}
            description="还在加速研发中..."
          />
        </div>
      )
    }

    // 默认显示产品线列表（selectedTertiaryItem为空或为'all-lines'）
    return renderProductLineList()
  }

  // 主渲染
  return renderContent()
}

export default RequirementListPage
