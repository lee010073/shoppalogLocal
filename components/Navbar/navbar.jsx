//import style

//import Library
import Link from "next/link";
import useOnclickOutside from "react-cool-onclickoutside";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

//import Component

const Navbar = (props) => {
  const router = useRouter();

  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const ref1 = useOnclickOutside(() => {
    setOpenMenu1(false);
    setOpenMenu2(false);
  });
  const handleClickBtn1 = () => {
    if (openMenu2 == true) {
      setOpenMenu2(false);
    }
    setOpenMenu1(!openMenu1);
  };

  const handleClickBtn2 = () => {
    if (openMenu1 == true) {
      setOpenMenu1(false);
    }
    setOpenMenu2(!openMenu2);
  };

  const [searchPpl, setSearchPpl] = useState("");

  const inputChangePpl = (e) => {
    setSearchPpl(e.target.value);
  };
  const submitSearchPpl = () => {
    router.push(`/searching_shop/${searchPpl}`);
  };

  const [searchShop, setSearchShop] = useState("");

  const inputChangeShop = (e) => {
    setSearchShop(e.target.value);
  };
  const submitSearchShop = () => {
    router.push(`/searching_user/${searchShop}`);
  };

  //redux

  const { name } = useSelector((state) => state.navbar_name);
  const { icon } = useSelector((state) => state.navbar_icon);

  return (
    <div className="w-full">
      <header className="text-gray-600 body-font">
        <div className="grid items-center grid-cols-12 gap-2 py-4">
          {/* Part 1 starts */}
          <div className="phone:col-span-12 sm:col-span-12 lg:col-span-2 sm:place-content-center sm:place-items-center sm:place-self-center">
          <Link href={`/`} className="">
            <a  href={`/`} className="flex font-medium text-gray-900 col-span-items-center title-font place-content-center place-items-center place-self-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full sm:hidden md:block lg:hidden xl:block"
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
              <span className="text-2xl sm:font-medium md:ml-3">SHOPPALOG</span>
            </a>
            </Link>
          </div>
          {/* Part 1 ends */}

          {/* Part 2 starts */}
          <div className="phone:col-span-6 sm:col-span-7 lg:col-span-6">
            <nav className="grid grid-cols-4 m-auto text-base place-items-center place-self-center md:border-gray-400">
              <Link href={`/`} className="">
                <a
                  href={`/`}
                  className="flex items-center m-2 uppercase hover:text-gray-900 "
                >
                  <p className="hidden font-semibold text-md lg:block xl:mr-1">
                    Home
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 xl:h-5 xl:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </Link>
              <Link href={`/add_shop`}>
                <a
                  href={`/add_shop/`}
                  className="flex items-center m-2 uppercase hover:text-gray-900"
                >
                  <p className="hidden font-semibold text-md lg:block xl:mr-1">
                    Add Site
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 xl:h-5 xl:w-5"
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
                </a>
              </Link>
              <Link href={`/explore`}>
                <a
                  href={`/explore/`}
                  className="flex items-center m-2 uppercase hover:text-gray-900 "
                >
                  <p className="hidden font-semibold text-md lg:block xl:mr-1">
                    Explore
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 xl:h-5 xl:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </a>
              </Link>

              <button
                className="flex items-center m-2 uppercase transition duration-150 ease-in-out hover:text-gray-900 "
                onClick={handleClickBtn1}
                ref={ref1}
              >
                <p className="hidden font-semibold text-md lg:block xl:mr-1">
                  Search
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 xl:h-5 xl:w-5"
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
            </nav>
          </div>
          {/* Part 2 ends */}

          {/* Part 3 starts */}
          <div className=" phone:col-span-6 sm:col-span-5 lg:col-span-4">
            <div className="grid grid-cols-3 place-content-center place-items-center place-self-center">
              <button
                className="flex items-center m-auto uppercase transition duration-150 ease-in-out lg:ml-10 hover:text-gray-900"
                onClick={handleClickBtn2}
                ref={ref1}
              >
                <p className="hidden font-semibold text-md lg:block xl:mr-1">
                  Add
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 xl:h-5 xl:w-5"
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
              </button>
              <div className="flex items-center phone:-ml-4 sm:ml-2 md:-mr-8 xl:-ml-28">
                <p className="hidden text-md xl:block xl:mr-6 xxl:mr-4 xl:ml-20">
                  {" "}
                {name && name}
                </p>
                <Link href={`/my_profile/`}>
                  <img
                    src={icon && icon}
                    className="inline-flex rounded-full cursor-pointer phone:w-7 phone:h-7 sm:w-9 sm:h-9 ring ring-indigo-500 ring-offset-1"
                    onError={(e) => {
                      e.target.src = "/images/icon.png";
                    }}
                  />
                </Link>
              </div>
              {/* logout */}
              <a
                className="inline-flex items-center px-4 py-2 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0"
                href="/api/logout"
              >
                <p className="hidden text-md xxl:block">SignOut</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 phone:w-6 phone:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* Part 3 ends */}
        </div>
      </header>

      {/* Search */}

      {openMenu1 && (
        <div className="relative w-full px-8 bg-white shadow-xl " ref={ref1}>
          <div className="container mx-auto text-black ">
            <form onSubmit={submitSearchPpl} className="flex">
              <input
                id="searchfield"
                type="search"
                placeholder="Find the shop you want...."
                autoFocus="autofocus"
                className="w-full p-2 text-xl leading-normal transition appearance-none text-grey-800 focus:outline-none focus:border-transparent lg:text-xl"
                onChange={inputChangePpl}
                required
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      )}
      {openMenu2 && (
        <div className="relative w-full px-8 bg-white shadow-xl " ref={ref1}>
          <div className="container mx-auto text-black ">
            <form onSubmit={submitSearchShop} className="flex">
              <input
                id="searchfield"
                type="search"
                placeholder="Find your friend to subsribe..."
                autoFocus="autofocus"
                className="w-full p-2 text-xl leading-normal transition appearance-none text-grey-800 focus:outline-none focus:border-transparent lg:text-xl"
                onChange={inputChangeShop}
                required
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
