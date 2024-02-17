import http from "http";
import connectDb from "./config/db";
import * as dotenv from "dotenv";
import app from "./app";
import { NODE_ENV } from "./config/config";

dotenv.config({ path: __dirname + "/.env" });

export const getIOInstance = () => io;

const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
	}
});

connectDb();

const PORT =
	String(NODE_ENV) === "PROD" || String(NODE_ENV) === "LOCAL" ? 4008 : String(NODE_ENV) === "DEV" ? 4009 : "";

const server = httpServer.listen(PORT, () => {
	// logger.log("info", `\x1b[33m \x1b[1m Server is running in ${NODE_ENV} mode on port ${PORT} \x1b[0m`);

	// logger.info({ a: 123, v: 456 });
	io.on("connection", (socket: any) => {
		//console.log("info", "new socket user" + socket.id);
		socket.on("approval", (message: any) => {
			socket.broadcast.emit("messageSent", message);
			console.log(message);
		});
	});
});

// process.on("unhandledRejection", (err: any) => {
// 	console.log(`Error: ${err.message}`);
// 	server.close(() => process.exit(1));
// });
