import { model } from "mongoose";
import { IPlanHistorySchema } from "../@types/paymentHistory.interface";
import paymentHistorySchema from "./schemaDefinitions/paymentHistory.schema";

const PlanHistoryModel = model<IPlanHistorySchema>("plan_history", paymentHistorySchema);

export default PlanHistoryModel;
