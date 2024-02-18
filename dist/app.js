"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_middleware_1 = __importDefault(require("./middleware/swagger.middleware"));
const app = (0, express_1.default)();
const serverTimeoutInMilliseconds = 60 * 60 * 1000; // 60 minutes
app.set('server.timeout', serverTimeoutInMilliseconds);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
        return res.status(http_status_codes_1.StatusCodes.OK).json({});
    }
    next();
});
app.use(express_1.default.json({ limit: "100000kb" }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_middleware_1.default));
app.use("/api/v1", require("./api/v1/routes/routes.index"));
exports.default = app;
