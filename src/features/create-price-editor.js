import LocalStorageManager from "../shared/utils/local-storage-manager";
import { WaitFor } from "../shared/utils/wait-for";

const buttonSuffix = document.querySelectorAll(".bn-input-suffix")[0];
const buttonPrefix = document.querySelectorAll(".bn-input-prefix")[0];
const saveButton = document.querySelectorAll(
  'button[data-bn-type="button"]'
)[6];

const publishButton = document.querySelectorAll(
  'button[data-bn-type="button"]'
)[8];

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

      const waitfor = new WaitFor();

      if (data && data.editStatus && currentPath === "/en/myads") {
        console.log("Price on myads page:", parseFloat(data.price).toFixed(2));
        document.getElementById("C2C_p2pMyAdsList_management_btn_edit").click();
      } else if (data && data.editStatus && currentPath === "/en/advEdit") {
        console.log(
          "Price on advEdit page:",
          parseFloat(data.price).toFixed(2)
        );
        const priceInputElement = document
          .getElementById("c2c_advDetail_trading_amount")
          .querySelectorAll("input")[0];

        let lastValue = priceInputElement.value;
        priceInputElement.value = data.price;
        let event = new Event("input", { bubbles: true });
        event.simulated = true;
        let tracker = priceInputElement._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        priceInputElement.dispatchEvent(event);

        data.editStatus = false;
        storageManager.saveData(data);

        waitfor.start(() => {
          if (document.querySelectorAll('button[data-bn-type="button"]')[6]) {
            document
              .querySelectorAll('button[data-bn-type="button"]')[6]
              .click();
            waitfor.stop();
          }
        });

        waitfor.start(() => {
          if (document.querySelectorAll('button[data-bn-type="button"]')[8]) {
            document
              .querySelectorAll('button[data-bn-type="button"]')[8]
              .click();
            waitfor.stop();
          }
        });
      } else {
        console.log(
          "No actions to perform on this page or edit status is false."
        );
      }
    },
  };
};

export default createPriceEditor;
