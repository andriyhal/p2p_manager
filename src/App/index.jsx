import React from 'react';
import { styled } from '@mui/system';
import P2pTracker from '../features/P2pTracker';

const AppContainer = styled('div')({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "5px",
    top: "100px",
    left: "100px",
    padding: "10px",
    zIndex: "1000",
    color:" #fff",
    background: "#333"
});

// create order buy/sell nav url
// document.location.href = https://p2p.binance.com/uk-UA/postAd
// delete order nav url
// document.location.href = https://p2p.binance.com/uk-UA/myads?type=normal&code=default

const App = () => {
    const isLogin =
        document.location.origin === 'https://accounts.binance.com';

    return (
        <AppContainer>{isLogin ? <P2pTracker /> : <P2pTracker />}</AppContainer>
    );
};

export default App;
