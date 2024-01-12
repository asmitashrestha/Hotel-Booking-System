import { TourType } from "../model/TourModel"


export type TourSearchResponse = {
  data: TourType[],
  pagination: {
    total:number;
    page:number;
    pages:number;
  }
}