import { readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { profile } from '../src/data/profile.ts';

const font = (await readFile('public/fonts/manrope-latin.woff2')).toString('base64');
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400 800}
  *{box-sizing:border-box}body{margin:0;background:#101216;color:#eff1f5;font-family:Manrope,sans-serif;padding:62px 76px;width:1200px;height:630px}
  .mark{font-size:40px;letter-spacing:-4px;font-weight:800}.mark span{color:#91b8f9}.label{position:absolute;right:76px;top:84px;font-size:12px;letter-spacing:2px;color:#a3aab8}
  .name{font-size:23px;color:#a3aab8;margin:58px 0 14px}h1{margin:0;font-size:80px;line-height:1.12;letter-spacing:-5px;font-weight:650}h1 span{color:#91b8f9}
  footer{position:absolute;bottom:57px;left:76px;right:76px;border-top:1px solid #2a303a;padding-top:23px;font-size:15px;color:#a3aab8;display:flex;justify-content:space-between}
  </style></head><body><div class="mark">cl<span>.</span></div><div class="label">SELECTED ENGINEERING WORK</div><p class="name">${profile.name}</p><h1>Backend &amp;<br><span>AI Engineer.</span></h1><footer><span>Backend systems. Applied intelligence.</span><span>Python · TypeScript · AI</span></footer></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/og-card.png' });
  console.log('Created public/og-card.png (1200 × 630).');
} finally { await browser.close(); }
