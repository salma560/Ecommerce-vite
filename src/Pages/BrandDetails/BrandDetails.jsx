import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import noProduct from "../../assets/imgs/product-not-found.jpg";

export default function BrandDetails() {
  const [brandProducts, setBrandProducts] = useState(null); // ← المنتجات المرتبطة بالماركة
  const [brandName, setBrandName] = useState(null); // ← اسم الماركة
  const [loading, setLoading] = useState(false); // ← حالة التحميل
  const { id } = useParams();

  async function getSpecificBrand(brandId) {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
      );

      setBrandProducts(data.data);

      if (data.data.length > 0) {
        setBrandName(data.data[0].brand?.name || "Unknown");
      }
    } catch (error) {
      console.error("Error loading brand products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getSpecificBrand(id);
    }
  }, [id]);

  return (
    <section className="py-6 px-4">
      {loading ? (
        <Loading />
      ) : brandProducts ? (
        brandProducts.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-myColor-900 mb-6">
              Products in {brandName || " ..."}
            </h2>

            <div className="grid grid-cols-12 gap-4">
              {brandProducts.map((product) => (
                <div
                  key={product._id}
                  className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2"
                >
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src={noProduct} className="w-100 " alt="No Product" />
            <p className="text-lg">
              Return To
              <Link className="text-myColor-700 underline" to={"/brands"}>
               Brands
              </Link>
            </p>
          </div>
        )
      ) : (
        <Loading />
      )}
    </section>
  );
}
