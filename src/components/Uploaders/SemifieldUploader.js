import React, { Fragment } from "react";
import { uploadFileToBlob } from "../../shared_functions/azure_storage_functions";
import Input from "./Input";

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
      <Input
        helperText={helperText}
        handlePickedFiles={handlePickedFiles}
        fieldType="semifield"
      />
    );
};

export default SemifieldUploader;
