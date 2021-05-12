//import style
import styles from "./search.module.scss";

//import other components
import UserCard from "../Reuse/userCard";

//import lib
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";

const SearchUser = (props) => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState();

  const changePage = async (num) => {
    const slice = await props.data.slice(num, num + perPage);
    setData(slice);
  };

  const clickPage = (e) => {
    const selectedPage = e.selected;
    const newOffset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(newOffset);

    changePage(newOffset);
  };

  useEffect(() => {
    setPageCount(Math.ceil(props.data.length / perPage));

    changePage(0);
  }, []);

  return (
    <div>
      <section className="min-h-screen overflow-hidden text-gray-600 md:px-0 phone:px-6 bg-gray-50 body-font">
        <div className="px-5 py-20 mx-auto ">
          <div className="flex flex-col w-full mb-2 text-center">
            <h1 className="font-medium text-gray-900 phone:text-xl md:text-3xl sm:text-2xl title-font">
              You have searched for: {props.input}
            </h1>
            <div className="flex justify-center mt-6">
              <div className="inline-flex w-20 h-1 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
          {props.data.length == 0 ? (
            <div className="flex flex-wrap items-center space-x-10 lg:-mt-20 ">
              <Image
                src="/images/coffe.svg"
                alt="Picture of the author"
                width={600}
                height={600}
              />
              <p className="mb-20 -mt-20 font-bold phone:text-xl md:text-2xl phone:mb-0 phone:mt-0 xl:mt-0 lg:text-3xl lg:mb-0">
                Sorry !<br /> There is no relevant site at the moment.
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 gap-4 pt-6 pb-6 phone:px-0 sm:px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4">
                {props.data.map((data) => (
                  <UserCard key={data.id} data={data} cuid={props.cuid} />
                ))}
              </div>

              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={clickPage}
                containerClassName={`${styles.pagination}`}
                subContainerClassName={`pages ${styles.pagination}`}
                activeClassName={`${styles.active}`}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchUser;
