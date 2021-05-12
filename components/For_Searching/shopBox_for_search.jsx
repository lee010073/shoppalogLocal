//Importing library
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Mixpanel } from "../../mixpanel/mixpanel";

//Import components

//Import function
import { addYourShopToMyList } from "../../lib/function";

//Import style
import styles from "./shopBox_for_search.module.scss";

const ShopBoxForSearch = (props) => {
  //for mixpanel:
  const visitSite = () => {
    //this is to identify the user you are currently tracking//
    Mixpanel.identify(props.navbarUser.id);
    //this is to name the action you want to track//
    Mixpanel.track("Visit External Site (From Search)");
    Mixpanel.track("Visit External Site");
    Mixpanel.track("DAU usage");
    //this set is used to set the profile for the person u created for the record, you dont have to set everytime i think//
    Mixpanel.people.set({
      $name: props.navbarUser.name,
      $email: props.navbarUser.email,
    });
  };

  // for tooltip
  const [isTooltipTitleVisible, setTooltipTitleVisibility] = useState(false);
  const [isTooltipFollowedVisible, setTooltipFollowedVisibility] = useState(
    false
  );
  const [isTooltipTotalVisible, setTooltipTotalVisibility] = useState(false);

  const ClickAdd = async () => {
    const subCatArrayValue = [];
    if (props.data.link.includes("instagram.com/")) {
      subCatArrayValue.push("Instagram Store");
    }
    if (props.data.link.includes("facebook.com/")) {
      subCatArrayValue.push("Facebook Store");
    }
    const readyForAdd = {
      id: props.cuid,
      link: props.data.link,
      nickname: props.data.name,
      realName: props.data.name,
      category: props.data.addedShop[0].category,
      subcategory: subCatArrayValue,
      icon: props.data.icon,
    };

    const result = await addYourShopToMyList(readyForAdd);

    if (result === "A New Record of ecommerce shop created") {
      toast.success(result);
    } else {
      toast.error(result);
    }
  };

  const [icon, setIcon] = useState(props.data.icon);

  useEffect(() => {
    setTooltipTitleVisibility(true);
    setTooltipFollowedVisibility(true);
    setTooltipTotalVisibility(true);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-4 ">
      <div className="w-full py-6 pl-8 pr-8 bg-white rounded-md shadow-md">
        {props.data.icon != "undefined" ? (
          <img
            src={icon}
            alt="profile"
            className="w-8 h-8 rounded-full shadow-xl ring-indigo-100 ring-2"
            onError={(e) => {
              e.target.src = "/images/shopping-bag.png";
            }}
          />
        ) : (
          <img
            src="/images/shopping-bag.png"
            alt="profile"
            className="w-8 h-8 rounded-full shadow-xl ring-indigo-100 ring-2"
          />
        )}

        <div className="h-16 mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
          <div
            className={`w-100 text-lg font-bold h-14 text-gray-800 ${styles.title}`}
            data-tip={props.data.name}
            data-for="title"
          >
            {props.data.name}
            {isTooltipTitleVisible && (
              <ReactTooltip
                delayShow={1500}
                effect="solid"
                type="dark"
                id="title"
              />
            )}
          </div>
        </div>
        <div className="mt-4">
          {/* not sure this part structure plz take a look on this * important number*/}
          {props.data.from == "all" ? (
            <div className="grid grid-cols-2 gap-2 ">
              <div
                className="flex flex-col items-center place-content-center "
                data-tip="It represents the number of followers that added this site"
                data-for="followed"
              >
                <p className="text-2xl font-semibold leading-tight text-indigo-500 ">
                  {props.data.number == undefined ? 0 : props.data.number}
                </p>
                <p className="mt-2 leading-3 text-gray-500 phone:text-xs sm:text-md ">
                  <span className="font-bold">You Followed</span> added
                </p>
                {isTooltipFollowedVisible && (
                  <ReactTooltip
                    delayShow={1000}
                    effect="solid"
                    type="dark"
                    id="followed"
                  />
                )}
              </div>
              <div
                className="flex flex-col items-center place-content-center "
                data-tip="It represents the total number of users that added this site"
                data-for="total"
              >
                <p className="text-2xl font-semibold leading-tight text-gray-600 ">
                  {props.data.addedShop.length}
                </p>
                <p className="mt-2 leading-3 text-gray-500 phone:text-xs sm:text-md ">
                  <span className="font-bold">Total users</span> added
                </p>
                {isTooltipTotalVisible && (
                  <ReactTooltip
                    delayShow={1000}
                    effect="solid"
                    type="dark"
                    id="total"
                  />
                )}
              </div>
            </div>
          ) : props.data.from == "onlyFd" ? (
            <div className="grid grid-cols-2 gap-2 -mx-2 ">
              <div
                className="flex flex-col items-center place-content-center"
                data-tip="It represents the number of followers that added this site"
                data-for="followed"
              >
                <p className="text-2xl font-bold leading-tight text-indigo-500">
                  {props.data.addedShop.length}
                </p>
                <p className="mt-2 leading-3 text-gray-500 phone:text-xs sm:text-md dark:text-gray-400 ">
                  <span className="font-bold">You Followed</span> added
                </p>
                {isTooltipFollowedVisible && (
                  <ReactTooltip
                    delayShow={1000}
                    effect="solid"
                    type="dark"
                    id="followed"
                  />
                )}
              </div>
              <div
                className="flex flex-col items-center place-content-center"
                data-tip="It represents the total number of users that added this site"
                data-for="total"
              >
                <p className="text-2xl font-semibold leading-tight text-gray-600">
                  {props.data.number}
                </p>
                <p className="mt-2 leading-3 text-gray-500 phone:text-xs sm:text-md dark:text-gray-400 hover:animate-pulse">
                  <span className="font-bold">Total users</span> added
                </p>
                {isTooltipTotalVisible && (
                  <ReactTooltip
                    delayShow={1000}
                    effect="solid"
                    type="dark"
                    id="total"
                  />
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <button
            className="flex items-center py-2 space-x-1 border-2 rounded-md bg-gray-50 place-content-center hover:text-white hover:bg-indigo-500"
            onClick={ClickAdd}
          >
            <p className="font-semibold text-md">Save</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
          <a
            className="grid border-2 rounded-md bg-gray-50 place-content-stretch group hover:bg-indigo-500 hover:text-white"
            href={props.data.link}
            target="external"
          >
            <button
              className="flex items-center py-2 space-x-1 rounded-md place-content-center group-hover:text-white group-hover:bg-indigo-500"
              onClick={visitSite}
            >
              <p className="font-semibold text-md">Visit</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 "
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
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopBoxForSearch;

// {props.data.from == "all" ? (
//   <div className="grid grid-cols-2 gap-2 ">
//       <div className="flex flex-col items-center place-content-center">
//       <p className="text-xl font-semibold leading-tight text-blue-400">
//         {props.data.number == undefined ? 0 : props.data.number}
//       </p>
//       <p className="mt-2 text-sm leading-3 text-gray-500 dark:text-gray-400">
//      You followed saved
//       </p>
//     </div>
//     <div className="flex flex-col items-center place-content-center">
//       <p className="text-xl font-semibold leading-tight text-green-600">
//         {props.data.addedShop.length}
//       </p>
//       <p className="mt-2 text-sm leading-3 text-gray-500 dark:text-gray-400">
//         Total People saved
//       </p>
//     </div>
//   </div>
// ) : props.data.from == "onlyFd" ? (
//   <div className="grid grid-cols-2 gap-2 ">
//     <div className="flex flex-col items-center place-content-center">
//       <p className="text-xl font-semibold leading-tight text-green-400">
//         {props.data.addedShop.length}
//       </p>
//       <p className="mt-2 text-sm leading-3 text-gray-500 dark:text-gray-400">
//          You followed saved
//       </p>
//     </div>
//     <div className="flex flex-col items-center place-content-center">
//       <p className="text-xl font-semibold leading-tight text-red-400">
//         {props.data.number}
//       </p>
//       <p className="mt-2 text-sm leading-3 text-gray-500 dark:text-gray-400">
//         Total People saved
//       </p>
//     </div>
//   </div>
// ) : (
//   ""
// )}
