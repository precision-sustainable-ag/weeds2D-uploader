import React, { useState } from "react";
import { Card, CardMedia, CardContent, CardActions, Grid } from "@mui/material";
import Uploader from "../Uploader/Uploader";
import Instructions from "../Instructions/Instructions";
import pic from "../../images/pexels-alejandro-barrón-96715.jpg";
import Login from "../Login/Login";
import Snack from "../Snackbar/Snack";

const Container = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    text: "",
    severity: "success",
  });

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
          </CardContent>
          <CardActions>
            {loggedIn ? (
              <Uploader setSnackbarData={setSnackbarData} />
            ) : (
              <Login
                setLoggedIn={setLoggedIn}
                setSnackbarData={setSnackbarData}
              />
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Container;
