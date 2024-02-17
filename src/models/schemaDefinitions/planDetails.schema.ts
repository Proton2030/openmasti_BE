import { Schema, VirtualTypeOptions } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IPlanDetails } from "../../@types/PlanDetails.interface";


const planDetailsSchema: Schema<IPlanDetails> = new Schema<IPlanDetails>(
   {
        plan_name : SCHEMA_DEFINITION_PROPERTY.requiredString,
        plan_price : SCHEMA_DEFINITION_PROPERTY.requiredNumber,
        plan_details : SCHEMA_DEFINITION_PROPERTY.requiredString,
        plan_validty : SCHEMA_DEFINITION_PROPERTY.requiredNumber,
    },
    GENERAL_SCHEMA_OPTIONS
);

export default planDetailsSchema;
