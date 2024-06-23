import "./Carousel.css"
import { useEffect, useState } from "react";
import { GET_PHOTOS } from "./util/constants";

const Carousel = () => {
  const [photosData, setPhotosData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCarouselData = async() => {
    let data = await fetch(GET_PHOTOS+"?client_id="+import.meta.env.VITE_UNSPLASH_ACCESS_KEY);
    let list = await data.json();
    setPhotosData(list);
  };

  const handlePrevClick = () => {
    currentIndex === 0 ? setCurrentIndex(photosData.length - 1) : setCurrentIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    currentIndex === photosData.length - 1 ? setCurrentIndex(0) : setCurrentIndex((prev) => prev + 1);
  };
  useEffect(()=> {
    fetchCarouselData();
  },[]);

  return (
    photosData.length === 0 || photosData === undefined ? (<div>No Data found</div>) : 
    (
      <div className="main-carousel-container">
        <button onClick={handlePrevClick}> Prev </button>
        <div>
          <img src={photosData[currentIndex].urls.regular} alt= {photosData[currentIndex].alt_description} width={300} height={400} />
        </div>
        <button onClick={handleNextClick}> Next </button>
        {/* {
          photosData.map((photo, index) => {
            return (
              <div key={photo.id}>
                <img src={photo.urls.regular} width={100} height={200}/>
              </div>
            )
          })
        } */}
      </div>
    )
  )
};

export default Carousel;