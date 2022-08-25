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
    const numberOfFiles = event.target.files.length;
    let index = 0;
    Array.from(event.target.files).forEach((file) => {
      const new_file = new File([file], file.webkitRelativePath);
      uploadFileToBlob(new_file, "semifield-upload").then(() => {
        if (index === numberOfFiles - 1) {
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
        index += 1;
      });
    });
  };

  if (uploadingFiles) return <Fragment></Fragment>;
  else
    return (
      <Grid item container spacing={2}>
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
      </Grid>
    );
};

export default SemifieldUploader;
