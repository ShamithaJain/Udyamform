const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  try {
    await page.goto('https://udyamregistration.gov.in/UdyamRegistration.aspx', { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait a bit for dynamic fields to load
    await new Promise(r => setTimeout(r, 5000));

    const steps = await page.evaluate(() => {
      const form = document.querySelector('#aspnetForm') || document.body;
      const getLabelText = (input) => document.querySelector(`label[for="${input.id}"]`)?.innerText.trim() || input.name || input.id || '';
      const inputs = Array.from(form.querySelectorAll('input, select, textarea'));

      return [
        {
          title: 'Step 1: Aadhaar & PAN',
          fields: inputs.slice(0, 5).map(f => ({
            id: f.id || f.name,
            name: f.name,
            label: getLabelText(f),
            type: f.type || 'text',
            placeholder: f.placeholder || '',
            required: f.required || false,
            pattern: '',
            error: ''
          }))
        },
        {
          title: 'Step 2: Enterprise Details',
          fields: inputs.slice(5).map(f => ({
            id: f.id || f.name,
            name: f.name,
            label: getLabelText(f),
            type: f.type || 'text',
            placeholder: f.placeholder || '',
            required: f.required || false,
            pattern: '',
            error: ''
          }))
        }
      ];
    });

    fs.writeFileSync('src/schemas/udyam.json', JSON.stringify({ steps }, null, 2));
    console.log('✅ udyam.json created!');

  } catch (err) {
    console.error('Error scraping form:', err.message);
  } finally {
    await browser.close();
  }
})();
