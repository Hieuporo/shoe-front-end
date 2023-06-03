import { useEffect, useState } from "react";
import PriceRange from "../components/PriceRange";
import ProductItem from "../components/ProductItem";
import axios from "axios";

const Products = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState([20, 1000]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/product");

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductByBrandAndPrice = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/searchProductByBrandAndPrice?min=${value[0]}&max=${value[1]}&brand=${selectedOption}&name=${search}`
      );
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="mt-80">
      <div className="banner_top innerpage" id="home">
        {/* /banner_inner */}
        <div className="services-breadcrumb_w3ls_agileinfo">
          <div className="inner_breadcrumb_agileits_w3">
            <ul className="short">
              <li>
                <a href="index.html">Home</a>
                <i>|</i>
              </li>
              <li>Shop</li>
            </ul>
          </div>
        </div>
        {/* //banner_inner */}
      </div>
      {/* //banner */}
      {/* top Products */}
      <div className="ads-grid_shop">
        <div className="shop_inner_inf">
          {/* tittle heading */}
          {/* //tittle heading */}
          {/* product left */}
          <div className="side-bar col-md-3">
            <div className="search-hotel">
              <h3 className="agileits-sear-head">Search Here..</h3>
              <input
                type="search"
                placeholder="Product name..."
                name="search"
                className="input-search"
                required=""
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                style={{
                  backgroundColor: "#87CEFA",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  width: "100%",
                  marginTop: "10px",
                  fontSize: "18px",
                }}
                onClick={getProductByBrandAndPrice}
              >
                Search
              </button>
            </div>

            {/* price range */}
            <div className="range">
              <PriceRange value={value} setValue={setValue} />
            </div>
            {/* //price range */}

            {/* discounts */}
            <div className="left-side">
              <h3 className="agileits-sear-head">Brand</h3>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="Nike"
                    value="Nike"
                    className="input-brand"
                    checked={selectedOption === "Nike"}
                    onChange={handleOptionChange}
                  />
                  <div className="brand-name">Nike</div>
                </li>
                <li>
                  <input
                    type="radio"
                    name="Adidas"
                    value="Adidas"
                    className="input-brand"
                    checked={selectedOption === "Adidas"}
                    onChange={handleOptionChange}
                  />
                  <div className="brand-name">Adidas</div>
                </li>
                <li>
                  <input
                    type="radio"
                    name="Puma"
                    value="Puma"
                    className="input-brand"
                    checked={selectedOption === "Puma"}
                    onChange={handleOptionChange}
                  />
                  <div className="brand-name">Puma</div>
                </li>
              </ul>
            </div>

            <div className="deal-leftmk left-side mt-4">
              <h3 className="agileits-sear-head">Special Deals</h3>
              <div className="special-sec1">
                <div className="col-xs-4 img-deals">
                  <img src="./src/images/s4.jpg" alt="" />
                </div>
                <div className="col-xs-8 img-deal1">
                  <h3>Shuberry Heels</h3>
                  <a href="single.html">$180.00</a>
                </div>
                <div className="clearfix" />
              </div>
              <div className="special-sec1">
                <div className="col-xs-4 img-deals">
                  <img src="./src/images/s2.jpg" alt="" />
                </div>
                <div className="col-xs-8 img-deal1">
                  <h3>Chikku Loafers</h3>
                  <a href="single.html">$99.00</a>
                </div>
                <div className="clearfix" />
              </div>
              <div className="special-sec1">
                <div className="col-xs-4 img-deals">
                  <img src="./src/images/s1.jpg" alt="" />
                </div>
                <div className="col-xs-8 img-deal1">
                  <h3>Bella Toes</h3>
                  <a href="single.html">$165.00</a>
                </div>
                <div className="clearfix" />
              </div>
              <div className="special-sec1">
                <div className="col-xs-4 img-deals">
                  <img src="./src/images/s5.jpg" alt="" />
                </div>
                <div className="col-xs-8 img-deal1">
                  <h3>Red Bellies</h3>
                  <a href="single.html">$225.00</a>
                </div>
                <div className="clearfix" />
              </div>
              <div className="special-sec1">
                <div className="col-xs-4 img-deals">
                  <img src="./src/images/s3.jpg" alt="" />
                </div>
                <div className="col-xs-8 img-deal1">
                  <h3>(SRV) Sneakers</h3>
                  <a href="single.html">$169.00</a>
                </div>
                <div className="clearfix" />
              </div>
            </div>
            {/* //deals */}
          </div>
          {/* //product left */}
          {/* product right */}
          <div className="left-ads-display col-md-9">
            <div className="wrapper_top_shop">
              <div className="col-md-6 shop_left">
                <img src="./src/images/banner3.jpg" alt="" />
                <h6>40% off</h6>
              </div>
              <div className="col-md-6 shop_right">
                <img src="./src/images/banner2.jpg" alt="" />
                <h6>50% off</h6>
              </div>
              <div className="clearfix" />
              {/* product-sec1 */}
              <div className="product-sec1">
                {/*/mens*/}
                {products &&
                  products.map((product, i) => (
                    <div key={i}>
                      <ProductItem product={product} />
                    </div>
                  ))}
              </div>
              {/* //product-sec1 */}
              <div className="col-md-12 shop_left shp">
                <h6>21% off</h6>
              </div>

              <div className="col-md-6 shop_left shp">
                <img src="./src/images/banner4.jpg" alt="" />
                <h6>21% off</h6>
              </div>
              <div className="col-md-6 shop_right shp">
                <img src="./src/images/banner1.jpg" alt="" />
                <h6>31% off</h6>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
      {/* //top products */}
      <div className="mid_slider_w3lsagile">
        <div className="col-md-3 mid_slider_text">
          <h5>Some More Shoes</h5>
        </div>
        <div className="col-md-9 mid_slider_info">
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to={0} className="" />
              <li
                data-target="#myCarousel"
                data-slide-to={1}
                className="active"
              />
              <li data-target="#myCarousel" data-slide-to={2} className="" />
              <li data-target="#myCarousel" data-slide-to={3} className="" />
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="item">
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g1.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g2.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g3.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g4.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item active">
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g5.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g6.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g2.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g1.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g1.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g2.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g3.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g4.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g1.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g2.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g3.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-3 slidering">
                    <div className="thumbnail">
                      <img
                        src="./src/images/g4.jpg"
                        alt="Image"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* The Modal */}
          </div>
        </div>
        <div className="clearfix"> </div>
      </div>
      <a
        href="#home"
        id="toTop"
        className="scroll"
        style={{ display: "block" }}
      >
        {" "}
        <span id="toTopHover" style={{ opacity: 1 }}>
          {" "}
        </span>
      </a>
    </div>
  );
};

export default Products;
