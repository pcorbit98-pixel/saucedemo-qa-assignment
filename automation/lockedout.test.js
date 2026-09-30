const { Builder, By } = require('selenium-webdriver');
const assert = require('node:assert/strict');

describe('SauceDemo Locked-Out User', function () {
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

  it('should display an error for a locked-out user', async function () {
    await driver.get('https://www.saucedemo.com/');

    await driver.findElement(By.id('user-name'))
      .sendKeys('locked_out_user');

    await driver.findElement(By.id('password'))
      .sendKeys('secret_sauce');

    await driver.findElement(By.id('login-button')).click();

    const errorMessage = await driver.findElement(
      By.css('[data-test="error"]')
    ).getText();

    assert.equal(
      errorMessage,
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});