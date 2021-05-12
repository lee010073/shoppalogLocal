//import style

//import Library
import Head from "next/head";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth0 from "./api/utils/auth0";

// import redux action
import { navbarIcon_action } from "../redux/actions/navbar_icon";
import { navbarName_action } from "../redux/actions/navbar_name";
import { shopArray_action } from "../redux/actions/shop_array";
import { shopQueryArray_action } from "../redux/actions/shop_query_array";

//import components
import Landing from "../components/For_landing/landing";
import HomePage from "../components/For_index/Home/home";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Reuse/footer";
import Loading from "../components/Reuse/loading";

//import function
import {
  getWithId,
  getHomePageList,
  getMyProfile,
  getNewsUpdate,
  CheckDataBase,
  firstDataInput,
} from "../lib/function";

export const ShopContext = createContext();

export default function Home(props) {
  const [loading, setLoading] = useState(false);

  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      navbarIcon_action(props && props.userDetail && props.userDetail.image)
    );
    dispatch(
      navbarName_action(props && props.userDetail && props.userDetail.name)
    );
    dispatch(shopArray_action(props && props.userShopList));
    dispatch(shopQueryArray_action());
  }, []);

  //redux
  const { shopArray } = useSelector((state) => state.shopArray);

  const click = () => {
    setLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      {loading == true ? (
        <div>
          <Loading />
        </div>
      ) : props.login == false && loading == false ? (
        <div>
          <Landing loading={click} />
        </div>
      ) : (
        <div>
          <Navbar />
          <HomePage
            data={shopArray}
            news={props.news}
            navbarUser={props.userDetail}
          />
          <Footer />
        </div>
      )}
    </div>
  );
}

// get Props

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = await auth0.getSession(ctx.req, ctx.res);

  if (session != null) {
    const firstLogin = await CheckDataBase(session.user.email);
    const data = { data: session.user, first: firstLogin };
    const input = await firstDataInput(data);
    console.log(input);

    if (firstLogin == false) {
      const detail = await getWithId(session.user.email);

      const shopList = await getHomePageList(detail.id);

      const data = await getMyProfile(detail.id);

      const news = await getNewsUpdate(data.detail.following);

      return {
        props: {
          userDetail: detail,
          userShopList: shopList,
          news: news,
          login: true,
          first: false,
        },
      };
    } else {
      res.writeHead(302, {
        Location: "/firstRegister",
      });
      res.end();
      return;
    }
  } else {
    return {
      props: { login: false },
    };
  }
}
