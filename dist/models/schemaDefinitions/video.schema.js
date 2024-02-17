"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const videoSchema = new mongoose_1.Schema({
    video_details: model_constant_1.default.requiredString,
    video_title: model_constant_1.default.optionalNullString,
    is_premium_content: model_constant_1.default.optionalBoolean,
    video_url: model_constant_1.default.requiredString,
    thumbnail_url: model_constant_1.default.optionalNullString
}, schemaOption_1.GENERAL_SCHEMA_OPTIONS);
exports.default = videoSchema;
