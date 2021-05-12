//import Library
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import auth0 from "./api/utils/auth0";

//import function
import { sendFromFirst, getWithId, uploadIcon } from "../lib/function";

export default function First(props) {
  const [submitLoading,setSubmitLoading]=useState(false)
  const [icon, setIcon] = useState("none");

  const router = useRouter();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    setSubmitLoading(true)
    const result = await sendFromFirst(data);

    if (result == "name length unable") {
      toast.error("Username need to be in 5-16 Characters & NO Space");
      //setSubmitLoading(false)
    } else if (result == "description length unable") {
      toast.error("Description need to be in 30 Characters");
      setSubmitLoading(false)
    } else if (result == "first info done") {
      setSubmitLoading(false)
      router.push("/");
    }
  };

  const [iconLoading, setIconLoading] = useState(false);

  const uploadPhoto = async (e) => {
    if (e.target.files[0].size > 2000000) {
      toast.error(
        "Sorry your photo is too big, please upload phot with in 2MB"
      );
    } else {
      setIconLoading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "inf3mkp2");

      const url = await uploadIcon(formData);

      setIcon(`${url}`);
      setIconLoading(false);
    }
  };

  // for tooltip
  const [isTooltipDefaultVisible, setTooltipDefaultVisibility] = useState(
    false
  );
  const [isTooltipPhotoVisible, setTooltipPhotoVisibility] = useState(false);
  useEffect(() => {
    setTooltipDefaultVisibility(true);
    setTooltipPhotoVisibility(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <div className="min-h-screen bg-gradient-to-t from-indigo-100 to-white md:py-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            id="id"
            name="id"
            defaultValue={props && props.id && `${props.id}`}
            ref={register({ required: true })}
          />
          {icon === "none" && props.image ? (
            <input
              type="hidden"
              id="image"
              name="image"
              defaultValue={props && props.image && `${props.image}`}
              ref={register({ required: true })}
            />
          ) : (
            <input
              type="hidden"
              id="image"
              name="image"
              defaultValue={`${icon}`}
              ref={register({ required: true })}
            />
          )}
          <div className="container mx-auto bg-white rounded shadow dark:bg-gray-800">
            <div className="flex flex-wrap">
              <div className="relative w-full px-12 py-5 bg-gray-100 border-r border-gray-500 rounded-tl xl:w-1/4 lg:w-1/4 dark:bg-gray-700">
                <div className="absolute bottom-0 right-0 text-indigo-700 dark:text-indigo-600">
                  <svg
                    width={96}
                    height={150}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="currentColor" fillRule="evenodd">
                      <path d="M77.924 158.943a2.14 2.14 0 00-2.56 1.606 2.14 2.14 0 004.172.945 2.13 2.13 0 00-1.612-2.55zm-14.418-5.024a2.144 2.144 0 00-2.858.994 2.13 2.13 0 00.999 2.846 2.144 2.144 0 002.857-.993 2.129 2.129 0 00-.998-2.847zm-12.93-8.106a2.144 2.144 0 00-3.007.336 2.127 2.127 0 00.337 2.996c.924.735 2.27.584 3.007-.336a2.127 2.127 0 00-.337-2.996zm-10.806-10.76a2.145 2.145 0 00-3.007-.336 2.129 2.129 0 00-.337 2.998 2.147 2.147 0 003.008.334 2.126 2.126 0 00.336-2.996zm-8.142-12.874a2.142 2.142 0 00-2.858-.992 2.127 2.127 0 00-.995 2.847 2.143 2.143 0 002.857.992 2.128 2.128 0 00.996-2.847zm-5.051-14.358a2.141 2.141 0 00-2.562-1.605 2.133 2.133 0 00-1.61 2.553 2.14 2.14 0 002.561 1.604 2.132 2.132 0 001.61-2.552zm-1.708-15.124c0-1.177-.959-2.13-2.141-2.13a2.136 2.136 0 00-2.138 2.134 2.137 2.137 0 002.14 2.13 2.136 2.136 0 002.14-2.134zm1.682-15.126a2.132 2.132 0 00-1.615-2.55 2.14 2.14 0 00-2.559 1.609 2.13 2.13 0 001.615 2.55 2.14 2.14 0 002.559-1.61zm5.03-14.37a2.13 2.13 0 00-1-2.845 2.143 2.143 0 00-2.856.996 2.127 2.127 0 001 2.845 2.141 2.141 0 002.855-.996zm8.124-12.889a2.127 2.127 0 00-.34-2.996 2.144 2.144 0 00-3.007.338 2.127 2.127 0 00.34 2.996c.925.734 2.27.581 3.007-.338zm10.789-10.777a2.125 2.125 0 00.333-2.996 2.147 2.147 0 00-3.008-.333 2.128 2.128 0 00-.332 2.998 2.145 2.145 0 003.007.331zm12.912-8.124a2.127 2.127 0 00.993-2.846 2.143 2.143 0 00-2.86-.99 2.13 2.13 0 00-.992 2.847 2.142 2.142 0 002.859.99zm14.405-5.046a2.132 2.132 0 001.608-2.554 2.14 2.14 0 00-4.171.952 2.139 2.139 0 002.563 1.602zM92.76 21.563c-.526 0-1.042.213-1.414.585a2.015 2.015 0 00-.585 1.415c0 .526.213 1.041.585 1.413a2.01 2.01 0 001.415.587c.526 0 1.04-.214 1.414-.587.372-.372.586-.887.586-1.413 0-.527-.214-1.043-.586-1.415a2.017 2.017 0 00-1.414-.585M74.552 179.93a2.137 2.137 0 00-2.533 1.642 2.137 2.137 0 004.18.881 2.127 2.127 0 00-1.647-2.523zm-17.7-5.727a2.14 2.14 0 00-2.822 1.078 2.127 2.127 0 001.08 2.811 2.138 2.138 0 002.822-1.077 2.124 2.124 0 00-1.08-2.812zm-16.11-9.284a2.144 2.144 0 00-2.985.468 2.126 2.126 0 00.471 2.975 2.141 2.141 0 002.984-.47 2.125 2.125 0 00-.47-2.973zm-13.83-12.411a2.141 2.141 0 00-3.017-.156 2.124 2.124 0 00-.157 3.006c.79.874 2.14.943 3.018.156a2.124 2.124 0 00.156-3.006zm-10.952-14.99a2.138 2.138 0 00-2.918-.775 2.124 2.124 0 00-.78 2.908 2.141 2.141 0 002.92.777 2.125 2.125 0 00.778-2.91zm-7.578-16.923a2.14 2.14 0 00-2.693-1.365 2.128 2.128 0 00-1.37 2.682 2.138 2.138 0 002.691 1.367 2.128 2.128 0 001.372-2.684zm-3.863-18.134a2.134 2.134 0 00-2.345-1.896 2.131 2.131 0 00-1.903 2.338 2.133 2.133 0 002.345 1.897 2.131 2.131 0 001.903-2.34zm-.011-18.547a2.13 2.13 0 00-1.906-2.336 2.134 2.134 0 00-2.344 1.9 2.129 2.129 0 001.906 2.335 2.134 2.134 0 002.344-1.899zm3.84-18.146a2.127 2.127 0 00-1.375-2.68 2.138 2.138 0 00-2.69 1.369 2.125 2.125 0 001.374 2.68 2.138 2.138 0 002.69-1.369zm7.564-16.942a2.126 2.126 0 00-.782-2.908 2.141 2.141 0 00-2.918.779 2.123 2.123 0 00.781 2.908 2.14 2.14 0 002.919-.78zM26.85 33.822a2.124 2.124 0 00-.161-3.006 2.14 2.14 0 00-3.017.159 2.123 2.123 0 00.16 3.006 2.143 2.143 0 003.018-.16zm13.813-12.425a2.125 2.125 0 00.468-2.975 2.142 2.142 0 00-2.986-.466 2.125 2.125 0 00-.467 2.975 2.141 2.141 0 002.985.466zm16.091-9.298a2.126 2.126 0 001.079-2.813 2.139 2.139 0 00-2.822-1.074 2.124 2.124 0 00-1.078 2.813 2.139 2.139 0 002.821 1.074zm17.688-5.746a2.13 2.13 0 001.645-2.525 2.135 2.135 0 00-2.534-1.639 2.127 2.127 0 00-1.645 2.525 2.137 2.137 0 002.534 1.639zM93.287.474a2.01 2.01 0 00-1.415.587 2.012 2.012 0 00-.585 1.413c0 .527.213 1.043.585 1.415.372.372.888.585 1.415.585s1.041-.213 1.415-.585c.372-.372.585-.888.585-1.415 0-.526-.213-1.041-.585-1.413a2.013 2.013 0 00-1.415-.587M93.165 140.263c-.527 0-1.043.214-1.415.586a2.015 2.015 0 00-.585 1.414c0 .527.213 1.042.585 1.414a2.01 2.01 0 001.415.586c.527 0 1.041-.213 1.415-.586.372-.372.585-.887.585-1.414 0-.526-.213-1.042-.585-1.414a2.017 2.017 0 00-1.415-.586M80.918 139.095a2.13 2.13 0 10-1.1 4.116 2.13 2.13 0 001.1-4.116zm-11.432-4.738a2.132 2.132 0 00-2.911.778 2.132 2.132 0 003.69 2.133 2.131 2.131 0 00-.78-2.911zm-9.82-7.538a2.13 2.13 0 10-3.014 3.012 2.13 2.13 0 003.014-3.012zm-7.546-9.812a2.132 2.132 0 10-3.688 2.138 2.132 2.132 0 003.688-2.138zm-4.745-11.425a2.133 2.133 0 00-2.612-1.507 2.13 2.13 0 101.104 4.116 2.131 2.131 0 001.508-2.61zm-1.613-12.27a2.13 2.13 0 10-4.262.003c0 1.177.955 2.13 2.133 2.128a2.13 2.13 0 002.13-2.132zm1.593-12.273a2.131 2.131 0 10-4.12-1.093 2.131 2.131 0 004.12 1.093zm4.727-11.433a2.13 2.13 0 10-3.693-2.13 2.13 2.13 0 103.693 2.13zm7.531-9.825a2.13 2.13 0 10-3.018-3.009 2.13 2.13 0 003.018 3.009zm9.807-7.553a2.13 2.13 0 10-2.139-3.685 2.13 2.13 0 002.14 3.685zm11.424-4.756a2.13 2.13 0 10-1.105-4.115 2.13 2.13 0 001.105 4.115zM92.6 41.285c-.526 0-1.042.214-1.414.586a2.015 2.015 0 00-.586 1.414c0 .527.214 1.042.586 1.414a2.01 2.01 0 001.414.586c.527 0 1.042-.213 1.415-.586.372-.372.585-.887.585-1.414 0-.526-.213-1.042-.585-1.414a2.017 2.017 0 00-1.415-.586M92.825 119.675c-.526 0-1.042.213-1.414.585a2.017 2.017 0 00-.586 1.415c0 .527.214 1.041.586 1.415.372.372.888.585 1.414.585.527 0 1.042-.213 1.415-.585.372-.374.585-.888.585-1.415s-.213-1.041-.585-1.415a2.017 2.017 0 00-1.415-.585M83.508 118.415a2.133 2.133 0 00-2.733 1.272 2.129 2.129 0 001.273 2.731 2.131 2.131 0 101.46-4.004zm-8.118-4.693a2.132 2.132 0 10-2.742 3.263 2.132 2.132 0 002.742-3.263zm-6.034-7.177a2.133 2.133 0 00-2.913-.777 2.131 2.131 0 102.913.777zm-3.209-8.802a2.133 2.133 0 00-4.2.738 2.132 2.132 0 004.2-.738zm-.004-9.376a2.13 2.13 0 00-1.734-2.464 2.13 2.13 0 10-.733 4.197 2.131 2.131 0 002.467-1.733zm3.198-8.802a2.131 2.131 0 10-3.693-2.13 2.131 2.131 0 003.693 2.13zm6.027-7.187a2.132 2.132 0 10-3.004-.257 2.132 2.132 0 003.004.257zm8.11-4.699a2.13 2.13 0 10-1.464-4.002 2.13 2.13 0 101.464 4.002zM92.94 61.874a2.01 2.01 0 00-1.415.586 2.012 2.012 0 00-.585 1.414c0 .526.213 1.042.585 1.414.372.372.888.586 1.415.586s1.041-.214 1.415-.586c.372-.372.585-.888.585-1.414 0-.527-.213-1.042-.585-1.414a2.013 2.013 0 00-1.415-.586" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col items-center justify-center text-indigo-700 dark:text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="p-2 text-white bg-indigo-500 rounded-full cursor-pointer w-14 h-14 phone:w-12 phone:h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="mt-4 font-bold text-indigo-600 text-basefont-black">
                    Shoppalog
                  </p>
                </div>
                <ul className="mt-20">
                  <li className="flex items-center mb-12 sm:mb-16">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-indigo-600 border border-indigo-700 rounded-full shadow dark:border-indigo-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="ml-4 text-lg font-semibold text-indigo-600 dark:text-indigo-600">
                      Onboarding
                    </p>
                  </li>
                  <li className="flex items-center mb-12 sm:mb-16">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-indigo-600 border border-indigo-600 rounded-full dark:border-indigo-600 dark:text-indigo-600">
                      2
                    </div>
                    <p className="ml-4 text-lg font-semibold text-indigo-600 ">
                      Profile Setup
                    </p>
                  </li>
                </ul>
              </div>
              <div className="w-full xl:w-3/4 lg:w-3/4">
                <div className="pt-10 pb-8 xl:w-full">
                  <div className="flex items-center w-11/12 mx-auto">
                    <p className="font-bold text-gray-700 phone:text-xl sm:text-2xl dark:text-gray-100">
                      Set Up Your Profile...
                    </p>
                    <div className="ml-2 text-gray-600 cursor-pointer dark:text-gray-100"></div>
                  </div>
                </div>
                <div className="w-11/12 mx-auto">
                  <div className="mx-auto xl:w-9/12 xl:mx-0">
                    <div className="relative h-48 rounded">
                      <img
                        src="https://res.cloudinary.com/djccssdr9/image/upload/v1617955545/joanna-kosinska-1_CMoFsPfso-unsplash_knuzsm.jpg"
                        alt=""
                        className="absolute object-cover w-full h-full overflow-hidden rounded shadow opacity-90"
                      />
                      <div className="absolute right-0 flex items-center px-1 py-1 mt-2 mr-2 bg-white rounded shadow cursor-default dark:bg-gray-600 ">
                        <div
                          className="text-gray-600 hover:text-indigo-600"
                          data-tip="This is the default banner photo, you can edit it later in your profile"
                          data-for="default"
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
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {isTooltipDefaultVisible && (
                            <ReactTooltip
                              delayShow={500}
                              effect="solid"
                              type="dark"
                              id="default"
                              place="bottom"
                            />
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-0 w-20 h-20 ml-12 -mb-10 bg-center bg-no-repeat bg-cover rounded-full shadow ">
                        {props &&
                        !props.image &&
                        iconLoading === false &&
                        icon === "none" ? (
                          <img
                            src="/images/icon.png"
                            style={{ width: "100%" }}
                            className="absolute z-0 object-cover w-full h-full overflow-hidden rounded-full shadow"
                            alt=""
                          />
                        ) : (props && props.image) ||
                          (iconLoading === false && icon !== "none") ? (
                          <img
                            src={icon === "none" ? `${props.image}` : `${icon}`}
                            style={{ width: "100%" }}
                            className="absolute z-0 object-cover w-full h-full overflow-hidden rounded-full shadow"
                            alt=""
                            onError={(e) => {
                              e.target.src = "/images/icon.png";
                            }}
                          />
                        ) : (
                          <img
                            src="/images/loading.svg"
                            style={{ width: "100%" }}
                            className="absolute z-0 object-cover w-full h-full overflow-hidden rounded-full shadow"
                            alt=""
                          />
                        )}
                        <div
                          className="absolute right-0 flex items-center justify-center w-6 h-6 text-gray-600 bg-white rounded-full hover:bg-indigo-500 hover:text-white ring-2 ring-indigo-500"
                          data-tip="Change your icon here"
                          data-for="photo"
                        >
                          <label>
                            <input
                              type="file"
                              className="hidden"
                              onChange={uploadPhoto}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="cursor-pointer icon icon-tabler icon-tabler-edit"
                              width={16}
                              height={16}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                              <line x1={16} y1={5} x2={19} y2={8} />
                            </svg>
                          </label>
                          {isTooltipPhotoVisible && (
                            <ReactTooltip
                              delayShow={500}
                              effect="solid"
                              type="dark"
                              id="photo"
                              place="bottom"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full mt-16 xl:w-3/6 lg:w-3/6">
                      <label
                        htmlFor="username"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        @ Your Username (required)
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="py-3 pl-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded shadow-sm focus:outline-none dark:border-gray-700 dark:hover:border-indigo-600 focus:border-indigo-700 dark:text-gray-100"
                        defaultValue={props && props.name && `${props.name}`}
                        placeholder="Enter Your Username (5-16 Characters & NO space)"
                        ref={register({
                          required: true,
                          minLength: 5,
                          maxLength: 16,
                          pattern: /^\S*$/,
                        })}
                      />
                      {errors.username && (
                        <p className="text-red-500">
                          This field is as 5-16 Characters & NO Space
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full mt-8 xl:w-4/5 lg:w-w-4/5">
                      <label
                        htmlFor="about"
                        className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                      >
                        # Your Status (Optional)
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        className="py-2 pl-3 text-sm bg-transparent border border-gray-300 rounded shadow-sm resize-none focus:outline-none focus:border-indigo-700 dark:border-gray-700 dark:hover:border-indigo-600 dark:text-gray-100"
                        placeholder="Let the world know who you are!!"
                        ref={register({ required: false, maxLength: 30 })}
                        rows={4}
                      />
                      <p className="w-full pt-1 text-xs text-right text-gray-500">
                        Character Limit: 30
                      </p>
                      {errors.description && (
                        <p className="text-red-500">
                          This field have a maximum 30 Characters
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full px-5 py-4 bg-gray-100 sm:px-8 dark:bg-gray-700">
                  {submitLoading?
                   <button
                   className="px-8 py-3 font-bold text-white uppercase transition duration-150 ease-in-out bg-indigo-500 rounded cursor-not-allowed hover:bg-indigo-600 text-md btn focus:outline-none animate-pulse disabled"
                   type="button"
                   >
  
                  Processing...
                  </button>
                  :
                  <button
                    className="px-8 py-3 font-bold text-white uppercase transition duration-150 ease-in-out bg-indigo-500 rounded hover:bg-indigo-600 text-md btn focus:outline-none "
                    type="submit"
                  >
      
                    NEXT
                  </button>
                  }             
                </div>
              </div>
            </div>
          </div>
        </form>
        ;
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = await auth0.getSession(ctx.req, ctx.res);

  if (session) {
    const detail = await getWithId(session.user.email);
    return {
      props: detail,
    };
  } else {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
}
