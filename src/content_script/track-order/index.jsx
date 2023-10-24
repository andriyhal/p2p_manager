import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import { TrashButton } from "./TrashButton";
import { PlusButton } from "./PlusButton";
import { EditButton } from "./EditButton";
import { CheckBox } from "./checkbox";
import { taskLocalStorage } from "./use-task-local-storage";
import {
  handleDeleteTask,
  handleSaveTaskToLocalStorage,
} from "./task-event-handlers";
import { FormInputsGroup } from "./FormInputsGroup";
import { updateP2pPriceById } from "../update-p2p-price-by-id";

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

export const OrderTrackerForm = ({ parsedDataOrder }) => {
  console.log({ parsedDataOrder });
  const { control, handleSubmit } = useForm();
  const { isTaskStored } = taskLocalStorage();
  const [isTask, setIsTask] = useState(isTaskStored(parsedDataOrder.id));

  console.log("OrderTrackerForm");

  const handleSaveTask = (submitData) => {
    console.log({ submitData });
    handleSaveTaskToLocalStorage(submitData, parsedDataOrder);
    setIsTask(isTaskStored(parsedDataOrder.id));
  };

  const handleDelete = () => {
    handleDeleteTask(parsedDataOrder);
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
          />
        </div>
        <div>
          <CheckBox control={control} name="checkbox" label="M" />
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
