const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const projects = [
  { id: '11', url: 'https://agent.liquidcanvas.art', name: 'liquidcanvas' },
  { id: '12', url: 'http://cpdemo.blueinctech.com', name: 'cpdemo' },
];

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 120000,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
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
      
      // Set user agent to avoid blocking
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      // Remove webdriver property
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
        });
      });
      
      // Try to bypass blocking by intercepting requests
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        // Allow all requests
        request.continue();
      });
      
      page.on('requestfailed', (request) => {
        // Log but don't fail on blocked requests
        if (request.url() === project.url) {
          console.log(`  Warning: Main request may have been blocked`);
        }
      });
      
      try {
        await page.goto(project.url, { 
          waitUntil: 'networkidle2',
          timeout: 90000 
        });
      } catch (error) {
        // If networkidle2 fails, try with load event
        if (error.message.includes('ERR_BLOCKED_BY_CLIENT') || error.message.includes('timeout')) {
          console.log(`  Retrying with load event...`);
          await page.goto(project.url, { 
            waitUntil: 'load',
            timeout: 60000 
          });
        } else {
          throw error;
        }
      }
      
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

