import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom"; // 👈 إضافة Link

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getBrands(page = 1) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands?page=${page}`
      );
      setBrands((prev) => [...prev, ...data.data]);
      setMetadata(data.metadata);
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands(1);
  }, []);

  return (
    <section className="py-6 px-4">
      {brands.length === 0 && loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-myColor-900 border-y-2 border-slate-600 border-opacity-20 p-2">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-12 gap-4">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2"
              >
                <Link to={`/brand/${brand._id}`}>
                  <div className="cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg bg-white transition group hover:scale-[1.02]">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-myColor-900">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {metadata?.nextPage && (
            <div className="text-center mt-6">
              <button
                onClick={() => getBrands(metadata.nextPage)}
                disabled={loading}
                className="bg-myColor-900 text-white px-4 py-2 rounded hover:bg-myColor-800 transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
