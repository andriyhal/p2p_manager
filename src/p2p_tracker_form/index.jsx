import React from "react";
import {useForm} from "react-hook-form";
import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {useP2PMonitor} from "../shared/hooks/useP2PMonitor"

import {FormInputText} from "./input";

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

export const P2PTrackerForm = (infoOrder) => {
    const {control, handleSubmit, reset} = useForm();

    const { tasks, handleDelete, handleAddTaskAndParams } = useP2PMonitor();

    
   
    return (
        <P2PTrackerFormContainer>
            <FormContainer onSubmit={handleSubmit((data) => handleAddTaskAndParams({data, infoOrder}))}>
                <FormInputText label="min price" name="minPrice" control={control}/>
                <ButtonContainer variant="contained" type="submit" >
                    Добавить
                </ButtonContainer>
            </FormContainer>
        </P2PTrackerFormContainer>
    );
};
