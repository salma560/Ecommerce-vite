import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  async function getAllProducts(page = 1) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
      );


      setProducts((prev) => {
        const unique = new Map();
        [...prev, ...data.data].forEach((item) => unique.set(item._id, item));
        return Array.from(unique.values());
      });

     
      setAllProducts((prev) => {
        const unique = new Map();
        [...prev, ...data.data].forEach((item) => unique.set(item._id, item));
        return Array.from(unique.values());
      });

      setMetadata(data.metadata);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts(1);
  }, []);

  function searchByName(term) {
    setSearchTerm(term);

    if (term === "") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.title.toUpperCase().includes(term.toUpperCase())
      );
      setProducts(filtered);
    }
  }

  return (
    <section className="py-6 px-4">
      {products.length === 0 && loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-myColor-900 border-y-2 border-slate-600 border-opacity-20 p-2">
            All Products
          </h2>

          <div className="searching my-3 text-center">
            <input
              type="search"
              className="form-control w-1/2 px-4 py-2 rounded-3xl border border-gray-300"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => searchByName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-12 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="lg:col-span-2 md:col-span-3 sm:col-span-6 col-span-12"
              >
                <Card product={product} />
              </div>
            ))}
          </div>

          {metadata?.nextPage && !searchTerm && (
            <div className="text-center mt-6">
              <button
                onClick={() => getAllProducts(metadata.nextPage)}
                className="bg-myColor-600 text-white px-4 py-2 rounded hover:bg-myColor-800 transition disabled:opacity-50"
                disabled={loading}
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
