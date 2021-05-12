import styles from "./search.module.scss";

//import library
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";

//import other components
import ShopBoxForSearch from "./shopBox_for_search";

const SearchShop = (props) => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(12);
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
      <section className="min-h-screen overflow-hidden text-gray-600 bg-gray-100 md:px-0 phone:px-6 body-font">
        <div className="pt-10 lg:mx-20 phone:mx-auto sm:mx-10 md:mx-20">
          <div className="flex flex-col w-full mb-2 text-start">
            <h1 className="mb-1 font-medium text-gray-900 phone:text-xl md:text-3xl sm:text-2xl title-font">
              You have searched for : {props.input}
            </h1>
            <div className="inline-flex h-1 mb-2 bg-indigo-500 rounded-full phone:w-100 sm:w-60"></div>
          </div>

          {props.data && props.data.length == 0 ? (
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
              <div className="grid phone:grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4">
                {data &&
                  data.map((data) => (
                    <ShopBoxForSearch
                      key={data.id}
                      data={data}
                      cuid={props.cuid}
                      navbarUser={props.navbarUser}
                    />
                  ))}
              </div>

              <ReactPaginate
                previousLabel={"PREVIOUS"}
                nextLabel={"NEXT"}
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

export default SearchShop;
