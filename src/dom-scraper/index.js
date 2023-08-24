import { WaitFor } from "../utils/wait-for";

export const getCurrentPath = () => {
    const path = document.location.pathname;
    const matchResult = path.match(/\/(\w+)$/);
  
    if (matchResult) {
      return matchResult[1];
    } else {
      return null;
    }
};

export const getInputEditPrice = async () => {
    while (document.querySelectorAll('input[data-bn-type="input"]').length < 8) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return document.querySelectorAll('input[data-bn-type="input"]')[0];
}

export const getPostButton = async () => {
    while (!document.querySelectorAll('button[data-bn-type="button"]')[5]?.parentElement?.children?.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return document.querySelectorAll('button[data-bn-type="button"]')[5].parentElement.children[1];
}

export const getConfirmToPostButton = async () => {
    while (document.querySelectorAll('button[data-bn-type="button"]')[6]?.parentElement?.children?.length !== 2) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return document.querySelectorAll('button[data-bn-type="button"]')[6]?.parentElement?.children[1];
}

export const getOrderList = async () => {
    const waitFor = new WaitFor(100);
    let isLoaded = true;
    let orders = [];

    const updateOrders = () =>{
        const todoElement = document.querySelectorAll('input[type="checkbox"]');

        orders = [...todoElement].filter(e => e.id === '').map(elem => elem.parentElement.parentElement.parentElement.parentElement)
        
        if (orders.length > 0) {
            waitFor.stop();
            isLoaded = false;
        }
    }
    
    waitFor.start(() => updateOrders());
 
    while (isLoaded) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return orders;
}

export const getTextsFromHtmlOrderElement = orderElement => 
    [...orderElement.children].map(collumnElement => 
        collumnElement.innerText.split('\n').filter(isText => isText !== '')
    )


export const convertParsedOrderInfoToObject = order => {
    const filteredOrderInfo = order.filter(arr => arr.length);

    try {
        return {
            orderId: filteredOrderInfo[0][0],
            tradeType: filteredOrderInfo[0][1],
            quoteCurrency: filteredOrderInfo[0][2].split(' / '),
            orderPrice: filteredOrderInfo[2][0],
            payTypes: filteredOrderInfo[3]
        }
    } catch (error) {
        console.error(error);
    }

    
}



export const parseOrderInfoFromHtml = HTMLCollection => {
    const dataOrders = HTMLCollection.map(getTextsFromHtmlOrderElement);

    const filteredOrders = dataOrders.map(convertParsedOrderInfoToObject);
            
    return filteredOrders;
}
