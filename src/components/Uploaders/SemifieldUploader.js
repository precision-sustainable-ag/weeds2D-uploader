import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { uploadFileToBlob } from "../../shared_functions/azure_storage_functions";

const SemifieldUploader = ({
  setSnackbarData,
  uploadingFiles,
  setUploadingFiles,
  helperText,
  setHelperText,
}) => {
  const handlePickedFiles = (event) => {
    setUploadingFiles(true);
    Array.from(event.target.files).forEach((file, index) => {
      const new_file = new File([file], file.webkitRelativePath);
      uploadFileToBlob(new_file, "semifield-upload")
        .then(() => {
          if (index === event.target.files.length - 1) {
            setUploadingFiles(false);
            setHelperText(
              "Successfully uploaded your folder. Click below to upload another."
            );
          }
          setSnackbarData({
            open: true,
            text: "Successfully uploaded folder " + new_file.name.split("/")[0],
            severity: "success",
          });
        })
        .catch((e) => {
          console.log(e);
          setHelperText(
            "Failed to upload one or more files in your folder. Click below to try again."
          );
          setUploadingFiles(false);
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
              Upload Folder
              <input
                multiple
                hidden
                directory=""
                webkitdirectory=""
                type="file"
                onChange={handlePickedFiles}
              />
            </Button>
          </Grid>
          <Grid item>
            <Button component={Link} to="field" variant="contained">
              Go to field uploader
            </Button>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default SemifieldUploader;
