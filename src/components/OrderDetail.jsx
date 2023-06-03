import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import Swal from "sweetalert2";

const OrderDetail = () => {
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("");
  const { fetchCart, setFetchCart } = useAppContext();

  const createOrder = async () => {
    if (!address) {
      return Swal.fire({
        icon: "error",
        title: "Please fill your address or add product to your cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post("/api/order/createOrder", { address, shipping }, config);
      setAddress("");
      setFetchCart(!fetchCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeShippingMethod = (event) => {
    setShipping(event.target.value);
  };
  return (
    <div className="checkout-left">
      <div className="col-md-12 address_form">
        <h4 style={{ marginLeft: "112px", fontSize: "17px" }}>
          Add a new Details
        </h4>
        <form className="creditly-card-form agileinfo_form">
          <section className="creditly-wrapper wrapper">
            <div className="information-wrapper">
              <div className="first-row form-group">
                <div className="card_number_grids">
                  <div className="card_number_grid_right">
                    <div className="controls">
                      <label className="control-label">Address: </label>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control form-detail"
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  <div className="clear"> </div>
                </div>
                <div className="controls">
                  <label className="control-label">Shipping Method: </label>
                  <select
                    className="form-control form-detail"
                    style={{
                      height: "38px",
                      fontSize: "14px",
                      opacity: "0.7",
                      padding: "0 0 0 12px",
                    }}
                    onChange={handleChangeShippingMethod}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="fast">Fast</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
              </div>
              <button
                className="submit check_out"
                style={{ marginBottom: "20px" }}
                onClick={createOrder}
              >
                Delivery to this Address
              </button>
            </div>
          </section>
        </form>
      </div>
      <div className="clearfix"> </div>
      <div className="clearfix" />
    </div>
  );
};

export default OrderDetail;
