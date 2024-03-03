import mongoose, { trusted } from "mongoose";
import { BookingType } from "../shared/types";

export type RatingType ={
  comment: string;
  rating:number;
}


export type TourType = {
  _id: string;
  postedByUserId: string;
  userId: string;
  city: string;
  description: string;
  type: string;
  countPeople: number;
  facilities: string[];
  pricePerPackage: number;
  starRating: number;
  ratings:RatingType[];
  imageUrls: string[];
  lastUpdated: Date;
  bookdate: Date;
  bookings: BookingType[];
};

export const bookingSchema = new mongoose.Schema<BookingType>({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  countPeople:{
    type:Number,
    required:true,
  },
  bookDate:{
    type:Date,
    required:false,
  },
  userId:{
    type:String,
    required:true,
  },
  totalCost:{
    type:Number,
    required:true,
  }

})

const TourSchema = new mongoose.Schema<TourType>(
  {
    userId: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    postedByUserId: { // New field for indicating who posted the tour
      type: String,
      required: false,
    },
    countPeople: {
      type: Number,
      required: true,
    },
    facilities: [
      {
        type: String,
        required: true,
      },
    ],
    pricePerPackage: {
      type: Number,
      required: true,
    },

    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    ratings:[
      {
        comment:{
          type:String,
          required:true,
        },
        rating:{
          type:Number,
          required:true,
          min:1,
          max:5,
        }
      }
    ],
    imageUrls: [
      {
        type: String,
        required: true,
      },
    ],
    lastUpdated: {
      type: Date,
      required: true,
    },
    bookdate: {
      type: Date,
      required: false,
    },
    bookings:[bookingSchema]
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", TourSchema);

export default Tour;

