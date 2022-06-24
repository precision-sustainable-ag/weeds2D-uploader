import React from "react";
import { Grid, Typography } from "@mui/material";

const Instructions = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="h5">
          Welcome to the weeds2D image uploader!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Instructions;
