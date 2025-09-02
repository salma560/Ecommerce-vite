import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/User.context";

export default function Orders() {
  const { token } = useContext(UserContext);
  const { id } = jwtDecode(token);

  const [userOrders, setuserOrders] = useState(null);

  async function getUserOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setuserOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>

      {userOrders ? (
        userOrders.map((order) => (
          <section key={order.id} className="mb-6">
            <div className="order border-2 border-slate-300 p-4 rounded-md shadow-sm">
              <header className="flex justify-between items-center py-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-600">
                    Order Id
                  </h2>
                  <h3 className="text-lg font-semibold text-myColor-800">
                    #{order.id}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.isDelivered ? (
                    <span className="py-1 px-3 rounded-lg text-white bg-lime-600 font-semibold text-sm">
                      Delivered successfully
                    </span>
                  ) : (
                    <span className="py-1 px-3 rounded-lg text-white bg-red-600 font-semibold text-sm">
                      In the delivery process
                    </span>
                  )}
                  {order.isPaid ? (
                    <span className="py-1 px-3 rounded-lg text-white bg-lime-600 font-semibold text-sm">
                      Paid
                    </span>
                  ) : (
                    <span className="py-1 px-3 rounded-lg text-white bg-red-600 font-semibold text-sm">
                      Unpaid
                    </span>
                  )}
                </div>
              </header>

              <div className="grid grid-cols-12 gap-4 mt-4">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="md:col-span-3 lg:col-span-2 border p-2 rounded-md shadow-sm col-span-12 sm:col-span-6 space-y-1"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-full "
                    />
                    <h3 className="font-bold text-slate-600 text-sm mt-2 line-clamp-2">
                      {item.product.title}
                    </h3>
                    <h4 className="text-myColor-800 font-semibold text-sm">
                      {item.price} L.E
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Quantity: {item.count}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg text-slate-700 font-semibold mt-3">
                Total Order Price :{" "}
                <span className="text-myColor-700">
                  {order.totalOrderPrice} L.E
                </span>
              </h3>
            </div>
          </section>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
}
