//import Library
import Link from "next/link";
import Head from "next/head";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function error() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen font-mono">
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <div className="flex flex-col items-center justify-center text-3xl">
        <div className="text-5xl font-semibold">OOPS!!</div>
        <br />
        <div>Something Wrong!</div>
        <div>Please Try Again!</div>
      </div>

      <br />
      <Link href="/auth/signin">
        <RiArrowGoBackFill className="text-3xl cursor-pointer" />
      </Link>
    </div>
  );
}
