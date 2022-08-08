import axios from 'axios';
import 'dotenv/config'
import chalk from 'chalk';

const apiKey = process.env.API;
const urlBazaar = process.env.URL;

const calcPrices = async (carrots) => {
    const data = await axios({
        method: 'GET',
        url: urlBazaar,
        headers: {'API-Key' : apiKey}
    });
    
    let egc = data.data.products.ENCHANTED_GOLDEN_CARROT;
    let ec = data.data.products.ENCHANTED_CARROT;

    
    const maxEGC = Math.floor(carrots/128);
    const GCARROT = (7*32)*maxEGC;
    const ecr = carrots%128;
    
    const ecProfit = carrots*ec.sell_summary[0].pricePerUnit;
    const egcProfit = maxEGC*egc.sell_summary[0].pricePerUnit - GCARROT + (ecr > 0 ? ecr*ec.sell_summary[0].pricePerUnit:0);
    await printResult(Math.floor(egcProfit),Math.floor(ecProfit));
}

const printResult = async (egc,ec) => {
    if(egc>ec){
        console.log(chalk.green("Enchanted Golden Carrots",egc))
        console.log(chalk.redBright("Enchanted Carrots",ec))
        console.log(chalk.green("Profit",egc-ec))
    }else{
        console.log(chalk.green("Enchanted Carrots",ec))
        console.log(chalk.redBright("Enchanted Golden Carrots",egc))
        console.log(chalk.green("Profit",ec-egc))
    }
}

await calcPrices(20000)





