import mongoose, { Document, Model,  Schema } from "mongoose";
import { VenueModels } from "../../entity/models/venue_model";

const venueSchema :Schema <VenueModels & Document> = new mongoose.Schema({
    active:{type:Boolean,default:true},
    deleted:{type:Boolean,default:false},
    venueName:{type:String},
    venueId:{type:String}

})

const venuModel:Model<VenueModels & Document>  = mongoose.model('venue',venueSchema);

export default venuModel;