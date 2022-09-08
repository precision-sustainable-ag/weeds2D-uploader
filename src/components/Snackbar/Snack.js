import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Snack = ({ snackbarData, setSnackbarData }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={snackbarData.open}
      autoHideDuration={2000}
      onClose={() =>
        setSnackbarData({ ...snackbarData, open: !snackbarData.open })
      }
    >
      <Alert severity={snackbarData.severity}>{snackbarData.text}</Alert>
    </Snackbar>
  );
};

export default Snack;
