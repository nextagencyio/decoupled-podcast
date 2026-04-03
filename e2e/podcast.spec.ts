import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero and episode listings', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1, h2').first()).toBeVisible()
    await expect(page.getByText('Latest Episode', { exact: false }).first()).toBeVisible()
  })

  test('has working navigation to episodes', async ({ page }) => {
    await page.goto('/')
    const episodesLink = page.getByRole('link', { name: /episodes/i }).first()
    await expect(episodesLink).toBeVisible()
    await episodesLink.click()
    await expect(page).toHaveURL('/episodes')
  })
})

test.describe('Episodes Page', () => {
  test('displays episodes from Drupal', async ({ page }) => {
    await page.goto('/episodes')
    await expect(page.getByText('All Episodes').first()).toBeVisible()
    await expect(page.getByText('The Future of Remote Work Culture').first()).toBeVisible()
  })

  test('episode cards link to detail pages', async ({ page }) => {
    await page.goto('/episodes')
    const firstEpisode = page.getByText('AI Ethics: Drawing the Line').first()
    await expect(firstEpisode).toBeVisible()
    await firstEpisode.click()
    await expect(page).toHaveURL(/\/episodes\/ai-ethics/)
  })
})

test.describe('Episode Detail Page', () => {
  test('displays episode content', async ({ page }) => {
    await page.goto('/episodes/ai-ethics-drawing-the-line')
    await expect(page.getByText('AI Ethics: Drawing the Line').first()).toBeVisible()
    await expect(page.getByText('Back to all episodes').first()).toBeVisible()
  })
})

test.describe('Hosts Page', () => {
  test('displays hosts from Drupal', async ({ page }) => {
    await page.goto('/hosts')
    await expect(page.getByText('Meet the Hosts').first()).toBeVisible()
    await expect(page.getByText('Alex Rivera').first()).toBeVisible()
    await expect(page.getByText('Maya Patel').first()).toBeVisible()
  })
})

test.describe('Host Detail Page', () => {
  test('displays host content', async ({ page }) => {
    await page.goto('/hosts/alex-rivera')
    await expect(page.getByText('Alex Rivera').first()).toBeVisible()
    await expect(page.getByText('Back to all hosts').first()).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('header is present on all pages', async ({ page }) => {
    for (const path of ['/', '/episodes', '/hosts']) {
      await page.goto(path)
      await expect(page.locator('header, nav').first()).toBeVisible()
    }
  })
})
