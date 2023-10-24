import { TASKS_INFO_STORAGE_KEY } from "../../shared/config";
import LocalStorageManager from "../../shared/lib/local-storage-manager";
import { taskLocalStorage } from "./use-task-local-storage";

const tasksInfo = new LocalStorageManager(TASKS_INFO_STORAGE_KEY);

export const handleSaveTaskToLocalStorage = (submitData, props) => {
  const { storeTaskAndUpdateIfExists } = taskLocalStorage();
  let stringWithoutCommasPercentLimit;
  let parsedNumberPercentLimit = submitData.percentLimit;
  let stringWithoutCommasBeatBy;
  let parsedNumberBeatBy = submitData.beatBy;

  if (typeof submitData.percentLimit === "string") {
    stringWithoutCommasPercentLimit = submitData.percentLimit.replace(/,/g, "");
    parsedNumberPercentLimit = parseFloat(stringWithoutCommasPercentLimit);
  }

  if (typeof submitData.beatBy === "string") {
    stringWithoutCommasBeatBy = submitData.beatBy.replace(/,/g, "");
    parsedNumberBeatBy = parseFloat(stringWithoutCommasBeatBy);
  }

  storeTaskAndUpdateIfExists({
    percentLimit: parsedNumberPercentLimit,
    beatBy: parsedNumberBeatBy,
    ...props,
  });
};

export const handleDeleteTask = (props) => {
  tasksInfo.saveData(
    tasksInfo.readData().filter((task) => task.id !== props.id)
  );
};
