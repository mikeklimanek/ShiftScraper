const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('https://my-rsms.com/login');
  await page.waitForTimeout(5000);
  
  // LOGIN
  require('dotenv').config();
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  await page.type('#userName', username);
  await page.type('#password-label', password);
  await page.click('text=LOGIN');
  await page.waitForTimeout(10000);
  console.info("Logged in!");


  await page.goto('https://my-rsms.com/calendar');
  console.info("On calendar page!");
  await page.waitForTimeout(10000);

  //await page.waitForSelector('root');
  //const element = await page.$('root');
  //if (element !== null) {
   //console.log('Element with selector \'root\' found.');
  //} else {
   //console.log('No element with selector \'root\' found.');
  //}

  const elements = await page.$$eval('h6', elements => elements.map(element => element.innerText));

  console.table(elements);

 fs.writeFileSync('output.txt', JSON.stringify(elements, null, 2));
 await browser.close();
}

run();
