import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SearchBar from '../components/SearchBar';
const HomePage = () => {
  return (
    <div>
     
     <>
          <Carousel className="mt-0"
            showThumbs={false}
            swipeable={true}
          >
            <div className={`bg-img2 h-[90vh] bg-cover bg-no-repeat relative`}>
              <p className="para font-serif">Jobs <span className="text-blue-900">fill </span> your pocket, <br /> but <span className="text-blue-900"> adventures</span>  fills <br /> your soul</p>
              <div className="search">
                <SearchBar/>
              </div>
    
              {/* <img src={img1}  style={styles} width={1350}/> */}
            </div>
            <div className={`bg-img1 h-[90vh] bg-cover`}>
              <p className="para"> <span className="text-blue-900">Explore the <span className="text-black">world</span>  <br /> rediscover yourself..</span></p>
              <div className="search">
                <SearchBar/>
              </div>
            </div>
            <div className={`bg-img3 h-[90vh] bg-cover`}>
              <p className="para">To travel is to <span className="text-blue-900">world</span>  <br /> live</p>
              <div className="search">
                <SearchBar/>
              </div>
            </div>
          </Carousel>
    
        </>
    </div>
  )
}

export default HomePage
