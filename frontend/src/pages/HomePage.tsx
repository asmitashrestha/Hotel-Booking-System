import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import SearchBar from "../components/SearchBar";
import Home from "./Home";
import Services from "./Services";
import Aboutus from "./Aboutus";

const HomePage = () => {
  return (
    <div>
      <>
        <Carousel className="mt-0" showThumbs={false} swipeable={true}>
          <div className="bg-img2 h-screen bg-cover bg-center relative">
            <p className="para font-serif p-[105px] text-xl">
             " Jobs <span className="text-teal-900 font-semibold">fill </span>{" "}
              your pocket, <br /> but{" "}
              <span
                className="text-teal-900
              font-semibold"
              >
                {" "}
                adventures
              </span>{" "}
              fills <br /> your soul."
            </p>
            <div className="search">
              <SearchBar />
            </div>
          </div>
          <div className="bg-img1 h-screen bg-cover bg-center">
            <p className="para p-[105px] text-xl font-semibold">
              {" "}
              <span className="text-white">
                " Explore the <span className="text-yellow-200">world</span>{" "}
                <br /> rediscover yourself.."
              </span>
            </p>
            <div className="search">
              <SearchBar />
            </div>
          </div>
          <div className="bg-img3 h-screen bg-cover bg-center">
            <p className="para p-[105px] font-semibold text-xl">
              "Journey: <span className="text-blue-900"> The best way to </span>
              <span > discover </span> <br /> oneself."
            </p>
            <div className="search">
              <SearchBar />
            </div>
          </div>
        </Carousel>
      </>
      <Home/>
      <Services/>
      <Aboutus/>
    </div>
  );
};

export default HomePage;

