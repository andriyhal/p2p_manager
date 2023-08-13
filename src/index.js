import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import runOnWindowLoad from './shared/utils/run-on-window-load';

runOnWindowLoad(() => {
	console.clear();

	const newElement = document.createElement('div');
	const bodyElement = document.getElementsByTagName('body')[0];

	newElement.id = 'root';
	bodyElement.insertBefore(newElement, bodyElement.firstChild);

	console.log('render');

	const root = createRoot(document.getElementById('root'));
	root.render(<App />);
});
