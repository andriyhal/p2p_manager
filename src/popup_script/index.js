import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const root = createRoot(document.getElementById('popup'));
root.render(<App />);

// const styles = {
// 	panel: {
// 		border: '1px solid #ccc',
// 		padding: '10px',
// 		margin: '10px 0',
// 		textAlign: 'center',
// 		backgroundColor: '#f8f8f8'
// 	},
// 	startButton: {
// 		color: '#fff',
// 		backgroundColor: '#4CAF50',
// 		border: 'none',
// 		padding: '10px 20px',
// 		marginRight: '10px',
// 		cursor: 'pointer'
// 	},
// 	stopButton: {
// 		color: '#fff',
// 		backgroundColor: '#f44336',
// 		border: 'none',
// 		padding: '10px 20px',
// 		cursor: 'pointer'
// 	}
// };

// const controlP2pBot = () => {
// 	const panel = document.createElement('div');
// 	Object.assign(panel.style, styles.panel);

// 	const startButton = document.createElement('button');
// 	Object.assign(startButton.style, styles.startButton);
// 	startButton.textContent = 'Start Bot';
// 	panel.appendChild(startButton);

// 	const stopButton = document.createElement('button');
// 	Object.assign(stopButton.style, styles.stopButton);
// 	stopButton.textContent = 'Stop Bot';
// 	panel.appendChild(stopButton);

// 	startButton.addEventListener('click', () => {
// 		chrome.runtime.sendMessage({ action: 'startBot' });
// 	});

// 	stopButton.addEventListener('click', () => {
// 		chrome.runtime.sendMessage({ action: 'stopBot' });
// 	});

// 	return panel;
// };

// const root = document.getElementById('root');
// root.appendChild(controlP2pBot());
