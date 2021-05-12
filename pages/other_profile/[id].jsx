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
import Navbar from "../../components/Navbar/navbar";
import Visit_profile from "../../components/For_Other_profile/visit_profile";
import Footer from "../../components/Reuse/footer";

//import function
import {
  getWithIdAndMoreDetail,
  getForVisitProfile,
  followedOrNot,
  getFollower,
  getFollowing,
} from "../../lib/function";

export default function OtherProfile(props) {
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
      <Visit_profile
        cuDetail={props.userDetail}
        data={props.userInfo}
        follow={props.follow}
        follower={props.follower}
        following={props.following}
        navbarUser={props.userDetail}
      />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = await auth0.getSession(ctx.req, ctx.res);
  const input = ctx.params.id;

  if (session) {
    const detail = await getWithIdAndMoreDetail(session.user.email);

    const info = await getForVisitProfile(input);

    const data = { input: input, cuid: detail.id };

    const follow = await followedOrNot(data);

    const follower = await getFollower(info.detail.follower);

    const following = await getFollowing(info.detail.following);

    return {
      props: {
        userDetail: detail,
        userInfo: info,
        follow: follow,
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
