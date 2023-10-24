import React from "react";
import { FormInputText } from "../FormInputText";
import { TASKS_INFO_STORAGE_KEY } from "../../../shared/config";
import { FormPercentageModifier } from "../percentage_modifier";

export const FormInputsGroup = ({ control, orderId, spotPrice, p2pPrice }) => {
  const tasksInfo = JSON.parse(
    localStorage.getItem(TASKS_INFO_STORAGE_KEY) || []
  );

  const handlePercentageChange = (newPercentage) => {
    console.log("New Percentage:", newPercentage);
  };

  const [task] = tasksInfo.filter((task) => task.id === orderId);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <FormPercentageModifier
        label="Percentage"
        name="percentage"
        spotPrice={spotPrice}
        p2pPrice={p2pPrice}
        control={control}
        onPercentageChange={handlePercentageChange}
      />
      <FormInputText
        label="Beat by"
        name="beatBy"
        defaultValue={!!task ? task.beatBy : "0.03"}
        control={control}
      />
    </div>
  );
};
