"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hlsOptionStrings = void 0;
const hlsOptions = {
    hls_list_size: 0,
    hls_time: 10,
};
exports.hlsOptionStrings = Object.entries(hlsOptions).reduce((acc, [key, value]) => acc.concat(`-${key}`, String(value)), []);
