import core from './services.js';

// Program starts

let carrots = 10000

let data = await core.getApiData();

await core.printBestCarrotProfit(
    await core.getEnchantedGoldenCarrotPrice(data,carrots),
    await core.getEnchantedCarrotPrice(data,carrots));