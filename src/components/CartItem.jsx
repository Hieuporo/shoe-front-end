import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const CartItem = ({ product, index, setTotalPrice }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const { fetchCart, setFetchCart } = useAppContext();

  const [price, setPrice] = useState(
    ((product.price * (100 - product.discount)) / 100) * product.quantity
  );
  const reduceQuantity = async () => {
    if (quantity > 0) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        await axios.patch(
          `${import.meta.env.BASE_URL}/cart/${product.id}`,
          { quantity: quantity - 1 },
          config
        );
        setQuantity((pre) => pre - 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const plusQuantity = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.patch(
        `${import.meta.env.BASE_URL}/cart/${product.id}`,
        { quantity: quantity + 1 },
        config
      );
      setQuantity((pre) => pre + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async () => {
    try {
      await axios.delete(`${import.meta.env.BASE_URL}/cart/${product.id}`);
      setFetchCart(!fetchCart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const newPrice =
      ((product.price * (100 - product.discount)) / 100) * quantity;
    setPrice(newPrice);
    setTotalPrice((prevTotal) => prevTotal - price + newPrice);
  }, [quantity, product.price, product.discount]);
  return (
    <tr className="rem1">
      <td className="invert">{index + 1}</td>
      <td className="invert-image">
        <a href="single.html">
          <img
            src={product.image}
            className="img-responsive img-product-cart"
          />
        </a>
      </td>
      <td className="invert">
        <div className="quantity">
          <div className="quantity-select">
            <div className="entry value-minus" onClick={reduceQuantity}>
              &nbsp;
            </div>
            <div className="entry value">
              <span>{quantity}</span>
            </div>
            <div className="entry value-plus active" onClick={plusQuantity}>
              &nbsp;
            </div>
          </div>
        </div>
      </td>
      <td className="invert">{product.name}</td>
      <td className="invert">{price}</td>
      <td className="invert">
        <div className="rem">
          <div className="close1" onClick={deleteCartItem}>
            {" "}
          </div>
        </div>
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};

export default CartItem;
