import React from "react";
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";

export const FormInputText = ({name, control, label}) => (
    <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                label={label}
                variant="outlined"
                sx={{
                    transition: "color, border-color, background 200ms",
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#1976D2",
                        },
                        "&:hover fieldset": {
                            borderColor: "#1976D2",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#1976D2",
                    },
                    "& .MuiOutlinedInput-input": {
                        color: "#1976D2",
                        minWidth: "70px"
                    },
                }}
            />
        )}
    />
);
