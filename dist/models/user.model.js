"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_schema_1 = __importDefault(require("./schemaDefinitions/user.schema"));
const userModel = (0, mongoose_1.model)("user_details", user_schema_1.default);
exports.default = userModel;
