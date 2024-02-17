import { s3 } from "../config/aws.config";

export const uploadTrailerService = async (trailersBuffer: Buffer): Promise<string> => {
  const params = {
    Bucket: 'open-masti-thumbnail',
    Key: `thumbnails/${Date.now()}_trailer.mp4`, 
    Body: trailersBuffer,
    ACL: 'public-read', 
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: any, data: { Location: string | PromiseLike<string>; }) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); 
      }
    });
  });
};