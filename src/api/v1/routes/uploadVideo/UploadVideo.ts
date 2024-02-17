/**
 * @swagger
 * tags:
 *   name: Video
 *   description: API operations related to videos
 */

import express from "express";
import { uploadVideo } from "../../controller/video/uploadVideo.controller";
import { upload } from "../../../../middleware/multer.middleware";
import { getVideoList } from "../../controller/video/getVideo.controller";

const router = express.Router();

/**
 * @swagger
 * /video:
 *   post:
 *     summary: Get list of videos
 *     description: Retrieve a list of videos
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: 'List of videos' }
 */

router.route("/upload-video").post(upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo);
router.route("/get-video-list").get(getVideoList);

module.exports = router;