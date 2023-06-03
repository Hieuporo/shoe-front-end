import "./App.css";
import "./css/bootstrap.css";
import "./css/shop.css";
import "./css/style7.css";
import "./css/style.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import Order from "./pages/Order";

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Checkout />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
