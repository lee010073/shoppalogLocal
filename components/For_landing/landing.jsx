//Importing library
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

//import function

//import components
import Footer from "../Reuse/footer";

function Index(props) {
  const [show, setShow] = useState(false);

  const click = () => {
    props.loading();
  };

  return (
    <>
      <nav className="w-full bg-white">
        <div className="flex items-center justify-between px-6 mx-auto phone:pt-6 sm:pt-2 sm:mx-4 lg:mx-4 xl:mx-10">
          <Link href="/">
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
          </Link>
          <div>
            <div
              onClick="toggleMenu(true)"
              className="text-gray-600 phone:block md:hidden hover:text-gray-700 focus:text-gray-700 focus:outline-none"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <svg
                  aria-haspopup="true"
                  aria-label="Main Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:hidden icon icon-tabler icon-tabler-menu"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={16} x2={20} y2={16} />
                </svg>
              ) : (
                <svg
                  aria-haspopup="true"
                  aria-label="Main Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer md:hidden icon icon-tabler icon-tabler-menu"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={8} x2={20} y2={8} />
                  <line x1={4} y1={16} x2={20} y2={16} />
                </svg>
              )}
              {show && (
                <div id="menu" className="block lg:hidden ">
                  <div
                    onClick={() => {
                      setShow(!show);
                    }}
                    className="fixed top-0 z-30 block pt-6 text-gray-500 cursor-pointer md:hidden lg:hidden hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                  {/* Mobile */}
                  <ul className="fixed top-0 bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center py-10 text-3xl bg-white md:text-base md:flex md:flex-row md:relative md:bg-transparent">
                    <li className="pt-10 text-gray-500 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                      <Link href="/utility/aboutShoppalog">
                        <button className="font-medium">About Us</button>
                      </Link>
                    </li>
                    <li className="pt-10 text-gray-500 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                      <Link href="/utility/termsAndConditions">
                        <button className="font-medium">
                          Terms and Conditions
                        </button>
                      </Link>
                    </li>
                    <li className="pt-10 text-gray-500 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                      <Link href="/utility/updates">
                        <button className="font-medium">Updates</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div id="menu" className="hidden md:block lg:block">
              <div
                onClick={() => {
                  toggleMenu(false);
                }}
                className="fixed top-0 z-30 block pt-6 text-gray-500 cursor-pointer md:hidden lg:hidden hover:text-gray-700 focus:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
              <ul className="fixed top-0 bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center py-10 text-3xl bg-white md:text-base md:flex md:flex-row md:relative md:bg-transparent">
                <li className="pt-10 text-gray-600 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                  <Link href="/utility/aboutShoppalog">
                    <button className="font-medium">About Us</button>
                  </Link>
                </li>
                <li className="pt-10 text-gray-600 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                  <Link href="/utility/termsAndConditions">
                    <button className="font-medium">
                      Terms and Conditions
                    </button>
                  </Link>
                </li>
                <li className="pt-10 text-gray-600 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                  <Link href="/utility/updates">
                    <button className="font-medium">Updates</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* section for hero */}
      <section className="pt-2 mx-auto bg-white max-w-8xl sm:mx-4 lg:mx-4 xl:mx-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col justify-center w-full px-4 md:w-1/2 lg:w-6/12 md:px-8">
            <p className="pt-6 pb-2 text-3xl font-extrabold text-gray-700 xl:leading-tight md:text-3xl lg:text-4xl xl:text-6xl xxl:mr-20 ">
              Create and share your <span className="text-indigo-500">Shopping Style</span> with <span className="text-gray-700">Shoppalog</span>
            </p>
            <p className="pt-4 text-sm font-medium text-gray-600 md:text-base xl:text-xl xl:leading-normal">
            <span className="text-indigo-500">Shoppalog</span> is a tool that allows people to bookmark and follow others' favouite shopping sites
            </p>
            <div className="flex mt-12 mb-6 md:mb-8 md:mb-0">
              <a
                className="px-4 py-3 text-sm font-bold text-white transition duration-150 ease-in-out bg-indigo-600 rounded focus:outline-none hover:bg-indigo-700 xl:px-8 xl:py-4 md:text-base xl:text-xl"
                href="/api/login"
                onClick={click}
              >
                Sign In / Sign Up
              </a>
            </div>
            <div className="mb-6 ">
            <a href="https://www.producthunt.com/posts/shoppalog?utm_source=badge-review&utm_medium=badge&utm_souce=badge-shoppalog#discussion-body" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=295964&theme=light" alt="Shoppalog - shop online effectievly by following others' footprints | Product Hunt"   className=" phone:h-10 sm:h-12 md:h-14 lg:h-16"/></a>
            </div>
          </div>
          <div className="relative pt-12 mx-4 lg:w-6/12 md:w-1/2 md:mx-4 lg:ml-20 md:mr-0 md:pt-0">
            <div className="pt-20 phone:pt-2 sm:pt-10 phone:mx-4">
          <Image
              className="relative z-10 rounded-lg"
              src="/images/frontPage.jpeg"
              alt="frontPage"
              layout="intrinsic"
              width={700}
              height={500}
            />
            </div>
            <div className="absolute top-0 right-0 flex flex-col items-end justify-end w-auto pt-8 pb-24 pr-8 bg-indigo-100 rounded-md phone:w-auto md:w-96 lg:w-auto xl:w-auto md:pl-56 pl-96">
              <svg width={221} height={144} xmlns="http://www.w3.org/2000/svg">
                <g fill="#667EEA" fillRule="evenodd">
                  <rect width={4} height={4} rx={2} />
                  <rect x={25} width={4} height={4} rx={2} />
                  <rect x={48} width={4} height={4} rx={2} />
                  <rect x={73} width={4} height={4} rx={2} />
                  <rect x={96} width={4} height={4} rx={2} />
                  <rect x={121} width={4} height={4} rx={2} />
                  <rect x={144} width={4} height={4} rx={2} />
                  <rect x={169} width={4} height={4} rx={2} />
                  <rect x={193} width={4} height={4} rx={2} />
                  <rect x={217} width={4} height={4} rx={2} />
                  <rect y={18} width={4} height={4} rx={2} />
                  <rect x={25} y={18} width={4} height={4} rx={2} />
                  <rect x={48} y={18} width={4} height={4} rx={2} />
                  <rect x={73} y={18} width={4} height={4} rx={2} />
                  <rect x={96} y={18} width={4} height={4} rx={2} />
                  <rect x={121} y={18} width={4} height={4} rx={2} />
                  <rect x={144} y={18} width={4} height={4} rx={2} />
                  <rect x={169} y={18} width={4} height={4} rx={2} />
                  <rect x={193} y={18} width={4} height={4} rx={2} />
                  <rect x={217} y={18} width={4} height={4} rx={2} />
                  <rect y={35} width={4} height={4} rx={2} />
                  <rect x={25} y={35} width={4} height={4} rx={2} />
                  <rect x={48} y={35} width={4} height={4} rx={2} />
                  <rect x={73} y={35} width={4} height={4} rx={2} />
                  <rect x={96} y={35} width={4} height={4} rx={2} />
                  <rect x={121} y={35} width={4} height={4} rx={2} />
                  <rect x={144} y={35} width={4} height={4} rx={2} />
                  <rect x={169} y={35} width={4} height={4} rx={2} />
                  <rect x={193} y={35} width={4} height={4} rx={2} />
                  <rect x={217} y={35} width={4} height={4} rx={2} />
                  <rect y={53} width={4} height={4} rx={2} />
                  <rect x={25} y={53} width={4} height={4} rx={2} />
                  <rect x={48} y={53} width={4} height={4} rx={2} />
                  <rect x={73} y={53} width={4} height={4} rx={2} />
                  <rect x={96} y={53} width={4} height={4} rx={2} />
                  <rect x={121} y={53} width={4} height={4} rx={2} />
                  <rect x={144} y={53} width={4} height={4} rx={2} />
                  <rect x={169} y={53} width={4} height={4} rx={2} />
                  <rect x={193} y={53} width={4} height={4} rx={2} />
                  <rect x={217} y={53} width={4} height={4} rx={2} />
                  <rect y={70} width={4} height={4} rx={2} />
                  <rect x={25} y={70} width={4} height={4} rx={2} />
                  <rect x={48} y={70} width={4} height={4} rx={2} />
                  <rect x={73} y={70} width={4} height={4} rx={2} />
                  <rect x={96} y={70} width={4} height={4} rx={2} />
                  <rect x={121} y={70} width={4} height={4} rx={2} />
                  <rect x={144} y={70} width={4} height={4} rx={2} />
                  <rect x={169} y={70} width={4} height={4} rx={2} />
                  <rect x={193} y={70} width={4} height={4} rx={2} />
                  <rect x={217} y={70} width={4} height={4} rx={2} />
                  <rect y={88} width={4} height={4} rx={2} />
                  <rect x={25} y={88} width={4} height={4} rx={2} />
                  <rect x={48} y={88} width={4} height={4} rx={2} />
                  <rect x={73} y={88} width={4} height={4} rx={2} />
                  <rect x={96} y={88} width={4} height={4} rx={2} />
                  <rect x={121} y={88} width={4} height={4} rx={2} />
                  <rect x={144} y={88} width={4} height={4} rx={2} />
                  <rect x={169} y={88} width={4} height={4} rx={2} />
                  <rect x={193} y={88} width={4} height={4} rx={2} />
                  <rect x={217} y={88} width={4} height={4} rx={2} />
                  <rect y={105} width={4} height={4} rx={2} />
                  <rect x={25} y={105} width={4} height={4} rx={2} />
                  <rect x={48} y={105} width={4} height={4} rx={2} />
                  <rect x={73} y={105} width={4} height={4} rx={2} />
                  <rect x={96} y={105} width={4} height={4} rx={2} />
                  <rect x={121} y={105} width={4} height={4} rx={2} />
                  <rect x={144} y={105} width={4} height={4} rx={2} />
                  <rect x={169} y={105} width={4} height={4} rx={2} />
                  <rect x={193} y={105} width={4} height={4} rx={2} />
                  <rect x={217} y={105} width={4} height={4} rx={2} />
                  <rect y={123} width={4} height={4} rx={2} />
                  <rect x={25} y={123} width={4} height={4} rx={2} />
                  <rect x={48} y={123} width={4} height={4} rx={2} />
                  <rect x={73} y={123} width={4} height={4} rx={2} />
                  <rect x={96} y={123} width={4} height={4} rx={2} />
                  <rect x={121} y={123} width={4} height={4} rx={2} />
                  <rect x={144} y={123} width={4} height={4} rx={2} />
                  <rect x={169} y={123} width={4} height={4} rx={2} />
                  <rect x={193} y={123} width={4} height={4} rx={2} />
                  <rect x={217} y={123} width={4} height={4} rx={2} />
                  <rect y={140} width={4} height={4} rx={2} />
                  <rect x={25} y={140} width={4} height={4} rx={2} />
                  <rect x={48} y={140} width={4} height={4} rx={2} />
                  <rect x={73} y={140} width={4} height={4} rx={2} />
                  <rect x={96} y={140} width={4} height={4} rx={2} />
                  <rect x={121} y={140} width={4} height={4} rx={2} />
                  <rect x={144} y={140} width={4} height={4} rx={2} />
                  <rect x={169} y={140} width={4} height={4} rx={2} />
                  <rect x={193} y={140} width={4} height={4} rx={2} />
                  <rect x={217} y={140} width={4} height={4} rx={2} />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* How it works  */}
      <div className="container px-4 py-10 mx-auto f-f-p xl:px-0">
        <h1 className="font-sans text-3xl tracking-wider text-center text-gray-700 lg:text-5xl">
          How Shoppalog works?
        </h1>
        <div className="md:mt-24 f-f-p">
          <div className="justify-center hidden w-full md:flex">
            <div className="relative flex flex-col items-center border-gray-300 md:items-end md:pr-12 md:border-r-4 md:w-1/2">
              {/* First picture */}
              <svg
                className="mt-10"
                xmlns="http://www.w3.org/2000/svg"
                width={127}
                height={128}
                viewBox="0 0 127 128"
                fill="none"
              >
                <g clipPath="url(#clip0)">
                <path
                    d="M64.818 124.636C98.4069 124.636 125.636 97.4069 125.636 63.818C125.636 30.2291 98.4069 3 64.818 3C31.2291 3 4 30.2291 4 63.818C4 97.4069 31.2291 124.636 64.818 124.636Z"
                    fill="#fed9b7"
                   
                  />
                  <path
                    d="M65.2346 63.6469C70.1077 63.6469 74.0581 59.6965 74.0581 54.8235C74.0581 49.9504 70.1077 46 65.2346 46C60.3615 46 56.4111 49.9504 56.4111 54.8235C56.4111 59.6965 60.3615 63.6469 65.2346 63.6469Z"
                    stroke="#0081a7"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M52 82V77.5882C52 75.2481 52.9296 73.0038 54.5843 71.3491C56.2391 69.6944 58.4833 68.7648 60.8235 68.7648H69.6469C71.9871 68.7648 74.2313 69.6944 75.8861 71.3491C77.5408 73.0038 78.4704 75.2481 78.4704 77.5882V82"
                    stroke="#0081a7"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M117.692 12.4634C121.133 12.4634 123.923 9.67334 123.923 6.23168C123.923 2.79002 121.133 0 117.692 0C114.25 0 111.46 2.79002 111.46 6.23168C111.46 9.67334 114.25 12.4634 117.692 12.4634Z"
                    fill="#f07167"
                  />
                  <path
                    d="M6.23168 92.0553C9.67334 92.0553 12.4634 89.2653 12.4634 85.8236C12.4634 82.3819 9.67334 79.5919 6.23168 79.5919C2.79002 79.5919 0 82.3819 0 85.8236C0 89.2653 2.79002 92.0553 6.23168 92.0553Z"
                    fill="#f07167"
                  />
                  <path
                    d="M11.8323 70.205C14.0977 70.205 15.9342 68.3685 15.9342 66.1031C15.9342 63.8377 14.0977 62.0012 11.8323 62.0012C9.56694 62.0012 7.73047 63.8377 7.73047 66.1031C7.73047 68.3685 9.56694 70.205 11.8323 70.205Z"
                    fill="#ee6c4d"
                  />
                  <path
                    d="M22.7968 127.631C24.3651 127.631 25.6365 126.36 25.6365 124.791C25.6365 123.223 24.3651 121.952 22.7968 121.952C21.2284 121.952 19.957 123.223 19.957 124.791C19.957 126.36 21.2284 127.631 22.7968 127.631Z"
                    fill="#ee6c4d"
                  />
                  <path
                    d="M123.923 24.1379C125.622 24.1379 126.999 22.7606 126.999 21.0615C126.999 19.3625 125.622 17.9851 123.923 17.9851C122.224 17.9851 120.847 19.3625 120.847 21.0615C120.847 22.7606 122.224 24.1379 123.923 24.1379Z"
                    fill="#ee6c4d"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width={127} height="127.552" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {/* number 2 */}
              <svg
                className="mt-24"
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx={24}
                  cy={24}
                  r="23.5"
                  transform="rotate(90 24 24)"
                  fill="white"
                  stroke="#CBD5E0"
                />
                <path
                  d="M18.224 31.248C20.256 29.616 21.848 28.28 23 27.24C24.152 26.184 25.12 25.088 25.904 23.952C26.704 22.8 27.104 21.672 27.104 20.568C27.104 19.528 26.848 18.712 26.336 18.12C25.84 17.512 25.032 17.208 23.912 17.208C22.824 17.208 21.976 17.552 21.368 18.24C20.776 18.912 20.456 19.816 20.408 20.952H18.296C18.36 19.16 18.904 17.776 19.928 16.8C20.952 15.824 22.272 15.336 23.888 15.336C25.536 15.336 26.84 15.792 27.8 16.704C28.776 17.616 29.264 18.872 29.264 20.472C29.264 21.8 28.864 23.096 28.064 24.36C27.28 25.608 26.384 26.712 25.376 27.672C24.368 28.616 23.08 29.72 21.512 30.984H29.768V32.808H18.224V31.248Z"
                  fill="#052E47"
                />
              </svg>
              <div className="flex flex-col items-center mt-12 lg:items-end md:w-8/12">
                <h1 className="text-2xl font-semibold tracking-wide">
                  Follow Someone you Like
                </h1>
                <h2 className="pl-3 mt-3 text-base leading-6 tracking-wide text-center text-gray-700 md:text-right">
                  You can visit their profile and follow them, their
                  recommendations will be your top search result
                </h2>
              </div>

              {/* third picture */}
              <svg
                className="mt-24"
                xmlns="http://www.w3.org/2000/svg"
                width={127}
                height={129}
                viewBox="0 0 127 129"
                fill="none"
              >
                <path
                  d="M64.818 125.89C98.4068 125.89 125.636 98.5282 125.636 64.7751C125.636 31.0221 98.4068 3.65991 64.818 3.65991C31.2291 3.65991 4 31.0221 4 64.7751C4 98.5282 31.2291 125.89 64.818 125.89Z"
                  fill="#d0f4de"
                />
                <g clipPath="url(#clip0)">
                  <path
                    d="M71 51.3921L77 57.4214L71 63.4507"
                    stroke="#e56b6f"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M62 57.4214H77"
                    stroke="#e56b6f"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M59 66.4653L53 72.4946L59 78.5239"
                    stroke="#e56b6f"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M53 72.4946H66.5"
                    stroke="#e56b6f"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <path
                  d="M117.692 13.1694C121.133 13.1694 123.923 10.3658 123.923 6.90735C123.923 3.44889 121.133 0.645264 117.692 0.645264C114.25 0.645264 111.46 3.44889 111.46 6.90735C111.46 10.3658 114.25 13.1694 117.692 13.1694Z"
                  fill="#e56b6f"
                />
                <path
                  d="M6.23169 93.1501C9.67336 93.1501 12.4634 90.3465 12.4634 86.8881C12.4634 83.4296 9.67336 80.626 6.23169 80.626C2.79002 80.626 0 83.4296 0 86.8881C0 90.3465 2.79002 93.1501 6.23169 93.1501Z"
                  fill="#00afb9"
                />
                <path
                  d="M11.8323 71.1934C14.0977 71.1934 15.9342 69.3479 15.9342 67.0714C15.9342 64.7949 14.0977 62.9495 11.8323 62.9495C9.56694 62.9495 7.73047 64.7949 7.73047 67.0714C7.73047 69.3479 9.56694 71.1934 11.8323 71.1934Z"
                  fill="#00afb9"
                />
                <path
                  d="M22.7968 128.9C24.3651 128.9 25.6365 127.623 25.6365 126.047C25.6365 124.47 24.3651 123.193 22.7968 123.193C21.2284 123.193 19.957 124.47 19.957 126.047C19.957 127.623 21.2284 128.9 22.7968 128.9Z"
                  fill="#00afb9"
                />
                <path
                  d="M123.924 24.9011C125.623 24.9011 127 23.517 127 21.8097C127 20.1023 125.623 18.7183 123.924 18.7183C122.225 18.7183 120.848 20.1023 120.848 21.8097C120.848 23.517 122.225 24.9011 123.924 24.9011Z"
                  fill="#00afb9"
                />
                <path
                  d="M108.463 5.00488C109.378 5.00488 110.12 4.25958 110.12 3.34021C110.12 2.42084 109.378 1.67554 108.463 1.67554C107.548 1.67554 106.807 2.42084 106.807 3.34021C106.807 4.25958 107.548 5.00488 108.463 5.00488Z"
                  fill="#00afb9"
                />
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width={36}
                      height="36.1758"
                      fill="white"
                      transform="translate(47 46.8701)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col items-center mt-20 md:items-start md:pl-12 lg:border-gray-400 md:mt-0 md:w-1/2">
              {/* number 1 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx={24}
                  cy={24}
                  r={24}
                  transform="rotate(90 24 24)"
                  fill="white"
                  stroke="#CBD5E0"
                />
                <path
                  d="M21.912 17.64V15.648H26.424V33H24.216V17.64H21.912Z"
                  fill="#052E47"
                />
              </svg>
              <div className="flex flex-col items-center mt-12 md:items-start md:w-8/12">
                <h1 className="text-2xl font-semibold tracking-wide">
                  SignUp for an Account
                </h1>
                <h2 className="mt-3 text-base leading-6 tracking-wide text-gray-700">
                  Sign up an account with your Google account / Email account (Click
                  <span className="mx-2 font-semibold text-indigo-500 hover:text-indigo-600">
                    <Link href="/utility/aboutShoppalog">About Us</Link>
                  </span>
                  to learn more)
                </h2>
              </div>
              {/* second picture */}
              <svg
                className="mt-16"
                xmlns="http://www.w3.org/2000/svg"
                width={127}
                height={129}
                viewBox="0 0 127 129"
                fill="none"
              >
                <path
                  d="M64.818 125.649C98.4068 125.649 125.636 98.2867 125.636 64.5336C125.636 30.7806 98.4068 3.41833 64.818 3.41833C31.2291 3.41833 4 30.7806 4 64.5336C4 98.2867 31.2291 125.649 64.818 125.649Z"
                  fill="#FBBF24"
                />
                <path
                  d="M65.209 50.0453V75.400"
                  stroke="#43aa8b"
                  strokeWidth={4}
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                />
                <path
                  d="M50.50 62.101H80.2432"
                  stroke="#43aa8b"
                  strokeWidth={4}
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                />
                <path
                  d="M117.692 12.928C121.133 12.928 123.923 10.1243 123.923 6.66583C123.923 3.20734 121.133 0.403687 117.692 0.403687C114.25 0.403687 111.46 3.20734 111.46 6.66583C111.46 10.1243 114.25 12.928 117.692 12.928Z"
                  fill="#43aa8b"
                />
                <path
                  d="M6.23169 92.9089C9.67336 92.9089 12.4634 90.1053 12.4634 86.6468C12.4634 83.1883 9.67336 80.3846 6.23169 80.3846C2.79002 80.3846 0 83.1883 0 86.6468C0 90.1053 2.79002 92.9089 6.23169 92.9089Z"
                  fill="#90be6d"
                />
                <path
                  d="M11.8323 70.9518C14.0977 70.9518 15.9342 69.1064 15.9342 66.8299C15.9342 64.5534 14.0977 62.708 11.8323 62.708C9.56694 62.708 7.73047 64.5534 7.73047 66.8299C7.73047 69.1064 9.56694 70.9518 11.8323 70.9518Z"
                  fill="#A7F3D0"
                />
                <path
                  d="M22.7968 128.659C24.3651 128.659 25.6365 127.381 25.6365 125.805C25.6365 124.229 24.3651 122.951 22.7968 122.951C21.2284 122.951 19.957 124.229 19.957 125.805C19.957 127.381 21.2284 128.659 22.7968 128.659Z"
                  fill="#064E3B"
                />
                <path
                  d="M123.924 24.6594C125.623 24.6594 127 23.2754 127 21.5681C127 19.8607 125.623 18.4767 123.924 18.4767C122.225 18.4767 120.848 19.8607 120.848 21.5681C120.848 23.2754 122.225 24.6594 123.924 24.6594Z"
                  fill="#A7F3D0"
                />
              </svg>
              <svg
                className="mt-20"
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx={24}
                  cy={24}
                  r="23.5"
                  transform="rotate(90 24 24)"
                  fill="white"
                  stroke="#CBD5E0"
                />
                <path
                  d="M17.44 20.016C17.552 18.544 18.12 17.392 19.144 16.56C20.168 15.728 21.496 15.312 23.128 15.312C24.216 15.312 25.152 15.512 25.936 15.912C26.736 16.296 27.336 16.824 27.736 17.496C28.152 18.168 28.36 18.928 28.36 19.776C28.36 20.768 28.072 21.624 27.496 22.344C26.936 23.064 26.2 23.528 25.288 23.736V23.856C26.328 24.112 27.152 24.616 27.76 25.368C28.368 26.12 28.672 27.104 28.672 28.32C28.672 29.232 28.464 30.056 28.048 30.792C27.632 31.512 27.008 32.08 26.176 32.496C25.344 32.912 24.344 33.12 23.176 33.12C21.48 33.12 20.088 32.68 19 31.8C17.912 30.904 17.304 29.64 17.176 28.008H19.288C19.4 28.968 19.792 29.752 20.464 30.36C21.136 30.968 22.032 31.272 23.152 31.272C24.272 31.272 25.12 30.984 25.696 30.408C26.288 29.816 26.584 29.056 26.584 28.128C26.584 26.928 26.184 26.064 25.384 25.536C24.584 25.008 23.376 24.744 21.76 24.744H21.208V22.92H21.784C23.256 22.904 24.368 22.664 25.12 22.2C25.872 21.72 26.248 20.984 26.248 19.992C26.248 19.144 25.968 18.464 25.408 17.952C24.864 17.44 24.08 17.184 23.056 17.184C22.064 17.184 21.264 17.44 20.656 17.952C20.048 18.464 19.688 19.152 19.576 20.016H17.44Z"
                  fill="#052E47"
                />
              </svg>
              <div className="flex flex-col items-center mt-12 md:items-start md:w-8/12">
                <h1 className="text-2xl font-semibold tracking-wide">
                  Start Exploring popular shopping-sites
                </h1>
                <h2 className="mt-3 text-base leading-6 tracking-wide text-gray-700">
                  You can start exploring different popular shopping sites with{" "}
                  <span className="text-indigo-500">Explore</span> and{" "}
                  <span className="text-indigo-500">Search </span>
                </h2>
              </div>
            </div>
          </div>

          {/* this is mobile */}
          <div className="flex flex-col items-center w-full md:hidden">
            {/* First pciture */}
            <svg
                className="mt-10"
                xmlns="http://www.w3.org/2000/svg"
                width={127}
                height={128}
                viewBox="0 0 127 128"
                fill="none"
              >
                
                <path
                    d="M64.818 124.636C98.4069 124.636 125.636 97.4069 125.636 63.818C125.636 30.2291 98.4069 3 64.818 3C31.2291 3 4 30.2291 4 63.818C4 97.4069 31.2291 124.636 64.818 124.636Z"
                    fill="#fed9b7"
                  />
                  <path
                    d="M65.2346 63.6469C70.1077 63.6469 74.0581 59.6965 74.0581 54.8235C74.0581 49.9504 70.1077 46 65.2346 46C60.3615 46 56.4111 49.9504 56.4111 54.8235C56.4111 59.6965 60.3615 63.6469 65.2346 63.6469Z"
                    stroke="#0081a7"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M52 82V77.5882C52 75.2481 52.9296 73.0038 54.5843 71.3491C56.2391 69.6944 58.4833 68.7648 60.8235 68.7648H69.6469C71.9871 68.7648 74.2313 69.6944 75.8861 71.3491C77.5408 73.0038 78.4704 75.2481 78.4704 77.5882V82"
                    stroke="#0081a7"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M117.692 12.4634C121.133 12.4634 123.923 9.67334 123.923 6.23168C123.923 2.79002 121.133 0 117.692 0C114.25 0 111.46 2.79002 111.46 6.23168C111.46 9.67334 114.25 12.4634 117.692 12.4634Z"
                    fill="#f07167"
                  />
                  <path
                    d="M6.23168 92.0553C9.67334 92.0553 12.4634 89.2653 12.4634 85.8236C12.4634 82.3819 9.67334 79.5919 6.23168 79.5919C2.79002 79.5919 0 82.3819 0 85.8236C0 89.2653 2.79002 92.0553 6.23168 92.0553Z"
                    fill="#f07167"
                  />
                  <path
                    d="M11.8323 70.205C14.0977 70.205 15.9342 68.3685 15.9342 66.1031C15.9342 63.8377 14.0977 62.0012 11.8323 62.0012C9.56694 62.0012 7.73047 63.8377 7.73047 66.1031C7.73047 68.3685 9.56694 70.205 11.8323 70.205Z"
                    fill="#ee6c4d"
                  />
                  <path
                    d="M22.7968 127.631C24.3651 127.631 25.6365 126.36 25.6365 124.791C25.6365 123.223 24.3651 121.952 22.7968 121.952C21.2284 121.952 19.957 123.223 19.957 124.791C19.957 126.36 21.2284 127.631 22.7968 127.631Z"
                    fill="#ee6c4d"
                  />
                  <path
                    d="M123.923 24.1379C125.622 24.1379 126.999 22.7606 126.999 21.0615C126.999 19.3625 125.622 17.9851 123.923 17.9851C122.224 17.9851 120.847 19.3625 120.847 21.0615C120.847 22.7606 122.224 24.1379 123.923 24.1379Z"
                    fill="#ee6c4d"
                  />
                
                <defs>
                  <clipPath id="clip0">
                    <rect width={127} height="127.552" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              
            {/* number 1 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-10"
              width={48}
              height={48}
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle
                cx={24}
                cy={24}
                r={24}
                transform="rotate(90 24 24)"
                fill="white"
                stroke="#CBD5E0"
              />
              <path
                d="M21.912 17.64V15.648H26.424V33H24.216V17.64H21.912Z"
                fill="#052E47"
              />
            </svg>
            <div className="mt-10">
              <h1 className="text-2xl font-semibold tracking-wide text-center">
                SignUp for an Account
              </h1>
              <h2 className="mt-3 text-base leading-6 tracking-wide text-center text-gray-700">
                Sign up an account with your Google account / Email account (Click
                <span className="mx-2 font-semibold text-indigo-500 hover:text-indigo-600">
                  <Link href="/utility/aboutShoppalog">About Us</Link>
                </span>
                to learn more)
              </h2>
            </div>
            {/* second picture */}
            <svg  
              className="mt-16"
              xmlns="http://www.w3.org/2000/svg"
              width={127}
              height={129}
              viewBox="0 0 127 129"
              fill="none"
            >
              <path
                d="M64.818 125.649C98.4068 125.649 125.636 98.2867 125.636 64.5336C125.636 30.7806 98.4068 3.41833 64.818 3.41833C31.2291 3.41833 4 30.7806 4 64.5336C4 98.2867 31.2291 125.649 64.818 125.649Z"
                fill="#FBBF24"
              />
              <path
                d="M65.209 50.0453V75.400"
                stroke="#43aa8b"
                strokeWidth={4}
                strokeMiterlimit={10}
                strokeLinecap="round"
              />
              <path
                d="M50.50 62.101H80.2432"
                stroke="#43aa8b"
                strokeWidth={4}
                strokeMiterlimit={10}
                strokeLinecap="round"
              />
              <path
                d="M117.692 12.928C121.133 12.928 123.923 10.1243 123.923 6.66583C123.923 3.20734 121.133 0.403687 117.692 0.403687C114.25 0.403687 111.46 3.20734 111.46 6.66583C111.46 10.1243 114.25 12.928 117.692 12.928Z"
                fill="#43aa8b"
              />
              <path
                d="M6.23169 92.9089C9.67336 92.9089 12.4634 90.1053 12.4634 86.6468C12.4634 83.1883 9.67336 80.3846 6.23169 80.3846C2.79002 80.3846 0 83.1883 0 86.6468C0 90.1053 2.79002 92.9089 6.23169 92.9089Z"
                fill="#90be6d"
              />
              <path
                d="M11.8323 70.9518C14.0977 70.9518 15.9342 69.1064 15.9342 66.8299C15.9342 64.5534 14.0977 62.708 11.8323 62.708C9.56694 62.708 7.73047 64.5534 7.73047 66.8299C7.73047 69.1064 9.56694 70.9518 11.8323 70.9518Z"
                fill="#A7F3D0"
              />
              <path
                d="M22.7968 128.659C24.3651 128.659 25.6365 127.381 25.6365 125.805C25.6365 124.229 24.3651 122.951 22.7968 122.951C21.2284 122.951 19.957 124.229 19.957 125.805C19.957 127.381 21.2284 128.659 22.7968 128.659Z"
                fill="#064E3B"
              />
              <path
                d="M123.924 24.6594C125.623 24.6594 127 23.2754 127 21.5681C127 19.8607 125.623 18.4767 123.924 18.4767C122.225 18.4767 120.848 19.8607 120.848 21.5681C120.848 23.2754 122.225 24.6594 123.924 24.6594Z"
                fill="#A7F3D0"
              />
            </svg>
            {/* second number */}
            <svg
              className="mt-10"
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle
                cx={24}
                cy={24}
                r="23.5"
                transform="rotate(90 24 24)"
                fill="white"
                stroke="#CBD5E0"
              />
              <path
                d="M18.224 31.248C20.256 29.616 21.848 28.28 23 27.24C24.152 26.184 25.12 25.088 25.904 23.952C26.704 22.8 27.104 21.672 27.104 20.568C27.104 19.528 26.848 18.712 26.336 18.12C25.84 17.512 25.032 17.208 23.912 17.208C22.824 17.208 21.976 17.552 21.368 18.24C20.776 18.912 20.456 19.816 20.408 20.952H18.296C18.36 19.16 18.904 17.776 19.928 16.8C20.952 15.824 22.272 15.336 23.888 15.336C25.536 15.336 26.84 15.792 27.8 16.704C28.776 17.616 29.264 18.872 29.264 20.472C29.264 21.8 28.864 23.096 28.064 24.36C27.28 25.608 26.384 26.712 25.376 27.672C24.368 28.616 23.08 29.72 21.512 30.984H29.768V32.808H18.224V31.248Z"
                fill="#052E47"
              />
            </svg>
            <div className="mt-10">
              <h1 className="text-2xl font-semibold tracking-wide text-center">
                Follow Someone you like
              </h1>
              <h2 className="pl-3 mt-3 text-base leading-6 tracking-wide text-center text-gray-700">
                You can visit their profile and follow them, their
                recommendations will be your top search result
              </h2>
            </div>
            <svg
              className="my-10"
              xmlns="http://www.w3.org/2000/svg"
              width={127}
              height={129}
              viewBox="0 0 127 129"
              fill="none"
            >
              <path
                d="M64.818 125.89C98.4068 125.89 125.636 98.5282 125.636 64.7751C125.636 31.0221 98.4068 3.65991 64.818 3.65991C31.2291 3.65991 4 31.0221 4 64.7751C4 98.5282 31.2291 125.89 64.818 125.89Z"
                fill="#d0f4de"
              />
              <g clipPath="url(#clip0)">
                <path
                  d="M71 51.3921L77 57.4214L71 63.4507"
                  stroke="#e56b6f"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M62 57.4214H77"
                  stroke="#e56b6f"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M59 66.4653L53 72.4946L59 78.5239"
                  stroke="#e56b6f"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M53 72.4946H66.5"
                  stroke="#e56b6f"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <path
                d="M117.692 13.1694C121.133 13.1694 123.923 10.3658 123.923 6.90735C123.923 3.44889 121.133 0.645264 117.692 0.645264C114.25 0.645264 111.46 3.44889 111.46 6.90735C111.46 10.3658 114.25 13.1694 117.692 13.1694Z"
                fill="#e56b6f"
              />
              <path
                d="M6.23169 93.1501C9.67336 93.1501 12.4634 90.3465 12.4634 86.8881C12.4634 83.4296 9.67336 80.626 6.23169 80.626C2.79002 80.626 0 83.4296 0 86.8881C0 90.3465 2.79002 93.1501 6.23169 93.1501Z"
                fill="#00afb9"
              />
              <path
                d="M11.8323 71.1934C14.0977 71.1934 15.9342 69.3479 15.9342 67.0714C15.9342 64.7949 14.0977 62.9495 11.8323 62.9495C9.56694 62.9495 7.73047 64.7949 7.73047 67.0714C7.73047 69.3479 9.56694 71.1934 11.8323 71.1934Z"
                fill="#00afb9"
              />
              <path
                d="M22.7968 128.9C24.3651 128.9 25.6365 127.623 25.6365 126.047C25.6365 124.47 24.3651 123.193 22.7968 123.193C21.2284 123.193 19.957 124.47 19.957 126.047C19.957 127.623 21.2284 128.9 22.7968 128.9Z"
                fill="#00afb9"
              />
              <path
                d="M123.924 24.9011C125.623 24.9011 127 23.517 127 21.8097C127 20.1023 125.623 18.7183 123.924 18.7183C122.225 18.7183 120.848 20.1023 120.848 21.8097C120.848 23.517 122.225 24.9011 123.924 24.9011Z"
                fill="#00afb9"
              />
              <path
                d="M108.463 5.00488C109.378 5.00488 110.12 4.25958 110.12 3.34021C110.12 2.42084 109.378 1.67554 108.463 1.67554C107.548 1.67554 106.807 2.42084 106.807 3.34021C106.807 4.25958 107.548 5.00488 108.463 5.00488Z"
                fill="#00afb9"
              />
              <defs>
                <clipPath id="clip0">
                  <rect
                    width={36}
                    height="36.1758"
                    fill="white"
                    transform="translate(47 46.8701)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle
                cx={24}
                cy={24}
                r="23.5"
                transform="rotate(90 24 24)"
                fill="white"
                stroke="#CBD5E0"
              />
              <path
                d="M17.44 20.016C17.552 18.544 18.12 17.392 19.144 16.56C20.168 15.728 21.496 15.312 23.128 15.312C24.216 15.312 25.152 15.512 25.936 15.912C26.736 16.296 27.336 16.824 27.736 17.496C28.152 18.168 28.36 18.928 28.36 19.776C28.36 20.768 28.072 21.624 27.496 22.344C26.936 23.064 26.2 23.528 25.288 23.736V23.856C26.328 24.112 27.152 24.616 27.76 25.368C28.368 26.12 28.672 27.104 28.672 28.32C28.672 29.232 28.464 30.056 28.048 30.792C27.632 31.512 27.008 32.08 26.176 32.496C25.344 32.912 24.344 33.12 23.176 33.12C21.48 33.12 20.088 32.68 19 31.8C17.912 30.904 17.304 29.64 17.176 28.008H19.288C19.4 28.968 19.792 29.752 20.464 30.36C21.136 30.968 22.032 31.272 23.152 31.272C24.272 31.272 25.12 30.984 25.696 30.408C26.288 29.816 26.584 29.056 26.584 28.128C26.584 26.928 26.184 26.064 25.384 25.536C24.584 25.008 23.376 24.744 21.76 24.744H21.208V22.92H21.784C23.256 22.904 24.368 22.664 25.12 22.2C25.872 21.72 26.248 20.984 26.248 19.992C26.248 19.144 25.968 18.464 25.408 17.952C24.864 17.44 24.08 17.184 23.056 17.184C22.064 17.184 21.264 17.44 20.656 17.952C20.048 18.464 19.688 19.152 19.576 20.016H17.44Z"
                fill="#052E47"
              />
            </svg>
            <div className="flex flex-col items-center mt-10 md:items-start md:w-8/12">
              <h1 className="text-2xl font-semibold tracking-wide text-center">
                Start Exploring popular shopping-sites
              </h1>
              <h2 className="mt-3 text-base leading-6 tracking-wide text-center text-gray-700">
                You can start exploring different popular shopping sites with{" "}
                <span className="text-indigo-500">Explore</span> and{" "}
                <span className="text-indigo-500">Search </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Why us Promo */}
      <div className="relative px-4 pt-16 pb-40">
        <img
          src="https://cdn.tuk.dev/assets/components/111220/fs-22/background.png"
          className="absolute top-0 left-0 z-0 flex -mt-2 h-image flex-no-shrink"
        />
        <div className="relative z-20 flex flex-col-reverse items-center justify-between w-full px-4 mx-auto phone:mx-0 lg:flex-row lg:px-10 xl:px-18">
          <div className="mt-16 lg:w-1/2 lg:flex">
            <div className="flex flex-col">
              <div className="px-4 mb-8 bg-white rounded shadow-md xl:px-8 hover:bg-red-400 group">
                <div className="mt-8 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-700 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="pt-10 text-2xl font-semibold f-m-m group-hover:text-white">
                    One button, <br />
                    Follow your friend's Style easily
                  </h1>
                  <p className="py-8 text-base font-normal leading-loose f-m-m group-hover:text-white">
                    Once you followed your friends, his / her related suggestions will show at the top of the results
                  </p>
                </div>
              </div>
              <div className="px-4 mb-8 bg-white rounded shadow-md xl:px-8 lg:mb-0 group hover:bg-yellow-200">
                <div className="mt-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-700 group-hover:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="pt-10 text-2xl font-semibold f-m-m group-hover:text-gray-800">
                    New Features, <br />
                    Updates guaranteed
                  </h1>
                  <p className="py-8 text-base font-normal leading-loose f-m-m group-hover:text-gray-700">
                    Altough our product is still in Beta version, we will update
                    continuously with users' feedback
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-0 ml-0 lg:ml-10 lg:mt-10">
              <div className="px-4 mt-0 bg-white rounded shadow-md lg:mt-20 xl:px-8 box-shadow-light group hover:bg-indigo-500">
                <div className="mt-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-600 group-hover:text-white"
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
                </div>
                <div>
                  <h1 className="pt-10 text-2xl font-semibold f-m-m group-hover:text-white">
                    Mordern Bookmarks, <br />
                    Easiest way to express
                  </h1>
                  <p className="py-8 text-base font-normal leading-loose f-m-m group-hover:text-white">
                    Extra features help you bookmark and share quality sites
                    easily, such as Hastags, Expressions, Comments
                  </p>
                </div>
              </div>
              <div className="px-4 mt-8 bg-white rounded shadow-md lg:mt-8 xl:px-8 group hover:bg-green-200">
                <div className="mt-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-600 group-hover:text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="pt-10 text-2xl font-semibold f-m-m group-hover:text-gray-800">
                    Filter, Search <br />
                    Manage your list easily
                  </h1>
                  <p className="py-8 text-base font-normal leading-loose f-m-m group-hover:text-gray-700">
                    Search, filter functions are included to help you manage
                    your list of shopping sites easily{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-40 xl:pl-56">
            <h1 className="text-3xl font-bold text-indigo-700 lg:text-5xl f-m-w">
              Why you should choose us?
            </h1>
            <p className="mt-8 mb-8 font-bold leading-loose text-gray-800 text-md lg:text-xl f-m-m">
              Imagine Googling Sneakers with Kanye West's
              Guidance. <br />
            </p>
            <p className="mt-8 mb-8 font-bold leading-loose text-gray-800 uppercase text-md lg:text-xl f-m-m">
              In anytime you need, In anytime you want..
            </p>
            <Link href="/utility/aboutShoppalog">
              <button className="px-4 py-2 text-base font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 f-m-m md:py-4 md:px-8 focus:outline-none">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Index;

