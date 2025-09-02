import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Categories() {
  const [allCategories, setAllCategories] = useState(null);
  const [numOfCategories, setNumOfCategories] = useState(0);

  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setAllCategories(data.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <section className="py-6 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center p-2 border-slate-600 border-opacity-20  text-myColor-900 border-y-2 ">
        Shop by Categories
      </h2>
      {allCategories ? (
        <div className="grid grid-cols-12 gap-4">
          {allCategories.map((category) => (
            <Link
              to={`/categoryDetails/${category._id}`}
              key={category._id}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 rounded group"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-myColor-900">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}
