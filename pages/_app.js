//import style
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";

//import Library
import { useState, useEffect } from "react";
import Router from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider as ReduxProvider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";

//import redux store
import store from "../redux/store";

//import components
import Loading from "../components/Reuse/loading";

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Router.onRouteChangeStart = (url) => {
      setLoading(true);
    };

    Router.onRouteChangeComplete = (url) => {
      setLoading(false);
    };

    Router.onRouteChangeError = (err, url) => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <ReduxProvider store={store}>
        {isLoading ? <Loading /> : <Component {...pageProps} />}
      </ReduxProvider>
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
        position="bottom-center"
        autoClose={3000}
      />
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
