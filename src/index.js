import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import runOnWindowLoad from './shared/lib/run-on-window-load';

var oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (
	method,
	url,
	async,
	user,
	password
) {
	try {
		if (url.indexOf('private/c2c/adv/list-by-page') !== -1) {
			console.log(1);
			this.addEventListener('load', () => {
				console.log(2);
				if (this.status === 200) {
					console.log(3);
					var responseData = this.responseText;
					var parsedData = JSON.parse(responseData);
					console.log(parsedData);
				}
			});

			window.XMLHttpRequest.prototype.open = oldXHROpen;
		}

		return oldXHROpen.apply(this, arguments);
	} catch (e) {
		resolveAdsAllowedToRun();
	}
};

// runOnWindowLoad(() => {
// 	const newElement = document.createElement('div');
// 	const bodyElement = document.getElementsByTagName('body')[0];

// 	newElement.id = 'root';
// 	bodyElement.insertBefore(newElement, bodyElement.firstChild);

// 	const root = createRoot(document.getElementById('root'));
// 	root.render(<App />);
// });
