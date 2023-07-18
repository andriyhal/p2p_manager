const API_URL = 'https://api.binance.com/api/v3';
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

async function getCurrentPrice(symbol) {
  try {
    const response = await fetch(`${API_URL}/ticker/price?symbol=${symbol}`);
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error('Помилка при отриманні ціни:', error);
  }
}

async function buy(symbol, quantity) {

  console.log(`Виконано покупку ${quantity} ${symbol}`);
}

async function sell(symbol, quantity) {

  console.log(`Виконано продаж ${quantity} ${symbol}`);
}

async function monitorPrice(symbol, buyPrice, sellPrice) {
  const currentPrice = await getCurrentPrice(symbol);

  if (currentPrice < buyPrice) {
   
    await buy(symbol, 1); 
  } else if (currentPrice > sellPrice) {
    
    await sell(symbol, 1); 
  } else {
    console.log('Ціна не відповідає умовам для покупки або продажу');
  }
}

const symbol = 'BTCUSDT';
const buyPrice = 27170;
const sellPrice = 27150;

export default () => {
    monitorPrice(symbol, buyPrice, sellPrice);
};