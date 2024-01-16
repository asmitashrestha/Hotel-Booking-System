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