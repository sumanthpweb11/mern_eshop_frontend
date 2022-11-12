import React from "react";
import Nav from "../../components/home/Nav";
import { useSelector } from "react-redux";
import currencyFormatter from "currency-formatter";
import { discount } from "../../utils/Discount";
import Quantity from "../../components/home/Quantity";
import { FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  incQuantity,
  decQuantity,
  removeItem,
} from "../../store/reducers/cartReducer";
import { useDispatch } from "react-redux";
import { useSendPaymentMutation } from "../../store/services/paymentService";
import { useEffect } from "react";

const Cart = () => {
  const { cart, total } = useSelector((state) => state.cartReducer);

  const { userToken } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const inc = (id) => {
    dispatch(incQuantity(id));
  };

  const dec = (id) => {
    dispatch(decQuantity(id));
  };

  const remove = (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(removeItem(id));
    }
  };

  // Checkout
  const navigate = useNavigate();
  const [doPayment, response] = useSendPaymentMutation();
  console.log("payment response", response);
  const pay = () => {
    if (userToken) {
      doPayment();
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      window.location.href = response?.data?.url;
    }
  }, [response?.data?.url, response?.isSuccess]);
  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="my-container mt-28 "
      >
        {cart.length > 0 ? (
          <>
            <div className="table-container  ">
              <table className="w-full">
                <thead>
                  <tr className="thead-tr ">
                    <th className="th">image1</th>
                    <th className="th">name</th>
                    <th className="th">color</th>
                    <th className="th">size</th>
                    <th className="th">price</th>
                    <th className="th">quantity</th>
                    <th className="th">total</th>
                    <th className="th">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const total = currencyFormatter.format(
                      discount(item.price, item.discount) * item.quantity,
                      {
                        code: "USD",
                      }
                    );
                    return (
                      <tr className="even:bg-gray-50" key={item._id}>
                        <td className="td">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={`/images/${item.image1}`}
                            alt={item.title}
                          />
                        </td>

                        <td className="td font-medium ">{item.title}</td>
                        <td className="td">
                          <span
                            className="block w-[15px] h-[15px] rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>

                        <td className="td">
                          <span className="font-semibold ">{item.size}</span>
                        </td>

                        <td className="td font-bold text-gray-900">
                          {currencyFormatter.format(
                            discount(item.price, item.discount),
                            { code: "USD" }
                          )}
                        </td>

                        <td className="td">
                          <Quantity
                            quantity={item.quantity}
                            inc={() => inc(item._id)}
                            dec={() => dec(item._id)}
                            theme="indigo"
                          />
                        </td>
                        <td className="td font-bold ">{total}</td>
                        <td className="td ">
                          <span className="cursor-pointer ">
                            <FiTrash
                              onClick={() => remove(item._id)}
                              className="text-rose-600"
                              size={20}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* TOTAL AND CHECKOUT */}
            <div className="bg-indigo-50 p-4 flex justify-end mt-5 rounded-md">
              <div>
                <span className="text-lg font-semibold text-indigo-800 mr-10">
                  {currencyFormatter.format(total, { code: "USD" })}
                </span>
                <button
                  onClick={pay}
                  className="btn bg-indigo-600 text-sm font-medium py-2.5"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800">
            Cart is Empty
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
