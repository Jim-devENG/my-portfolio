const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const projects = [
  { id: '1', url: 'https://crysgarage.studio', name: 'crysgarage' },
  { id: '5', url: 'https://webifant.com', name: 'webifant' },
  { id: '7', url: 'https://trumpet.ink', name: 'trumpet' },
  { id: '8', url: 'https://ispora.com', name: 'ispora' },
  { id: '9', url: 'https://aicounselng.com', name: 'aicounseling' },
  { id: '10', url: 'https://snaxyzobolicious.com', name: 'snaxyzobolicious' },
];

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const publicDir = path.join(__dirname, '..', 'public', 'project-screenshots');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const project of projects) {
    try {
      console.log(`Taking screenshot of ${project.url}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(project.url, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });
      
      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const screenshotPath = path.join(publicDir, `${project.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      
      await page.close();
      console.log(`✓ Screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`✗ Failed to screenshot ${project.url}:`, error.message);
    }
  }

  await browser.close();
  console.log('All screenshots completed!');
}

takeScreenshots().catch(console.error);

