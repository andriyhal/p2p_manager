import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import runOnWindowLoad from './shared/utils/run-on-window-load';

runOnWindowLoad(() => {
    const newElement = document.createElement('div');
    const bodyElement = document.getElementsByTagName('body')[0];

    newElement.id = 'root';
    bodyElement.insertBefore(newElement, bodyElement.firstChild);
    console.log('render');
    ReactDOM.render(<App />, document.getElementById('root'));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
