//import style
import styles from "../styles/explore.module.scss";

//import Library
import Head from "next/head";
import { useState, useEffect } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { BiRun, BiQuestionMark } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { useDispatch } from "react-redux";
import Image from "next/image";
import auth0 from "./api/utils/auth0";

// import redux action
import { navbarIcon_action } from "../redux/actions/navbar_icon";
import { navbarName_action } from "../redux/actions/navbar_name";

//import components
import Navbar from "../components/Navbar/navbar";
import ShopBoxForExplore from "../components/For_Explore/shopBox_for_explore";
import Footer from "../components/Reuse/footer";

//import function
import { getWithId, getExplore } from "../lib/function";

export default function Explore(props) {
  const [explore, setExplore] = useState();
  const [filter, setFilter] = useState("none");
  const [selected, setSelected] = useState(
    "bg-gray-100 border-b-8 border-gray-500"
  );
  const [filterArray, setFilterArray] = useState([]);

  const changeFilter_all = async () => {
    setFilter("none");
    setSelected("bg-gray-100 border-b-8 border-gray-500");
  };

  const changeFilter_sports = async () => {
    setFilter("sports");
    const result = explore.filter((data) => data.category == "Sports");
    setFilterArray(result);
    setSelected("bg-gray-100 border-b-8 border-blue-500");
  };

  const changeFilter_food = async () => {
    setFilter("food");
    const result = explore.filter((data) => data.category == "Food");
    setFilterArray(result);
    setSelected("bg-gray-100 border-b-8 border-green-500");
  };

  const changeFilter_fashion = async () => {
    setFilter("fashion");
    const result = explore.filter((data) => data.category == "Fashion");
    setFilterArray(result);
    setSelected("bg-gray-100 border-b-8 border-red-500");
  };

  const changeFilter_others = async () => {
    setFilter("others");
    const result = explore.filter((data) => data.category == "Others");
    setFilterArray(result);
    setSelected("bg-gray-100 border-b-8 border-yellow-500");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navbarIcon_action(props.userDetail.image));
    dispatch(navbarName_action(props.userDetail.name));
    setExplore(props.explore);
  }, []);

  return (
    <div className="w-screen">
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>

      <div>
        <Navbar />
        <div className="bg-gray-100 ">
          <h1 className="grid justify-center pt-10 mb-2 text-xl font-bold text-gray-800 lg:text-2xl md:text-2xl">
            New SHOPS From Others
          </h1>
          <div className="grid grid-cols-5 gap-2 mt-8 mb-8 phone:px-4 xl:mx-10 xl:px-20 w-12/12 place-items-center">
            <button
              onClick={changeFilter_all}
              className={`shadow-sm flex text-3xl group bg-gray-100 focus:text-gray-500 phone:px-3 sm:px-4 lg:px-12 my-3 py-2 justify-center border-gray-400 border-2 rounded-md ${
                filter === "none" ? selected : ""
              }`}
            >
              <div className="flex items-center content-center justify-center justify-items-center">
                <CgMenuGridO className={`text-gray-500`} />
                <p className="ml-0 text-sm font-bold text-gray-500 uppercase md:ml-1 lg:ml-2 phone:hidden md:block">
                  All
                </p>
              </div>
            </button>
            <button
              onClick={changeFilter_sports}
              className={`shadow-sm flex text-3xl group bg-gray-100 focus:text-blue-500 phone:px-3 sm:px-4 lg:px-12 my-3 py-2  justify-center border-gray-400 border-2 rounded-md ${
                filter === "sports" ? selected : ""
              }`}
            >
              <div className="flex items-center content-center justify-center justify-items-center">
                <BiRun className={`text-blue-500`} />
                <p className="ml-0 text-sm font-bold text-blue-500 uppercase md:ml-1 lg:ml-2 phone:hidden md:block">
                  Sports
                </p>
              </div>
            </button>
            <button
              onClick={changeFilter_food}
              className={`shadow-sm flex text-3xl group bg-gray-100 focus:text-green-500 phone:px-3 sm:px-4 lg:px-12 my-3 py-2 justify-center border-gray-400 border-2 rounded-md ${
                filter === "food" ? selected : ""
              }`}
            >
              <div className="flex items-center content-center justify-center justify-items-center">
                <MdRestaurantMenu className={`text-green-500`} />
                <p className="ml-0 text-sm font-bold text-green-500 uppercase md:ml-1 lg:ml-2 phone:hidden md:block">
                  Food
                </p>
              </div>
            </button>
            <button
              onClick={changeFilter_fashion}
              className={`shadow-sm flex text-3xl group bg-gray-100 focus:text-red-500 phone:px-3 sm:px-4 lg:px-12 my-3 py-2 justify-center border-gray-400 border-2 rounded-md ${
                filter === "fashion" ? selected : ""
              }`}
            >
              <div className="flex items-center content-center justify-center justify-items-center">
                <GiClothes className={`text-red-500`} />
                <p className="ml-0 text-sm font-bold text-red-500 uppercase md:ml-1 lg:ml-2 phone:hidden md:block">
                  Fashion
                </p>
              </div>
            </button>
            <button
              onClick={changeFilter_others}
              className={`shadow-sm flex text-3xl group bg-gray-100 focus:text-red-500 phone:px-3 sm:px-4 lg:px-12 my-3 py-2 justify-center border-gray-400 border-2 rounded-md ${
                filter === "others" ? selected : ""
              }`}
            >
              <div className="flex items-center content-center justify-center justify-items-center">
                <BiQuestionMark className={`text-yellow-500`} />
                <p className="ml-0 text-sm font-bold text-yellow-500 uppercase md:ml-1 lg:ml-2 phone:hidden md:block">
                  Others
                </p>
              </div>
            </button>
          </div>
          <div className="min-h-screen pb-6">
            <div
              className={`grid gap-8 ml-12 mr-12 overflow-y-scroll sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 ${styles.listContainer}`}
            >
              {props.explore.length == 0 ? (
                <div className="col-span-4 ">
                  <div className="flex flex-wrap items-center text-gray-600 xl:space-x-10 phone:px-10 sm:px-20 md:px-40 lg:px-60 sm:-mt-8 xl:px-96 xxl:px-48 lg:-mt-4">
                    <Image
                      src="/images/explore.svg"
                      alt="Picture of the author"
                      width={500}
                      height={500}
                    />
                    <p className="mb-20 -mt-20 font-bold phone:text-xl md:text-2xl phone:mb-0 phone:mt-5 xl:mt-0 lg:text-xl xxl:text-2xl lg:mb-0">
                      Sorry !<br /> There is no relevant updates at the
                      moment...
                    </p>
                  </div>
                </div>
              ) : filter === "none" ? (
                explore &&
                explore.map((data) => (
                  <ShopBoxForExplore
                    key={data.id}
                    data={data}
                    filter={filter}
                    navbarUser={props.userDetail}
                  />
                ))
              ) : filterArray.length == 0 ? (
                <div className="flex items-center col-start-1 col-end-4 ml-10 space-x-5">
                  <Image
                    src="/images/dive.svg"
                    alt="Picture of the author"
                    width={400}
                    height={400}
                  />
                  <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl ">
                    Apparently no shop is added recently in this category...
                  </p>
                </div>
              ) : (
                filterArray.map((data) => (
                  <ShopBoxForExplore
                    key={data.id}
                    data={data}
                    filter={filter}
                    navbarUser={props.userDetail}
                  />
                ))
              )}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

// get Props

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = await auth0.getSession(ctx.req, ctx.res);

  if (session) {
    const detail = await getWithId(session.user.email);

    const explore = await getExplore(detail.id);

    return {
      props: { userDetail: detail, explore: explore },
    };
  } else {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
}
