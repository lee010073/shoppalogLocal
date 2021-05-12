import Link from "next/link";
const NoShop = () => {
  return (
    <div className="flex flex-col justify-center px-2 pb-20 bg-gray-100 lg:pr-64 ">
      <div className="relative py-3 ">
        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:skew-y-0 sm:rotate-2 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl">
          <div className="sm:pl-10">
            <div className="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-10 sm:h-10 "
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
              <p className="font-bold phone:text-base sm:text-xl">
                A Warm Welcome Message from Founders!
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <p>Quick Guide below to enjoy Shoppalog fully: </p>
                <ul className="space-y-4 list-disc">
                  {/* 1 note */}
                  <li className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-yellow-500 phone:w-6 phone:h-6 sm:h-8 sm:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="ml-2 font-semibold phone:text-xs sm:text-lg">
                      Visit your profile by clicking
                      <span>
                      <Link href={`/my_profile/`}>
                        <button className="px-4 mx-1 font-semibold text-white bg-indigo-500 rounded-full lg:mx-2 hover:bg-indigo-600">
                          Here
                        </button>
                      </Link>
                      </span>
                    </p>
                  </li>
                  {/* 2 note */}
                  <li className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-yellow-500 phone:w-6 phone:h-6 sm:h-8 sm:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="flex ml-2 font-semibold phone:text-xs sm:text-lg">
                      Save your Favourite Shopping site by
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-indigo-500 phone:w-4 phone:h-4 phone:mx-0 sm:mx-2 sm:h-8 sm:w-8"
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
                      </span>{" "}
                      
                    </p>
                  </li>
                  {/* 3 note */}
                  <li className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-yellow-500 phone:w-6 phone:h-6 sm:h-8 sm:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="flex ml-2 font-semibold phone:text-xs sm:text-lg">
                      Search and Follow your Friend by
                      <span>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-indigo-500 phone:w-4 phone:h-4 phone:mx-2 sm:mx-2 sm:h-8 sm:w-8"
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
                      </span>{" "}
  
                    </p>
                  </li>
                     {/* 4 note */}
                  <li className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-yellow-500 phone:w-6 phone:h-6 sm:h-8 sm:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <p className="flex ml-2 font-semibold phone:text-xs sm:text-lg">
                      Explore newly added shop by
                      <span>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-indigo-500 phone:w-4 phone:h-4 phone:mx-2 sm:mx-2 sm:h-8 sm:w-8"
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
                      </span>{" "}
                      
                    </p>
                  </li>
                
                </ul>
              </div>
              <div className="pt-6 text-base font-bold leading-6 sm:text-lg sm:leading-7">
                <p>P.S. Want to dig the Founders' favourite shopping sites? </p>
                <p>
                <Link href={`/other_profile/1`}>
                  <button className="px-4 py-2 mt-4 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600">
                    Visit and Follow Us{" "}
                  </button>
                </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoShop;
