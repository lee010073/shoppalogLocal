//import style

//import Library
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import auth0 from "./api/utils/auth0";

// import redux action
import { navbarIcon_action } from "../redux/actions/navbar_icon";
import { navbarName_action } from "../redux/actions/navbar_name";

//import component
import Add_shop_form from "../components/For_Add_shop/add_shop_form";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Reuse/footer";

//import function
import { getWithId } from "../lib/function";

export default function AddShop(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navbarIcon_action(props.image));
    dispatch(navbarName_action(props.name));
  }, []);

  return (
    <div>
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <Navbar />
      <Add_shop_form userId={props.id} />
      <Footer />
    </div>
  );
}

//get user info from database
export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = await auth0.getSession(ctx.req, ctx.res);

  if (session) {
    const detail = await getWithId(session.user.email);
    return {
      props: detail,
    };
  } else {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
}
