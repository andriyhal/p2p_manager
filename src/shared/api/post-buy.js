import dotenv from 'dotenv';
import axios from 'axios';

// ---

dotenv.config();

const API_URL = 'https://api.binance.com/api/v3';
const API_KEY = process.env.API_KEY; 
const API_SECRET = process.env.API_SECRET; 


const symbol = 'BTCUSDT'; 
const side = 'BUY'; 
const quantity = 0.001;
const price = 60000;


const timestamp = Date.now();
const queryString = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price}&timestamp=${timestamp}`;
const signature = crypto.createHmac('sha256', API_SECRET).update(queryString).digest('hex');


const options = {
  method: 'POST',
  url: API_URL + '/order',
  headers: {
    'X-MBX-APIKEY': API_KEY
  },
  params: {
    symbol: symbol,
    side: side,
    type: 'LIMIT',
    timeInForce: 'GTC',
    quantity: quantity,
    price: price,
    timestamp: timestamp,
    signature: signature
  }
};

axios(options)
  .then(response => {
    console.log('Запрос на покупку успешно выполнен:', response.data);
  })
  .catch(error => {
    console.error('Ошибка выполнения запроса на покупку:', error.response.data);
  });
