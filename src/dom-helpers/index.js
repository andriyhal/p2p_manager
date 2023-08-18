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
    while (document.querySelectorAll('button[data-bn-type="button"]').length !== 7) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return document.querySelectorAll('button[data-bn-type="button"]')[6];
}

export const getConfirmToPostButton = async () => {
    while (document.querySelectorAll('button[data-bn-type="button"]').length !== 9) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return document.querySelectorAll('button[data-bn-type="button"]')[8];
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

export const parseOrderInfoFromHtml = htmlElement => {
    const elements = htmlElement.querySelectorAll('div[data-bn-type="text"]');
    
    const orderId = elements[0]?.innerText;
    const orderType = elements[1]?.innerText;
    const quoteCurrency = elements[2]?.innerText.split(' / ');
    const payTypes = elements[8].innerText.split(' ');

    return { orderId, orderType, quoteCurrency, payTypes };
}
