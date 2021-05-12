//import style

//import Library
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import auth0 from "./api/utils/auth0";

//import component
import My_profile from "../components/For_My-Profile/my_profile";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Reuse/footer";

//import redux action
import { navbarIcon_action } from "../redux/actions/navbar_icon";
import { navbarName_action } from "../redux/actions/navbar_name";
import { userDescription_action } from "../redux/actions/user_description";

//import function
import {
  getWithId,
  getMyProfile,
  getFollower,
  getFollowing,
} from "../lib/function";

export default function MyProfile(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navbarIcon_action(props.userInfo.image));
    dispatch(navbarName_action(props.userInfo.name));
    dispatch(userDescription_action(props.userData.detail.myDescription));
  }, []);

  return (
    <div>
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <Navbar />
      <My_profile
        data={props.userData}
        follower={props.follower}
        following={props.following}
      />
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

    const data = await getMyProfile(detail.id);

    const follower = await getFollower(data.detail.follower);

    const following = await getFollowing(data.detail.following);

    return {
      props: {
        userInfo: detail,
        userData: data,
        follower: follower,
        following: following,
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
