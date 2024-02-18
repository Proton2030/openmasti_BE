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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTrailerService = void 0;
const aws_config_1 = require("../config/aws.config");
const uploadTrailerService = (trailersBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: 'open-masti-thumbnail',
        Key: `thumbnails/${Date.now()}_trailer.mp4`,
        Body: trailersBuffer,
        ACL: 'public-read',
    };
    return new Promise((resolve, reject) => {
        aws_config_1.s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Location);
            }
        });
    });
});
exports.uploadTrailerService = uploadTrailerService;
