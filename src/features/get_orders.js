import { WaitFor } from '../shared/utils/wait-for';

const getElements = () => document.querySelector('#c2c_batchOperation_checkbox_selectAll')
    ?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
    .children[1].children[0].children[0].children[1].childNodes;

export async function getOrders () {
    const waitFor = new WaitFor(100);
    let isLoaded = true;
    

    waitFor.start(() => {
      try {
        const todoElement = getElements()?.[0]?.children[0]?.children;
        if (todoElement?.length > 7) {
            isLoaded = false;
            waitFor.stop();
        }
      } catch (error) {
        console.log(error);
      }
    });
 
    while (isLoaded) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return getElements();
}