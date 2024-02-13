export {};
import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
		);
		return res.status(StatusCodes.OK).json({});
	}
	next();
});

// app.use(express.json());

app.use(express.json({ limit: "100000kb" }));

app.use("/api/v1", require("./api/v1/routes/routes.index"));

export default app;
