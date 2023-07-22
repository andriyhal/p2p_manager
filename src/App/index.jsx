import React from 'react';
import { app } from './app.module.css';
import P2pTracker from '../features/P2pTracker';

// create order buy/sell nav url
// document.location.href = https://p2p.binance.com/uk-UA/postAd
// delete order nav url
// document.location.href = https://p2p.binance.com/uk-UA/myads?type=normal&code=default

const App = () => {
    const isLogin =
        document.location.origin === 'https://accounts.binance.com'
            ? true
            : false;

    return (
        <div className={app}>{isLogin ? <P2pTracker /> : <P2pTracker />}</div>
    );
};

export default App;
