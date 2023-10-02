import { fetchTradersOrders } from "../shared/api";
import { getNextTask } from "../shared/lib/get-next-task";

export const scanP2pOrders = async () => {
  try {
    const task = await getNextTask();
    
    if (!task) return;

    const { priceLimit, beatBy, id, action, pair, banks } = task;
    const requestData = {
      fiat: pair.fiat,
      page: 1,
      rows: 10,
      tradeType: action === 'SELL' ? 'SELL' : 'BUY',
      asset: pair.asset,
      countries: [],
      payTypes: banks,
      proMerchantAds: false,
      shieldMerchantAds: false,
      publisherType: null
    };

    const response = await fetchTradersOrders(requestData);
    const orders = response.data;

    const topOrder = orders.find(order => order.adv.advNo !== id);
    
    if (!topOrder) {
      console.log('No orders to compete with or all orders belong to the user');
      return;
    }

    let newPrice;
    if (action === 'SELL') {
      newPrice = parseFloat(topOrder.adv.price) - beatBy;
    console.log({newPrice});

      if (newPrice > priceLimit) {
        
        console.log(`Setting new price for SELL: ${newPrice}`);
      }
    } else {
      newPrice = parseFloat(topOrder.adv.price) + beatBy;
      if (newPrice < priceLimit) {
        
        console.log(`Setting new price for BUY: ${newPrice}`);
      }
    }
  } catch (error) {
    console.error('Error while checking and beating price:', error);
  }
};
