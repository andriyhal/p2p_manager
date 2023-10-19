import React from "react";
import { createRoot } from "react-dom/client";
import { OrderTrackerForm } from "./track-order";
import {
  parseAndValidateOrderData,
  findDeepestElementsByText,
} from "../shared/lib/dom-scraper";
import { deleteTaskById } from "./delete_task_by_id";

export const useAddCreateTaskForm = async () => {
  try {
    const elements = await findDeepestElementsByText("div", ["--"]);

    const cols = elements
      .filter((element) => {
        if (element.parentElement.parentElement.children.length < 8) {
          return element;
        } else {
          deleteTaskById(
            element.parentElement.parentElement.children[1].innerText.split(
              "\n"
            )[0]
          );
        }
      })
      .map((e) => e.parentElement.parentElement);

    for (const e of cols) {
      const parsedDataOrder = parseAndValidateOrderData(
        e.children[0].innerText,
        e.children[2].innerText,
        e.children[3].innerText
      );

      const taskControlForm = document.createElement("div");
      e.appendChild(taskControlForm);

      const root = createRoot(taskControlForm);
      root.render(<OrderTrackerForm parsedDataOrder={parsedDataOrder} />);
    }
  } catch (error) {
    console.log(error);
    return;
  }

  return true;
};
