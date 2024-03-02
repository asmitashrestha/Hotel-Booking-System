import { TourType } from "../model/TourModel"


export type UserType = {
  _id: string;
  name:string;
  email:string;
  passwrod:string;
}

export type TourSearchResponse = {
  data: TourType[],
  pagination: {
    total:number;
    page:number;
    pages:number;
  }
}
export type BookingType ={
  _id:string;
  userId:string;
  name:string;
  email:string;
  countPeople:number;
  bookDate:Date;
  totalCost:number;
}

export type PaymentIntentResponse ={
  paymentIntentId: string;
  clientsecret: string;
  totalCost:number;
}

export { TourType };
