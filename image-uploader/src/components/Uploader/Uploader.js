import React, { Fragment } from "react";
import { Button } from "@mui/material";
import {
  getImageRow,
  insertNewImageRow,
  uploadFileToBlob,
} from "../../shared_functions/azure_storage_functions";

const Uploader = ({ setSnackbarData }) => {
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
          insertNewImageRow(res);
          uploadFileToBlob(file).then(
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
    <Fragment>
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
    </Fragment>
  );
};

export default Uploader;
