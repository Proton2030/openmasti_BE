import AWS from 'aws-sdk';
AWS.config.update({
    accessKeyId: "AKIAWW2CZET5G4HORREN",
    secretAccessKey: "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",
    region: "ap-south-1",
  });
  
  // Create an S3 instance
 export const s3 = new AWS.S3();
 
 export const mediaConverter = new AWS.MediaConvert();

 export const bucketName = 'openmasti';