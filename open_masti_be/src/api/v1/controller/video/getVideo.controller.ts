import { Request, Response } from "express";
import videoModel from "../../../../models/video.model";
import { MESSAGE } from "../../../../constants/message";

export const getVideoList = async(req:Request,res:Response) =>{
    try{
        const filter = req.query;
        const response = await videoModel.find(filter).lean();
        return res.status(200).json({
            message:MESSAGE.get.succ,
            result:response
        })
    }catch(err){
         return res.status(400).json({
            message:MESSAGE.get.fail,
            err
        })
    }
}