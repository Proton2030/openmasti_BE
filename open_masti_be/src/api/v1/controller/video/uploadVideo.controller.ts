import { Request, Response } from "express";
import { uploadVideoService } from "../../../../service/uploadVideo.service";
import { IVideo } from "../../../../@types/video.types";
import { MESSAGE } from "../../../../constants/message";
import videoModel from "../../../../models/video.model";
import { uploadThumbnailService } from "../../../../service/uploadThumnail.service";

export const uploadVideo = async(req:Request,res:Response)=>{
    if (!req.files || !('video' in req.files) || !('thumbnail' in req.files)) {
        return res.status(404).json({
        message: MESSAGE.post.custom("Video or Thumbnail not found"),
        });
    }
    const video = req.files['video'][0];
    const thumbnail = req.files['thumbnail'][0];

    const videoBuffer = video.buffer;
    const thumbnailBuffer = thumbnail.buffer;

    const {videoName,videoDetails} = req.body;

    try{
        const videoUrl = await uploadVideoService(videoBuffer,videoName,videoDetails);
        const thumbnailUrl = await uploadThumbnailService(thumbnailBuffer);

        const payload:IVideo={
            video_title:videoName,
            video_details:videoDetails,
            is_premium_content:false,
            video_url:videoUrl,
            thumbnail_url:thumbnailUrl
        }
        await new videoModel(payload).save();
        return res.status(200).json({
            message: MESSAGE.post.succ,
            result:payload
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message:MESSAGE.post.fail
        })
    }
}