import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import {
  getImageRow,
  insertNewFieldImageRow,
  uploadFileToBlob,
} from "../../shared_functions/azure_storage_functions";

const FieldUploader = ({ setSnackbarData }) => {
  const handlePickedFiles = (event) => {
    Array.from(event.target.files).forEach((file) => {
      getImageRow(file.name.split(".")[0]).then((res) => {
        console.log(res);
        if (typeof res === "string" || res instanceof String) {
          setSnackbarData({
            open: true,
            text: res,
            severity: "error",
          });
        } else {
          insertNewFieldImageRow(res);
          uploadFileToBlob(file, "weedsimagerepo").then(
            setSnackbarData({
              open: true,
              text: "Successfully uploaded your images!",
              severity: "success",
            })
          );
        }
      });
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained" component="label">
          Upload Files
          <input
            type="file"
            multiple
            hidden
            accept=".arw"
            onChange={handlePickedFiles}
          />
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="semifield" variant="contained">
          Go to semifield uploader
        </Button>
        {/* <Link to="semifield">Go to semifield uploader</Link> */}
      </Grid>
    </Grid>
  );
};

export default FieldUploader;
