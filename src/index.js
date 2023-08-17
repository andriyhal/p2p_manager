import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import runOnWindowLoad from './utils/run-on-window-load';

runOnWindowLoad(() => {
	const newElement = document.createElement('div');
	const bodyElement = document.getElementsByTagName('body')[0];

	newElement.id = 'root';
	bodyElement.insertBefore(newElement, bodyElement.firstChild);

	const root = createRoot(document.getElementById('root'));
	root.render(<App />);
});
