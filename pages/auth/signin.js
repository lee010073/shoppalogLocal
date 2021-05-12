//import Library
import React, { useRef } from "react";
import { FiMail } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoHome } from "react-icons/go";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { Mixpanel } from "../../mixpanel/mixpanel";

export default function SignIn({ csrfToken, providers }) {
  const router = useRouter();

  const back = () => {
    router.push("/");
  };
  return (
    <section className="flex items-stretch min-h-screen text-black ">
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <div className="relative items-center hidden w-1/2 bg-gray-500 bg-no-repeat bg-cover lg:flex">
        <img
          className={
            "absolute inset-0 z-0 object-cover w-full h-full opacity-60"
          }
          src={
            "https://res.cloudinary.com/djccssdr9/image/upload/v1617955545/joanna-kosinska-1_CMoFsPfso-unsplash_knuzsm.jpg"
          }
          alt="bg"
        />
        <div className="z-10 w-full px-24">
          <h1 className="text-5xl font-bold tracking-wide text-left text-white">
            Keep Shopping Effective
          </h1>
          <p className="pt-8 my-4 text-2xl italic text-white">
            Imagine googling shopping sites with Your Friends' Guidance.
          </p>
          <p className="my-4 text-2xl italic text-white">
            In anytime you need, In anytime you want..
          </p>
        </div>
      </div>

      <div className="z-0 flex items-center justify-center w-full px-0 text-center lg:w-1/2 md:px-16">
        <div className="z-20 w-full py-6">
          <h1 className="flex items-center justify-center my-6 space-x-4 justify-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 p-2 text-white bg-indigo-500 rounded-full"
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
            <p className="text-3xl font-semibold text-gray-800 xl:text-4xl">
              SHOPPALOG{" "}
            </p>
          </h1>
          <div className="flex flex-col items-center justify-center py-6 space-x-2">
            {Object.values(providers).map((provider) => {
              if (provider.name === "Email") {
                return;
              }
              return (
                <div key={provider.name}>
                  <button
                    variant="outline"
                    onClick={() => signIn(provider.id)}
                    className="flex items-center justify-center h-12 px-4 mb-4 space-x-2 font-semibold uppercase transition-colors duration-150 border border-gray-400 shadow-sm rounded-xl group hover:bg-indigo-600 hover:text-white focus:outline-none"
                  >
                    {provider.name == "Google" ? (
                      <FcGoogle className="mr-2 text-2xl" />
                    ) : (
                      <FaFacebook className="mr-2 text-2xl text-blue-500" />
                    )}
                    Sign in with {provider.name}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mx-2 font-semibold text-gray-700">
            or enter Your Email to Sign up/Sign in your account,
            <br /> You can use that email to login again
            <br />
            <br /> P.S Founders hate remembering Password!!
          </p>
          <form
            action="/api/auth/signin/email"
            className="w-full px-4 mx-auto sm:w-2/3 lg:px-0"
            method="post"
          >
            <div className="pt-4 pb-2 phone:mx-2 sm:mx-4">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email Here"
                className="block w-full p-4 text-lg text-black bg-gray-100 border-2 border-gray-100 rounded-sm rounded-md"
                required
              />
            </div>
            <div className="px-4 pt-4 pb-2 phone:px-2">
              <button
                type="submit"
                className="block w-full py-4 font-semibold text-white uppercase bg-indigo-600 rounded-full lg:text-md xxl:text-lg phone:text-xs md:text-md sm:text-md hover:bg-indigo-700 focus:outline-none"
              >
                Send me a email to Sign In / Sign up
              </button>
            </div>
            <div className="px-4 pt-4 pb-2">
              <Link href="/utility/termsAndConditions">
                <button className="text-gray-700 ">
                  By signing up, you are agreeing to our{" "}
                  <strong className="hover:text-indigo-500">
                    Terms and Conditions
                  </strong>
                </button>
              </Link>
            </div>

            <div className="left-0 right-0 flex justify-center p-4 mt-16 space-x-4 text-center lg:hidden ">
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
  return {
    csrfToken: await csrfToken(context),
    providers: await providers(context),
  };
};
