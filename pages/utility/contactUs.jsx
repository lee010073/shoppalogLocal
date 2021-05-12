//import Library
import Head from "next/head";
import Link from "next/link";

//import components
import Footer from "../../components/Reuse/footer";

export default function ContactUs() {
  return (
    <div className="h-screen">
      <Head>
        <title>Contact Us</title>
        <link rel="icon" href="/images/shoppalog_logo.png" />
      </Head>

      <Footer />
    </div>
  );
}
