import { model } from "mongoose";
import { IUserDetails } from "../@types/userDetails.types";
import userSchema from "./schemaDefinitions/user.schema";

const userModel = model<IUserDetails>("user_details", userSchema);

export default userModel;