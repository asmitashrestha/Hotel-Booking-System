import mongoose, { trusted } from "mongoose";

export type TourType= {
  _id:string;
  userId:string;
  city:string;
  description:string;
  type:string;
  countPeople:number;
  facilities:string[];
  pricePerPackage:number;
  starRating:number;
  imageUrls:string[];
  lastUpdated:Date;
}

const TourSchema = new mongoose.Schema<TourType>({
  userId:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  type:{
    type:String,
    required:true
  },
  countPeople:{
    type:Number,
    required:true
  },
  facilities:[{
    type:String,
    required:true
  }],
  pricePerPackage:{
    type:Number,
    required:true
  },
  starRating:{
    type:Number,
    required:true,
    min:1,
    max:5
  },
  imageUrls:[{
    type:String,
    // required:true
  }],
  lastUpdated:{
    type:Date,
    // required:true
  }
},
{
  timestamps:true
})

const Tour = mongoose.model("Tour", TourSchema)

export default Tour