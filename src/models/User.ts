import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import * as common from "../utils/common";
import options from "./options";

import { Role, UserIF } from "../types/UserIF";

const userSchema = new mongoose.Schema<UserIF>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, set: common.hash },
    phone: { type: Number, required: true },
    role: { type: String, enum: Role, default: Role.EMPLOYEE },
    is_disabled: { type: Boolean, default: false },
  },
  options
);

userSchema.methods.toJSON = function () {
  var obj: any = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.checkPassword = async function (password: string) {
  const context: any = this;
  if (common.hash(password) === context.password) {
    return this;
  }
  throw { status: 401 };
};

userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema);
