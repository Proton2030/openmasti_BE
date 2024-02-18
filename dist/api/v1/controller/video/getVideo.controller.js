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
exports.getVideoList = void 0;
const video_model_1 = __importDefault(require("../../../../models/video.model"));
const message_1 = require("../../../../constants/message");
const getVideoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const response = yield video_model_1.default.find(filter).lean();
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: response
        });
    }
    catch (err) {
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail,
            err
        });
    }
});
exports.getVideoList = getVideoList;
