import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import axios from "axios";
import { useAppContext } from "../context/appContext";

const ProductCart = () => {
  const [cart, setCart] = useState([]);
  const { fetchCart } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);

  const calcTotal = () => {
    const result = cart.reduce((init, product) => {
      return (
        init +
        ((product.price * (100 - product.discount)) / 100) * product.quantity
      );
    }, 0);
    setTotalPrice(result);
  };

  const getcart = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/cart/getAllCartItems`
      );
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    calcTotal();
  }, [cart]);

  useEffect(() => {
    getcart();
  }, [fetchCart]);

  return (
    <div className="checkout-right">
      <h4>
        Your shopping cart contains: <span>{cart.length} Products</span>
      </h4>
      <table className="timetable_sub">
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <CartItem
              key={index}
              product={product}
              index={index}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          ))}
          <tr className="rem1">
            <td className="invert">Total</td>
            <td className="invert-image"></td>
            <td className="invert"></td>
            <td className="invert"></td>
            <td className="invert">{totalPrice}</td>
            <td className="invert"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductCart;
