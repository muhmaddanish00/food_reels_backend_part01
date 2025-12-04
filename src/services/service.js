import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});



export async function uploadImageToImageKit(fileBuffer, fileName, file) {
  try {
    const base64File = fileBuffer.toString("base64");

    const result = await client.files.upload({
      file: base64File,           // Base64 string
      fileName: fileName,         // Unique name
    });

    return result;  // IMPORTANT
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
}


