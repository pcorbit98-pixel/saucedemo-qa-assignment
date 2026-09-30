const { Builder, By } = require('selenium-webdriver');
const assert = require('node:assert/strict');

describe('SauceDemo Login', function () {
  this.timeout(60000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should log in with valid credentials', async function () {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.id('user-name'))
      .sendKeys('standard_user');

    await driver.findElement(By.id('password'))
      .sendKeys('secret_sauce');

    await driver.findElement(By.id('login-button')).click();

    const heading = await driver.findElement(
      By.css('.title')
    ).getText();

    assert.equal(heading, 'Products');
  });
});