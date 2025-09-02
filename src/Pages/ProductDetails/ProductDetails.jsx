import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Loading from "../../Components/Loading/Loading";
import { cartContext } from "../../context/Cart.context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ReactImageGallery from "react-image-gallery";
import Card from "../../Components/Card/Card";
import { wishlistContext } from "../../context/Wishlist.context";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const [productDetails, setproductDetails] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState(null);
  const{addProductToWishlist}=useContext(wishlistContext)

  async function getSpecificProduct() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setproductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`
      );
      setrelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setproductDetails(null);
    getSpecificProduct();
  }, [id]);

  useEffect(() => {
    if (productDetails == null) return;
    getRelatedProducts();
  }, [productDetails]);

  return productDetails ? (
    <>
      <section>
        <div className="productDetails md:grid space-y-3 grid-cols-12 gap-3">
          <div className="md:col-span-3">
            <ReactImageGallery
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
              autoPlay={true}
              lazyLoad={true}
              items={productDetails.images.map((image) => ({
                original: image,
                thumbnail: image,
              }))}
            />
          </div>

          <div className="md:col-span-9 p-5 space-y-2">
            <header>
              <h1 className="font-semibold text-xl text-gray-500">
                {productDetails.title}
              </h1>
              <h2 className="font-bold text-myColor-800">
                {productDetails.category?.name}
              </h2>
            </header>
            <p className="text-slate-500">{productDetails.description}</p>
            <footer className="flex justify-between items-center">
              <div className="font-semibold text-myColor-900">
                {productDetails.price} L.E
              </div>
              <div>
                <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                <span className="font-semibold">
                  {productDetails.ratingsAverage}
                </span>
              </div>
            </footer>
            <div className="buttons flex gap-2">
              <button
                onClick={() => addProductToWishlist(id)}
                className="btn bg-myColor-700 text-white hover:bg-myColor-900 font-semibold"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
              <button
                onClick={() => addProductToCart(id)}
                className="group btn bg-myColor-700 text-white hover:bg-myColor-900 font-semibold grow"
              >
               <i className="fa-solid fa-cart-shopping group-hover:scale-110"></i> Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-myColor-800">
          Related Products in {productDetails.category?.name}
        </h2>

        {relatedProducts ? (
          <Swiper
            className="m-8"
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 6 },
            }}
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <Card product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Loading />
        )}
      </section>
    </>
  ) : (
    <Loading />
  );
}
