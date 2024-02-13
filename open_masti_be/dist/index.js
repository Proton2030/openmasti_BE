"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIOInstance = void 0;
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./config/db"));
const dotenv = __importStar(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config/config");
dotenv.config({ path: __dirname + "/.env" });
const getIOInstance = () => io;
exports.getIOInstance = getIOInstance;
const httpServer = http_1.default.createServer(app_1.default);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});
(0, db_1.default)();
const PORT = String(config_1.NODE_ENV) === "PROD" || String(config_1.NODE_ENV) === "LOCAL" ? 4008 : String(config_1.NODE_ENV) === "DEV" ? 4009 : "";
const server = httpServer.listen(PORT, () => {
    // logger.log("info", `\x1b[33m \x1b[1m Server is running in ${NODE_ENV} mode on port ${PORT} \x1b[0m`);
    // logger.info({ a: 123, v: 456 });
    io.on("connection", (socket) => {
        //console.log("info", "new socket user" + socket.id);
        socket.on("approval", (message) => {
            socket.broadcast.emit("messageSent", message);
            console.log(message);
        });
    });
});
// process.on("unhandledRejection", (err: any) => {
// 	console.log(`Error: ${err.message}`);
// 	server.close(() => process.exit(1));
// });
