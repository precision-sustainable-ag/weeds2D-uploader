import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import {
  getImageRow,
  insertNewFieldImageRow,
  uploadFileToBlob,
} from "../../shared_functions/azure_storage_functions";

const FieldUploader = ({
  setSnackbarData,
  uploadingFiles,
  setUploadingFiles,
  helperText,
  setHelperText,
}) => {
  const handlePickedFiles = (event) => {
    Array.from(event.target.files).forEach((file, index) => {
      setSnackbarData({
        open: true,
        text: "Uploading your images, do not close browser",
        severity: "warning",
      });
      getImageRow(file.name.split(".")[0]).then((res) => {
        if (typeof res === "string" || res instanceof String) {
          setHelperText(
            "Failed to upload one or more raw files because " +
              file.name +
              " exists in azure."
          );
          setSnackbarData({
            open: true,
            text: res,
            severity: "error",
          });
        } else {
          setUploadingFiles(true);
          insertNewFieldImageRow(res).then(() => {
            uploadFileToBlob(file, "weedsimagerepo")
              .then(() => {
                if (index === event.target.files.length - 1) {
                  setUploadingFiles(false);
                  setHelperText(
                    "Successfully uploaded your raw files. Click below to upload more."
                  );
                }
                setSnackbarData({
                  open: true,
                  text: "Successfully uploaded image " + file.name,
                  severity: "success",
                });
              })
              .catch((e) => {
                console.log(e);
                setHelperText(
                  "Failed to upload one or more raw files. Click below to try again."
                );
                setUploadingFiles(false);
              });
          });
        }
      });
    });
  };

  return (
    <Grid container spacing={2}>
      {uploadingFiles ? (
        <Grid item>
          <Typography>
            Uploading your images, do not close the browser!
          </Typography>
        </Grid>
      ) : (
        <Fragment>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>{helperText}</Typography>
          </Grid>
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
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default FieldUploader;
