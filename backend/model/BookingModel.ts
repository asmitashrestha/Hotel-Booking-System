import mongoose from "mongoose";
import { BookingType } from "../shared/types";


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
    ref:"User"
  },
  totalCost:{
    type:Number,
    required:true,
  }

})

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;