import React from "react";
import {useForm} from "react-hook-form";
import {styled} from "@mui/system";
import {Button} from "@mui/material";
import {useP2PMonitor} from "../shared/hooks/useP2PMonitor"

import {FormInputText} from "./input";

const FormContainer = styled("form")({
    display: "flex",
    gap: "15px",
});

const ButtonContainer = styled(Button)({
    minWidth: "120px",
});

const P2PTrackerFormContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "15px"
});

export const P2PTrackerForm = (info) => {
    const {control, handleSubmit, reset} = useForm();

    const { tasks, handleDelete, handleAddTaskAndParams } = useP2PMonitor();

    return (
        <P2PTrackerFormContainer>
            <FormContainer onSubmit={handleSubmit((data) => {console.log({data, info})})}>
                <FormInputText label="min price" name="minPrice" control={control}/>
                <ButtonContainer variant="contained" type="submit" >
                    Добавить
                </ButtonContainer>
            </FormContainer>
        </P2PTrackerFormContainer>
    );
};
