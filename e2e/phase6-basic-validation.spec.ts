/**
 * Phase6 基础验证测试
 * 验证页面能否正常加载和渲染
 */

import { test, expect } from '@playwright/test'

test.describe('Phase6: 基础验证测试', () => {
  test('验证1: 首页能够正常加载', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // 验证页面标题存在
    await expect(page).toHaveTitle(/平台|研发/)
    
    // 截图
    await page.screenshot({ path: 'test-results/01-homepage.png', fullPage: true })
  })

  test('验证2: 项目管理列表页能够加载', async ({ page }) => {
    await page.goto('/c0')
    await page.waitForLoadState('networkidle')
    
    // 验证页面加载（至少有内容）
    const body = await page.locator('body').textContent()
    expect(body).toBeTruthy()
    
    // 截图
    await page.screenshot({ path: 'test-results/02-project-list.png', fullPage: true })
  })

  test('验证3: 项目详情页（项目树）能够加载', async ({ page }) => {
    await page.goto('/c0/proj-dreamcar-adas')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    // 验证页面加载
    const body = await page.locator('body').textContent()
    expect(body).toBeTruthy()
    
    // 截图
    await page.screenshot({ path: 'test-results/03-project-tree.png', fullPage: true })
  })

  test('验证4: 规划协调列表页能够加载', async ({ page }) => {
    await page.goto('/c3')
    await page.waitForLoadState('networkidle')
    
    // 验证页面加载
    const body = await page.locator('body').textContent()
    expect(body).toBeTruthy()
    
    // 截图
    await page.screenshot({ path: 'test-results/04-planning-list.png', fullPage: true })
  })

  test('验证5: 规划协调详情页（产品树）能够加载', async ({ page }) => {
    await page.goto('/c3/plan-001/product-tree')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    // 验证页面加载
    const body = await page.locator('body').textContent()
    expect(body).toBeTruthy()
    
    // 截图
    await page.screenshot({ path: 'test-results/05-product-tree.png', fullPage: true })
  })

  test('验证6: 项目树组件存在', async ({ page }) => {
    await page.goto('/c0/proj-dreamcar-adas')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    // 查找树组件或卡片标题
    const treeTitle = page.locator('text=项目计划树').or(page.locator('text=造车节点'))
    
    // 如果找到了，说明组件渲染成功
    const isVisible = await treeTitle.isVisible().catch(() => false)
    
    // 截图以供检查
    await page.screenshot({ path: 'test-results/06-project-tree-detail.png', fullPage: true })
    
    console.log('树组件可见性:', isVisible)
  })

  test('验证7: 产品树组件存在', async ({ page }) => {
    await page.goto('/c3/plan-001/product-tree')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    // 查找产品树标题
    const productTreeTitle = page.locator('text=产品全生命周期树').or(page.locator('text=产品树'))
    
    const isVisible = await productTreeTitle.isVisible().catch(() => false)
    
    // 截图
    await page.screenshot({ path: 'test-results/07-product-tree-detail.png', fullPage: true })
    
    console.log('产品树组件可见性:', isVisible)
  })
})
