import express from "express";
import { uploadVideo } from "../../controller/video/uploadVideo.controller";
import { upload } from "../../../../middleware/multer.middleware";
import { getVideoList } from "../../controller/video/getVideo.controller";
import { setTimeout } from "timers/promises";

const router = express.Router();

router.route("/upload-video").post(upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo);
router.route("/get-video-list").get(getVideoList);

module.exports = router;