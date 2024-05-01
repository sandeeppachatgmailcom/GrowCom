import mongoose, { Schema, Model, Document } from "mongoose";
import { UserEntity_Model } from "../../entity/models/User";

// Define the schema
const userSchema: Schema<UserEntity_Model & Document> = new mongoose.Schema({
  humanid: { type: String },
  firstName: {
    type: String,
    required: [true, "enter a valid name"],
    minlength: 3,
  },
  isAdmin:{type:Boolean,default:false,required:true},
  active:{type:Boolean, default:true,required:true},
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
  verified: { type: Boolean },
  web: { type: String },
  lastRevokeDate: { type: Date },
  password:{type:String},
  otp:{type:String},
  admin:{ type: Boolean,default:false },
  user:{ type: Boolean,default:true },
  student:{ type: Boolean,default:false },
  trainer:{ type: Boolean,default:false },
  houseName: { type: String },
  houseNumber: { type: String },
  streetName: { type: String },
  city: { type: String },
  pincode: { type: String },
  otpVerified:{type:Boolean,default:false,required:true},
  otpExpiresAt: { type: Date }, // Field to store the expiration time of OTP
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


 
const userModel: Model<UserEntity_Model & Document> = mongoose.model('User', userSchema);



userSchema.post<UserEntity_Model & Document>("save", function (doc) {
  setTimeout(async () => {
    try {
      // Fetch the document again to ensure we have the latest data
      const updatedDoc = await userModel.findById(doc._id);

      if (updatedDoc) {
        // Update the OTP (Replace this with your OTP generation logic)
        updatedDoc.otp = ''; // Example: Generate a new OTP
        
       // Save the updated document
        await updatedDoc.save();
      } else {
        console.error("Document not found");
      }
    } catch (err) {
      console.error(`Error updating OTP: ${err}`);
    }
  }, 3 * 60 * 1000); // 3 minutes in milliseconds
});
 


export default userModel;
