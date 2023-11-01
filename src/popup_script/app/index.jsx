import React, { useState, useEffect } from "react";
import { ControlPanel } from "../ControlPanel";

const initStatus = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        action: "STATUS_WORKING",
        type: "POPUP",
      },
      ({ actionStatusBot }) => {
        resolve(actionStatusBot);
      }
    );
  });
};

export const App = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    initStatus().then((initialStatus) => {
      setStatus(initialStatus);
    });
  }, []);

  const handlerUpdateStatus = (value) => setStatus(value);

  return (
    <>
      {status !== null ? (
        <ControlPanel
          status={status}
          handlerUpdateStatus={handlerUpdateStatus}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
