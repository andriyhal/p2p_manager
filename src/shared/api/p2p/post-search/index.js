import axios from "axios";

const URL = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

const postData = {
  fiat: 'UAH',
  page: 1,
  rows: 10,
  tradeType: 'BUY',
  asset: 'USDT',
  countries: [],
  proMerchantAds: false,
  shieldMerchantAds: false,
  publisherType: null,
  payTypes: []
};

const getSearch = async () => {
  try {
    const response = await axios.post(URL, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getSearch;