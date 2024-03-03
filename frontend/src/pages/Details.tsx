import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import { AiFillStar } from "react-icons/ai"
import GuestInfoForm from "../components/GuestInfoForm"
import Experience from "../components/Experience"

const Details = () => {
  const { tourId } = useParams()
  const { data: tourdetail } = useQuery("viewDetailsById", ()=> apiClient.viewDetailsById(tourId || ""), {
    enabled: !!tourId,
  })
  if(!tourdetail){
    return <></>
  }
  return (
    <div className="space-y-6 ml-5 mt-5">
      <div className="">
        <span className="flex ">
          {Array.from({length: tourdetail.starRating}).map((_,index)=> (
            <AiFillStar key={index} className ="fill-yellow-500"/>
          ))}
        </span>
        <h1 className="text-3xl font-bold text-gray-800 ">{tourdetail.city}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 ">
        {tourdetail.imageUrls.map((image)=>(
          <div className="h-[220px] w-[370px]">
            <img src={image} alt={tourdetail.city} className="
            rounded-md pt-2 border-red-100 w-full h-full object-cover object-center"/>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {tourdetail.facilities.map((facility,index)=> (
          <div key={index} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{tourdetail.description}</div>
      </div>
      <div className="h-fit">
         <GuestInfoForm pricePerPackage={tourdetail.pricePerPackage}
          tourId={tourdetail._id}/>
      </div>
      <Experience />
    </div>
  )
}

export default Details
