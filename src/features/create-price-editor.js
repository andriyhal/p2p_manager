import LocalStorageManager from "../shared/utils/local-storage-manager";
import { WaitFor } from "../shared/utils/wait-for";
import { waitForElementsToAppear } from "../shared/utils/wait-for-element-to-appear";

const C2C_P2PMYADSLIST_MANAGEMENT_BTN_EDIT =
  "C2C_p2pMyAdsList_management_btn_edit";

const C2C_ADVDETAIL_TRADING_AMOUNT = "c2c_advDetail_trading_amount";

const editOrder = (data) => {
  document.getElementById(C2C_P2PMYADSLIST_MANAGEMENT_BTN_EDIT).click();

  console.log("Price on myads page:", parseFloat(data.price).toFixed(2));
};

const postOrder = () => {
  const waitfor = new WaitFor(3000);
  const selector = 'button[data-bn-type="button"]';
  const buttons = [6, 8, 7];
  let indexButton = 0;

  waitfor.start(() => {
    if (document.querySelectorAll(selector)[buttons[indexButton]]) {
      if (buttons[indexButton] && waitfor.terminate) {
        console.log(document.querySelectorAll(selector)[buttons[indexButton]]);
        indexButton++;
      } else {
        waitfor.stop();
      }
    }
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
