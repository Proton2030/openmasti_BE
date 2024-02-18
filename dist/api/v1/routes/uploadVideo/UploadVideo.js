"use strict";
/**
 * @swagger
 * tags:
 *   name: Video
 *   description: API operations related to videos
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadVideo_controller_1 = require("../../controller/video/uploadVideo.controller");
const multer_middleware_1 = require("../../../../middleware/multer.middleware");
const getVideo_controller_1 = require("../../controller/video/getVideo.controller");
const router = express_1.default.Router();
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
router.route("/upload-video").post(multer_middleware_1.upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo_controller_1.uploadVideo);
router.route("/get-video-list").get(getVideo_controller_1.getVideoList);
module.exports = router;
