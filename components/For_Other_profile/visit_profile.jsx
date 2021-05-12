//import style
import styles from "./visit_profile.module.scss";

//import Library
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Fuse from "fuse.js";
import { CgMenuGridO } from "react-icons/cg";
import { BiRun, BiQuestionMark } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import Image from "next/image";
import { Mixpanel } from "../../mixpanel/mixpanel.js";
//import function
import { follow, unFollow } from "../../lib/function";

//import components
import UnFollowButton from "./unFollow_button";
import UserCard from "../Reuse/userCard";
import ShopBoxForVisit from "./shopBox_for_visit";

export default function Visit_profile(props) {
  // for design
  const [activeStatus, setActiveStatus] = useState(1);
  const [followerChange, setFollowerChange] = useState(props.follower);
  // const [following,setFollowing]=useState(undefined);
  // const [followed,setFollowed]=useState(undefined);
  const [finalShopResult, setFinalShopResult] = useState(undefined);
  const [unknownShopResult, setUnknownShopResult] = useState(undefined);
  const [finalSubscribedResult, setFinalSubscribedResult] = useState(undefined);
  const [unknownSubscribedResult, setUnknownSubscribedResult] = useState(
    undefined
  );

  const [finalFollowerResult, setFinalFollowerResult] = useState(undefined);
  const [unknownFollowerResult, setUnknownFollowerResult] = useState(undefined);

  //for shop search
  const options1 = {
    includeScore: true,
    includeMatches: true,
    keys: ["nickname", "category", "subCategory"],
  };

  const fuseShop = new Fuse(props.data.detail.myList, options1);
  const searchInputForShop = (e) => {
    const result = fuseShop.search(e.target.value);
    const shopResult = result.map((shop) => shop.item);
    if (shopResult.length == 0 && e.target.value.length > 0) {
      setFinalShopResult([]);
      setUnknownShopResult("none");
    } else if (shopResult.length == 0 && e.target.value.length === 0) {
      setFinalShopResult(props.data.detail.myList);
      setUnknownShopResult(undefined);
    } else {
      setFinalShopResult(shopResult);
      setUnknownShopResult(undefined);
    }
  };

  //for people he subscribed search
  const options2 = {
    includeScore: true,
    includeMatches: true,
    keys: ["name"],
  };
  const fuseSubscribed = new Fuse(props.following, options2);
  const searchInputForSubscribed = (e) => {
    const result = fuseSubscribed.search(e.target.value);
    const subscribedResult = result.map((subscribed) => subscribed.item);
    if (subscribedResult.length == 0 && e.target.value.length > 0) {
      setFinalSubscribedResult([]);
      setUnknownSubscribedResult("none");
    } else if (subscribedResult.length == 0 && e.target.value.length === 0) {
      setFinalSubscribedResult(props.following);
      setUnknownSubscribedResult(undefined);
    } else {
      setFinalSubscribedResult(subscribedResult);
      setUnknownSubscribedResult(undefined);
    }
  };
  //for his follower search
  const options3 = {
    includeScore: true,
    includeMatches: true,
    keys: ["name"],
  };
  const fuseFollower = new Fuse(followerChange, options3);
  const searchInputForFollower = (e) => {
    const result = fuseFollower.search(e.target.value);
    const followerResult = result.map((follower) => follower.item);
    if (followerResult.length == 0 && e.target.value.length > 0) {
      setFinalFollowerResult([]);
      setUnknownFollowerResult("none");
    } else if (followerResult.length == 0 && e.target.value.length === 0) {
      setFinalFollowerResult(followerChange);
      setUnknownFollowerResult(undefined);
    } else {
      setFinalFollowerResult(followerResult);
      setUnknownFollowerResult(undefined);
    }
  };

  //for different categories
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(
    "bg-gray-100 border-b-8 border-gray-500"
  );

  const filterAll = () => {
    document.getElementById("searchInput").value = null;
    setFilter("All");
    setSelected("bg-gray-100 border-b-8 border-gray-500 ");
  };

  const filterSport = () => {
    document.getElementById("searchInput").value = null;
    setFilter("Sports");
    setSelected("bg-gray-100 border-b-8 border-blue-500");
  };

  const filterFood = () => {
    document.getElementById("searchInput").value = null;
    setFilter("Food");
    setSelected("bg-gray-100 border-b-8 border-green-500");
  };

  const filterFashion = () => {
    document.getElementById("searchInput").value = null;
    setFilter("Fashion");
    setSelected("bg-gray-100 border-b-8 border-red-500");
  };
  const filterOthers = () => {
    document.getElementById("searchInput").value = null;
    setFilter("Others");
    setSelected("bg-gray-100 border-b-8 border-yellow-500");
  };

  //for tab
  const tab1 = () => {
    document.getElementById("searchInput").value = null;

    setActiveStatus(1);
  };
  const tab2 = () => {
    document.getElementById("searchInput").value = null;

    setActiveStatus(2);
  };
  const tab3 = () => {
    document.getElementById("searchInput").value = null;
    setActiveStatus(3);
  };

  //for modal
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //for follow button
  const [following, setFollowing] = useState();
  const [follower, setFollower] = useState(0);

  const clickFollow = () => {
    setFollowing(true);
    setFollower(follower + 1);
    const data = { userId: props.data.id, cuid: props.cuDetail.id };
    follow(data);
    let finalFollowerChangeArray = [props.cuDetail, ...followerChange];

    setFollowerChange(finalFollowerChangeArray);
    //mixpanel
    Mixpanel.identify(props.navbarUser.id);
    //this is to name the action you want to track//
    Mixpanel.track("Followed Someone");
    Mixpanel.track("DAU usage");
    //this set is used to set the profile for the person u created for the record, you dont have to set everytime i think//
    Mixpanel.people.set({
      $name: props.navbarUser.name,
      $email: props.navbarUser.email,
    });
  };

  const clickUnFollow = () => {
    setFollowing(false);
    setFollower(follower - 1);
    const data = { userId: props.data.id, cuid: props.cuDetail.id };
    unFollow(data);
    let final = followerChange.slice(1);
    setFollowerChange(final);
  };

  useEffect(() => {
    setFollower(props.data.detail.follower.length);
    if (props.follow.length == 0) {
      setFollowing(false);
    } else {
      setFollowing(true);
    }
  }, []);

  return (
    <div>
      {/* Page title starts */}
      <div className="relative pt-8 pb-16">
        {/* Background image starts */}
        <img
          className={
            "absolute inset-0 z-0 object-cover w-full h-full opacity-90"
          }
          src={props.data.banner}
          alt="bg"
          onError={(e) => {
            e.target.src =
              "https://res.cloudinary.com/djccssdr9/image/upload/v1617955545/joanna-kosinska-1_CMoFsPfso-unsplash_knuzsm.jpg";
          }}
        />

        <div className="relative flex flex-col items-start justify-between px-6 mx-auto z-1 lg:flex-row lg:items-center">
          <div>
          <div className="flex flex-row">
                <img
                  className="flex items-center object-cover rounded-full md:w-40 md:h-40 sm:w-32 sm:h-32 phone:w-32 phone:h-32 ring-2 ring-indigo-600"
                  src={props.data.image}
                  alt="Profile image"
                  onError={(e) => {
                    e.target.src = "/images/icon.png";
                  }}
                />

              <div className="relative flex flex-col items-start content-start justify-start mt-8 ">
                <h3 className="px-2 py-2 mx-4 mt-2 text-xl text-gray-900 bg-white rounded cursor-text 0 phone:font-black sm:font-extrabold opacity-80">
                  @ {props.data.name}
                </h3>
                <br />
                {props.data.detail.myDescription == [] ? (
                  <h4 className="hidden max-w-md px-2 mx-4 text-lg italic font-bold text-white rounded">
                    gg
                  </h4>
                ) : (
                  // 30 characters max only
                  <h4 className="px-2 mx-4 -mt-2 italic font-medium text-gray-900 bg-white rounded sm:text-lg phone:text-sm opacity-70">
                       {props.data.detail.myDescription}
                  </h4>
                )}
              </div>
            </div>
  
            <button className="px-1 pt-0 pb-3 mx-2 my-2 mt-10 text-gray-900 bg-white rounded-md cursor-default sm:pb-2 opacity-70">
            <div className="flex pb-2 phone:-mb-4 sm:-mb-2 rounded-xl ">
              <div className="pt-2 pl-3 pr-3 text-center sm:mr-4 phone:mr-0">
                <span className="block font-extrabold tracking-wide uppercase md:text-2xl sm:text-xl phone:text-base ">
                  {" "}
                  {props.data.detail.myList.length}
                </span>
                <span className="font-bold sm:text-md md:text-lg phone:text-sm">Sites Added</span>
              </div>
              <div className="px-3 pt-2 text-center sm:mr-4 phone:mr-0">
                <span className="block font-extrabold tracking-wide uppercase md:text-2xl sm:text-xl phone:text-base ">
                  {" "}
                  {props.data.detail.following.length}
                </span>
                <span className="font-bold sm:text-md md:text-lg phone:text-sm">Subscribing</span>
              </div>
              <div className="px-3 pt-2 text-center">
                <span className="block font-extrabold tracking-wide uppercase md:text-2xl sm:text-xl phone:text-base ">
                  {" "}
                  {follower}
                </span>
                <span className="font-bold sm:text-md md:text-lg phone:text-sm">Subscriber</span>
              </div>
            </div>
            </button>
          </div>
       
          <div className="flex sm:mt-4 sm:mx-4 phone:mt-8 phone:mx-0 lg:mx-20 md:flex-row lg:mt-48">
            {props.cuDetail.id == props.data.id ? (
              ""
            ) : following == false ? (
              <button
                className="px-6 py-4 text-xl font-semibold text-white transition duration-200 ease-in-out bg-indigo-500 border-none rounded-full shadow-inner lg:px-8 lg:py-4 focus:outline-none hover:bg-indigo-600"
                onClick={clickFollow}
              >
                FOLLOW
              </button>
            ) : (
              <button
                className="px-6 py-4 text-xl font-semibold text-white transition duration-200 ease-in-out bg-indigo-500 border-none rounded-full shadow-inner lg:px-8 lg:py-4 focus:outline-none hover:bg-indigo-600"
                onClick={openModal}
              >
                UNFOLLOW
              </button>
            )}
          </div>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={`${styles.modalStyle}`}
          contentLabel="Modal"
          overlayClassName={`${styles.modalOverlay}`}
          ariaHideApp={false}
        >
          <UnFollowButton close={closeModal} unFollow={clickUnFollow} />
        </ReactModal>
      </div>

      <div className="pb-10 bg-gray-100">
        <div className="px-6 mx-auto ">
          <div className="relative w-full">
            <div className="w-full h-auto -mt-8">
              <div className="w-full h-auto mb-6 bg-white rounded shadow lg:h-20">
                <div className="relative w-full bg-white lg:hidden">
                  <div className="absolute inset-0 z-0 w-6 h-6 m-auto mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-selector"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#A0AEC0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="8 9 12 5 16 9" />
                      <polyline points="16 15 12 19 8 15" />
                    </svg>
                  </div>

                  <select
                    aria-label="Selected tab"
                    className="relative block w-full p-3 text-gray-600 bg-transparent border-4 border-indigo-500 appearance-none form-select"
                    onChange={(e) => setActiveStatus(e.target.value)}
                  >
                    <option value={1} className="text-sm text-gray-600">
                      His/Her shopping site {" "}
                    </option>
                    <option value={2} className="text-sm text-gray-600">
                      People he/she followed
                    </option>
                    <option value={3} className="text-sm text-gray-600">
                      His/Her Follower{" "}
                    </option>
                  </select>
                </div>

                <ul className="flex-row items-center hidden h-full space-x-12 lg:flex ">
                  <li
                    onClick={tab1}
                    className={
                      activeStatus == 1
                        ? "px-4 py-2 my-2 ml-4 text-base text-gray-800 bg-gray-200 rounded lg:my-0 cursor-pointer"
                        : "px-4 py-2 ml-4  my-2 text-base text-gray-600 cursor-pointer"
                    }
                  >
                    His/Her Shops
                  </li>
                  <li
                    onClick={tab2}
                    className={
                      activeStatus == 2
                        ? "px-4 py-2 my-2 ml-4 text-base text-gray-800 bg-gray-200 rounded lg:my-0 cursor-pointer"
                        : "px-4 py-2 ml-4  my-2 text-base text-gray-600 cursor-pointer"
                    }
                  >
                    People he/she followed
                  </li>
                  <li
                    onClick={tab3}
                    className={
                      activeStatus == 3
                        ? "px-4 py-2 my-2 ml-4 text-base text-gray-800 bg-gray-200 rounded lg:my-0 cursor-pointer"
                        : "px-4 py-2 ml-4 my-2 text-base text-gray-600 cursor-pointer"
                    }
                  >
                     His/Her Follower
                  </li>
                  {/* this is for web search */}
                  {activeStatus == 1 ? (
                    <li>
                      <input
                        id="searchInput"
                        className="hidden w-full py-3 pl-10 pr-20 mr-20 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:border-brand lg:flex xl:flex"
                        type={
                          props.data.detail.myList.length == 0
                            ? "hidden"
                            : "text"
                        }
                        placeholder="search for shops"
                        onChange={searchInputForShop}
                      />
                    </li>
                  ) : activeStatus == 2 ? (
                    <li>
                      <input
                        id="searchInput"
                        className="hidden w-full py-3 pl-10 pr-20 mr-20 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:border-brand lg:flex xl:flex"
                        type={props.following.length == 0 ? "hidden" : "text"}
                        placeholder="search for people he subscribed"
                        onChange={searchInputForSubscribed}
                      />
                    </li>
                  ) : activeStatus == 3 ? (
                    <li>
                      <input
                        id="searchInput"
                        className="hidden w-full py-3 pl-10 pr-20 mr-20 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:border-brand lg:flex xl:flex"
                        type={followerChange.length == 0 ? "hidden" : "text"}
                        placeholder="Search for her followers"
                        onChange={searchInputForFollower}
                      />
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              {/* this is for movbile search */}
              {activeStatus == 1 ? (
                <div className="flex lg:hidden">
                  <input
                    id="searchInput"
                    className="w-full px-4 py-4 pl-4 pr-20 mb-4 text-sm text-gray-600 bg-white border-none rounded-md shadow mr-30 focus:outline-none focus:border-brand lg:flex xl:flex"
                    type={
                      props.data.detail.myList.length == 0 ? "hidden" : "text"
                    }
                    placeholder="Search for people you followed"
                    onChange={searchInputForShop}
                  />
                </div>
              ) : activeStatus == 2 ? (
                <div className="flex lg:hidden">
                  <input
                    id="searchInput"
                    className="w-full px-4 py-4 pl-4 pr-20 mb-4 text-sm text-gray-600 bg-white border-none rounded-md shadow mr-30 focus:outline-none focus:border-brand lg:flex xl:flex"
                    type={props.following.length == 0 ? "hidden" : "text"}
                    placeholder="Search for people following you"
                    onChange={searchInputForSubscribed}
                  />
                </div>
              ) : activeStatus == 3 ? (
                <div className="flex lg:hidden">
                  <input
                    id="searchInput"
                    className="w-full px-4 py-4 pl-4 pr-20 mb-4 text-sm text-gray-600 bg-white border-none rounded-md shadow mr-30 focus:outline-none focus:border-brand lg:flex xl:flex"
                    type={followerChange.length == 0 ? "hidden" : "text"}
                    placeholder="Search for people following you"
                    onChange={searchInputForFollower}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mx-auto ">
                <div
                  className={
                    activeStatus == 1
                      ? "w-full min-h-screen bg-white rounded shadow px-2 py-2"
                      : "w-full min-h-screen bg-white rounded shadow hidden"
                  }
                >
                  <div className="grid items-start w-full grid-cols-5 gap-4 p-2">
                    <button
                      onClick={filterAll}
                      className={`flex text-3xl group bg-gray-100 focus:text-gray-700 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                        filter === "All" ? selected : ""
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
                      onClick={filterSport}
                      className={`flex text-3xl group bg-gray-100 focus:text-blue-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                        filter === "Sports" ? selected : ""
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
                      onClick={filterFood}
                      className={`flex text-3xl group bg-gray-100 focus:text-green-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                        filter === "Food" ? selected : ""
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
                      onClick={filterFashion}
                      className={`flex text-3xl group bg-gray-100 focus:text-red-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                        filter === "Fashion" ? selected : ""
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
                      onClick={filterOthers}
                      className={`flex text-3xl group bg-gray-100 focus:text-yellow-500 px-2 my-3 py-1 justify-center border-gray-400 border-2 rounded-md ${
                        filter === "Others" ? selected : ""
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

                  <div
                    className={`grid grid-cols-1 gap-2 px-2 lg:gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 overflow-y-scroll ${styles.listContainer}`}
                  >
                    {props.data.detail.myList.length == 0 ? (
                      <div className="flex items-center col-start-1 col-end-4 ml-10 space-x-5">
                        <Image
                          src="/images/treasure.svg"
                          alt="Picture of the author"
                          width={400}
                          height={400}
                        />
                        <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                          Apparently,
                          <br /> he/she is still finding some brilliant shopping
                          sites to add..
                        </p>
                      </div>
                    ) : filter == "All" ? (
                      finalShopResult ? (
                        unknownShopResult == "none" ? (
                          // Sorry, No result shown in the search
                          <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                            <Image
                              src="/images/link.svg"
                              alt="Picture of the author"
                              width={600}
                              height={600}
                            />
                            <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                              Sorry, We cannot found any site in this category
                              at the moment...
                            </p>
                          </div>
                        ) : (
                          finalShopResult.map((data) => (
                            <ShopBoxForVisit
                              key={data.id}
                              data={data}
                              cuid={props.cuDetail.id}
                              navbarUser={props.navbarUser}
                            />
                          ))
                        )
                      ) : (
                        props.data.detail.myList.map((data) => (
                          <ShopBoxForVisit
                            key={data.id}
                            data={data}
                            cuid={props.cuDetail.id}
                            navbarUser={props.navbarUser}
                          />
                        ))
                      )
                    ) : finalShopResult ? (
                      unknownShopResult == "none" ? (
                        // Sorry, No result shown in the search
                        <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                          <Image
                            src="/images/link.svg"
                            alt="Picture of the author"
                            width={600}
                            height={600}
                          />
                          <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                            Sorry, We cannot found any site in this category at
                            the moment...
                          </p>
                        </div>
                      ) : finalShopResult.filter(
                          (obj) => obj.category == filter
                        ).length == 0 ? (
                        // Apparently no shop is added in this category...
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
                        finalShopResult
                          .filter((obj) => obj.category == filter)
                          .map((data) => (
                            <ShopBoxForVisit
                              key={data.id}
                              data={data}
                              cuid={props.cuDetail.id}
                              navbarUser={props.navbarUser}
                            />
                          ))
                      )
                    ) : props.data.detail.myList.filter(
                        (obj) => obj.category == filter
                      ).length == 0 ? (
                      // Apparently no shop is added in this category...
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
                      props.data.detail.myList
                        .filter((obj) => obj.category == filter)
                        .map((data) => (
                          <ShopBoxForVisit
                            key={data.id}
                            data={data}
                            cuid={props.cuDetail.id}
                            navbarUser={props.navbarUser}
                          />
                        ))
                    )}
                  </div>
                </div>
                <div
                  className={
                    activeStatus == 2
                      ? "w-full min-h-screen bg-white rounded shadow "
                      : "w-full min-h-screen bg-white rounded shadow hidden"
                  }
                >
                  {props.following.length == 0 ? (
                    <div className="flex items-center col-start-1 col-end-3 pt-5 ml-5 space-x-5 ">
                      <Image
                        src="/images/waiting.svg"
                        alt="Picture of the author"
                        width={400}
                        height={400}
                      />
                      <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                        He/She is still finding..
                        <br /> Someone interesting enough to subscribe...
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`grid grid-cols-1 gap-4 pt-6 pb-6 pl-6 pr-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll ${styles.listContainer}`}
                    >
                      {finalSubscribedResult ? (
                        unknownSubscribedResult == "none" ? (
                          <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                            <Image
                              src="/images/moon.svg"
                              alt="Picture of the author"
                              width={400}
                              height={400}
                            />
                            <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                              Sorry, We cannot found this person.
                              <br /> Maybe he/she is on the moon...
                            </p>
                          </div>
                        ) : (
                          finalSubscribedResult.map((data) => (
                            <UserCard
                              key={data.id}
                              data={data}
                              cuid={props.cuDetail.id}
                            />
                          ))
                        )
                      ) : (
                        props.following.map((data) => (
                          <UserCard
                            key={data.id}
                            data={data}
                            cuid={props.cuDetail.id}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div
                  className={
                    activeStatus == 3
                      ? "w-full min-h-screen bg-white rounded shadow"
                      : "w-full min-h-screen bg-white rounded shadow hidden"
                  }
                >
                  {followerChange == 0 ? (
                    <div className="flex items-center col-start-1 col-end-3 pt-10 ml-10 space-x-5">
                      <Image
                        src="/images/lightbulb.svg"
                        alt="Picture of the author"
                        width={400}
                        height={400}
                      />
                      <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                        Be the first to follow his/her brilliant list of
                        sites...
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`grid grid-cols-1 gap-4 pt-6 pb-6 pl-6 pr-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll ${styles.listContainer}`}
                    >
                      {finalFollowerResult ? (
                        unknownFollowerResult == "none" ? (
                          <div className="flex items-center col-start-1 col-end-3 ml-10 space-x-5">
                            <Image
                              src="/images/moon.svg"
                              alt="Picture of the author"
                              width={400}
                              height={400}
                            />
                            <p className="p-8 pl-6 font-bold text-gray-700 phone:text-sm sm:text-lg lg:text-xl">
                              Sorry, We cannot found this person.
                              <br /> Maybe he/she is on the moon...
                            </p>
                          </div>
                        ) : (
                          finalFollowerResult.map((data) => (
                            <UserCard
                              key={data.id}
                              data={data}
                              cuid={props.cuDetail.id}
                            />
                          ))
                        )
                      ) : (
                        followerChange.map((data) => (
                          <UserCard
                            key={data.id}
                            data={data}
                            cuid={props.cuDetail.id}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// .filter((obj) => obj.category == filter)
