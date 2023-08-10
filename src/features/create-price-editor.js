import LocalStorageManager from "../shared/utils/local-storage-manager";
import { WaitFor } from "../shared/utils/wait-for";
import { waitForElementsToAppear } from "../shared/utils/wait-for-element-to-appear";

const C2C_P2PMYADSLIST_MANAGEMENT_BTN_EDIT =
  "C2C_p2pMyAdsList_management_btn_edit";

const C2C_ADVDETAIL_TRADING_AMOUNT = "c2c_advDetail_trading_amount";

const editElements = () =>
  document.querySelectorAll('input[data-bn-type="input"]');
const buttonElements = () =>
  document.querySelectorAll('button[data-bn-type="button"]');

const editOrder = (data) => {
  document.getElementById(C2C_P2PMYADSLIST_MANAGEMENT_BTN_EDIT).click();

  console.log("Price on myads page:", parseFloat(data.price).toFixed(2));
};

const postOrder = () => {
  const waitfor = new WaitFor(3000);
  const selector = 'button[data-bn-type="button"]';

  waitfor.start(() => {
    if (document.querySelectorAll(selector).length === 7) {
      document.querySelectorAll(selector)[6].click();
      console.log("waitFor 1 click");
    }

    if (document.querySelectorAll(selector).length === 9) {
      document.querySelectorAll(selector)[8].click();
      console.log("waitFor 2 click");
    }

    if (document.querySelectorAll(selector).length === 8) {
      document.querySelectorAll(selector)[7].click();
      console.log("waitFor stop");
      waitfor.stop();
    }
    console.log("waitFor is running");
  });
};

const createPriceEditor = () => {
  const storageManager = new LocalStorageManager("priceData");

  return {
    editPrice: (newPrice) => {
      const data = storageManager.readData();

      if (data && !data.editStatus) {
        const updatedData = {
          price: newPrice,
          editStatus: true,
        };
        storageManager.saveData(updatedData);
        console.log("Price has been updated:", parseFloat(newPrice).toFixed(2));
      } else {
        console.log(
          "Price cannot be updated because editStatus is true or there is no data."
        );

        const updatedData = {
          price: newPrice,
          editStatus: false,
        };
        storageManager.saveData(updatedData);
      }
    },

    run: () => {
      const data = storageManager.readData();
      const currentPath = document.location.pathname;

      if (data && data.editStatus && currentPath === "/en/myads") {
        editOrder(data);
      } else if (data && data.editStatus && currentPath === "/en/advEdit") {
        const priceInputElement = document
          .getElementById(C2C_ADVDETAIL_TRADING_AMOUNT)
          .querySelector("input");

        const lastValue = priceInputElement.value;
        priceInputElement.value = data.price;
        const event = new Event("input", { bubbles: true });
        event.simulated = true;
        const tracker = priceInputElement._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        priceInputElement.dispatchEvent(event);

        data.editStatus = false;
        storageManager.saveData(data);

        postOrder();
      } else {
        console.log(
          "No actions to perform on this page or edit status is false."
        );
      }
    },
  };
};

export default createPriceEditor;
