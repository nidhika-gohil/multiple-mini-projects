import { useEffect,useState } from "react";
import { GET_PHOTOS } from "./constants";


const usePhoto = () => {
  const [photosData, setPhotosData] = useState([]);
  const fetchCarouselData = async() => {
    let data = await fetch(GET_PHOTOS + "?client_id="+import.meta.env.VITE_UNSPLASH_ACCESS_KEY);
    let list = await data.json();
    setPhotosData(list);
  };

  useEffect(() => {
    fetchCarouselData();
  },[]);
  
  return (photosData);
};

export default usePhoto;