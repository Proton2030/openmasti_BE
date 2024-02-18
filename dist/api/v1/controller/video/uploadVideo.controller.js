"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = void 0;
const uploadVideo_service_1 = require("../../../../service/uploadVideo.service");
const message_1 = require("../../../../constants/message");
const video_model_1 = __importDefault(require("../../../../models/video.model"));
const uploadThumnail_service_1 = require("../../../../service/uploadThumnail.service");
const uploadTrailer_service_1 = require("../../../../service/uploadTrailer.service");
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || !('video' in req.files) || !('thumbnail' in req.files)) {
        return res.status(404).json({
            message: message_1.MESSAGE.post.custom("Video or Thumbnail not found"),
        });
    }
    const video = req.files['video'][0];
    const thumbnail = req.files['thumbnail'][0];
    const trailer = req.files['trailer'][0];
    const videoBuffer = video.buffer;
    const thumbnailBuffer = thumbnail.buffer;
    const trailerBuffer = trailer.buffer;
    const { videoName, videoDetails } = req.body;
    try {
        const videoUrl = yield (0, uploadVideo_service_1.uploadVideoService)(videoBuffer, videoName, videoDetails);
        const thumbnailUrl = yield (0, uploadThumnail_service_1.uploadThumbnailService)(thumbnailBuffer);
        const trailerUrl = yield (0, uploadTrailer_service_1.uploadTrailerService)(trailerBuffer);
        const payload = {
            video_title: videoName,
            video_details: videoDetails,
            is_premium_content: false,
            video_url: videoUrl,
            thumbnail_url: thumbnailUrl,
            trailer_url: trailerUrl
        };
        yield new video_model_1.default(payload).save();
        res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: payload
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail
        });
    }
});
exports.uploadVideo = uploadVideo;
