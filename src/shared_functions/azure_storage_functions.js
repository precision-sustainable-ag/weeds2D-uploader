import xml2js from "xml2js";
import { v4 as uuidv4 } from "uuid";
import { BlobServiceClient } from "@azure/storage-blob";

const headers = { "Content-Type": "application/json" };

let sasToken = process.env.REACT_APP_BLOB_SAS_TOKEN_NEW;
let storageAccountName = `weedsimagerepo`;
const storageContainerName = `weedsimagerepo`;

// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   // dev code
//   sasToken = process.env.REACT_APP_BLOB_SAS_TOKEN_DEVELOP;
//   storageAccountName = `weedsimagerepodev`;
// } else {
//   // production code
//   sasToken = process.env.REACT_APP_BLOB_SAS_TOKEN;
//   storageAccountName = `weedsimagerepo`;
// }

export const getImageRow = async (imageName) => {
  const blobURL = `https://${storageAccountName}.table.core.windows.net/wirimagerefs()${sasToken}&$filter=ImageURL%20ge%20'https://${storageAccountName}.blob.core.windows.net/${storageContainerName}/${imageName}.ARW'%20and%20ImageURL%20le%20'https://${storageAccountName}.blob.core.windows.net/${storageContainerName}/${imageName}.JPG'`;

  return fetch(blobURL, { headers: headers }).then((fetchRes) => {
    return fetchRes.text().then((textRes) => {
      // convert XML to JSON
      let imageRow = [];
      xml2js.parseString(textRes.replace("\ufeff", ""), (err, result) => {
        if (err) {
          throw err;
        }
        if (!result.feed.entry)
          imageRow =
            "No JPG file present in Azure Blob Storage with name " + imageName;
        else if (result.feed.entry.length > 1)
          imageRow =
            "Multiple JPG files present in Azure Blob Storage with name " +
            imageName;
        else imageRow = result.feed.entry[0].content[0]["m:properties"][0];
      });

      return imageRow;
    });
  });
};

export const insertNewFieldImageRow = async (imageRow) => {
  const blobURL = `https://${storageAccountName}.table.core.windows.net/wirimagerefs${sasToken}`;

  const newImageURL =
    imageRow["d:ImageURL"][0].split(".").slice(0, -1).join(".") + ".ARW";

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
export const uploadFileToBlob = async (file, containerName) => {
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
