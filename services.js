import axios from 'axios';
import 'dotenv/config'
import chalk from 'chalk';

const getApiData = async () => {
    const apiKey = process.env.API;
    const urlBazaar = process.env.URL;
    const data = await axios({
        method: 'GET',
        url: urlBazaar,
        headers: {'API-Key' : apiKey}
    });
    return data.data.products;
}

const getEnchantedGoldenCarrotPrice = async (data,carrots) => 
    Math.floor(carrots/128)*
    data.ENCHANTED_GOLDEN_CARROT.sell_summary[0].pricePerUnit - 
    (Math.floor(carrots/128)*7*32) +
    ((carrots%128)*data.ENCHANTED_CARROT.sell_summary[0].pricePerUnit);

const getEnchantedCarrotPrice = async (data,carrots) =>
    carrots*data.ENCHANTED_CARROT.sell_summary[0].pricePerUnit;

const printBestCarrotProfit = async (first,second) =>
    first > second + 50000 ? 
    console.log(chalk.green("Enchanted Golden Carrot",Math.round(first)))
     : 
    console.log(chalk.green("Enchanted Carrot",Math.round(second)));


export default{
    getApiData,
    getEnchantedCarrotPrice,
    getEnchantedGoldenCarrotPrice,
    printBestCarrotProfit
}