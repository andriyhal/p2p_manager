import { WaitFor } from '../shared/utils/wait-for';

export async function getOrders () {
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