import React from "react";
import sliderImage1 from "../../assets/imgs/slider-image-1.jpeg";
import sliderImage2 from "../../assets/imgs/slider-image-2.jpeg";
import sliderImage3 from "../../assets/imgs/slider-image-3.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from 'swiper/modules';

import "swiper/css";

export default function MainSlider() {
  return (
    <div className="mainSlider grid grid-cols-12">
      <div className="mainImg md:col-span-8 col-span-12">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="h-full"
        >
          <SwiperSlide>
            <img
              src={sliderImage1}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={sliderImage2}
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={sliderImage3}
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="farayImg md:col-span-4 col-span-6 flex md:flex-col ">
        <img src={sliderImage1} alt="Thumbnail 1" className="w-full h-full object-cover" />
        <img src={sliderImage2} alt="Thumbnail 2" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
