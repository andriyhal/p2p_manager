import React from "react";
import { styled } from "@mui/system";
import { P2PTracker } from "../p2p_tracker";
import { saveOrderIdsToLocaleStorage } from "../features/save_order_ids_to_locale_storage";
import { useAddCreateTaskForm } from "../features/use_add_create_task_form";

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

const App = () => {
  // TODO: WIll implement isLogin logic
  // const isLogin = document.location.origin === "https://accounts.binance.com";
  useAddCreateTaskForm();
  saveOrderIdsToLocaleStorage()

  return (
    <AppContainer><P2PTracker /></AppContainer>
  );
};

export default App;
