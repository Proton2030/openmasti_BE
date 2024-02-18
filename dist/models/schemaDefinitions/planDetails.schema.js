"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const planDetailsSchema = new mongoose_1.Schema({
    plan_name: model_constant_1.default.requiredString,
    plan_price: model_constant_1.default.requiredNumber,
    plan_details: model_constant_1.default.requiredString,
    plan_validty: model_constant_1.default.requiredNumber,
}, schemaOption_1.GENERAL_SCHEMA_OPTIONS);
exports.default = planDetailsSchema;
