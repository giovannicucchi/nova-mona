import React from 'react'
import App from "next/app";

import Cookie from "js-cookie";
import AuthContext from '../context/AuthContext'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import { getCategories, getBanners, getProducts } from '../utils/api'

import "../styles/styles.scss";
import Loading from "../components/Other/Loading";
import withReduxStore from "../common/with-redux-store";

const MyApp = ({ Component, pageProps, reduxStore }) => {
  const [user, setUser] = React.useState(null)

  
  // console.log('page props', pageProps);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log('TOKEN', token)
    import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
          ReactPixel.init("3208084489267232");
          ReactPixel.pageView();
          router.events.on("routeChangeComplete", () => {
            ReactPixel.pageView();
          });
        });

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          localStorage.remove("token");
          setUser(null)
          return null;
        }
        const user = await res.json();
        setUserState(user)
      });
    }
  }, [])

  const setUserState = (user) => {
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: !!user,
        setUser: setUserState,
      }}
    >
      <Provider store={reduxStore}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Component {...pageProps} />
          <ToastContainer position="bottom-left" autoClose={3000} />
          <ScrollToTop
            smooth
            component={<i className="fal fa-arrow-to-top" />}
            style={{
              backgroundColor: "#f7f5f4",
              borderRadius: "999px",
              height: "50px",
              width: "50px",
            }}
          />
        </PersistGate>
      </Provider>
    </AuthContext.Provider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const categories = await getCategories();
  const banners = await getBanners();
  const products = await getProducts();
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories, banners, products, path: ctx.pathname } };
};

export default withReduxStore(MyApp);
