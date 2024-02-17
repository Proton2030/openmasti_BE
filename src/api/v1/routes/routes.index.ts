import express from "express";

const app = express();

app.use("/auth", require("./auth/auth.routes"));
app.use("/video", require("./uploadVideo/UploadVideo"));
app.use("/stripe", require("./sripe/stripe.routes"));

module.exports = app;