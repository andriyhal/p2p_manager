<<<<<<< HEAD:src/features/Modal/input.js
import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
=======
import React from "react";
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";
>>>>>>> 4c5a6ada573d97ae008f84baf4c820c00296ba17:src/p2p_tracker_form/input.js

export const FormInputText = ({ name, control, label }) => (
    <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                label={label}
                variant="outlined"
            />
        )}
    />
);
