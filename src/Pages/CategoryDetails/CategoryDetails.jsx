import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import noProduct from "../../assets/imgs/product-not-found.jpg";
export default function CategoryDetails() {
  const [specifiedCategory, setspecifiedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const { id } = useParams();

  async function getSpecifiedCategory() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setspecifiedCategory(data.data);
      console.log(data.data);

      setCategoryName(data.data[0].category.name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSpecifiedCategory();
  }, [id]);

  return (
    <>
      <section className="py-6 px-4">
        {specifiedCategory ? (
          specifiedCategory.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-center text-myColor-900 mb-6">
                Products in {categoryName || " ..."}
              </h2>
              <div className="grid grid-cols-12 gap-4">
                {specifiedCategory.map((product) => (
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
            <>
              <div className="flex-center flex-col">
                <img src={noProduct} className="w-100 " alt="No Product" />
                <p className="text-lg">
                  Return To <Link className="text-myColor-700 underline" to={"/categories"}>Categories</Link>
                </p>
              </div>
            </>
          )
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
