import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import runOnWindowLoad from './shared/utils/run-on-window-load';

runOnWindowLoad(() => {
    const newElement = document.createElement('div');
    const bodyElement = document.getElementsByTagName('body')[0];

    newElement.id = 'root';
    bodyElement.insertBefore(newElement, bodyElement.firstChild);
    console.log('render');
<<<<<<< HEAD
    ReactDOM.render(<App />, document.getElementById('root'));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

// https://p2p.binance.com/en/advEdit?code={11519764917582123008}

// {
//     "code": "000000",
//     "message": null,
//     "messageDetail": null,
//     "data": [
//         {
//             "advNo": "11519764917582123008",
//             "classify": "mass",
//             "tradeType": "SELL",
//             "asset": "USDT",
//             "fiatUnit": "UAH",
//             "advStatus": 1,
//             "priceType": 1,
//             "priceFloatingRatio": null,
//             "rateFloatingRatio": null,
//             "currencyRate": null,
//             "price": "38.00",
//             "initAmount": "100.00000000",
//             "surplusAmount": "100.00000000",
//             "amountAfterEditing": null,
//             "maxSingleTransAmount": "4000",
//             "minSingleTransAmount": "500",
//             "buyerKycLimit": 1,
//             "buyerRegDaysLimit": -1,
//             "buyerBtcPositionLimit": "-1.00000000",
//             "remarks": "",
//             "autoReplyMsg": "",
//             "payTimeLimit": 15,
//             "tradeMethods": [
//                 {
//                     "payId": 37307932,
//                     "payMethodId": "37307932",
//                     "payType": "Monobank",
//                     "payAccount": null,
//                     "payBank": null,
//                     "paySubBank": null,
//                     "identifier": "Monobank",
//                     "iconUrlColor": "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20200615/6eb3c0b0-2bb1-47be-9671-4519ef54f792.png",
//                     "tradeMethodName": "Monobank",
//                     "tradeMethodShortName": "Monobank",
//                     "tradeMethodBgColor": "#664CDB"
//                 }
//             ],
//             "userTradeCountFilterTime": null,
//             "userBuyTradeCountMin": null,
//             "userBuyTradeCountMax": null,
//             "userSellTradeCountMin": null,
//             "userSellTradeCountMax": null,
//             "userAllTradeCountMin": null,
//             "userAllTradeCountMax": null,
//             "userTradeCompleteRateFilterTime": null,
//             "userTradeCompleteCountMin": null,
//             "userTradeCompleteRateMin": null,
//             "userTradeVolumeFilterTime": null,
//             "userTradeType": null,
//             "userTradeVolumeMin": null,
//             "userTradeVolumeMax": null,
//             "userTradeVolumeAsset": null,
//             "createTime": 1690915617000,
//             "advUpdateTime": 1690918770000,
//             "fiatVo": null,
//             "assetVo": null,
//             "advVisibleRet": {
//                 "userSetVisible": 1,
//                 "orderFlowVisible": 1,
//                 "surplusAmountVisible": 1
//             },
//             "assetLogo": "https://bin.bnbstatic.com/images/20191212/ec1e0b6e-06f7-4963-b454-6f631a49b4d1.png",
//             "assetScale": 2,
//             "fiatScale": 2,
//             "priceScale": 2,
//             "fiatSymbol": "₴",
//             "isTradable": null,
//             "dynamicMaxSingleTransAmount": null,
//             "minSingleTransQuantity": null,
//             "maxSingleTransQuantity": null,
//             "dynamicMaxSingleTransQuantity": null,
//             "tradableQuantity": "99.90",
//             "commissionRate": "0.00100000",
//             "tradeMethodCommissionRates": [
//                 {
//                     "tradeMethodIdentifier": "Monobank",
//                     "tradeMethodName": "Monobank",
//                     "commissionRate": "0.001000000000000000"
//                 }
//             ],
//             "launchCountry": null,
//             "abnormalStatusList": null,
//             "closeReason": null,
//             "storeInformation": null
//         }
//     ],
//     "total": 1,
//     "success": true
// }
=======
    const root = createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
});
>>>>>>> 4c5a6ada573d97ae008f84baf4c820c00296ba17
