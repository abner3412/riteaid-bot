const puppeteer = require('puppeteer');
require('dotenv').config();
(async () => {
  const browser = await puppeteer.launch({headless:false, args: [`--window-size=1920,1080`] 
});
  const page = await browser.newPage();
  await page.goto('https://www.riteaid.com/signup-signin#login');
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  })
  let timesCheckedOut = 0;
  let timesToCheckout = parseInt(process.env.timestocheckout);
  let oneSku = process.env.productonelink.slice(-7);
  let twoSku = process.env.producttwolink.slice(-7);
  //logs in to riteaid site
  await page.type('#login-email', process.env.email);
  await page.type('#login-password', process.env.password);
  await page.click('#login-submit-button');
  await page.waitForNavigation();
  //loops until timesCheckedout = timesToCheckout
  while (timesCheckedOut !== timesToCheckout) {
    //goes to product pages and adds them to cart
  await page.waitForTimeout(8000)
  await page.goto(process.env.productonelink);
  await page.waitForTimeout(3000)
  await page.click('#product-addtocart-button');
  await page.waitForTimeout(3000)
  await page.goto(process.env.producttwolink);
  await page.waitForTimeout(8000)
  await page.click('#product-addtocart-button');
  await page.waitForTimeout(3000)
  await page.goto('https://www.riteaid.com/shop/checkout/cart/#cart');
  await page.waitForTimeout(1000)
  //changes quantity of products in cart
  const inputOne = await page.$(`input[data-cart-item-id="${oneSku}"]`);
  inputOne.click({ clickCount: 3 });
  await page.waitForTimeout(1000)
  page.keyboard.press('Backspace');
  inputOne.type("10");
  await page.waitForTimeout(2000)
  const inputTwo = await page.$(`input[data-cart-item-id="${twoSku}"]`);
  inputTwo.click({ clickCount: 3 })
  await page.waitForTimeout(1000)
  page.keyboard.press('Backspace');
  inputTwo.type("10");
  await page.waitForTimeout(2000)
  page.keyboard.press('Enter');
  await page.waitForTimeout(8000)
  //goes to checkout page
  await page.goto('https://www.riteaid.com/shop/checkout/#shipping')
  await page.waitForTimeout(5000)
  //clicks continue checkout button
  await page.$eval('button[data-role="opc-continue"]', button => button.click());
  await page.waitForTimeout(8000)
  //click submit order button
  await page.$eval('button[id="submit-order"]', button => button.click());
  await page.waitForTimeout(15000)
  //adds 1 to timesCheckedOut and console logs the checkouts remaining
  timesCheckedOut++;
  console.log(`Checkouts remaining ${timesToCheckout-timesCheckedOut}`);
  }

})();
