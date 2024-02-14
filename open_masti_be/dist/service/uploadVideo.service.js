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
exports.uploadVideoService = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const aws_config_1 = require("../config/aws.config");
const outputDirectory = '/tmp/output';
const uploadVideoService = (videoBuffer, videoName, videoDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = Date.now();
    const outputDirectoryPath = path_1.default.join(outputDirectory, `playlist_${timestamp}`);
    yield promises_1.default.mkdir(outputDirectoryPath);
    const inputFilePath = path_1.default.join(outputDirectoryPath, 'input.mp4');
    yield promises_1.default.writeFile(inputFilePath, videoBuffer);
    yield new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)()
            .input(inputFilePath)
            .addOptions([
            '-profile:v baseline',
            '-level 3.0',
            '-start_number 0',
            '-hls_time 10',
            '-hls_list_size 0',
            '-f hls',
        ])
            .output(path_1.default.join(outputDirectoryPath, 'playlist.m3u8'))
            .on('end', resolve)
            .on('error', (err) => reject(new Error(`Error during ffmpeg conversion: ${err.message}`)))
            .run();
    });
    try {
        const files = yield promises_1.default.readdir(outputDirectoryPath);
        yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const filePath = path_1.default.join(outputDirectoryPath, file);
            const s3Params = {
                Bucket: aws_config_1.bucketName,
                Key: `${videoName + '_' + timestamp}/playlist_${timestamp}/${file}`,
                Body: yield promises_1.default.readFile(filePath),
                ContentType: file.endsWith('.m3u8') ? 'application/vnd.apple.mpegurl' : 'video/MP2T',
                ACL: 'public-read',
            };
            yield aws_config_1.s3.upload(s3Params).promise();
        })));
        const s3Url = `https://${aws_config_1.bucketName}.s3.amazonaws.com/${videoName + '_' + timestamp}/playlist_${timestamp}/playlist.m3u8`;
        return s3Url;
    }
    finally {
        yield promises_1.default.unlink(inputFilePath); // Delete the temporary input file
        yield promises_1.default.rmdir(outputDirectoryPath, { recursive: true });
    }
});
exports.uploadVideoService = uploadVideoService;
