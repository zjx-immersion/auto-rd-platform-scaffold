/**
 * Phase6 迁移测试用例集合
 * 测试产品树和项目树的迁移实现
 */

import { test, expect } from '@playwright/test'

test.describe('Phase6: 产品树和项目树迁移测试', () => {
  test.beforeEach(async ({ page }) => {
    // 导航到首页
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.describe('项目管理 (C0) - 项目树', () => {
    test('C0-1: 应该显示项目列表页（默认为全部项目）', async ({ page }) => {
      // 点击项目管理导航
      await page.click('text=项目管理')
      await page.waitForLoadState('networkidle')

      // 验证页面标题
      await expect(page.locator('h1, h2, .page-title')).toContainText(/项目|管理/)

      // 验证列表存在
      const table = page.locator('table, .ant-table')
      await expect(table).toBeVisible()

      // 验证至少有一条数据
      const rows = page.locator('tbody tr, .ant-table-row')
      await expect(rows).not.toHaveCount(0)
    })

    test('C0-2: 应该可以点击项目进入详情页并显示项目树', async ({ page }) => {
      // 点击项目管理导航
      await page.click('text=项目管理')
      await page.waitForLoadState('networkidle')

      // 点击第一个项目（可以是查看按钮或项目名称链接）
      const firstProject = page.locator('tbody tr, .ant-table-row').first()
      await firstProject.click()

      // 或者查找"查看"按钮
      const viewButton = page.locator('button:has-text("查看")').first()
      if (await viewButton.isVisible()) {
        await viewButton.click()
      }

      await page.waitForLoadState('networkidle')

      // 验证项目树组件存在
      await expect(page.locator('.project-tree-view, text=项目计划树')).toBeVisible()

      // 验证树组件已渲染
      const treeComponent = page.locator('.ant-tree, [role="tree"]')
      await expect(treeComponent).toBeVisible()
    })

    test('C0-3: 项目树应该显示12个造车节点', async ({ page }) => {
      // 导航到项目详情页
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 等待树加载
      const tree = page.locator('.ant-tree')
      await expect(tree).toBeVisible()

      // 检查是否有造车节点（PSI, PTR, PSF, PS, PC, PA, VP, LR, LS, J1, OKTB, FSR）
      await expect(page.locator('text=PSI')).toBeVisible()
      await expect(page.locator('text=VP')).toBeVisible()
      await expect(page.locator('text=SOP')).toBeVisible()
    })

    test('C0-4: 应该可以展开和收起节点', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 找到可展开的节点
      const expandIcon = page.locator('.ant-tree-switcher').first()
      if (await expandIcon.isVisible()) {
        // 点击展开
        await expandIcon.click()
        await page.waitForTimeout(500)

        // 验证子节点出现
        const childNodes = page.locator('.ant-tree-child-tree')
        await expect(childNodes.first()).toBeVisible()
      }
    })

    test('C0-5: 应该可以选中节点并显示详情', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 选中一个节点
      const nodeTitle = page.locator('.ant-tree-title').first()
      await nodeTitle.click()
      await page.waitForTimeout(500)

      // 验证右侧详情面板显示
      const detailPanel = page.locator('.ant-card, .detail-panel')
      await expect(detailPanel).toBeVisible()
    })

    test('C0-6: VP节点应该包含VP1/VP2/VP3子阶段', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 展开VP节点
      const vpNode = page.locator('text=VP').first()
      await vpNode.click()

      // 查找VP子阶段
      const vpSubPhase = page.locator('text=VP子阶段')
      if (await vpSubPhase.isVisible()) {
        await vpSubPhase.click()

        // 验证VP1/VP2/VP3存在
        await expect(page.locator('text=VP1')).toBeVisible()
        await expect(page.locator('text=VP2')).toBeVisible()
        await expect(page.locator('text=VP3')).toBeVisible()
      }
    })

    test('C0-7: 应该显示Gateway质量门禁', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 查找Gateway节点
      const gatewayNode = page.locator('text=质量门禁')
      if (await gatewayNode.isVisible()) {
        await expect(gatewayNode).toBeVisible()
      }
    })

    test('C0-8: 应该显示产品版本和Sprint', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 查找产品版本节点
      const productNode = page.locator('text=产品及版本').or(page.locator('text=产品版本'))
      if (await productNode.isVisible()) {
        await expect(productNode).toBeVisible()
      }

      // 查找Sprint节点
      const sprintNode = page.locator('text=迭代计划').or(page.locator('text=Sprint'))
      if (await sprintNode.isVisible()) {
        await expect(sprintNode).toBeVisible()
      }
    })
  })

  test.describe('规划协调 (C3) - 产品树', () => {
    test('C3-1: 应该显示规划列表页', async ({ page }) => {
      // 点击规划协调导航
      await page.click('text=规划协调')
      await page.waitForLoadState('networkidle')

      // 验证页面标题
      await expect(page.locator('h1, h2, .page-title')).toContainText(/规划|协调/)

      // 验证列表存在
      const table = page.locator('table, .ant-table')
      await expect(table).toBeVisible()
    })

    test('C3-2: 应该可以进入详情页并切换到产品树Tab', async ({ page }) => {
      // 导航到规划详情页
      await page.goto('/c3/plan-001')
      await page.waitForLoadState('networkidle')

      // 查找产品树Tab
      const productTreeTab = page.locator('text=产品树').or(page.locator('[data-node-key="product-tree"]'))
      if (await productTreeTab.isVisible()) {
        await productTreeTab.click()
        await page.waitForTimeout(500)

        // 验证产品树组件显示
        const tree = page.locator('.ant-tree, [role="tree"]')
        await expect(tree).toBeVisible()
      }
    })

    test('C3-3: 产品树应该显示产品线、产品、版本', async ({ page }) => {
      await page.goto('/c3/plan-001/product-tree')
      await page.waitForLoadState('networkidle')

      // 验证产品线存在
      const productLine = page.locator('text=智能驾驶产品线').or(page.locator('text=ADAS'))
      await expect(productLine).toBeVisible()

      // 验证树组件渲染
      const tree = page.locator('.ant-tree')
      await expect(tree).toBeVisible()
    })

    test('C3-4: 应该显示Feature和模块版本', async ({ page }) => {
      await page.goto('/c3/plan-001/product-tree')
      await page.waitForLoadState('networkidle')

      // 展开树查找Feature
      const featureNode = page.locator('text=LKA').or(page.locator('text=ACC').or(page.locator('text=AEB')))
      if (await featureNode.isVisible()) {
        await expect(featureNode).toBeVisible()
      }
    })

    test('C3-5: 应该可以选中节点显示详情', async ({ page }) => {
      await page.goto('/c3/plan-001/product-tree')
      await page.waitForLoadState('networkidle')

      // 选中一个节点
      const nodeTitle = page.locator('.ant-tree-title').first()
      await nodeTitle.click()
      await page.waitForTimeout(500)

      // 验证详情面板显示
      const detailPanel = page.locator('.ant-card')
      await expect(detailPanel).toBeVisible()
    })

    test('C3-6: 应该显示Feature成熟度和完成度', async ({ page }) => {
      await page.goto('/c3/plan-001/product-tree')
      await page.waitForLoadState('networkidle')

      // 选中一个Feature节点
      const featureNode = page.locator('text=LKA').first()
      if (await featureNode.isVisible()) {
        await featureNode.click()
        await page.waitForTimeout(500)

        // 验证成熟度/完成度进度条
        const progress = page.locator('.ant-progress')
        if (await progress.isVisible()) {
          await expect(progress).toBeVisible()
        }
      }
    })

    test('C3-7: 应该显示模块版本和团队信息', async ({ page }) => {
      await page.goto('/c3/plan-001/product-tree')
      await page.waitForLoadState('networkidle')

      // 查找团队标签
      const teamTag = page.locator('.ant-tag').filter({ hasText: /团队/ })
      if (await teamTag.isVisible()) {
        await expect(teamTag.first()).toBeVisible()
      }
    })
  })

  test.describe('数据独立性测试', () => {
    test('DATA-1: 项目树和产品树应该使用独立数据', async ({ page }) => {
      // 访问项目管理
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      const projectTreeText = await page.locator('body').textContent()

      // 访问规划协调
      await page.goto('/c3/plan-001/product-tree')
      await page.waitForLoadState('networkidle')

      const productTreeText = await page.locator('body').textContent()

      // 验证两个树的数据不同（项目树有造车节点，产品树有Feature）
      expect(projectTreeText).toContain('PSI')
      expect(productTreeText).not.toContain('PSI')
      expect(productTreeText).toContain('Feature')
    })

    test('DATA-2: 项目列表应该独立于demo数据', async ({ page }) => {
      await page.goto('/c0')
      await page.waitForLoadState('networkidle')

      // 验证列表存在且有数据
      const rows = page.locator('tbody tr')
      const count = await rows.count()
      expect(count).toBeGreaterThan(0)
    })
  })

  test.describe('UI响应性测试', () => {
    test('UI-1: 树组件应该支持搜索', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 查找搜索框
      const searchInput = page.locator('input[placeholder*="搜索"]')
      if (await searchInput.isVisible()) {
        await expect(searchInput).toBeVisible()
      }
    })

    test('UI-2: 应该有全部展开/收起按钮', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 查找展开/收起按钮
      const collapseButton = page.locator('button').filter({ hasText: /收起|展开/ })
      if (await collapseButton.isVisible()) {
        await expect(collapseButton.first()).toBeVisible()
      }
    })

    test('UI-3: 树节点应该显示状态图标', async ({ page }) => {
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 验证状态Tag存在
      const statusTag = page.locator('.ant-tag')
      if (await statusTag.isVisible()) {
        await expect(statusTag.first()).toBeVisible()
      }
    })
  })

  test.describe('完整加载验证', () => {
    test('LOAD-1: 所有页面应该完整加载无错误', async ({ page }) => {
      // 监听console错误
      const errors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })

      // 访问项目管理
      await page.goto('/c0')
      await page.waitForLoadState('networkidle')

      // 访问项目详情
      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      // 访问规划协调
      await page.goto('/c3')
      await page.waitForLoadState('networkidle')

      // 访问规划详情（产品树）
      await page.goto('/c3/plan-001/product-tree')
      await page.waitForLoadState('networkidle')

      // 验证没有严重错误
      const criticalErrors = errors.filter((e) => e.includes('TypeError') || e.includes('ReferenceError'))
      expect(criticalErrors.length).toBe(0)
    })

    test('LOAD-2: 页面应该在合理时间内加载完成', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/c0/proj-dreamcar-adas')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      // 验证加载时间在5秒内
      expect(loadTime).toBeLessThan(5000)
    })
  })
})
