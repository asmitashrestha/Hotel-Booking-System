import asmita from "../assets/asmita.jpeg";
import aman from "../assets/aman.jpeg";
const Aboutus = () => {
  return (
    <div className="case m-10">
      <h2 className="flex justify-center text-center font-bold text-3xl text-green-950 ">
        About Us
      </h2>
      <div className="flex justify-between flex-wrap mt-16">
        <div className="mb-5 bg-gray-100 p-4 rounded-sm shadow-amber-800 shadow-2xl w-[550px] ">
          <h1 className="text-center font-bold text-xl text-green-950">Who we are ?</h1>
          <p className="font-semibold text-gray-800 text-sm p-5   bg-cyan-50 rounded shadow-blue-300 shadow-lg mt-9 mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing . 
            Expedita aliquam optio mollitia rerum sint excepturi
            omnis eius minima nemo sunt corrupti, vero veritatis 
            dolores, dolor tempora. Sed sequi impedit 
            incidunt.
            </p>
            <p className="font-semibold text-gray-800 text-sm p-5  mt-1  bg-cyan-50 rounded shadow-blue-300 shadow-lg mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing . 
            Expedita aliquam optio mollitia rerum sint excepturi
            omnis eius minima nemo sunt corrupti, vero veritatis 
            dolores, dolor tempora. Sed sequi impedit 
            incidunt.
            </p>
            <p  className="font-semibold text-gray-800 text-sm p-5  mt-1  bg-cyan-50 rounded shadow-blue-300 shadow-lg mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing . 
            Expedita aliquam optio mollitia rerum sint excepturi
            omnis eius minima nemo sunt corrupti, vero veritatis 
            dolores, dolor tempora. Sed sequi impedit 
            incidunt.
            </p>
            <p  className="font-semibold text-gray-800 text-sm p-5  mt-1  bg-cyan-50 rounded shadow-blue-300 shadow-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing . 
            Expedita aliquam optio mollitia rerum sint excepturi
            omnis eius minima nemo sunt corrupti, vero veritatis 
            dolores, dolor tempora. Sed sequi impedit 
            incidunt.
          </p>
        </div>
        <div className="bg-gray-100 px-9 py-6 shadow-amber-900 shadow-2xl">
          <p className="text-center mb-10 text-xl  font-semibold text-gray-900">Our team</p>
          <div className="flex flex-wrap justify-center ">
            <div className="bg-stone-100 h-[320px] w-[250px]  rounded-2xl shadow-stone-950 shadow-2xl mr-5 mb-5">
              <div className="img">
                <img
                  src={asmita}
                  alt="asmita"
                  className="p-5 rounded-full h-[250px] w-[250px]"
                />
                <p className="ml-20 font-semibold text-sm">Asmita Shrestha</p>
              </div>
            </div>

            <div className="bg-stone-100 h-[320px] w-[250px]  rounded-2xl shadow-stone-950 shadow-2xl">
              <div className="img">
                <img
                  src={aman}
                  alt="aman"
                  className="p-5 rounded-full h-[250px] w-[250px]"
                />
                <p className="ml-20 font-semibold text-sm">Aman Singh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
