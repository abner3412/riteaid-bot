const puppeteer = require('puppeteer');
require('dotenv').config();
//let href = "https://www.riteaid.com/shop/viactiv-calcium-plus-d-soft-chews-milk-chocolate-100-chews-0343777";
(async () => {
  const browser = await puppeteer.launch({headless:false, args: [`--window-size=1920,1080`] //userDataDir:'/Users/josephjimenez/Library/Application Support/Google/Chrome'});
});
  const page = await browser.newPage();
  await page.goto('https://www.riteaid.com/signup-signin#login');
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  })
  //logs in to riteaid site
  
  await page.type('#login-email', process.env.email);
  await page.type('#login-password', process.env.password);
  await page.click('#login-submit-button');
  await page.waitForNavigation();
  await page.goto('https://www.riteaid.com/shop/viactiv-calcium-plus-d-soft-chews-caramel-100-chews-0343778');
  await page.click('#product-addtocart-button');
  await page.goto('https://www.riteaid.com/shop//viactiv-calcium-plus-d-soft-chews-milk-chocolate-100-chews-0343777');
  await page.click('#product-addtocart-button');
  await page.goto('https://www.riteaid.com/shop/checkout/cart/#cart');
  //await page.type('#cart-68367616-qty', '10');
  //await page.type('#cart-68367622-qty', '10');
  await page.$eval('input[data-cart-item-id="0343778"]', el => el.value = '10');
  await page.$eval('input[data-cart-item-id="0343777"]', el => el.value = '10');
  await page.waitForNavigation();
  /*await page.goto('https://www.riteaid.com/shop/sales/order/history/');
  await page.click('a[data-post="{"action":"https:\/\/www.riteaid.com\/shop\/sales\/order\/reorder\/order_id\/8444008\/","data":{"uenc":"aHR0cHM6Ly93d3cucml0ZWFpZC5jb20vc2hvcC9zYWxlcy9vcmRlci9oaXN0b3J5Lw,,"}}"]');*/
  await page.click('button[data-role="proceed-to-checkout"]');
  await page.waitForNavigation();
  //await page.click('button[type="submit"]');
  await page.goto('https://www.riteaid.com/shop/checkout/#payment')
  await page.waitForNavigation();
  await page.click('button[id="submit-order"]');
})();