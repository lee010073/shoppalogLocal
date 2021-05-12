import Link from "next/link";
const NoNews = () => {
  return (
    <div className="flex flex-col justify-center w-full max-w-md ">
      <div className="relative py-2 ">
        <div className="relative px-4 py-4 bg-white border-2 border-gray-200 shadow sm:rounded-3xl">
          <div className="px-2">
            <div className="flex items-center space-x-2">
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
              <p className="text-xl font-bold">A Message from Founders!</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-4 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <p className="pb-4">
                  Apprently you haven't followed anyone yet for the Updates, You
                  can:
                </p>
                <ul className="space-y-4 list-disc ">
                  <li className="flex items-center ">
                    <p className="text-md">
                      Start Following your friends by Clicking
                      <span className="flex items-center mt-2 space-x-1">
                        <p className="text-indigo-500 ">Add</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-indigo-500 "
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
                      </span>
                    </p>
                  </li>
                  <li className="flex items-center ">
                    <p className="text-md">
                      We would also like to invite you to follow Us
                      <span>
                      <Link href={`/other_profile/1`}>
                        <button className="flex items-center px-10 py-2 mt-2 space-x-1 text-white bg-indigo-500 rounded-full hover:bg-indigo-600">
                          <p className="">Here</p>
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
                        </button>
                        </Link>
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoNews;
