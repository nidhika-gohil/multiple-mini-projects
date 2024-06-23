import "./Carousel.css"
import { useEffect, useState } from "react";
import usePhoto from "./util/usePhoto";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photosData = usePhoto();
  const handlePrevClick = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? photosData.length - 1 : prev - 1;
    });
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => {
      // console.log("prevvvvvvvvvvvvvv => ",prev," photosData.length => ",photosData);
      return prev === photosData.length - 1 ? 0 : prev + 1;
    });
  };

  useEffect(()=> {
    const timer = setInterval(() => {
      handleNextClick();
    }, 5000)
    
    // fetchCarouselData();
    return () => {
      clearInterval(timer);
    }
  },[currentIndex]);

  return (
    photosData === undefined || photosData.length === 0  ? (<div>No Data found</div>) : 
    (
      <div className="main-carousel-container">
        <button onClick={handlePrevClick}> Prev </button>
        {
          photosData.map((photo, index) => {
            return (
              <div className={currentIndex === index ? "block" : "d-none"} key={photo.id}>
                {/* {console.log("Indexxxxxxxxxxxxxxx => ",currentIndex)} */}
                <img src={photo.urls.regular} alt= {photo.alt_description} width={300} height={400} />
              </div>
            )
          })
        }
        <button onClick={handleNextClick}> Next </button>
      </div>
    )
  )
};

export default Carousel;