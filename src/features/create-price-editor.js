import LocalStorageManager from '../utils/local-storage-manager';
import { WaitFor } from '../utils/wait-for';

const BTN_EDIT = 'C2C_p2pMyAdsList_management_btn_edit';
const EDIT_PRICE = 'c2c_advDetail_trading_amount';

const postOrder = () => {
	const waitfor = new WaitFor(3000);
	const selector = 'button[data-bn-type="button"]';

	waitfor.start(() => {
		if (document.querySelectorAll(selector).length === 7) {
			document.querySelectorAll(selector)[6].click();
		}

		if (document.querySelectorAll(selector).length === 9) {
			document.querySelectorAll(selector)[8].click();
			waitfor.stop();
		}

		if (document.querySelectorAll(selector).length === 8) {
			document.querySelectorAll(selector)[7].click();

			waitfor.stop();
		}
	});
};

const createPriceEditor = () => {
	const storageManager = new LocalStorageManager('priceData');

	return {
		updatePrice: (orderId, newPrice) => {
			storageManager.saveData({orderId, newPrice});
			document.location.href = 'https://p2p.binance.com/en/advEdit?code=' + orderId;
		},

		run: () => {
			const data = storageManager.readData();
			


			
			if (data) {

				setTimeout(() => {
					const priceInputElement = document
					.getElementById(EDIT_PRICE)
					.querySelector('input');

					const lastValue = priceInputElement.value;
					priceInputElement.value = data.newPrice;
					const event = new Event('input', { bubbles: true });
					event.simulated = true;
					const tracker = priceInputElement._valueTracker;
					if (tracker) {
						tracker.setValue(lastValue);
					}
					priceInputElement.dispatchEvent(event);
					

					postOrder();
					storageManager.saveData(false);
				}, 5000);
			} else {
				console.log(
					'No actions to perform on this page or edit status is false.'
				);
			}
		}
	};
};

export default createPriceEditor;
