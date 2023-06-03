import { useEffect, useState } from "react";
import Star from "../components/Star";
import SmallProductItem from "../components/SmallProductItem";
import "../css/easy-responsive-tabs.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../context/appContext";
import Rating from "@mui/material/Rating";
import ReviewItem from "../components/ReviewItem";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [option, setOption] = useState("tab1");
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState();

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { fetchCart, setFetchCart } = useAppContext();

  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.post(`/api/cart/${id}`, { quantity }, config);
      setFetchCart(!fetchCart);
      navigate("/cart");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "It already exists in cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleChangeQuantity = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
  };

  const getProductById = async () => {
    try {
      const { data } = await axios.get(`/api/product/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAnotherProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/getFourProducts/${id}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReviews = async () => {
    try {
      const { data } = await axios.get(`/api/review/${id}`);
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendReview = async () => {
    if (!content) {
      return Swal.fire({
        icon: "error",
        title: "Please write a review",
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
      await axios.post(
        `/api/review/${id}`,
        {
          star: rating,
          content,
        },
        config
      );
      getAllReviews();
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById();
    getAnotherProduct();
    getAllReviews();
    window.scrollTo(0, 0);
  }, [id]);

  if (product) {
    return (
      <>
        <div className="banner_top innerpage mt-80" id="home">
          {/* //cart details */}
          {/* search */}

          {/* //search */}
          <div className="clearfix" />
          {/* /banner_inner */}
          <div className="services-breadcrumb_w3ls_agileinfo">
            <div className="inner_breadcrumb_agileits_w3">
              <ul className="short">
                <li>
                  <a href="index.html">Home</a>
                  <i>|</i>
                </li>
                <li>Single</li>
              </ul>
            </div>
          </div>
          {/* //banner_inner */}
        </div>
        {/* //banner */}
        {/* top Products */}
        <div className="ads-grid_shop">
          <div className="shop_inner_inf">
            <div className="col-md-6 single-right-left ">
              <div className="grid images_3_of_2">
                <div className="flexslider">
                  <ul className="slides">
                    <li data-thumb="images/d3.jpg">
                      <div className="thumb-image">
                        {" "}
                        <img
                          src={product.image}
                          data-imagezoom="true"
                          className="img-product"
                        />{" "}
                      </div>
                    </li>
                  </ul>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
            <div className="col-md-6 single-right-left simpleCart_shelfItem">
              <h3>{product.name}</h3>
              <p>
                <span className="item_price">
                  ${(product.price * (100 - product.discount)) / 100}
                </span>
                {product.discount && <del>${product.price}</del>}
              </p>
              <div className="rating1">
                <Star rating={product.averageStar} />
              </div>

              <div className="color-quality">
                <div className="d-flex pt-4 align-items-center">
                  <h5
                    className="mr-3"
                    style={{ marginRight: "12px", fontSize: "16px" }}
                  >
                    Quantity
                  </h5>
                  <select
                    className="form-select"
                    style={{ width: "50px", height: "40px" }}
                    onChange={handleChangeQuantity}
                  >
                    {Array.from({ length: 100 }, (_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="occasion-cart">
                <div className="shoe single-item single_page_b">
                  <form action="#" method="post">
                    <input type="hidden" name="cmd" defaultValue="_cart" />
                    <input type="hidden" name="add" defaultValue={1} />
                    <input
                      type="hidden"
                      name="shoe_item"
                      defaultValue="Chikku Loafers"
                    />
                    <input type="hidden" name="amount" defaultValue={405.0} />
                    <Link to="/cart">
                      <button className="add-to-cart-btn" onClick={addToCart}>
                        ADD TO CART
                      </button>
                    </Link>

                    <a href="#" data-toggle="modal" data-target="#myModal1" />
                  </form>
                </div>
              </div>
            </div>
            <div className="clearfix"> </div>
            {/*/tabs*/}
            <div className="responsive_tabs">
              <div id="horizontalTab">
                <ul className="resp-tabs-list">
                  <li onClick={() => setOption("tab1")}>Description</li>
                  <li onClick={() => setOption("tab2")}>Reviews</li>
                </ul>
                <div className="resp-tabs-container">
                  {option === "tab1" ? (
                    <div className="tab1">
                      <div className="single_page">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="tab2">
                      <div className="single_page">
                        <div className="review-form">
                          <div style={{ width: "100%" }}>
                            <Rating
                              name="text-feedback"
                              value={rating}
                              onChange={(event, newValue) => {
                                setRating(newValue);
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <input
                              placeholder="Write a Review"
                              className="review-input"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                            ></input>
                            <button
                              type="submit"
                              className="btn-review"
                              onClick={sendReview}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                        {reviews &&
                          reviews.map((review) => (
                            <ReviewItem key={review.id} review={review} />
                          ))}
                      </div>
                    </div>
                  )}

                  {/*//tab_one*/}
                </div>
              </div>
            </div>
            {/*//tabs*/}
            {/* /new_arrivals */}
            <div className="new_arrivals">
              <h3>Featured Products</h3>
              {/* /womens */}
              {products &&
                products.map((product, i) => (
                  <div key={i}>
                    <SmallProductItem product={product} />
                  </div>
                ))}
              {/* //womens */}
              <div className="clearfix" />
            </div>
            {/*//new_arrivals*/}
          </div>
        </div>
      </>
    );
  }
};

export default Product;
