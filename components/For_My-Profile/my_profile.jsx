//import style
import styles from "./my_profile.module.scss";

//import Library
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useOnclickOutside from "react-cool-onclickoutside";
import Image from "next/image";
import Link from "next/link";

//import redux action
import { userDescription_action } from "../../redux/actions/user_description";
import { navbarIcon_action } from "../../redux/actions/navbar_icon";
import { navbarName_action } from "../../redux/actions/navbar_name";

//import components
import EditProfileModal from "./edit_modal";
import UserCard from "../Reuse/userCard";

//import function
import {
  sendIcon,
  editProfile,
  uploadIcon,
  sendBanner,
  uploadBannerPic,
} from "../../lib/function";
import { Mixpanel } from "../../mixpanel/mixpanel";
import { MdFiberPin } from "react-icons/md";

export default function My_profile(props) {
  const dispatch = useDispatch();

  // for design
  const [activeStatus, setActiveStatus] = useState(1);
  const [following, setFollowing] = useState(undefined); //People you subscibed
  const [followed, setFollowed] = useState(undefined); //your followers
  const [finalFollowingResult, setFinalFollowingResult] = useState(undefined);
  const [unknownFollowingResult, setUnknownFollowingResult] = useState(
    undefined
  );

  const [finalFollowedResult, setFinalFollowedResult] = useState(undefined);
  const [unknownFollowedResult, setUnknownFollowedResult] = useState(undefined);

  // for People you subscibed search
  const options = {
    includeScore: true,
    includeMatches: true,
    keys: ["name"],
  };
  const fuseFollowing = new Fuse(props.following, options);
  const searchInputforFollowing = (e) => {
    const result = fuseFollowing.search(e.target.value);
    const followingResult = result.map((people) => people.item);
    if (followingResult.length == 0 && e.target.value.length > 0) {
      setFinalFollowingResult([]);
      setUnknownFollowingResult("none");
    } else if (followingResult.length == 0 && e.target.value.length === 0) {
      setFinalFollowingResult(props.following);
      setUnknownFollowingResult(undefined);
    } else {
      setFinalFollowingResult(followingResult);
      setUnknownFollowingResult(undefined);
    }
  };

  //for Your follower search

  const options2 = {
    includeScore: true,
    includeMatches: true,
    keys: ["name"],
  };
  const fuseFollowed = new Fuse(props.follower, options2);
  const searchInputforFollowed = (e) => {
    const result2 = fuseFollowed.search(e.target.value);
    const followedResult = result2.map((people) => people.item);
    if (followedResult.length === 0 && e.target.value.length > 0) {
      setFinalFollowedResult([]);
      setUnknownFollowedResult("none");
    } else if (followedResult.length === 0 && e.target.value.length === 0) {
      setFinalFollowedResult(props.follower);
      setUnknownFollowedResult(undefined);
    } else {
      setFinalFollowedResult(followedResult);
      setUnknownFollowedResult(undefined);
    }
  };

  //for setting dropdown

  const [showSetting, setShowSetting] = useState(false);
  const ref = useOnclickOutside(() => {
    setShowSetting(false);
  });

  //for modal
  const [modalIsOpen, setIsOpen] = useState(false);

  async function openModal() {
    setShowSetting(!showSetting);
    setIsOpen(true);
    //this is to identify the user you are currently tracking//
    Mixpanel.identify(props.data.id);
    //this is to name the action you want to track//
    Mixpanel.track("Successful Open Modal");
    //this set is used to set the profile for the person u created for the record, you dont have to set everytime i think//
    Mixpanel.people.set({
      $name: props.data.name,
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  // for changing name and description
  const edit = (data) => {
    const result = editProfile(data);
    if (result == "name length unable") {
      toast.error("Username need to be in 5-16 Characters & NO Space");
    } else if (result == "description length unable") {
      toast.error("Description need to be in 30 Characters");
    } else {
      dispatch(navbarName_action(data.username));
      dispatch(userDescription_action(data.description));
    }
  };

  //for upload icon
  const [iconLoading, setIconLoading] = useState(false);
  const [bgLoading, setBgLoading] = useState(false);

  const uploadNewIcon = async (e) => {
    setShowSetting(!showSetting);
    //check photo size
    if (e.target.files[0].size > 2000000) {
      toast.error(
        "Sorry your photo is too big, please upload photo with in 2MB"
      );
    } else {
      setIconLoading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "inf3mkp2");

      const url = await uploadIcon(formData);

      dispatch(navbarIcon_action(url));

      setIconLoading(false);

      const sendData = { id: props.data.id, link: url };

      await sendIcon(sendData);
    }
  };

  //for upload new background picture

  const [banner, setBanner] = useState();

  const uploadNewBg = async (e) => {
    setShowSetting(!showSetting);
    //check photo size
    if (e.target.files[0].size > 5000000) {
      toast.error(
        "Sorry your photo is too big, please upload photo with in 5MB"
      );
    } else {
      setBgLoading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "inf3mkp2");

      const url = await uploadBannerPic(formData);

      setBanner(url);
      setBgLoading(false);

      const sendData = { id: props.data.id, link: url };

      await sendBanner(sendData);
    }
  };

  useEffect(() => {
    setBanner(props.data.banner);
    setFollowing(props.following);
    setFollowed(props.follower);
  }, []);

  //redux
  const { name } = useSelector((state) => state.navbar_name);
  const { icon } = useSelector((state) => state.navbar_icon);
  const { description } = useSelector((state) => state.userDescription);

  return (
    <div>
      {/* Page title starts */}
      <div className="relative pt-8 pb-16 filter contrast-200">
        {/* Background image starts */}
        {bgLoading ? (
          <img
            src="/images/loading.svg"
            className="absolute inset-0 z-0 object-cover w-full h-full "
            alt="bg"
          />
        ) : (
          <img
            className={
              "absolute inset-0 z-0 object-cover w-full h-full opacity-90 "
            }
            src={banner && banner}
            alt="bg"
            onError={(e) => {
              e.target.src =
                "https://res.cloudinary.com/djccssdr9/image/upload/v1617955545/joanna-kosinska-1_CMoFsPfso-unsplash_knuzsm.jpg";
            }}
          />
        )}
        {/* <img className="absolute inset-0 z-0 object-cover w-full h-full" src='https://res.cloudinary.com/djccssdr9/image/upload/v1617955545/joanna-kosinska-1_CMoFsPfso-unsplash_knuzsm.jpg' alt="bg" /> */}
        {/* Background image ends */}
        {/* Code block starts */}
        <div className="relative flex justify-end sm:mr-4 phone:mr-0 lg:mb-0">
          <div
            className="w-12 bg-cover rounded-md cursor-pointer sm:mr-3 phone:mr-0"
            onClick={() => setShowSetting(!showSetting)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 hover:text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="relative flex items-center">
            {showSetting && (
              <ul
                className="absolute top-0 right-0 z-40 mt-12 mr-1 bg-white border-r rounded shadow sm:w-48 phone:w-40 dark:bg-gray-800 dark:border-gray-800"
                ref={ref}
              >
                <li className="flex items-center justify-center leading-3 tracking-normal cursor-pointer hover:bg-indigo-500 hover:text-white sm:text-sm phone:text-xs">
                  <label className="px-1 py-4 font-semibold cursor-pointer">
                    <input
                      type="file"
                      className="hidden "
                      onChange={uploadNewIcon}
                    />
                    Edit ICON (Max:2mb)
                  </label>
                </li>
                <li className="flex items-center justify-center leading-3 tracking-normal cursor-pointer sm:text-sm phone:text-xs hover:bg-indigo-500 hover:text-white">
                  <label className="px-1 py-4 font-semibold cursor-pointer ">
                    <input
                      type="file"
                      className="hidden"
                      onChange={uploadNewBg}
                    />
                    Edit BANNER (Max:5mb)
                  </label>
                </li>
                <li className="flex items-center justify-center tracking-normal cursor-pointer leading-2 sm:text-sm phone:text-xs hover:bg-indigo-500 hover:text-white">
                  <button className="px-0 py-4 font-semibold" onClick={openModal}>
                    Edit My INFO
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        {/* Code block ends */}
        <div className="relative flex flex-col items-start justify-between sm:px-12 phone:px-4 z-1 lg:flex-row lg:items-center">
          <div>
            <div className="flex flex-row">
              {iconLoading ? (
                <img
                  src="/images/loading.svg"
                  className="flex items-center object-cover rounded-full md:w-40 md:h-40 sm:w-32 sm:h-32 phone:w-32 phone:h-32 ring-2 ring-indigo-600"
                />
              ) : (
                <img
                  className="flex items-center object-cover rounded-full md:w-40 md:h-40 sm:w-32 sm:h-32 phone:w-32 phone:h-32 ring-2 ring-indigo-600"
                  src={icon}
                  alt="Profile image"
                  onError={(e) => {
                    e.target.src = "/images/icon.png";
                  }}
                />
              )}
              <div className="relative flex flex-col items-start content-start justify-start mt-8 ">
                <h3 className="px-2 py-2 mt-2 text-xl text-gray-900 bg-white rounded sm:ml-4 phone:ml-2 cursor-text 0 phone:font-black sm:font-extrabold opacity-80">
                  {name}
                </h3>
                <br />
                {description == [] ? (
                  <h4 className="hidden max-w-md px-2 mx-4 text-lg italic font-bold text-white rounded">
                    gg
                  </h4>
                ) : (
                  // 30 characters max only
                  <h4 className="px-2 -mt-2 italic font-medium text-gray-900 bg-white rounded sm:ml-4 phone:ml-2 sm:text-lg phone:text-sm opacity-70">
                    #{description}
                  </h4>
                )}
              </div>
            </div>
            <div>
              <button className="px-1 pt-0 pb-3 mx-2 my-2 mt-10 text-gray-900 bg-white rounded-md cursor-default sm:pb-2 opacity-70">
                <div className="flex pb-2 phone:-mb-4 sm:-mb-2 rounded-xl">
                  <div className="px-3 pt-2 pr-2 text-center sm:mr-4 phone:mr-0">
                    <span className="block font-extrabold tracking-wide uppercase md:text-2xl sm:text-xl phone:text-base ">
                      {props.data.detail.following.length}
                    </span>
                    <span className="font-bold sm:text-md md:text-lg phone:text-sm">
                      Followed
                    </span>
                  </div>
                  <div className="px-3 pt-2 text-center sm:mr-4 phone:mr-0">
                    <span className="block font-extrabold tracking-wide uppercase md:text-2xl sm:text-xl phone:text-base ">
                      {props.data.detail.follower.length}
                    </span>
                    <span className="font-bold sm:text-md md:text-lg phone:text-sm">
                      Follower
                    </span>
                  </div>
                  <div className="px-3 pt-2 text-center phone:mr-0">
                    <span className="block font-extrabold tracking-wide uppercase md:text-2xl sm:text-xl phone:text-base">
                      {props.data.detail.myList.length}
                    </span>
                    <span className="font-bold sm:text-md md:text-lg phone:text-sm">
                      Sites Added
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex mt-4 md:flex-row lg:mt-60">
            {/* edit profile modal */}
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className={`${styles.modalStyle}`}
              contentLabel="Modal"
              overlayClassName={`${styles.modalOverlay}`}
              ariaHideApp={false}
            >
              <EditProfileModal
                close={closeModal}
                data={props.data}
                edit={edit}
              />
            </ReactModal>
          </div>
        </div>
      </div>
      {/* Page title ends */}
      <div className="pb-10 bg-gray-100">
        <div className="px-6 mx-auto">
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
                  {/* this is for mobile selection */}
                  <select
                    aria-label="Selected tab"
                    className="relative block w-full p-3 text-gray-600 bg-transparent border-4 border-indigo-500 appearance-none form-select"
                    onChange={(e) => setActiveStatus(e.target.value)}
                  >
                    <option value={1} className="text-sm text-gray-700">
                      People you Followed{" "}
                    </option>
                    <option value={2} className="text-sm text-gray-700">
                      Your Followers{" "}
                    </option>
                  </select>
                </div>

                <ul className="flex-row items-center hidden h-full space-x-12 lg:flex">
                  <li
                    onClick={() => setActiveStatus(1)}
                    className={
                      activeStatus == 1
                        ? "px-4 py-2 my-2 ml-4 text-base text-gray-800 bg-gray-200 rounded lg:my-0 cursor-pointer"
                        : "px-4 py-2 ml-4  my-2 text-base text-gray-600 cursor-pointer"
                    }
                  >
                    People you Followed
                  </li>
                  <li
                    onClick={() => setActiveStatus(2)}
                    className={
                      activeStatus == 2
                        ? "px-4 py-2 my-2 ml-4 text-base text-gray-800 bg-gray-200 rounded lg:my-0 cursor-pointer"
                        : "px-4 py-2 ml-4 my-2 text-base text-gray-600 cursor-pointer"
                    }
                  >
                    Your Followers
                  </li>
                  {activeStatus == 1 ? (
                    props.following.length == 0 ||
                    props.following == undefined ? (
                      <li></li>
                    ) : (
                      <li>
                        <input
                          className="hidden w-full py-3 pl-10 pr-20 mr-20 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:border-brand lg:flex xl:flex"
                          type="text"
                          placeholder="Search for people you followed"
                          onChange={searchInputforFollowing}
                        />
                      </li>
                    )
                  ) : props.follower.length == 0 ||
                    props.follower == undefined ? (
                    <li></li>
                  ) : (
                    <li>
                      <input
                        className="hidden w-full py-3 pl-10 pr-20 mr-20 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded-md focus:outline-none focus:border-brand lg:flex xl:flex"
                        type="text"
                        placeholder="Search for people following you"
                        onChange={searchInputforFollowed}
                      />
                    </li>
                  )}
                </ul>
              </div>
              {/* this is for movbile search */}
              {activeStatus == 1 ? (
                props.following.length == 0 || props.following == undefined ? (
                  <div></div>
                ) : (
                  <div className="flex lg:hidden">
                    <input
                      className="w-full px-4 py-4 pl-4 pr-20 mb-4 text-sm text-gray-600 bg-white border-none rounded-md shadow mr-30 focus:outline-none focus:border-brand lg:flex xl:flex"
                      type="text"
                      placeholder="Search for people you followed"
                      onChange={searchInputforFollowing}
                    />
                  </div>
                )
              ) : props.follower.length == 0 || props.follower == undefined ? (
                <div></div>
              ) : (
                <div className="flex lg:hidden">
                  <input
                    className="w-full px-4 py-4 pl-4 pr-20 mb-4 text-sm text-gray-600 bg-white border-none rounded-md shadow mr-30 focus:outline-none focus:border-brand lg:flex xl:flex"
                    type="text"
                    placeholder="Search for people following you"
                    onChange={searchInputforFollowed}
                  />
                </div>
              )}

              {/* this is for the display of cards section */}
              <div className="mx-auto ">
                <div
                  className={
                    activeStatus == 1
                      ? "w-full min-h-screen bg-white rounded shadow "
                      : "w-full min-h-screen bg-white rounded shadow hidden"
                  }
                >
                  {props.following.length == 0 ? (
                    <div className="flex justify-start w-full px-4 py-12 phone:px-4 sm:pl-8 md:pl-10">
                      <div className="max-w-lg px-8 py-8 bg-gray-100 shadow-md dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center space-x-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                          </svg>
                          <p className="text-xl font-bold">
                            A Message from Founders!
                          </p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm leading-7 text-gray-700 md:text-lg dark:text-gray-300">
                            It seems you still haven't found anyone interesting
                            enough to follow.{" "}
                          </p>
                          <p className="mt-4 text-sm leading-7 text-gray-700 md:text-lg dark:text-gray-300">
                            If you don't mind, you can start experincing the
                            site by following us:{" "}
                          </p>
                          <Link href={`/other_profile/1`}>
                          <button className="px-4 py-2 mt-4 -ml-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600">
                            Founders' Profile
                          </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`grid grid-cols-1 gap-4 pt-6 pb-6 pl-6 pr-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll ${styles.listContainer}`}
                    >
                      {finalFollowingResult ? (
                        unknownFollowingResult == "none" ? (
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
                          finalFollowingResult.map((data) => (
                            <UserCard key={data.id} data={data} />
                          ))
                        )
                      ) : (
                        props.following.map((data) => (
                          <UserCard key={data.id} data={data} />
                        ))
                      )}
                    </div>
                  )}
                </div>
                <div
                  className={
                    activeStatus == 2
                      ? "w-full min-h-screen bg-white rounded shadow"
                      : "w-full min-h-screen bg-white rounded shadow hidden"
                  }
                >
                  {props.follower.length == 0 ? (
                    <div className="flex justify-start w-full px-4 py-12 phone:px-4 sm:pl-8 md:pl-10">
                      <div className="max-w-lg px-8 py-8 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center space-x-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                          </svg>
                          <p className="text-xl font-bold">
                            A Message from Founders!
                          </p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm leading-7 text-gray-700 md:text-lg dark:text-gray-300">
                            It seems that you still haven't found anyone to
                            follow you{" "}
                          </p>
                          <p className="mt-4 text-sm leading-7 text-gray-700 md:text-lg dark:text-gray-300">
                            You can start infleuncing others with your
                            recommendations by{" "}
                            <span className="text-indigo-500">
                              Inviting them to follow you.
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`grid grid-cols-1 gap-4 pt-6 pb-6 pl-6 pr-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll ${styles.listContainer}`}
                    >
                      {finalFollowedResult ? (
                        unknownFollowedResult == "none" ? (
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
                          finalFollowedResult.map((data) => (
                            <UserCard key={data.id} data={data} />
                          ))
                        )
                      ) : (
                        props.follower.map((data) => (
                          <UserCard key={data.id} data={data} />
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

// {/* <img
// alt="..."
// src={""}
// className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl lg:-ml-16"
// style={{ maxWidth: "150px" }}
// /> */}
