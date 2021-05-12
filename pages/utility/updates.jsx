//import Library
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

//import components
import Footer from "../../components/Reuse/footer";

export default function AboutUs() {
  const [question, setquestion] = useState(0);
  return (
    <div className="h-screen">
      <Head>
        <title>Our update notes</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>

      <div className="container min-h-screen pt-16 pb-12 mx-auto">
        <div className="w-11/12 mx-auto xl:w-full">
          <div className="pb-12">
            <h1 className="text-2xl font-extrabold text-gray-800 xl:text-5xl md:text-3xl">
              Updates /{" "}
              <Link href="/">
                <span>
                  <button className="text-2xl font-bold font-extrabold text-gray-800 hover:text-indigo-500 xl:text-5xl md:text-3xl">
                    Home
                  </button>
                </span>
              </Link>
            </h1>
          </div>
          <div>
            <div className="mx-auto shadow">
              <div className="px-4 xl:px-8 lg:px-8 md:px-8 sm:px-8">
                <div>
                  <div className="flex items-center justify-between py-6 border-b border-gray-200">
                    <h1 className="text-base font-bold text-indigo-700 md:text-xl lg:text-2xl">
                      Updates and Plans from Founders
                    </h1>
                    <div
                      data-menu
                      className="cursor-pointer"
                      onClick={() =>
                        question === 0 ? setquestion(null) : setquestion(0)
                      }
                    >
                      {question === 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Hide"
                          className=""
                          width={28}
                          height={28}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#718096"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 15 12 9 18 15" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Show"
                          width={28}
                          height={28}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#718096"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </div>
                  </div>
                  {question === 0 && (
                    <div
                      className={`h-full py-4 overflow-y-scroll xl:py-8 lg:py-8 md:py-8 sm:py-8`}
                    >
                      <ul>
                        <li className="py-4 xl:py-8 lg:py-8 md:py-8 sm:py-8">
                          <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                            Luanching in May and following updates:
                          </p>
                          <p className="w-full mt-2 text-sm text-gray-600 xl:w-10/12 lg:text-base">
                            - We would introduce more categories{" "}
                          </p>
                          <p className="w-full mt-2 text-sm text-gray-600 xl:w-10/12 lg:text-base ">
                            - We would like to fix potential bugs
                          </p>
                          <p className="w-full mt-2 text-sm text-gray-600 xl:w-10/12 lg:text-base">
                            - We would fix the design to be more mobile
                            responsive
                          </p>
                          <p className="w-full mt-8 text-sm text-gray-600 xl:w-10/12 lg:text-base">
                            P.S. Just Current Thoughts ...
                          </p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
