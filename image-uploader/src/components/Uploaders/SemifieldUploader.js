import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { uploadFileToBlob } from "../../shared_functions/azure_storage_functions";

const SemifieldUploader = ({ setSnackbarData }) => {
  const handlePickedFiles = (event) => {
    Array.from(event.target.files).forEach((file) => {
      const new_file = new File([file], file.webkitRelativePath);
      uploadFileToBlob(new_file, "semifield-upload").then(
        setSnackbarData({
          open: true,
          text: "Successfully uploaded folder " + new_file.name.split("/")[0],
          severity: "success",
        })
      );
    });
  };

  return (
    <Grid container spacing={2}>
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
