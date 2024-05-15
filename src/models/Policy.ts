import mongoose from "mongoose";

import options from "./options";

const policySchema = new mongoose.Schema(
  {
    customer_name: { type: String },
    mobile: { type: String },
    vehicle_number: { type: String },
    insurance_company_name: { type: String },
    insurance_type: {
      type: String,
      enum: ["compressive", "third_party", "sod", "non_motor"],
    },
    motor_insurance_type: {
      type: String,
      enum: ["pvt_car", "gcv_car", "2wh", "misd"],
    },
    net_premium: { type: Number },
    executive: { type: String },
    policy_pdf: { type: String },
    policy_expiry_date: { type: Date },
    fitness_validity: { type: String },
    tex_validity: { type: String },
    puc_validity: { type: String },
    permit_validity: { type: String },
  },
  options
);

policySchema.methods.toJSON = function () {
  var obj: any = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Policy", policySchema);
