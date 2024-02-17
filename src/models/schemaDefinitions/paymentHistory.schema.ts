import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IPlanHistorySchema } from "../../@types/paymentHistory.interface";


const paymentHistorySchema: Schema<IPlanHistorySchema> = new Schema<IPlanHistorySchema>(
	{
        userId: SCHEMA_DEFINITION_PROPERTY.requiredObjectId,
        plan_name:SCHEMA_DEFINITION_PROPERTY.requiredString,
	},
	GENERAL_SCHEMA_OPTIONS
);

export default paymentHistorySchema;
