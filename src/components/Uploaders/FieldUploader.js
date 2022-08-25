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
    const numberOfFiles = event.target.files.length;
    let failedFiles = "";
    let index = 0;
    Array.from(event.target.files).forEach((file) => {
      getImageRow(file.name.split(".")[0]).then((res) => {
        if (typeof res === "string" || res instanceof String) {
          setSnackbarData({
            open: true,
            text: res,
            severity: "error",
          });
          if (index === numberOfFiles - 1) {
            setUploadingFiles(false);
            failedFiles = failedFiles + file.name;
            setHelperText(
              "Finished uploading your files. The following failed: " +
                failedFiles
            );
          } else {
            setHelperText(
              "Failed to upload, " +
                file.name +
                " exists in azure. Trying the next file... Do not close the browser."
            );
            failedFiles = failedFiles + file.name + ", ";
          }
          index += 1;
        } else {
          setUploadingFiles(true);
          uploadFileToBlob(file, "weedsimagerepo").then(() => {
            insertNewFieldImageRow(res).then(() => {
              if (index === numberOfFiles - 1) {
                setUploadingFiles(false);
                const finalText =
                  failedFiles === ""
                    ? "Successfully uploaded your raw files. Click below to upload more."
                    : "Finished uploading your files. The following failed: " +
                      failedFiles;
                setHelperText(finalText);
              }
              setSnackbarData({
                open: true,
                text: "Successfully uploaded image " + file.name,
                severity: "success",
              });
              index += 1;
            });
          });
        }
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
      </Grid>
    );
};

export default FieldUploader;
