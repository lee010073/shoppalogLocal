//import Library
import Link from "next/link";
import Head from "next/head";
import { GoHome } from "react-icons/go";

export default function CheckEmail() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen font-mono">
      <Head>
        <title>Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>
      <div className="flex flex-col items-center justify-center text-3xl">
        <div>Thank You For SignIn</div>
        <br />
        <div>Login Link Already Sent To Your Email</div>
      </div>

      <br />
      <Link href="/">
        <GoHome className="text-3xl cursor-pointer" />
      </Link>
    </div>
  );
}
