const { strict: assert } = require('assert');
const { convertToHexValue, withFixtures } = require('../helpers');

describe('Custom network', function () {
  const chainID = 43114;
  const networkURL = 'https://avalanche-mainnet.infura.io';
  const networkNAME = 'Avalanche Network C-Chain';
  const currencySYMBOL = 'AVAX';
  const blockExplorerURL = 'https://snowtrace.io/';
  const ganacheOptions = {
    accounts: [
      {
        secretKey:
          '0x7C9529A67102755B7E6102D6D950AC5D5863C98713805CEC576B945B15B71EAC',
        balance: convertToHexValue(25000000000000000000),
      },
    ],
  };
  it('add custom network and switch the network', async function () {
    await withFixtures(
      {
        fixtures: 'imported-account',
        ganacheOptions,
        title: this.test.title,
      },
      async ({ driver }) => {
        await driver.navigate();
        await driver.fill('#password', 'correct horse battery staple');
        await driver.press('#password', driver.Key.ENTER);

        await driver.clickElement('.account-menu__icon');
        await driver.clickElement({ tag: 'div', text: 'Settings' });

        // enables custom network list
        await driver.clickElement({ tag: 'div', text: 'Experimental' });
        const toggleList = await driver.findElements('.toggle-button');
        toggleList[1].click();

        // added delay since it needs more time to load that custom network switch is on
        await driver.delay(500);
        await driver.clickElement('.network-display');
        await driver.clickElement({ tag: 'button', text: 'Add network' });

        await driver.waitForSelector({
          tag: 'button',
          text: 'Add',
        });

        await driver.clickElement({
          tag: 'button',
          text: 'Add',
        });

        // verify network details
        const title = await driver.findElement({
          tag: 'h6',
          text: 'Avalanche Network C-Chain',
        });
        assert.equal(
          await title.getText(),
          'Avalanche Network C-Chain',
          'Title of popup should be selected network',
        );

        const [networkName, networkUrl, chainIdElement, currencySymbol] =
          await driver.findElements('.definition-list dd');

        assert.equal(
          await networkName.getText(),
          networkNAME,
          'Network name is not correct displayed',
        );
        assert.equal(
          await networkUrl.getText(),
          networkURL,
          'Network Url is not correct displayed',
        );
        assert.equal(
          await chainIdElement.getText(),
          chainID.toString(),
          'Chain Id is not correct displayed',
        );
        assert.equal(
          await currencySymbol.getText(),
          currencySYMBOL,
          'Currency symbol is not correct displayed',
        );

        await driver.clickElement({ tag: 'a', text: 'View all details' });

        const networkDetailsLabels = await driver.findElements('dd');
        assert.equal(
          await networkDetailsLabels[8].getText(),
          blockExplorerURL,
          'Block Explorer URL is not correct',
        );

        await driver.clickElement({ tag: 'button', text: 'Close' });
        await driver.clickElement({ tag: 'button', text: 'Approve' });

        await driver.clickElement({
          tag: 'h6',
          text: 'Switch to Avalanche Network C-Chain',
        });

        await driver.clickElement({
          tag: 'button',
          text: 'Got it',
        });

        // verify network switched
        const networkDisplayed = await driver.findElement({
          tag: 'h6',
          text: 'Avalanche Network C-Chain',
        });
        assert.equal(
          await networkDisplayed.getText(),
          'Avalanche Network C-Chain',
          'You have not switched to Arbitrum Network',
        );
      },
    );
  });

  it('add custom network and not switch the network', async function () {
    await withFixtures(
      {
        fixtures: 'imported-account',
        ganacheOptions,
        title: this.test.title,
      },
      async ({ driver }) => {
        await driver.navigate();
        await driver.fill('#password', 'correct horse battery staple');
        await driver.press('#password', driver.Key.ENTER);

        await driver.clickElement('.account-menu__icon');
        await driver.clickElement({ tag: 'div', text: 'Settings' });

        // enables custom network list
        await driver.clickElement({ tag: 'div', text: 'Experimental' });
        const toggleList = await driver.findElements('.toggle-button');
        toggleList[1].click();

        // added delay since it needs more time to load that custom network switch is on
        await driver.delay(500);
        await driver.clickElement('.network-display');
        await driver.clickElement({ tag: 'button', text: 'Add network' });

        await driver.waitForSelector({
          tag: 'button',
          text: 'Add',
        });
        await driver.clickElement({
          tag: 'button',
          text: 'Add',
        });

        await driver.clickElement({ tag: 'button', text: 'Approve' });

        await driver.clickElement({
          tag: 'h6',
          text: 'Dismiss',
        });

        // verify if added network is in list of networks
        const networkDisplay = await driver.findElement('.network-display');
        await networkDisplay.click();

        const arbitrumOne = await driver.findElements({
          text: `Arbitrum One`,
          tag: 'h6',
        });
        assert.ok(arbitrumOne.length, 1);
      },
    );
  });
});
