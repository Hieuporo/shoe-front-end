import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState();
  const [getUserInfo, setGetUserInfo] = useState(false);
  const [fetchCart, setFetchCart] = useState(false);
  const [fetchOrder, setFetchOrder] = useState(false);

  const getUser = async () => {
    const token = Cookies.get("token");

    try {
      if (token) {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user`
        );

        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUserInfo]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        setGetUserInfo,
        getUserInfo,
        fetchCart,
        setFetchCart,
        fetchOrder,
        setFetchOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  return useContext(AppContext);
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, useAppContext };
