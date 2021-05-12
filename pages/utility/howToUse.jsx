//import Library
import Head from "next/head";
import Link from "next/link";

//import components
import Footer from "../../components/Reuse/footer";

export default function HowToUse() {
  return (
    <div className="h-screen">
      <Head>
        <title>How To Use Shoppalog</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>

      <Footer />
    </div>
  );
}
