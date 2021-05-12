//import Library
import Link from "next/link";
import { useState, useEffect } from "react";

import ReactTooltip from "react-tooltip";

const UserCard = (props) => {
  //for tooltip
  const [isTooltipVisitVisible, setTooltipVisitVisibility] = useState(false);

  useEffect(() => {
    setTooltipVisitVisibility(true);
  }, []);
  return (
    <div>
      {/* Card is full width. Use in 4 col grid for best view. */}
      {/* Card code block start */}
      <div className="py-1 bg-gray-100 rounded-md shadow-md">
        <div className="grid grid-cols-3">
          <div className="">
            <div className="w-12 h-12 mt-4 ml-4 rounded-full shadow-sm sm:w-16 sm:h-16 ring-4 ring-indigo-500 border-grap-100 ">
              <img
                className="object-cover w-full h-full overflow-hidden rounded-full"
                src={props.data.image}
                alt="placeholder image"
                onError={(e) => {
                  e.target.src = "/images/icon.png";
                }}
              />
            </div>
          </div>
          <p className="font-normal leading-4 tracking-normal text-center text-gray-700 text-md phone:-ml-6 phone:mt-8 sm:mt-10 lg:mt-10 xxl:mt-8 lg:-ml-4 xxl:-ml-4 xxl:text-lg">
            @{props.data.name}
          </p>
          <Link
            href={
              props.data.id === props.cuid
                ? `/my_profile`
                : `/other_profile/${props.data.id}`
            }
          >
            <button
              className="mt-4 ml-10 text-indigo-500 hover:text-indigo-600 "
              data-tip={"Visit Profile"}
              data-for="visit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </Link>
          {isTooltipVisitVisible && (
            <ReactTooltip
              delayShow={1200}
              effect="solid"
              type="dark"
              id="visit"
            />
          )}
        </div>
        <div className="flex justify-between w-full mt-4 mb-4">
          <div className="flex flex-col items-center w-4/12">
            <p className="mb-1 text-2xl text-gray-600 dark:text-gray-400">
              {props.data.detail.myList.length}
            </p>
            <p className="text-sm text-gray-800 ">Shop</p>
          </div>
          <div className="flex flex-col items-center w-4/12 border-l border-r border-gray-200">
            <p className="mb-1 text-2xl text-gray-600 dark:text-gray-400">
              {props.data.detail.following.length}
            </p>
            <p className="text-sm text-gray-800 ">Subscribed</p>
          </div>
          <div className="flex flex-col items-center w-4/12">
            <p className="mb-1 text-2xl text-gray-600">
              {props.data.detail.follower.length}
            </p>
            <p className="text-sm text-gray-800 ">Follower</p>
          </div>
        </div>
      </div>
      {/* Card code block end */}
    </div>
  );
};

export default UserCard;
