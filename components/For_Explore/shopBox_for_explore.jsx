//import styles
import styles from "./shopBox_for_explore.module.scss";

//Importing library
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { BiRun, BiQuestionMark } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { Mixpanel } from "../../mixpanel/mixpanel";
import Link from "next/link";
//Import components

//Import function

const ShopBoxForExplore = (props) => {
  //console.log('this is the value',props)
  //for mixpanel:
  const visitSite = () => {
    //this is to identify the user you are currently tracking//
    Mixpanel.identify(props.navbarUser.id);
    //this is to name the action you want to track//
    Mixpanel.track("Visit External Site (from Explore)");
    Mixpanel.track("Visit External Site");
    Mixpanel.track("DAU usage");
    //this set is used to set the profile for the person u created for the record, you dont have to set everytime i think//
    Mixpanel.people.set({
      $name: props.navbarUser.name,
      $email: props.navbarUser.email,
    });
  };

  //for tooltip
  const [isTooltipBoughtVisible, setTooltipBoughtVisibility] = useState(false);
  const [isTooltipTitleVisible, setTooltipTitleVisibility] = useState(false);
  const [isTooltipCommentVisible, setTooltipCommentVisibility] = useState(
    false
  );
  const [isTooltipNoCommentVisible, setTooltipNoCommentVisibility] = useState(
    false
  );
  const [isTooltipFriendVisible, setTooltipFriendVisibility] = useState(false);
  const [isTooltipVisitVisible, setTooltipVisitVisibility] = useState(false);

  const subCat = JSON.parse(props.data.subCategory);
  const [catIcon, setCatIcon] = useState("");

  useEffect(() => {
    const cat = props.data.category;
    if (cat === "Food") {
      setCatIcon("bg-green-500");
    }
    if (cat === "Sports") {
      setCatIcon("bg-blue-500");
    }
    if (cat === "Fashion") {
      setCatIcon("bg-red-500");
    }
    if (cat === "Others") {
      setCatIcon("bg-yellow-500");
    }
    setTooltipBoughtVisibility(true);
    setTooltipTitleVisibility(true);
    setTooltipCommentVisibility(true);
    setTooltipNoCommentVisibility(true);
    setTooltipFriendVisibility(true);
    setTooltipVisitVisibility(true);
  }, []);

  return (
    <div className="relative px-6 py-6 my-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      <div
        className={`absolute flex items-center px-3 py-3 ${catIcon} text-white rounded-full shadow-xl left-4 -top-6`}
      >
        {props.data.category == "Food" ? (
          <MdRestaurantMenu className={`text-white w-7 h-7`} />
        ) : props.data.category == "Sports" ? (
          <BiRun className={`text-white w-7 h-7`} />
        ) : props.data.category == "Fashion" ? (
          <GiClothes className={`text-white w-7 h-7`} />
        ) : props.data.category == "Others" ? (
          <BiQuestionMark className={`text-white w-7 h-7`} />
        ) : (
          ""
        )}
      </div>
      <div className="absolute flex items-center text-black border-2 border-gray-200 rounded-full shadow-xl bg-gray-50 left-20 -top-4">
        {props.data.user.user.image != "undefined" ? (
          <img
            src={props.data.user.user.image}
            className="object-cover object-center w-8 h-8 rounded-full "
            onError={(e) => {
              e.target.src = "/images/icon.png";
            }}
          />
        ) : (
          <img
            src="/images/shopping-bag.png"
            className="object-cover object-center w-8 h-8 rounded-full"
          />
        )}
      </div>

      {props.data.bought ? (
        <div
          className="absolute flex items-center text-black rounded-full bg-gray-50 phone:left-40 sm:left-96 md:left-56 lg:left-52 xl:left-68 xxl:left-60 -top-5 "
          data-tip="He/She bought on this Site"
          data-for="bought"
        >
          <button className="flex px-2 py-2 space-x-1 text-sm tracking-wider text-white bg-indigo-600 border-2 border-gray-200 rounded-full cursor-default md:px-2 xl:px-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="ml-1 text-sm font-bold">BOUGHT </p>
          </button>
          {isTooltipBoughtVisible && (
            <ReactTooltip
              delayShow={1000}
              effect="solid"
              type="dark"
              id="bought"
              place="bottom"
            />
          )}
        </div>
      ) : (
        ""
      )}

      <div className="mt-8">
        <div
          className={`w-100 text-lg font-bold h-14 text-gray-800 ${styles.title}`}
          data-tip={props.data.nickname}
          data-for="title"
        >
          {props.data.nickname}
          {isTooltipTitleVisible && (
            <ReactTooltip
              delayShow={1500}
              effect="solid"
              type="dark"
              id="title"
              place="top"
            />
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="pt-6 pb-6 w-max">
            {subCat && subCat.length > 0 ? (
              subCat.map((data, i) => {
                return (
                  <span
                    className="px-3 py-2 mx-1 mt-1 mb-2 text-sm font-semibold text-gray-500 bg-gray-200 rounded-full hover:text-gray-600"
                    key={i}
                  >
                    # {data}
                  </span>
                );
              })
            ) : (
              <span className="invisible px-3 py-1 mx-1 mt-1 mb-2 text-sm font-semibold text-gray-300 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-400">
                {"No Hash-Tag"}
              </span>
            )}
          </div>
        </div>

        <div className="border-t-2"></div>
        <div className="grid grid-cols-3 gap-2 mt-4 mb-0 justify-items-center">
          {props.data.comment.shopDescription !== "" ? (
            <button
              className="py-3 bg-gray-100 rounded md:px-6 xl:px-10 lg:px-8 phone:px-6 justify-self-auto"
              data-tip={`${props.data.comment.shopDescription}`}
              data-for="comment"
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
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              {isTooltipCommentVisible && (
                <ReactTooltip
                  delayShow={700}
                  effect="solid"
                  type="dark"
                  id="comment"
                  html={true}
                />
              )}
            </button>
          ) : (
            <button
              className="py-3 text-red-600 bg-gray-300 rounded cursor-default phone:px-6 md:px-6 xl:px-10 lg:px-8 sm:px-12 justify-self-auto"
              data-tip={"No Comment"}
              data-for="noComment"
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
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              {isTooltipNoCommentVisible && (
                <ReactTooltip
                  delayShow={700}
                  effect="solid"
                  type="dark"
                  id="noComment"
                  html={true}
                />
              )}
            </button>
          )}
          <Link href={`/other_profile/${props.data.userId}`}>
          <button
            className="py-3 bg-gray-100 rounded md:px-6 xl:px-10 lg:px-8 phone:px-6 justify-self-auto hover:bg-gray-200"
            data-tip={"Visit his/her profile"}
            data-for="Friend"
            //onClick={}
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            {isTooltipFriendVisible && (
              <ReactTooltip
                delayShow={700}
                effect="solid"
                type="dark"
                id="Friend"
              />
            )}
          </button>
          </Link>

          <a href={props.data.link} target="external">
            <button
              className="py-3 bg-gray-100 rounded md:px-6 xl:px-10 lg:px-8 phone:px-6 justify-self-auto hover:bg-indigo-500 hover:text-white"
              data-tip={"Visit Site"}
              data-for="visit"
              onClick={visitSite}
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              {isTooltipVisitVisible && (
                <ReactTooltip
                  delayShow={700}
                  effect="solid"
                  type="dark"
                  id="visit"
                />
              )}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopBoxForExplore;
