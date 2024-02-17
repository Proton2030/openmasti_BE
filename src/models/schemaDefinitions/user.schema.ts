import { Schema } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IVideo } from "../../@types/video.types";
import { IUserDetails } from "../../@types/userDetails.types";

const userSchema: Schema<IUserDetails> = new Schema<IUserDetails>(
	{
        full_name:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		email:SCHEMA_DEFINITION_PROPERTY.requiredString,
        is_premium:SCHEMA_DEFINITION_PROPERTY.optionalBoolean,
        validity:SCHEMA_DEFINITION_PROPERTY.optionalNullNumber
	},
	GENERAL_SCHEMA_OPTIONS
);

export default userSchema;
