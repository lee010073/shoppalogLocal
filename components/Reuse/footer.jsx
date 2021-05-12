//import Library
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="w-full py-12 pt-16 bg-indigo-700">
        <div className="container mx-auto text-center xl:flex xl:text-left lg:text-left">
          <div className="mb-6 xl:w-3/6 phone:w-full xl:mb-0">
            <p className="text-center text-white xl:text-left">
              @ 2021 SHOPPALOG. All Rights Reserved
            </p>
          </div>
          <div className="xl:w-3/6 phone:w-full">
            <ul className="justify-around xl:flex lg:flex md:flex phone:flex">
              <li className="mb-3 text-white hover:text-gray-300 xl:mb-0 lg:mb-0 md:mb-0 phone:mb-0">
                <Link href="/utility/aboutShoppalog">
                  <a href="/utility/aboutShoppalog">About Us</a>
                </Link>
              </li>
              <li className="mb-3 text-white hover:text-gray-300 xl:mb-0 lg:mb-0 md:mb-0 phone:mb-0">
              <Link href="/utility/termsAndConditions">
                  <a href="/utility/termsAndConditions">Terms and Conditions</a>
                </Link>
              </li>
              <li className="mb-3 text-white hover:text-gray-300 xl:mb-0 lg:mb-0 md:mb-0 phone:mb-0">
              <Link href="/utility/updates">
                  <a href="/utility/updates">Updates </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
