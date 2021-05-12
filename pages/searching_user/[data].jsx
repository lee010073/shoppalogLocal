//import style

//import Library
import Head from "next/head";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import auth0 from "../api/utils/auth0";

// import redux action
import { navbarIcon_action } from "../../redux/actions/navbar_icon";
import { navbarName_action } from "../../redux/actions/navbar_name";

//import component
import SearchUser from "../../components/For_Searching/search_user";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Reuse/footer";

//import function
import { getWithId, searchingUser } from "../../lib/function";

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
      <SearchUser data={props.search} input={props.input} cuid={props.cuid} />
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

    const user = await searchingUser(input);

    return {
      props: {
        userDetail: detail,
        search: user,
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
