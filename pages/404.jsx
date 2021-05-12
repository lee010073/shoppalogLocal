//import Library
import Head from "next/head";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

//import components
import Footer from "../components/Reuse/footer";

export default function FourOhFour() {
  return (
    <div className="h-screen">
      <Head>
        <title>Oh....Page not find</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>

      <div className="w-screen ">
        <header className="text-gray-600 body-font">
          <div className="container flex flex-col flex-wrap items-center p-4 mx-auto md:flex-row">
            <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">SHOPPALOG</span>
            </a>
          </div>
        </header>
      </div>

      <div className="flex items-center min-h-screen text-gray-600 gradient">
        <div className="container flex flex-wrap items-center p-4 mx-auto">
          <div className="w-full p-4 text-center md:w-5/12">
            <img
              src="https://themichailov.com/img/not-found.svg"
              alt="Not Found"
            />
          </div>
          <div className="w-full p-4 text-center md:w-7/12 md:text-left">
            <div className="text-6xl font-medium">404</div>
            <div className="mb-4 text-xl font-medium md:text-3xl">
              Oops. This page has gone missing.
            </div>
            <div className="mb-8 text-lg">
              You may have mistyped the address or the page may have moved.
            </div>
            <Link href="/">
              <button className="px-10 py-4 font-bold text-white uppercase bg-indigo-500 cursor-pointer rounded-xl">
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
