"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadVideo_controller_1 = require("../../controller/uploadVideo.controller");
const multer_middleware_1 = require("../../../../middleware/multer.middleware");
const router = express_1.default.Router();
router.route("/upload-video").post(multer_middleware_1.upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo_controller_1.uploadVideo);
module.exports = router;
