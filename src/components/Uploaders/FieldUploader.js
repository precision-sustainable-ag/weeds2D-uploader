import React, { Fragment } from "react";
import {
  getImageRow,
  insertNewFieldImageRow,
  uploadFileToBlob,
} from "../../shared_functions/azure_storage_functions";
import Input from "./Input";

const FieldUploader = ({
  setSnackbarData,
  uploadingFiles,
  setUploadingFiles,
  helperText,
  setHelperText,
}) => {
  const handlePickedFiles = (event) => {
    setUploadingFiles(true);
    const numberOfFiles = event.target.files.length;
    let failedFiles = "";
    let index = 0;
    Array.from(event.target.files).forEach((file) => {
      getImageRow(file.name.split(".")[0]).then((res) => {
        console.log(res);
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
      <Input
        helperText={helperText}
        handlePickedFiles={handlePickedFiles}
        fieldType="field"
      />
    );
};

export default FieldUploader;
