import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import { TrashButton } from "./TrashButton";
import { PlusButton } from "./PlusButton";
import { EditButton } from "./EditButton";
import { taskLocalStorage } from "./use-task-local-storage";
import {
  handleDeleteTask,
  handleSaveTaskToLocalStorage,
} from "./task-event-handlers";
import { FormInputsGroup } from "./FormInputsGroup";
import { updateP2pPriceById } from "../update-p2p-price-by-id";
import { useIdManagerForUnmount } from "../use_id_manager_for_unmount";
import { MixpanelAnalytics } from "../../mixpanel_analitics";
import { MIXPANEL_TOKEN } from "../../mixpanel_analitics/config";

const FormContainer = styled("form")({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  right: 0,
  bottom: "10px",
});

const OrderTrackerFormContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const setPostMessage = (id) => {
  const tasksInfo = JSON.parse(localStorage.getItem("tasksInfo"));
  const task = tasksInfo.find((task) => task.id === id);
  if (task) {
    chrome.runtime.sendMessage(
      {
        action: "ADD_TASK",
        type: "CONTENT",
        task,
      },
      (response) => {
        console.log(response);
      }
    );
  }
};

export const OrderTrackerForm = ({ parsedDataOrder }) => {
  const { control, handleSubmit } = useForm();
  const { isTaskStored } = taskLocalStorage();
  const [isTask, setIsTask] = useState(isTaskStored(parsedDataOrder.id));

  const { addId } = useIdManagerForUnmount();

  useEffect(() => {
    MixpanelAnalytics.init(MIXPANEL_TOKEN);
    setPostMessage(parsedDataOrder.id);
    addId(parsedDataOrder.id);
  }, []);

  const handleSaveTask = (submitData) => {
    MixpanelAnalytics.trackTaskAdded({ ...submitData, ...parsedDataOrder });

    handleSaveTaskToLocalStorage(submitData, parsedDataOrder);
    setIsTask(isTaskStored(parsedDataOrder.id));

    setTimeout(() => setPostMessage(parsedDataOrder.id), 1000);
  };

  const handleDelete = () => {
    MixpanelAnalytics.trackTaskRemoved({ ...parsedDataOrder });

    handleDeleteTask(parsedDataOrder);

    chrome.runtime.sendMessage(
      {
        action: "DELETE_TASK",
        type: "CONTENT",
        taskId: parsedDataOrder.id,
      },
      (response) => {
        console.log(response);
      }
    );

    setIsTask(isTaskStored(parsedDataOrder.id));
  };

  updateP2pPriceById(parsedDataOrder.id, parsedDataOrder.p2pPrice);

  return (
    <OrderTrackerFormContainer>
      <FormContainer
        onSubmit={handleSubmit(handleSaveTask)}
        id={parsedDataOrder.id}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <FormInputsGroup
            control={control}
            orderId={parsedDataOrder.id}
            spotPrice={parsedDataOrder.spotPrice}
            p2pPrice={parsedDataOrder.p2pPrice}
            orderType={parsedDataOrder.action}
          />
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {isTask ? (
            <>
              <EditButton />
              <TrashButton deleteTask={handleDelete} />
            </>
          ) : (
            <PlusButton />
          )}
        </div>
      </FormContainer>
    </OrderTrackerFormContainer>
  );
};
