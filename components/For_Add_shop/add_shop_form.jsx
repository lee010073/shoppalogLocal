// import styles
import styles from "./add_shop_form.module.scss";

// import library
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Hidden, Switch } from "@material-ui/core";
import { useRouter } from "next/router";
import parse from "url-parse";
import { Mixpanel } from "../../mixpanel/mixpanel";

//import library (library for notification)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import data

import { categoryData } from "./categoryData";

//import function
import { addShop, getWebsiteData } from "../../lib/function";

const Add_shop_form = (props) => {
  const subCategoryData = [
    { value: "Bags", label: "Bags", color: "#00B8D9" },
    {
      value: "Electronic Devices",
      label: "Electronic Devices",
      color: "#0052CC",
    },
    { value: "Sneakers", label: "Sneakers", color: "#5243AA" },
    { value: "PUMA", label: "PUMA", color: "#FF5630" },
    { value: "NIKE", label: "NIKE", color: "#FF8B00" },
    { value: "Jackets", label: "Jackets", color: "#FFC400" },
    { value: "Bikes", label: "Bikes", color: "#36B37E" },
    { value: "Lululemon", label: "Lululemon", color: "#00875A" },
    { value: "Dogs Supplies", label: "Dogs Supplies", color: "#253858" },
    { value: "Furniture", label: "Furniture", color: "#666666" },
  ];

  const router = useRouter();

  //for submit button

  const [submitEd, setSubmit] = useState(false);

    //for add shop loading
    const [addShopLoading,setAddShopLoading]=useState(false)

  //for adding shop

  const { register, handleSubmit, watch, errors, control } = useForm({});

  const onSubmit = async (data) => {
    setAddShopLoading(true)
    setSubmit(true);
    if (data.subcategory.length > 5) {
      toast.error("Sorry, Subcategory Maximum 5 tags !! ");
      setAddShopLoading(false)
      setSubmit(false);
    } else {
      let subCatArrayValue = [];
      for (let i = 0; i < data.subcategory.length; i++) {
        subCatArrayValue.push(data.subcategory[i].value);
      }

      if (data.link.includes("instagram.com/")) {
        subCatArrayValue.push("Instagram Store");
      }
      if (data.link.includes("facebook.com/")) {
        subCatArrayValue.push("Facebook Store");
      }

      const readyForAdd = {
        userId: props.userId,
        allData: data,
        subcategory: subCatArrayValue,
      };

      const result = await addShop(readyForAdd);

      if (result === "A New Record of ecommerce shop created") {
        toast.success(result);
        Mixpanel.identify(props.userId);
        Mixpanel.track("Successfully Added New Site");
        Mixpanel.track("DAU usage");
        setAddShopLoading(false);
        router.push("/");
      } else if (result == "subcategory length unable") {
        toast.error("Sorry, Subcategory Maximum 5 tags !!");
        setAddShopLoading(false);
      } else {
        toast.error(result);
        setAddShopLoading(false);
      }
    }
  };

  //for toggle functionality

  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };

  //for getting website detail

  const [webLink, setWebLink] = useState("none");
  const [websiteRealName, setWebsiteRealName] = useState("none");
  const [webHeader, setHeader] = useState();
  const [icon, setIcon] = useState("none");
  const [confirmLink, setConfirmLink] = useState(false);
  const [errorSiteRealName, setErrorSiteRealName] = useState("none");

  const urlWithHttp = async (data) => {
    if (data.startsWith("http")) {
      return data;
    } else {
      return `http://${data}`;
    }
  };

  const postLink = async (e) => {
    const url = await urlWithHttp(e.target.value);

    if (url) {
      document.getElementById("link").value = url;
      setWebLink(url);

      //getting detail
      const detail = await getWebsiteData(url);

      if (detail === "error") {
        toast.error("Sorry! This Link is not a valid link");
        setConfirmLink(false);

        const correct = async (link) => {
          return parse(link).hostname;
        };

        const getHostName = await correct(url);
        setErrorSiteRealName(getHostName);
        setWebsiteRealName("none");
        setIcon("no");
      } else {
        setConfirmLink(true);
        setHeader(detail.name);

        if (url.includes("instagram.com/")) {
          const splitLink = parse(url).pathname.split("/")[1];
          setErrorSiteRealName("none");
          setWebsiteRealName(`Instagram Shop - ${splitLink}`);
          document.getElementById(
            "name"
          ).value = `Instagram Shop - ${splitLink}`;
        } else if (url.includes("facebook.com/")) {
          const splitLink = parse(url).pathname.split("/")[1];
          setErrorSiteRealName("none");
          setWebsiteRealName(`Facebook Shop - ${splitLink}`);
          document.getElementById(
            "name"
          ).value = `Facebook Shop - ${splitLink}`;
        } else {
          setErrorSiteRealName("none");
          setWebsiteRealName(detail.name);
          document.getElementById("name").value = detail.name;
        }

        if (detail.icon && detail.icon.startsWith("/")) {
          const correct = parse(url).origin;
          setIcon(`${correct}${detail.icon}`);
        } else {
          setIcon(detail.icon);
        }
      }
    }
  };

  //for auto correct link
  const autoCorrect = (e) => {
    e.preventDefault();
    const correct = parse(webLink).origin;

    if (webLink.includes("instagram.com/")) {
      if (webHeader.includes("|")) {
        const name = webHeader.split("|")[0].toLowerCase().replace(/\s/g, "");
        document.getElementById("link").value = `${correct}/${name}`;
        postLink({ target: { value: `${correct}/${name}` } });
      } else {
        const splitLink = parse(webLink).pathname.split("/")[1];
        document.getElementById("link").value = `${correct}/${splitLink}`;
        postLink({ target: { value: `${correct}/${splitLink}` } });
      }
    } else if (webLink.includes("facebook.com/")) {
      const splitLink = parse(webLink).pathname.split("/")[1];
      document.getElementById("link").value = `${correct}/${splitLink}`;
      postLink({ target: { value: `${correct}/${splitLink}` } });
    } else {
      document.getElementById("link").value = correct;
      postLink({ target: { value: correct } });
    }
  };

  //for more option button
  const [show, setShow] = useState(false);

  const clickMore = (e) => {
    e.preventDefault();
    setShow(!show);
    Mixpanel.identify(props.userId);
    Mixpanel.track("More options picked while adding site");
  };

  //for confirm Checkbox

  const confirmCheckBox = () => {
    setConfirmLink(!confirmLink);
  };

  return (
    <div
      className={
        show ? `w-screen h-auto bg-gray-50` : `w-screen h-screen bg-gray-50`
      }
    >
      <section className="relative w-full text-gray-700 body-font">
        <div className="w-full py-10 mx-auto sm:px-4 phone:px-1 bg-gray-50">
          <div className="flex flex-col w-full mb-10 text-center">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 phone:text-xl md:text-2xl title-font">
              Save and Share Your Favorite Site With Others
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              Only <span className="font-semibold text-gray-800">Copy and Paste</span> required
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full phone:px-0 sm:px-12 md:px-20 lg:px-40 xl:px-60 xxl:px-96"
          >
            <div className="w-full ">
              <div className="flex flex-wrap ">
                <div className="w-full py-2 sm:px-8 phone:px-4">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="flex justify-between leading-7 text-gray-600 phone:text-xs md:text-sm"
                    >
                      <p className="mb-3 ml-2 text-gray-600 phone:text-base md:text-lg">
                        Link <span className="italic">(required)</span>{" "}
                      </p>
                      {webLink == "none" ? (
                        ""
                      ) : (
                        <div className="flex">
                          <div className="flex items-center px-4">
                            <div className="relative flex items-center justify-center flex-shrink-0 w-4 h-4 bg-white border border-gray-400 rounded-sm dark:bg-gray-800 dark:border-gray-700">
                              <input
                                type="checkbox"
                                className={`absolute w-full h-full opacity-0 cursor-pointer ${styles.checkbox}`}
                                onClick={confirmCheckBox}
                                {...(confirmLink == true && {
                                  defaultChecked: true,
                                })}
                              />
                              <div
                                className={`hidden text-white bg-indigo-700 rounded-sm 
                                ${styles.check_icon}`}
                              >
                                <svg
                                  className="icon icon-tabler icon-tabler-check"
                                  xmlns="http://www.w3.org/2000/svg"
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
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                              </div>
                            </div>
                            <p className="ml-2 font-normal leading-4 text-gray-800 lg:mr-4 sm:text-sm phone:text-xs dark:text-gray-100 lg:font-bold">
                              This link is correct
                            </p>
                          </div>

                          <button
                            className="py-1 mb-1 text-white bg-indigo-500 rounded-md phone:px-2 sm:px-3 sm:text-sm lg:font-bold phone:text-xs"
                            onClick={autoCorrect}
                          >
                            {" "}
                           Save Main Page 
                          </button>
                        </div>
                      )}
                    </label>
                    <input
                      type="text"
                      id="link"
                      name="link"
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                      ref={register({ required: true })}
                      placeholder="Copy the link here (https://www.youtube.com)"
                      onBlur={postLink}
                    />
                    {errors.link && (
                      <p className="text-red-500">This field is required</p>
                    )}
                  </div>
                </div>
                <div className="w-2/3 sm:px-8 phone:px-4">
                  <div className="relative">
                    <p
                      htmlFor="category"
                      className="mb-2 ml-2 text-gray-600 phone:text-base md:text-lg"
                    >
                      Category <span className="italic">(required)</span>
                    </p>
                    <Controller
                      name="category"
                      instanceId="category"
                      as={Select}
                      defaultValue=""
                      options={categoryData}
                      control={control}
                      rules={{ required: true }}
                    />
                  </div>
                  {errors.category && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </div>
                <div className="w-full sm:px-8 phone:px-4 phone:pt-2">
                  <div className="relative">
                    <p
                      htmlFor="name"
                      className="mb-2 ml-2 text-gray-600 phone:text-base md:text-lg"
                    >
                      Name of the site (Auto Detect Within 5sec){" "}
                      <span className="italic">(required)</span>
                    </p>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                      placeholder="How would you like to name the website ..."
                      ref={register({ required: true })}
                      defaultValue={
                        websiteRealName === "none" &&
                        errorSiteRealName === "none"
                          ? ""
                          : websiteRealName === "none" &&
                            errorSiteRealName !== "none"
                          ? `${errorSiteRealName}`
                          : `${websiteRealName}`
                      }
                      {...(websiteRealName === "none" &&
                        confirmLink == false && { disabled: true })}
                    />
                    {errors.name && (
                      <p className="text-red-500">This field is required</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="hidden"
                      id="realName"
                      name="realName"
                      ref={register({ required: true })}
                      defaultValue={
                        websiteRealName === "none" &&
                        errorSiteRealName === "none"
                          ? ""
                          : websiteRealName === "none" &&
                            errorSiteRealName !== "none"
                          ? `${errorSiteRealName}`
                          : `${websiteRealName}`
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="hidden"
                      id="icon"
                      name="icon"
                      ref={register({ required: true })}
                      defaultValue={icon === "none" ? "" : `${icon}`}
                    />
                  </div>
                </div>

                <div
                  className={`w-full ${show == false ? styles.show : ""}`}
                  id="hidden"
                >
                  <div className="w-full phone:pt-2 sm:px-8 phone:px-4">
                    <div className="relative">
                      <p
                        htmlFor="subcategory"
                        className="mb-2 ml-2 text-lg text-gray-600"
                      >
                        Hash-Tags (Max: 5tags)
                      </p>
                      <Controller
                        name="subcategory"
                        id="subcategory"
                        instanceId="subcategory"
                        as={CreatableSelect}
                        defaultValue=""
                        isMulti
                        options={subCategoryData}
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:px-8 phone:px-4 phone:pt-2">
                    <div className="relative">
                      <p
                        htmlFor="comment"
                        className="mb-2 ml-2 text-lg text-gray-600"
                      >
                        Comment
                      </p>
                      <textarea
                        id="comment"
                        name="comment"
                        className="w-full h-20 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                        ref={register}
                        placeholder="You experience while using this ecommerce website"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full sm:px-8 phone:px-4 phone:pt-2">
                    <div className="relative">
                      <p
                        htmlFor="message"
                        className="mb-2 ml-2 text-lg text-gray-600"
                      >
                        Did you buy from this website before?{" "}
                        <span>
                          {checked ? (
                            <span className="px-2 py-2 ml-1 font-bold text-gray-50 rounded-xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                              Yes!!
                            </span>
                          ) : (
                            <span className="px-2 py-2 ml-1 font-bold bg-gray-400 text-gray-50 rounded-xl">
                              No
                            </span>
                          )}
                        </span>
                      </p>
                      <ol className="">
                        <li className="flex flex-wrap justify-between">
                          <Switch
                            name="visited"
                            inputRef={register}
                            onChange={toggleChecked}
                            checked={checked}
                          />
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                {show ? (
                  <button
                    onClick={clickMore}
                    className="px-4 py-2 mt-4 mb-8 font-bold text-white bg-indigo-500 border-2 rounded-lg phone:ml-4 sm:ml-8 hover:bg-indigo-600 "
                  >
                    Hide Option
                  </button>
                ) : (
                  <button
                    onClick={clickMore}
                    className="px-4 py-2 mt-4 mb-8 font-bold text-white bg-indigo-500 border-2 rounded-lg phone:ml-4 sm:ml-8 hover:bg-indigo-600"
                  >
                    More Option
                  </button>
                )}

                <div className="w-full p-2">
                {addShopLoading?
                 <button
                 type="submit"
                 className={`flex px-8 py-2 mx-auto text-lg font-bold text-white border-0 rounded-md focus:outline-none ${
                   submitEd === true || confirmLink == false
                     ? "bg-gray-300 animate-pulse cursor-not-allowed"
                     : "bg-indigo-500 hover:bg-indigo-600 animate-pulse cursor-not-allowed"
                 }`}
                 {...(submitEd === true ||
                   (confirmLink == false && {
                     disabled: true,
                   }))}
                    >
                 Processing...
                  </button>:
                  <button
                    type="submit"
                    className={`flex px-8 py-2 mx-auto text-lg font-bold text-white border-0 rounded-md focus:outline-none ${
                      submitEd === true || confirmLink == false
                        ? "bg-gray-300"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    }`}
                    {...(submitEd === true ||
                      (confirmLink == false && {
                        disabled: true,
                      }))}
                  >
                    Submit
                  </button>
                  }
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Add_shop_form;