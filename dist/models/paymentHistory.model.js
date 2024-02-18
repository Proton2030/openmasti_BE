"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentHistory_schema_1 = __importDefault(require("./schemaDefinitions/paymentHistory.schema"));
const PlanHistoryModel = (0, mongoose_1.model)("plan_history", paymentHistory_schema_1.default);
exports.default = PlanHistoryModel;
