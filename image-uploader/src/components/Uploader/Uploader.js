import React, { Fragment, useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import xml2js from "xml2js";
import { v4 as uuidv4 } from "uuid";
import { BlobServiceClient } from "@azure/storage-blob";

// // Helper function
// function Alert(props) {
//   return <Alert elevation={6} variant="filled" {...props} />;
// }

const Uploader = () => {
  const token = process.env.REACT_APP_BLOB_SAS_TOKEN;
  const headers = { "Content-Type": "application/json" };
  const containerName = `weedsimagerepo`;
  const sasToken = process.env.REACT_APP_BLOB_SAS_TOKEN;
  const storageAccountName = `weedsimagerepo`;

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const getImageRow = async (imageName) => {
    const blobURL = `https://weedsimagerepo.table.core.windows.net/wirimagerefs()${token}`;

    return fetch(blobURL, { headers: headers }).then((fetchRes) => {
      return fetchRes.text().then((textRes) => {
        // convert XML to JSON
        let imageRow = [];
        xml2js.parseString(textRes.replace("\ufeff", ""), (err, result) => {
          if (err) {
            throw err;
          }

          const selectedTableEntry = result.feed.entry.filter((row) => {
            return row.content[0]["m:properties"][0]["d:ImageURL"][0].includes(
              imageName
            );
          });

          console.log(selectedTableEntry);

          if (selectedTableEntry.length > 1 || selectedTableEntry.length === 0)
            imageRow = false;
          else imageRow = selectedTableEntry[0].content[0]["m:properties"][0];
        });

        return imageRow;
      });
    });
  };

  const insertNewImageRow = async (imageRow) => {
    const blobURL = `https://weedsimagerepo.table.core.windows.net/wirimagerefs${token}`;

    console.log(imageRow);

    const newImageURL =
      imageRow["d:ImageURL"][0].split(".").slice(0, -1).join(".") + ".arw";

    const data = {
      PartitionKey: imageRow["d:PartitionKey"][0],
      RowKey: uuidv4(),
      Timestamp: imageRow["d:Timestamp"][0]["_"],
      MasterRefID: imageRow["d:MasterRefID"][0],
      ImageURL: newImageURL,
      ImageIndex: imageRow["d:ImageIndex"][0]["_"]
        ? imageRow["d:ImageIndex"][0]["_"]
        : imageRow["d:ImageIndex"][0],
    };

    console.log(data);

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    fetch(blobURL, options).then((res) => console.log(res));
  };

  // <snippet_createBlobInContainer>
  const createBlobInContainer = async (containerClient, file) => {
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
  };

  // <snippet_uploadFileToBlob>
  const uploadFileToBlob = async (file) => {
    if (!file) return [];

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);

    // upload file
    await createBlobInContainer(containerClient, file);
  };

  const handlePickedFiles = (event) => {
    console.log(event.target.files);
    Array.from(event.target.files).forEach((file) => {
      const masterRefID = getImageRow(file.name.split(".")[0]);

      masterRefID.then((res) => {
        console.log(res);
        if (res !== false) {
          insertNewImageRow(res);
          uploadFileToBlob(file).then(
            setSnackbarData({
              open: true,
              text: "Successfully uploaded your images!",
              severity: "success",
            })
          );
        } else {
          setSnackbarData({
            open: true,
            text: "There are multiple matching JPGs or no matching JPGs!",
            severity: "error",
          });
        }
      });
    });
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarData.open}
        autoHideDuration={10000}
        onClose={() =>
          setSnackbarData({ ...snackbarData, open: !snackbarData.open })
        }
      >
        <Alert severity={snackbarData.severity}>{snackbarData.text}</Alert>
      </Snackbar>
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
