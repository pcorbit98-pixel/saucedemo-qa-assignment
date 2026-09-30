const { Builder, By, until } = require('selenium-webdriver');

async function testCart() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.id('user-name'))
      .sendKeys('standard_user');

    await driver.findElement(By.id('password'))
      .sendKeys('secret_sauce');

    await driver.findElement(By.id('login-button')).click();

    await driver.wait(
      until.elementLocated(By.className('inventory_list')),
      10000
    );

    // Add the first product to the cart.
    await driver.findElement(
      By.css('.inventory_item button')
    ).click();

    // Open the cart and check that an item is present.
    await driver.findElement(By.className('shopping_cart_link')).click();

    const items = await driver.findElements(
      By.className('cart_item')
    );

    if (items.length !== 1) {
      throw new Error('Expected one product in the cart');
    }

    console.log('Cart test passed');
  } finally {
    await driver.quit();
  }
}

testCart().catch(console.error);