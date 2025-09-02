import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const [categories, setcategories] = useState(null);

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setcategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Swiper
        className="m-8"
        modules={[Autoplay]}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
        }}
      >
        {categories ? (
          categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link  to={`/categoryDetails/${category._id}`}>
                <div className="category-slide text-center cursor-pointer">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-60 object-contain md:object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </Swiper>
    </>
  );
}
