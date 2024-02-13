import express from "express";

const app = express();

app.use("/video", require("./uploadVideo/UploadVideo"));

module.exports = app;