import React from "react";
import { styled } from "@mui/system";
import { P2PTracker } from "../p2p_tracker";
import createPriceEditor from "../features/create-price-editor";

const AppContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "5px",
  top: "100px",
  left: "100px",
  padding: "10px",
  zIndex: "1000",
  color: " #fff",
  background: "#333",
});

// create order buy/sell nav url
// document.location.href = https://p2p.binance.com/uk-UA/postAd
// delete order nav url
// document.location.href = https://p2p.binance.com/uk-UA/myads?type=normal&code=default

const App = () => {
  const isLogin = document.location.origin === "https://accounts.binance.com";

  const orderEdit = createPriceEditor();
  orderEdit.editPrice(38.48);
  orderEdit.run();

  return (
    <AppContainer>{isLogin ? <P2PTracker /> : <P2PTracker />}</AppContainer>
  );
};

export default App;
