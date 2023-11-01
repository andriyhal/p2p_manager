import React, { useEffect } from "react";
import {
  spinner,
  rotateCw,
  rotateCcw,
  controlPanel,
  controlButton,
  start,
  stop,
} from "./button.module.css";
import { MixpanelAnalytics } from "../../mixpanel_analitics";
import { MIXPANEL_TOKEN } from "../../mixpanel_analitics/config";

export const ControlPanel = ({ status, handlerUpdateStatus }) => {
  console.log("popup ControlPanel", { status });

  useEffect(() => {
    MixpanelAnalytics.init(MIXPANEL_TOKEN);
  }, []);

  const handleClick = () => {
    if (!status) {
      MixpanelAnalytics.startBot(!status);

      chrome.runtime.sendMessage(
        {
          action: "START_BOT",
          type: "POPUP",
        },
        ({ actionStatusBot }) => handlerUpdateStatus(actionStatusBot)
      );
    } else {
      MixpanelAnalytics.stopBot(!status);

      chrome.runtime.sendMessage(
        { action: "STOP_BOT", type: "POPUP" },
        ({ actionStatusBot }) => handlerUpdateStatus(actionStatusBot)
      );
    }
  };

  return (
    <div className={controlPanel}>
      <button
        className={`${controlButton} ${!status ? start : stop}`}
        onClick={handleClick}
      >
        <div className={spinner + " " + !status ? rotateCcw : rotateCw} />
        {!status ? "Старт" : "Стоп"}
      </button>
    </div>
  );
};
