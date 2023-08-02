import LocalStorageManager from '../shared/utils/local-storage-manager';

function waitForElement(selector) {
    return new Promise((resolve) => {
        const element = document.querySelector(selector);

        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const addedNodes = Array.from(mutation.addedNodes);
                const targetElement = addedNodes.find(
                    (node) => node.matches && node.matches(selector),
                );
                if (targetElement) {
                    observer.disconnect();
                    resolve(targetElement);
                }
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    });
}

function monitorElementsOnPage() {
    return Promise.all([
        waitForElement('#c2c_advDetail_trading_amount input'),
        waitForElement('button[data-bn-type="button"][data-bn-value="save"]'),
        waitForElement(
            'button[data-bn-type="button"][data-bn-value="publish"]',
        ),
    ]).then(([priceInputElement, saveButton, publishButton]) => {
        return { priceInputElement, saveButton, publishButton };
    });
}

const createPriceEditor = () => {
    const storageManager = new LocalStorageManager('priceData');

    return {
        editPrice: (newPrice) => {
            const data = storageManager.readData();

            if (data && !data.editStatus) {
                const updatedData = {
                    price: newPrice,
                    editStatus: true,
                };
                storageManager.saveData(updatedData);
                console.log(
                    'Price has been updated:',
                    parseFloat(newPrice).toFixed(2),
                );
            } else {
                console.log(
                    'Price cannot be updated because editStatus is true or there is no data.',
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

            if (data && data.editStatus && currentPath === '/en/myads') {
                console.log(
                    'Price on myads page:',
                    parseFloat(data.price).toFixed(2),
                );
                document
                    .getElementById('C2C_p2pMyAdsList_management_btn_edit')
                    .click();
            } else if (
                data &&
                data.editStatus &&
                currentPath === '/en/advEdit'
            ) {
                console.log(
                    'Price on advEdit page:',
                    parseFloat(data.price).toFixed(2),
                );
                const priceInputElement = document
                    .getElementById('c2c_advDetail_trading_amount')
                    .querySelectorAll('input')[0];
                const saveButton = document.querySelectorAll(
                    'button[data-bn-type="button"]',
                )[6];
                const publishButton = document.querySelectorAll(
                    'button[data-bn-type="button"]',
                )[8];

                setTimeout(() => {
                    priceInputElement.value = data.price;
                    data.editStatus = false;
                    storageManager.saveData(data);
                }, 3000);

                setTimeout(() => {
                    document
                        .querySelectorAll('button[data-bn-type="button"]')[6]
                        .click();
                }, 6000);

                setTimeout(() => {
                    document
                        .querySelectorAll('button[data-bn-type="button"]')[8]
                        .click();
                }, 9000);
            } else {
                console.log(
                    'No actions to perform on this page or edit status is false.',
                );
            }
        },
    };
};

export default createPriceEditor;
