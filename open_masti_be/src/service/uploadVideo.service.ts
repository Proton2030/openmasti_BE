import ffmpeg from "fluent-ffmpeg";
import path from "path";
import AWS from 'aws-sdk';
import fs from 'fs/promises';
import { bucketName, s3 } from "../config/aws.config";

const outputDirectory = '/Users/anikdutta/Documents/proton/open_masti/open_masti_be/src/tmp/output';

export const uploadVideoService = async (videoBuffer: Buffer, videoName: string, videoDetails: string ):Promise<any> => {
    const timestamp = Date.now();
    const outputDirectoryPath = path.join(outputDirectory, `playlist_${timestamp}`);

    await fs.mkdir(outputDirectoryPath);

    const inputFilePath = path.join(outputDirectoryPath, 'input.mp4');
    await fs.writeFile(inputFilePath, videoBuffer);

    await new Promise<void>((resolve, reject) => {
        ffmpeg()
            .input(inputFilePath)
            .addOptions([
                '-profile:v baseline',
                '-level 3.0',
                '-start_number 0',
                '-hls_time 10',
                '-hls_list_size 0',
                '-f hls',
            ])
            .output(path.join(outputDirectoryPath, 'playlist.m3u8'))
            .on('end', resolve)
            .on('error', (err) => reject(new Error(`Error during ffmpeg conversion: ${err.message}`)))
            .run();
    });

    try {
        await fs.unlink(inputFilePath);
        const files = await fs.readdir(outputDirectoryPath);
        await Promise.all(files.map(async (file) => {
            const filePath = path.join(outputDirectoryPath, file);
            const s3Params = {
                Bucket: bucketName,
                Key: `${videoName + '_' + timestamp}/playlist_${timestamp}/${file}`,
                Body: await fs.readFile(filePath),
                ContentType: file.endsWith('.m3u8') ? 'application/vnd.apple.mpegurl' : 'video/MP2T',
                ACL: 'public-read',
            };

            await s3.upload(s3Params).promise();
        }));
        const s3Url = `https://${bucketName}.s3.amazonaws.com/${videoName + '_' + timestamp}/playlist_${timestamp}/playlist.m3u8`;
        return s3Url;
    }
     finally { // Delete the temporary input file
        await fs.rmdir(outputDirectoryPath, { recursive: true });
    }
};
