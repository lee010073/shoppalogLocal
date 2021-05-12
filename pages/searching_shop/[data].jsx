//import style

//import Library
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import auth0 from "../api/utils/auth0";

// import redux action
import { navbarIcon_action } from "../../redux/actions/navbar_icon";
import { navbarName_action } from "../../redux/actions/navbar_name";

//import component
import SearchShop from "../../components/For_Searching/search_shop";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Reuse/footer";

//import function
import {
  getWithId,
  getMyProfile,
  searchingShopFromFd,
  searchingAllShop,
} from "../../lib/function";

export default function Searching(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navbarIcon_action(props.userDetail.image));
    dispatch(navbarName_action(props.userDetail.name));
  }, []);
  return (
    <div>
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <Navbar />
      <SearchShop
        data={[...props.onlyFd, ...props.allShop]}
        input={props.input}
        cuid={props.cuid}
        navbarUser={props.userDetail}
      />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = await auth0.getSession(ctx.req, ctx.res);
  const input = ctx.params.data;

  if (session) {
    const detail = await getWithId(session.user.email);

    const data = await getMyProfile(detail.id);

    const ready = { input: input, following: data.detail.following };

    const onlyFd = await searchingShopFromFd(ready);

    const allShop = await searchingAllShop(ready);

    return {
      props: {
        userDetail: detail,
        onlyFd: onlyFd,
        allShop: allShop,
        input: input,
        cuid: detail.id,
      },
    };
  } else {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
}
