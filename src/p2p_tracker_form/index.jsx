import React from "react";
import {useForm} from "react-hook-form";
import {styled} from "@mui/system";
import {Button} from "@mui/material";

import {FormInputText} from "./input";
import LocalStorageManager from "../utils/local-storage-manager";

const FormContainer = styled("form")({
    position: "absolute",
    width: "300px",
    display: "flex",
    gap: "15px",
    right: 0,
    bottom: "10px"
});

const ButtonContainer = styled(Button)({
    minWidth: "120px",
});

const P2PTrackerFormContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "15px"
});

const tasksInfo = new LocalStorageManager('tasksInfo');
tasksInfo.saveData(tasksInfo.readData() ? tasksInfo.readData() : []);

const taskFilter = data => {
    const [task] = tasksInfo.readData().filter(task => task.orderId === data.orderId);

    if (!task) {
        tasksInfo.saveData([...tasksInfo.readData(), data]);
    }
}

export const P2PTrackerForm = (infoOrder) => {
    const {control, handleSubmit} = useForm();

    const handleSaveTaskToLocalStorage = submitData => {
        taskFilter({...submitData, ...infoOrder});
           
    }

    const isTaskAlreadyExist = true;

    const deleteTask = () => {
        //TODO: remove task from local storage
    }

    return (
        <P2PTrackerFormContainer>
            <FormContainer onSubmit={handleSubmit(handleSaveTaskToLocalStorage)} id={infoOrder.orderId}>
                <FormInputText label="price" name="price" control={control}/>
                <ButtonContainer variant="contained" type="submit" >
                    {isTaskAlreadyExist ? "Обновить"  : "Добавить"}
                </ButtonContainer>
                {isTaskAlreadyExist && <ButtonContainer variant="contained" onClick={deleteTask} >
                     {"Удалить"}
                </ButtonContainer>}
            </FormContainer>
        </P2PTrackerFormContainer>
    );
};
