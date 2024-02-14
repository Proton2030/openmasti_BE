import { model } from "mongoose";
import { IVideo } from "../@types/video.types";
import videoSchema from "./schemaDefinitions/video.schema";

const videoModel = model<IVideo>("video_details", videoSchema);

export default videoModel;