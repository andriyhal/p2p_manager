import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

const TrashButtonCss = styled(Button)({
  minHeight: "23px",
  minWidth: "23px",
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "crimson",
  "&:hover": {
    backgroundColor: "crimson",
    opacity: "0.7",
  },
});

const DeleteIconCss = styled(DeleteIcon)({
  margin: "0",
  color: "#fff",
});

export const TrashButton = (props) => {
  return (
    <TrashButtonCss variant="contained" onClick={() => props.deleteTask()}>
      <DeleteIconCss />
    </TrashButtonCss>
  );
};

// TODO: move animation to common place
export const animationTransition = {
  transition: "color 200ms, border-color 200ms, background 200ms",
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
    minWidth: "70px",
  },
};
