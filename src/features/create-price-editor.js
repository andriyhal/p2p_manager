import LocalStorageManager from '../shared/utils/local-storage-manager';
import { WaitFor } from '../shared/utils/wait-for';

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
		editPrice: newPrice => {
			const data = storageManager.readData();

			if (data && !data.editStatus) {
				const updatedData = {
					price: newPrice,
					editStatus: true
				};
				storageManager.saveData(updatedData);
			} else {
				const updatedData = {
					price: newPrice,
					editStatus: false
				};
				storageManager.saveData(updatedData);
			}
		},

		run: () => {
			const data = storageManager.readData();
			const currentPath = document.location.pathname;

			if (data && data.editStatus && currentPath === '/en/myads') {
				document.getElementById(BTN_EDIT).click();
			} else if (
				data &&
				data.editStatus &&
				currentPath === '/en/advEdit'
			) {
				const priceInputElement = document
					.getElementById(EDIT_PRICE)
					.querySelector('input');

				const lastValue = priceInputElement.value;
				priceInputElement.value = data.price;
				const event = new Event('input', { bubbles: true });
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
					'No actions to perform on this page or edit status is false.'
				);
			}
		}
	};
};

export default createPriceEditor;
