import express from "express";
import { uploadVideo } from "../../controller/uploadVideo.controller";
import { upload } from "../../../../middleware/multer.middleware";

const router = express.Router();

router.route("/upload-video").post(upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo);

module.exports = router;