import React, { useEffect, useState } from 'react'
import image1 from "../assets/Screenshot_2024-09-13-06-00-12-85_1c337646f29875672b5a61192b9010f9.jpg";
import image2 from "../assets/Screenshot_2024-09-13-06-03-03-95_1c337646f29875672b5a61192b9010f9.jpg";
import image3 from "../assets/Screenshot_2024-09-13-06-03-54-29_1c337646f29875672b5a61192b9010f9.jpg";

function EntrancePage() {
    const [animatedImage, setAnimatedImage] = useState(image1);

    useEffect(() => {
      const timer = setInterval(() => {
        setAnimatedImage((prevImage) => {
          if (prevImage === image1) {
            return image2;
          } else if (prevImage === image2) {
            return image3;
          } else {
            return image1;
          }
        });
      }, 2000);
      return () => clearInterval(timer);
    }, []);
  return (
    <div className="flex items-center justify-center relative">
          <img
            className="object-cover h-[40rem] relative top-[1rem]"
            src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones-2x.png?__makehaste_cache_breaker=73SVAexZgBW"
            alt=""
            loading="lazy"
          />
          <img
            className="object-cover h-[35rem] absolute w-[16.8rem] right-[3.18rem] rounded-[1.5rem] bottom-[2.8rem]"
            src={animatedImage}
            alt=""
            loading="lazy"
          />
        </div>
  )
}

export default EntrancePage