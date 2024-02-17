import { model } from "mongoose";
import { IPlanDetails } from "../@types/PlanDetails.interface";
import planDetailsSchema from "./schemaDefinitions/planDetails.schema";

const PlanDeatilsModel = model<IPlanDetails>("plan_details", planDetailsSchema);

export default PlanDeatilsModel;
