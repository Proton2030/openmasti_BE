import { s3 } from "../config/aws.config";

export const uploadThumbnailService = async (thumbnailBuffer: Buffer): Promise<string> => {
  const params = {
    Bucket: 'open-masti-thumbnail',
    Key: `thumbnails/${Date.now()}_thumbnail.jpg`, // Customize the key as needed
    Body: thumbnailBuffer,
    ACL: 'public-read', // Set the ACL as needed (e.g., public-read for public access)
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: any, data: { Location: string | PromiseLike<string>; }) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); // Returns the URL of the uploaded thumbnail
      }
    });
  });
};