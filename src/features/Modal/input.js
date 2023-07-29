import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";

export const FormInputText = ({name, control, label}) => (
    <Controller
        name={name}
        control={control}
        render={({
                     field: {onChange, value},
                     fieldState: {error}
                 }) => (
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
)