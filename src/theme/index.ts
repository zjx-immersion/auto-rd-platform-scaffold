/**
 * 主题配置
 * 支持青蓝色和橙色两套主题切换
 */

import type { ThemeConfig } from 'antd'

// 青蓝色主题（默认）- 白色打底 + 青蓝色核心
export const blueTheme: ThemeConfig = {
  token: {
    // 主色调：蓝色
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    
    // 字体
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    // 边框
    borderRadius: 4,
    
    // 背景色
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f0f2f5',
    colorBgElevated: '#ffffff',
    
    // 文字颜色
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    
    // 边框颜色
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    
    // 链接颜色
    colorLink: '#1890ff',
    colorLinkHover: '#40a9ff',
    colorLinkActive: '#096dd9',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      siderBg: '#ffffff',
      bodyBg: '#f0f2f5',
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: 'rgba(0, 0, 0, 0.88)',
      itemHoverBg: '#f5f5f5',
      itemHoverColor: '#1890ff',
      itemSelectedBg: '#e6f7ff',
      itemSelectedColor: '#1890ff',
      itemActiveBg: '#e6f7ff',
    },
    Button: {
      primaryColor: '#ffffff',
      primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
    Table: {
      headerBg: '#fafafa',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      rowHoverBg: '#f5f5f5',
    },
  },
}

// 橙色主题 - 白色打底 + 橙色核心
export const orangeTheme: ThemeConfig = {
  token: {
    // 主色调：橙色
    colorPrimary: '#ff6b35',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#ff6b35',
    
    // 字体
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    // 边框
    borderRadius: 4,
    
    // 背景色
    colorBgContainer: '#ffffff',
    colorBgLayout: '#fff7f0',
    colorBgElevated: '#ffffff',
    
    // 文字颜色
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    
    // 边框颜色
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    
    // 链接颜色
    colorLink: '#ff6b35',
    colorLinkHover: '#ff8c5a',
    colorLinkActive: '#d9551c',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      siderBg: '#ffffff',
      bodyBg: '#fff7f0',
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: 'rgba(0, 0, 0, 0.88)',
      itemHoverBg: '#fff3eb',
      itemHoverColor: '#ff6b35',
      itemSelectedBg: '#ffe8db',
      itemSelectedColor: '#ff6b35',
      itemActiveBg: '#ffe8db',
    },
    Button: {
      primaryColor: '#ffffff',
      primaryShadow: '0 2px 0 rgba(255, 107, 53, 0.1)',
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
    Table: {
      headerBg: '#fff3eb',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      rowHoverBg: '#fff7f0',
    },
  },
}

// 紫色主题 - 白色打底 + 紫色核心
export const purpleTheme: ThemeConfig = {
  token: {
    // 主色调：紫色
    colorPrimary: '#722ed1',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#722ed1',
    
    // 字体
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    // 边框
    borderRadius: 4,
    
    // 背景色
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f9f0ff',
    colorBgElevated: '#ffffff',
    
    // 文字颜色
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    
    // 边框颜色
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    
    // 链接颜色
    colorLink: '#722ed1',
    colorLinkHover: '#9254de',
    colorLinkActive: '#531dab',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      siderBg: '#ffffff',
      bodyBg: '#f9f0ff',
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: 'rgba(0, 0, 0, 0.88)',
      itemHoverBg: '#f5e8ff',
      itemHoverColor: '#722ed1',
      itemSelectedBg: '#efdbff',
      itemSelectedColor: '#722ed1',
      itemActiveBg: '#efdbff',
    },
    Button: {
      primaryColor: '#ffffff',
      primaryShadow: '0 2px 0 rgba(114, 46, 209, 0.1)',
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
    Table: {
      headerBg: '#f5e8ff',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      rowHoverBg: '#f9f0ff',
    },
  },
}

// 导出默认主题（青蓝色）
export const theme = blueTheme

// 导出所有主题
export { blueTheme as lightTheme, blueTheme as defaultTheme }
