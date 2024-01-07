
export type TourFormData = {
  city:string;
  description:string;
  type:string;
  pricePerPackage:number;
  starRating:number;
  facilities:string[];
  imageFiles: FileList;
  countPeople:number;
}

const ManagePackageForm = () => {
  return (
    <div>
    <form >
      <div>
        <label htmlFor="city" >City</label>
        <input type="text" id="city" name="city" />
      </div>
      <div>
        <label htmlFor="description" >Description</label>
        <input type="text" id="description" name="description" />
      </div>
      <div>
        <label htmlFor="price" >Price</label>
        <input type="number" id="price" name="price" />
      </div>
      <div>
        <label htmlFor="rating" >Star Rating</label>
        <input type="number" id="rating" name="rating" />
      </div>
      <div>
      
  <label htmlFor="facilities" >Facilities</label>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
      </div>
    </form>
    </div>
  )
}

export default ManagePackageForm
