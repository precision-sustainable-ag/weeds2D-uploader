import React from "react";
import { Card, CardMedia, CardContent, CardActions, Grid } from "@mui/material";
import Uploader from "../Uploader/Uploader";
import Instructions from "../Instructions/Instructions";
import pic from "../../images/pexels-alejandro-barrón-96715.jpg";

const Container = () => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
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
            <Uploader />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Container;
