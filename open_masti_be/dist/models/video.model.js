"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const video_schema_1 = __importDefault(require("./schemaDefinitions/video.schema"));
const videoModel = (0, mongoose_1.model)("video_details", video_schema_1.default);
exports.default = videoModel;
