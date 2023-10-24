import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/system";

const CheckBoxStyled = styled(Checkbox)({
  color: "#fcd535",
  "&.Mui-checked": {
    color: "#fcd535",
  },
});

const FormControlLabelStyled = styled(FormControlLabel)({
  "& .MuiTypography-root": {
    color: "#1976D2",
  },
});

export const CheckBox = ({ label, ...props }) => {
  return (
    <FormControlLabelStyled
      control={<CheckBoxStyled {...props} />}
      label={label}
    />
  );
};
