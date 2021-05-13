//import Library
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

//import components
import Footer from "../../components/Reuse/footer";

export default function AboutShoppalog() {
  const [question, setquestion] = useState(0);
  return (
    <div className="h-full">
      <Head>
        <title>Why Shoppalog?</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <div className="container h-full min-h-screen pt-16 pb-12 mx-auto">
        <div className="w-11/12 mx-auto xl:w-full">
          <div className="pb-12">
            <p className="mb-4 text-base leading-tight text-gray-500 uppercase lg:text-lg">
              start with the basics
            </p>
            <h1 className="text-2xl font-extrabold text-gray-800 xl:text-5xl md:text-3xl">
              Frequently Asked Questions /{" "}
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
                    <h1 className="text-base font-bold text-indigo-600 md:text-xl lg:text-2xl">
                      About Shoppalog
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
                    <ul>
                      <li className="py-4 xl:py-8 lg:py-8 md:py-8 sm:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          What is Shoppalog?
                        </p>
                        <p className="w-full text-sm text-gray-600 xl:w-10/12 lg:text-base">
                          It is a tool that allows you to shop online
                          effectively by following like-minded others'
                          footprints.{" "}
                        </p>
                      </li>
                      <li className="py-4 md:py-6 lg:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          How Shoppalog Works?
                        </p>
                        <p className="w-full text-base text-gray-600 xl:w-10/12 lg:w-10/12">
                          By following your friends/people you like, the
                          shopping sites they recommended will have a higher
                          priority in your search result.
                          <br /> You can also save and recommend your own
                          collections of quality online shopping sites by simply
                          copying and pasting their link with category.
                        </p>
                      </li>
                      <li className="py-4 md:py-6 lg:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          Why should I use Shoppalog
                        </p>
                        <p className="w-full text-sm text-gray-600 xl:w-10/12 lg:text-base">
                          Current social media platforms are not optimized for
                          browsing options in shopping products/services. There
                          should be a more effective way to help people shop
                          online with styled recommendations from like-minded
                          people, and that is where Shoppalog comes in handy.
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between py-6 border-b border-gray-200">
                    <h1 className="text-base font-bold text-indigo-600 md:text-xl lg:text-2xl">
                      Key Features
                    </h1>
                    <div
                      data-menu
                      className="cursor-pointer"
                      onClick={() =>
                        question === 2 ? setquestion(null) : setquestion(2)
                      }
                    >
                      {question === 2 ? (
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
                  {question === 2 && (
                    <ul>
                      <li className="py-4 xl:py-8 lg:py-8 md:py-8 sm:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          Exclusive features for saving sites
                        </p>
                        <p className="w-full text-sm text-gray-600 xl:w-10/12 lg:text-base">
                          You can add in hashtags, personal comments to
                          different saved sites, label the site as bought
                          something there before, to name but a few.
                        </p>
                      </li>
                      <li className="py-4 md:py-6 lg:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          Updates from friends{" "}
                        </p>
                        <p className="w-full text-base text-gray-600 xl:w-10/12 lg:w-10/12">
                          You can see the newest updates from your friends in
                          your feed.
                        </p>
                      </li>
                      <li className="py-4 md:py-6 lg:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          Advanced Search Results
                        </p>
                        <p className="w-full text-sm text-gray-600 xl:w-10/12 lg:text-base">
                          The related shopping sites from people you followed
                          will be in a higher ranking on your search result.
                        </p>
                      </li>
                      <li className="py-4 md:py-6 lg:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          Explore the world{" "}
                        </p>
                        <p className="w-full text-sm text-gray-600 xl:w-10/12 lg:text-base">
                          You can explore different quality shopping sites added
                          by others by clicking the Explore button.
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between py-6 border-b border-gray-200">
                    <h1 className="text-base font-bold text-indigo-600 md:text-xl lg:text-2xl">
                      About Us / Contact
                    </h1>
                    <div
                      data-menu
                      className="cursor-pointer"
                      onClick={() =>
                        question === 3 ? setquestion(null) : setquestion(3)
                      }
                    >
                      {question === 3 ? (
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
                  {question === 3 && (
                    <ul>
                      <li className="py-4 xl:py-8 lg:py-8 md:py-8 sm:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          Contact us by Email
                        </p>
                        <p className="w-full text-sm text-gray-600 xl:w-10/12 lg:text-base">
                          Our email address is:info@shoppalog.com
                        </p>
                      </li>
                      <li className="py-4 md:py-6 lg:py-8">
                        <p className="w-full mb-2 text-gray-800 md:text-xl lg:text-2xl xl:w-10/12 lg:mb-4">
                          If you are a Youtuber/Active Instagram Promoter, and would like to recommend changes personally
                        </p>
                        <p className="w-full text-base text-gray-600 xl:w-10/12 lg:w-10/12">
                         Email address :enquiry@shoppalog.com
                        </p>
                      </li>
                    </ul>
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
