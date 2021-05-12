//import style
import styles from "./home.module.scss";

//import Library
import React, { useState, useContext, useEffect } from "react";
import Fuse from "fuse.js";
import { useSelector, useDispatch } from "react-redux";
import { CgMenuGridO } from "react-icons/cg";
import { BiRun, BiQuestionMark } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import ReactTooltip from "react-tooltip";
import useOnclickOutside from "react-cool-onclickoutside";
import Image from "next/image";

//import function
import { ShopContext } from "../../../pages/index";

//import component
import ShopBox from "./shopBox_home";
import ShopBoxForNewsUpdate from "../New_update/shopBox_for_newsUpdate";
import NoNews from "../../Reuse/noNews";
import NoShop from "../../Reuse/noShop";

//import redux action
import { shopQueryArray_action } from "../../../redux/actions/shop_query_array";
import { shopArray_action } from "../../../redux/actions/shop_array";

const HomePage = (props) => {
  // for mobile friends update design
  const [list, setList] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const ref = useOnclickOutside(() => {
    setToggleSidebar(true);
  });

  //end
  const [unknownShopResult, setUnknownShopResult] = useState(undefined);
  const [searchButton, setSearchButton] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(
    "bg-gray-100 border-b-8 border-gray-500 shadow-md"
  );

  //redux
  const dispatch = useDispatch();
  const { shopArray } = useSelector((state) => state.shopArray);
  const { shopQueryArray } = useSelector((state) => state.shopQueryArray);

  //Using fuse to perform Search
  const options = {
    includeScore: true,
    includeMatches: true,
    keys: ["link", "nickname", "category", "subCategory"],
  };
  const fuse = new Fuse(shopArray, options);

  const searchInput = (e) => {
    const result = fuse.search(e.target.value);
    const shopResult = result.map((shop) => shop.item);
    if (shopResult.length === 0 && e.target.value.length > 0) {
      // setQuery(shopArray);
      //dispatch(shopQueryArray_action(shopArray));
      dispatch(shopQueryArray_action([]));
      setUnknownShopResult("none");
    } else if (shopResult.length === 0 && e.target.value.length === 0) {
      dispatch(shopQueryArray_action(shopArray));
      setUnknownShopResult(undefined);
    } else {
      dispatch(shopQueryArray_action(shopResult));
      setUnknownShopResult(undefined);
    }
  };

  const filterAll = () => {
    document.getElementById("searchInput").value = null;
    searchInput({ target: { value: "" } });
    setFilter("All");
    setSelected(
      "bg-gray-100 shadow-md border-2 border-b-8 border-gray-600 text-bg-700"
    );
  };

  const filterSport = (e) => {
    document.getElementById("searchInput").value = null;
    searchInput({ target: { value: "" } });
    setFilter("Sports");
    setSelected(
      "bg-gray-100 shadow-md border-2 border-b-8 border-blue-500 text-bg-500"
    );
  };

  const filterFood = (e) => {
    document.getElementById("searchInput").value = null;
    searchInput({ target: { value: "" } });
    setFilter("Food");
    setSelected(
      "bg-gray-100 shadow-md border-2 border-b-8 border-green-500 text-bg-500"
    );
  };

  const filterFashion = (e) => {
    document.getElementById("searchInput").value = null;
    searchInput({ target: { value: "" } });
    setFilter("Fashion");
    setSelected(
      "bg-gray-100 shadow-md border-2 border-b-8 border-red-500 text-bg-500"
    );
  };

  const filterOthers = (e) => {
    document.getElementById("searchInput").value = null;
    searchInput({ target: { value: "" } });
    setFilter("Others");
    setSelected(
      "bg-gray-100 shadow-md border-2 border-b-8 border-yellow-500 text-bg-500"
    );
  };

  return (
    <div className="bg-gray-100 ">
      <div className="min-h-screen pt-6 pb-6 md:px-6 phone:px-4">
        <div className="flex justify-between w-full mx-auto ">
          <div className="phone:w-full xxl:w-9/12 xl:mr-4">
            <h1 className="text-xl font-bold text-gray-700 lg:text-2xl md:text-2xl phone:text-xl">
              Total Shops: {shopArray && shopArray.length}
            </h1>
            <div className="grid items-start w-full grid-cols-5 sm:mt-12 phone:mt-8 phone:px-2 phone:gap-1 lg:-ml-14 sm:px-14 sm:gap-4">
              <button
                onClick={filterAll}
                className={`flex text-3xl group bg-gray-100 focus:text-gray-700 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                  filter === "All" ? selected : ""
                }`}
              >
                <div className="flex items-center content-center justify-center justify-items-center">
                  <CgMenuGridO className={`text-gray-500`} />
                  <p className="ml-0 text-sm font-bold text-gray-500 uppercase phone:hidden md:block md:ml-1 lg:ml-2">
                    All
                  </p>
                </div>
              </button>

              <button
                onClick={filterSport}
                className={`flex text-3xl group bg-gray-100 focus:text-blue-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                  filter === "Sports" ? selected : ""
                }`}
              >
                <div className="flex items-center content-center justify-center justify-items-center">
                  <BiRun className={`text-blue-500`} />
                  <p className="ml-0 text-sm font-bold text-blue-500 uppercase phone:hidden md:block md:ml-1 lg:ml-2">
                    Sports
                  </p>
                </div>
              </button>
              <button
                onClick={filterFood}
                className={`flex text-3xl group bg-gray-100 focus:text-green-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                  filter === "Food" ? selected : ""
                }`}
              >
                <div className="flex items-center content-center justify-center justify-items-center">
                  <MdRestaurantMenu className={`text-green-500`} />
                  <p className="ml-0 text-sm font-bold text-green-500 uppercase phone:hidden md:block md:ml-1 lg:ml-2">
                    Food
                  </p>
                </div>
              </button>
              <button
                onClick={filterFashion}
                className={`flex text-3xl group bg-gray-100 focus:text-red-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                  filter === "Fashion" ? selected : ""
                }`}
              >
                <div className="flex items-center content-center justify-center justify-items-center">
                  <GiClothes className={`text-red-500`} />
                  <p className="ml-0 text-sm font-bold text-red-500 uppercase phone:hidden md:block md:ml-1 lg:ml-2">
                    Fashion
                  </p>
                </div>
              </button>
              <button
                onClick={filterOthers}
                className={`flex text-3xl group bg-gray-100 focus:text-red-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                  filter === "Others" ? selected : ""
                }`}
              >
                <div className="flex items-center content-center justify-center justify-items-center">
                  <BiQuestionMark className={`text-yellow-500`} />
                  <p className="ml-0 text-sm font-bold text-yellow-500 uppercase phone:hidden md:block md:ml-1 lg:ml-2">
                    Others
                  </p>
                </div>
              </button>
            </div>
            <div>
              {/* for searching */}
              <div className="flex flex-col my-2 phone:flex-col md:flex-col lg:flex-row">
                <div className="relative block">
                  <button
                    className="absolute inset-y-0 left-0 flex items-center h-full pl-2"
                    onClick={() => setSearchButton(!searchButton)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <input
                    id="searchInput"
                    placeholder="Search your list"
                    className="block w-full py-4 pl-10 pr-6 my-2 text-gray-700 bg-white border-gray-400 shadow-md appearance-none text-md rounded-xl mr-60 focus:bg-white focus:placeholder-gray-500 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onChange={searchInput}
                  />
                </div>
              </div>
            </div>
            {/* another useContext required to update the state of query when delete? */}

            <div
              className={`grid gap-4 p-2 mt-0 overflow-y-scroll phone:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ${styles.listContainer}`}
            >
              {shopArray.length === 0 ? (
                <div className="items-center col-start-1 col-end-4 ml-2 space-x-5">
                  <NoShop />
                </div>
              ) : filter == "All" ? (
                shopQueryArray ? (
                  unknownShopResult == "none" ? (
                    // no search result
                    <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                      <Image
                        src="/images/link.svg"
                        alt="Picture of the author"
                        width={600}
                        height={600}
                      />
                      <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                        Sorry, We cannot found any site in this category at the
                        moment...
                      </p>
                    </div>
                  ) : (
                    shopQueryArray.map((item) => (
                      <ShopBox
                        key={item.id}
                        data={item}
                        navbarUser={props.navbarUser}
                      />
                    ))
                  )
                ) : (
                  shopArray.map((item) => (
                    <ShopBox
                      key={item.id}
                      data={item}
                      navbarUser={props.navbarUser}
                    />
                  ))
                )
              ) : shopQueryArray ? (
                unknownShopResult == "none" ? (
                  // no search result
                  <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                    <Image
                      src="/images/link.svg"
                      alt="Picture of the author"
                      width={600}
                      height={600}
                    />
                    <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                      Sorry, We cannot found any site in this category at the
                      moment...
                    </p>
                  </div>
                ) : shopQueryArray.filter((obj) => obj.category == filter)
                    .length == 0 ? (
                  // no shop is added in this category
                  <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                    <Image
                      src="/images/dive.svg"
                      alt="Picture of the author"
                      width={400}
                      height={400}
                    />
                    <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                      Apparently no shop is added in this category...
                    </p>
                  </div>
                ) : (
                  shopQueryArray
                    .filter((obj) => obj.category == filter)
                    .map((item) => (
                      <ShopBox
                        key={item.id}
                        data={item}
                        navbarUser={props.navbarUser}
                      />
                    ))
                )
              ) : shopArray.filter((obj) => obj.category == filter).length ==
                0 ? (
                // no shop is added in this category
                <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                  <Image
                    src="/images/dive.svg"
                    alt="Picture of the author"
                    width={400}
                    height={400}
                  />
                  <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                    Apparently no shop is added in this category...
                  </p>
                </div>
              ) : (
                shopArray
                  .filter((obj) => obj.category == filter)
                  .map((item) => (
                    <ShopBox
                      key={item.id}
                      data={item}
                      navbarUser={props.navbarUser}
                    />
                  ))
              )}
            </div>
          </div>

          <div className="hidden w-3/12 xxl:block">
            <div className="">
              <div className="flex flex-row space-x-2 text-gray-700">
                <h1 className="mb-4 ml-8 text-2xl font-bold text-gray-700">
                  Updates
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className={`overflow-y-scroll ${styles.newsContainer} px-8`}>
                {props.news.length == 0 ? (
                  <NoNews />
                ) : (
                  props.news.map((data) => (
                    <ShopBoxForNewsUpdate
                      key={data.id}
                      data={data}
                      navbarUser={props.navbarUser}
                      phone={false}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Mobile below */}
          <div className="phone:block">
            <div
              ref={ref}
              className={
                (toggleSidebar ? "sidebar " : "") +
                "pt-12 overflow-y-scroll fixed left-0 h-79vh h-full phone:w-11/12 sm:w-auto mr-12 pr-6 border-r-2 border-gray-300 bg-white px-6 z-20 top-0 transition-transform duration-150 ease-in-out xxl:hidden"
              }
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-bold leading-tight tracking-tight text-gray-600 capitalize text-md dark:text-gray-400">
                    Updates from people you followed
                  </p>
                  <button
                    onClick={() => setToggleSidebar(!toggleSidebar)}
                    className="text-gray-800 cursor-pointer "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className={"pt-8"}>
                    {props.news.length == 0 ? (
                      <NoNews />
                    ) : (
                      props.news.map((data) => (
                        <ShopBoxForNewsUpdate
                          key={data.id}
                          data={data}
                          phone={true}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setToggleSidebar(false)}
              ref={ref}
              className="fixed top-0 left-0 flex items-center justify-center px-6 py-4 mt-40 text-white bg-gray-900 rounded-r-lg shadow-xl cursor-pointer opacity-70 xxl:hidden"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            {/* Desktop below */}
            <style>{`
            .sidebar { 
              transform: translateX(-570px);
            }
            @media (min-width: 1536px) {
              .sidebar {
                transform: translateX(0px);
              }
            }
            `}</style>
          </div>
          {/* end */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
