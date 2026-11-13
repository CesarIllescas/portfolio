import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('real navigation, projects, CV and assets work without browser errors', async ({ page, request }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1')) errors.push(`${response.status()}: ${response.url()}`); });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Engineer');
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await page.locator('.case-study summary').first().click();
  await expect(page.locator('.case-study').first()).toHaveAttribute('open', '');
  await expect(page.locator('.case-content').first()).toBeVisible();
  await page.locator('.case-study summary').first().click();
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))));
  expect(brokenAnchors).toEqual([]);
  const cv = page.getByRole('link', { name: 'Download CV' });
  const cvResponse = await request.get((await cv.getAttribute('href'))!);
  expect(cvResponse.status()).toBe(200);
  expect(cvResponse.headers()['content-type']).toContain('application/pdf');
  expect((await cvResponse.body()).subarray(0, 4).toString()).toBe('%PDF');
  expect(await page.locator('a[href="#"]').count()).toBe(0);
  expect(await page.locator('form').count()).toBe(0);
  expect(await page.locator('.projects-grid > article').count()).toBe(4);
  await expect(page.getByRole('link', { name: 'View on Apify' })).toHaveAttribute('href', 'https://apify.com/cesarjaks/freshhire-verified-ats-job-changes-api');
  await expect(page.locator('body')).not.toContainText('Startiva');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `artifacts/${testInfo.project.name}-dark-en.png`, fullPage: true, scale: 'css' });
  await page.screenshot({ path: `artifacts/${testInfo.project.name}-viewport-dark-en.png`, scale: 'css' });
  expect(errors).toEqual([]);
});

test('language and theme change in place, persist and remain accessible', async ({ page }, testInfo) => {
  await page.goto('./');
  for (const language of ['en', 'es'] as const) {
    if (language === 'es') await page.getByRole('button', { name: 'Change language to Spanish' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    for (const theme of ['dark', 'light'] as const) {
      if (theme === 'light') await page.getByRole('button', { name: language === 'en' ? 'Switch to light theme' : 'Cambiar a tema claro' }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      expect(results.violations).toEqual([]);
    }
    if (language === 'en') await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  }
  await expect(page.getByRole('heading', { name: 'Soluciones para problemas reales.' })).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-language'))).toBe('es');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('light');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `artifacts/${testInfo.project.name}-light-es.png`, fullPage: true, scale: 'css' });
  await page.screenshot({ path: `artifacts/${testInfo.project.name}-viewport-light-es.png`, scale: 'css' });
});

test('keyboard navigation and mobile menu are usable', async ({ page, isMobile }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  if (isMobile) {
    const button = page.getByRole('button', { name: 'Toggle navigation' });
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('navigation').getByRole('link', { name: 'Experience' }).click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#experience$/);
    await button.click();
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  }
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
