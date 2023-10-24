import { Tasks } from "../data/tasks_info";
import { editPrice } from "../edit_price";

const fetchTradersOrders = async (requestData) => {
  try {
    const apiUrl =
      "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error: ", error.message);
    throw error;
  }
};

const convertStringToNumber = (str) => {
  let cleanedStr = str.replace(/,/g, "");

  cleanedStr = cleanedStr.replace(".", ",");
  cleanedStr = cleanedStr.replace(",", ".");

  return parseFloat(cleanedStr);
};

let pages = {};

export const scanP2pOrders = async () => {
  if (!Tasks.getStatusUpdatePrice()) {
    const { priceLimit, beatBy, id, action, pair, p2pPrice, banks } =
      Tasks.getNextTask();

    if (!pages[pair.asset]) {
      pages[pair.asset] = 1;
    }

    const requestData = {
      fiat: pair.fiat,
      page: pages[pair.asset],
      rows: 10,
      tradeType: action,
      asset: pair.asset,
      countries: [],
      payTypes: banks,
      proMerchantAds: false,
      shieldMerchantAds: false,
      publisherType: null, //"merchant" or null
    };
    await new Promise((res) => setTimeout(res, 1500));

    const { data: orders } = await fetchTradersOrders(requestData);

    if (!orders.length) {
      pages[pair.asset] = 1;
    } else {
      pages[pair.asset]++;
    }

    const [existingOrder] = [...orders].filter(
      (order, index) => order.adv.advNo === id && index === 0
    );

    if (!existingOrder) {
      while (orders.length) {
        const order = orders.shift();

        const orderPrice = convertStringToNumber(order.adv.price);
        const tradeType = order.adv.tradeType;
        const newPrice =
          tradeType === "SELL" ? orderPrice - beatBy : orderPrice + beatBy;

        console.log(pair.asset, pages[pair.asset]);

        if (
          (tradeType === "SELL" &&
            p2pPrice > newPrice &&
            newPrice > priceLimit) ||
          (tradeType === "BUY" && p2pPrice < newPrice && newPrice < priceLimit)
        ) {
          Tasks.setStatusUpdatePrice(true);

          pages[pair.asset] = 1;

          console.log(
            `Amount: ${p2pPrice} Price limit: ${priceLimit} New price: ${newPrice}`
          );

          editPrice(id, newPrice, "EDIT_PRICE");

          break;
        }
      }
    }
  }
};
