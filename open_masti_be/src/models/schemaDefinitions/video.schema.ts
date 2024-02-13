import { Schema } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IVideo } from "../../@types/video.types";

const videoSchema: Schema<IVideo> = new Schema<IVideo>(
	{
		video_details:SCHEMA_DEFINITION_PROPERTY.requiredString,
		video_title:SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		is_premium_content:SCHEMA_DEFINITION_PROPERTY.optionalBoolean,
		video_url:SCHEMA_DEFINITION_PROPERTY.requiredString,
		thumbnail_url:SCHEMA_DEFINITION_PROPERTY.optionalNullString
	},
	GENERAL_SCHEMA_OPTIONS
);

export default videoSchema;
