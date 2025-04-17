import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = import.meta.env
  .REACT_APP_AZURE_STORAGE_CONNECTION_STRING;

export async function uploadFile(file) {
  try {
    // Create BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a container client
    const containerName = "containerblogstack";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate a unique blob name
    const blobName = `${new Date().getTime()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file
    await blockBlobClient.uploadData(file, {
      blobHTTPHeaders: {
        blobContentType: file.type, // Sets the content type for the uploaded blob
      },
    });

    // Return the URL of the uploaded blob
    return blockBlobClient.url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
