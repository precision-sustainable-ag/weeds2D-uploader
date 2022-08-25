import React from "react";
import { Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const UploadingInfo = () => {
  return (
    <Grid item>
      <Typography>Uploading your images, do not close the browser!</Typography>
      <CircularProgress />
    </Grid>
  );
};

export default UploadingInfo;
