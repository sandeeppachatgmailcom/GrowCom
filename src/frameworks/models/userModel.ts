import mongoose, { Schema, Model, Document } from "mongoose";
import { userEntity } from "../../entity/models/userEntity";

// Define the schema
const userSchema: Schema<userEntity & Document> = new mongoose.Schema({
  humanid: { type: String },
  firstName: {
    type: String,
    required: [true, "enter a valid name"],
    minlength: 3,
  },
  isAdmin:{type:Boolean,default:false,required:true},
  active:{type:Boolean, default:false,required:true},
  lastName: { type: String },
  email: { type: String, required: true, minlength: 4 },
  dateOfBirth: { type: Date },
  fatherName: { type: String },
  motherName: { type: String },
  mob: { type: String },
  role: { type: String, default: "user" },
  approvedBy: { type: String },
  approvedDate: { type: Date },
  deleted: { type: Boolean,default:false },
  profileImage: { type: String },
  status: { type: String, default: "dead" },
  verified: { type: Boolean },
  web: { type: String },
  lastRevokeDate: { type: Date },
  password:{type:String},
  otp:{type:String},
  houseName: { type: String },
  houseNumber: { type: String },
  streetName: { type: String },
  city: { type: String },
  pincode: { type: String },
  otpVerified:{type:Boolean,default:false,required:true},
  address:[
    {
      houseName: { type: String },
      houseNUmber: { type: String },
      streetName: { type: String },
      city: { type: String },
      pincode: { type: String },
    },
  ],
  jobHistory: [
    {
      jobId: { type: String },
      organaisation: { type: String },
      startYear: { type: String },
      endYear: { type: String },
      role: { type: String },
    },
  ],
  academics: [
    {
      course: { type: String },
      starDate: { type: Date },
      endDate: { type: Date },
      mark: { type: Number },
      institute: { type: String },
    },
  ],
});

// Define the model
const userModel: Model<userEntity & Document> = mongoose.model('User', userSchema);

export default userModel;
