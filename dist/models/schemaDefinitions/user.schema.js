"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const userSchema = new mongoose_1.Schema({
    full_name: model_constant_1.default.optionalNullString,
    email: model_constant_1.default.requiredString,
    is_premium: model_constant_1.default.optionalBoolean,
    validity: model_constant_1.default.optionalNullNumber
}, schemaOption_1.GENERAL_SCHEMA_OPTIONS);
exports.default = userSchema;
