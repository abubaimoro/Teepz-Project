import { Schema,Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const formSchema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Teacher', 'Administrator', 'Other'], required: true },
  agreedToTerms: { type: Boolean, required: true },
}, { timestamps: true });


formSchema.plugin(toJSON);

export const FormModel = model('Form', formSchema);