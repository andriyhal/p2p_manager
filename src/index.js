import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import runOnWindowLoad from './shared/lib/run-on-window-load';
import { waitForElement } from '../test/waitForElement';

runOnWindowLoad(() => {
	// const traversalPath = [
	// 	{ type: 'parent' },
	// 	{ type: 'parent' },
	// 	{ type: 'parent' },
	// 	{ type: 'parent' },
	// 	{ type: 'parent' },
	// 	{ type: 'child', index: 1 },
	// 	{ type: 'child', index: 0 },
	// 	{ type: 'child', index: 0 }
	// ];

	// const fn = async () => {
	// 	const todos = await waitForElement(
	// 		'c2c_batchOperation_checkbox_selectAll',
	// 		traversalPath,
	// 		20000
	// 	);
	// 	console.log('Node todo', todos);
	// };

	// fn();

	const newElement = document.createElement('div');
	const bodyElement = document.getElementsByTagName('body')[0];

	newElement.id = 'root';
	bodyElement.insertBefore(newElement, bodyElement.firstChild);

	const root = createRoot(document.getElementById('root'));
	root.render(<App />);
});
