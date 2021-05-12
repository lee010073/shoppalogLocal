//Importing library
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Mixpanel } from "../../../mixpanel/mixpanel";
//Import components

//Import function

//Import style
import styles from "./shopBox_for_newsUpdate.module.scss";

const ShopBoxForNewsUpdate = (props) => {
  const subCat = JSON.parse(props.data.subCategory);

  //for Mixpanel:
  const visitSite = () => {
    //this is to identify the user you are currently tracking//
    Mixpanel.identify(props.navbarUser.id);
    //this is to name the action you want to track//
    Mixpanel.track("Visit External Site (from newsUpdate)");
    Mixpanel.track("Visit External Site");
    Mixpanel.track("DAU usage");
    //this set is used to set the profile for the person u created for the record, you dont have to set everytime i think//
    Mixpanel.people.set({
      $name: props.navbarUser.name,
      $email: props.navbarUser.email,
    });
  };

  //for Tooltip
  const [isTooltipTitleVisible, setTooltipTitleVisibility] = useState(false);

  const [textColor, setTextColor] = useState("");
  useEffect(() => {
    const cat = props.data.category;
    if (cat === "Food") {
      setTextColor("text-green-500 font-bold ");
    }
    if (cat === "Sports") {
      setTextColor("text-blue-500 font-bold ");
    }
    if (cat === "Fashion") {
      setTextColor("text-red-500 font-bold ");
    }
    if (cat === "Others") {
      setTextColor("text-yellow-500 font-bold ");
    }
    setTooltipTitleVisibility(true);
  }, []);

  return (
    <div className="grid py-4 ">
      <div
        className={`${
          props.phone === false ? "max-w-sm" : `${styles.forPhone}`
        } shadow-md bg-gray-50 rounded-xl dark:bg-gray-800`}
      >
        <div className="px-6 py-6">
          <div className="flex items-center">
            <img
              src={props.data.user.user.image}
              alt="dp"
              className="w-10 h-10 rounded-full shadow-xl"
              onError={(e) => {
                e.target.src = "/images/icon.png";
              }}
            />
            <div className="pl-2">
              <p className="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-100">
                {props.data.user.user.name}
              </p>
            </div>
          </div>
          <div className="mt-4">
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

            {props.data.comment.shopDescription == "" ? (
              // <p className="mt-2 text-sm leading-5 text-gray-500 opacity-40 sm:text-base dark:text-gray-400">
              //   no comment
              // </p>
              ""
            ) : (
              <div>
                <p className="mt-4 text-lg font-semibold leading-4 text-gray-800 dark:text-gray-100">
                  Comment:
                </p>
                <div className="overflow-x-auto h-22 overscroll-none">
                  <p className="mt-2 text-sm leading-5 text-gray-500 sm:text-base dark:text-gray-400">
                    {props.data.comment.shopDescription}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4">
            <p className="text-sm text-base font-semibold leading-4 text-gray-800 sm:text-lg dark:text-gray-100">
              Category:{" "}
              <span className={`font-mono ${textColor}`}>
                {props.data.category}
              </span>
            </p>
            <div className="overflow-x-auto">
              <div className="pt-4 pb-2 w-max">
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
                  <span className="hidden px-3 py-1 mx-1 mt-1 mb-2 text-sm font-semibold text-gray-300 bg-gray-100 rounded-full">
                    {"No Hash-Tag"}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <Link
              href={`/other_profile/${props.data.userId}`}
              target="external"
            >
              <button className="flex items-center py-2 text-gray-700 bg-gray-100 rounded-md phone:px-6 md:px-8 place-content-center hover:bg-gray-200">
                <p className="pr-1 text-sm font-bold leading-9 text-center text-gray-700">
                  VISIT
                </p>
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </Link>
            <a href={props.data.link} target="external">
              <button
                className="flex items-center py-2 text-gray-700 bg-gray-100 rounded-md phone:px-6 md:px-8 place-content-center hover:bg-gray-200"
                onClick={visitSite}
              >
                <p className="pr-1 text-sm font-bold leading-9 text-center text-gray-700">
                  VISIT
                </p>
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBoxForNewsUpdate;
