import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";

import MainSlider from "../../Components/MainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import Loading from "../../Components/Loading/Loading";


export default function Home() {
  const [products, setProducts] = useState(null);
  
  async function getAllProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    getAllProducts();
    
  }, []);

  return (
    <>
  
      <MainSlider />
      <CategorySlider />

      <div className="grid md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-2 gap-3">
        {products ? (
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center min-h-[40vh]">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
