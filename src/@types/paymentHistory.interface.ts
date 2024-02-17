import { ObjectId, Schema } from "mongoose";
export interface IPlanHistorySchema {
	userId: Schema.Types.ObjectId;
    plan_name:string;
}
