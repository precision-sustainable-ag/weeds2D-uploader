import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardMedia, CardContent, Grid } from "@mui/material";
import FieldUploader from "../Uploaders/FieldUploader";
import SemifieldUploader from "../Uploaders/SemifieldUploader";
import Instructions from "../Instructions/Instructions";
import pic from "../../images/pexels-alejandro-barrón-96715.jpg";
import Login from "../Login/Login";
import Snack from "../Snackbar/Snack";

const Container = () => {
  const location = useLocation();
  const pathName = location.pathname === "/" ? "/field" : location.pathname;

  const [loggedIn, setLoggedIn] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    text: "",
    severity: "success",
  });
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [helperText, setHelperText] = useState(
    "Click below to upload your raw files!"
  );

  const CurrentView = () => {
    if (loggedIn) {
      if (pathName === "/field") {
        return (
          <FieldUploader
            setSnackbarData={setSnackbarData}
            uploadingFiles={uploadingFiles}
            setUploadingFiles={setUploadingFiles}
            helperText={helperText}
            setHelperText={setHelperText}
          />
        );
      } else {
        return (
          <SemifieldUploader
            setSnackbarData={setSnackbarData}
            uploadingFiles={uploadingFiles}
            setUploadingFiles={setUploadingFiles}
            helperText={helperText}
            setHelperText={setHelperText}
          />
        );
      }
    } else {
      return (
        <Login setLoggedIn={setLoggedIn} setSnackbarData={setSnackbarData} />
      );
    }
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Snack snackbarData={snackbarData} setSnackbarData={setSnackbarData} />
        <Card>
          <CardMedia
            component="img"
            height="200"
            // width="300"
            image={pic}
            alt="green iguana"
          />
          <CardContent>
            <Instructions />
            <CurrentView />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Container;
