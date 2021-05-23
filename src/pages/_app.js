import React from 'react'
import App from "next/app";

import { Router } from "next/router";
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

import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
// NProgress.configure({ showSpinner: false});
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, reduxStore }) => {
  const [user, setUser] = React.useState(null)
  // console.log('page props', pageProps);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log('TOKEN', token)
    import('react-facebook-pixel')
      .then(module => module.default)
      .then(ReactPixel => {
        ReactPixel.init('471256527524029')
        ReactPixel.pageView()
      })

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
          localStorage.removeItem("token");
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

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await getProducts()
  const posts = res

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


export default withReduxStore(MyApp);
