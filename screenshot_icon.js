const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/src/assets/icon.png');

    // Create directory if it doesn't exist
    const fs = require('fs');
    if (!fs.existsSync('/home/jules/verification/screenshots')) {
        fs.mkdirSync('/home/jules/verification/screenshots', { recursive: true });
    }

    await page.screenshot({ path: '/home/jules/verification/screenshots/verification2.png' });

    await browser.close();
})();
