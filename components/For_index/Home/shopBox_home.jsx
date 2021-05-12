//Importing library
import ReactModal from "react-modal";
import {
  useState,
  useContext,
  forwardRef,
  createContext,
  useEffect,
} from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { BiRun, BiQuestionMark } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { Mixpanel } from "../../../mixpanel/mixpanel";

//Import style
import styles from "./shopBox_home.module.scss";

//material-UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

//Import components
import ShopEditModal from "./shopEditModal";

//Import function
import { deleteShop } from "../../../lib/function";

//Import redux action
import { shopArray_action } from "../../../redux/actions/shop_array";
import { shopQueryArray_action } from "../../../redux/actions/shop_query_array";

//Sliding animation in material ui
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//create Shop detail context
export const ShopDetailContext = createContext();

// Modal.setAppElement('root');
const ShopBox = (props) => {
  //for mixpanel:
  const visitSite = () => {
    //this is to identify the user you are currently tracking//
    Mixpanel.identify(props.navbarUser.id);
    //this is to name the action you want to track//
    Mixpanel.track("Visit External Site (From Own)");
    Mixpanel.track("Visit External Site");
    Mixpanel.track("DAU usage");
    //this set is used to set the profile for the person u created for the record, you dont have to set everytime i think//
    Mixpanel.people.set({
      $name: props.navbarUser.name,
      $email: props.navbarUser.email,
    });
  };

  //for the tooltip
  const [isTooltipBoughtVisible, setTooltipBoughtVisibility] = useState(false);
  const [isTooltipTitleVisible, setTooltipTitleVisibility] = useState(false);
  const [isTooltipCommentVisible, setTooltipCommentVisibility] = useState(
    false
  );
  const [isTooltipNoCommentVisible, setTooltipNoCommentVisibility] = useState(
    false
  );
  const [isTooltipEditVisible, setTooltipEditVisibility] = useState(false);
  const [isTooltipDeleteVisible, setTooltipDeleteVisibility] = useState(false);
  const [isTooltipVisitVisible, setTooltipVisitVisibility] = useState(false);

  const [catIcon, setCatIcon] = useState("");
  //For Display purpose of different <div>
  const [shopName, setShopName] = useState(props.data.nickname);
  const [shopLink, setShopLink] = useState(props.data.link);
  const [shopCategory, setShopCategory] = useState(props.data.category);
  const subCat = JSON.parse(props.data.subCategory);
  const [shopSubcategory, setShopSubcategory] = useState(subCat);
  const [shopComment, setShopComment] = useState(
    props.data.comment.shopDescription
  );
  const [shopThereBefore, setShopThereBefore] = useState(props.data.bought);

  //Prepare for DELETE modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Prepare for EDIT modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //trial on redux
  const dispatch = useDispatch();
  const { shopArray } = useSelector((state) => state.shopArray);

  const confirmDelete = async () => {
    handleClose();
    let newShopArray = shopArray.filter((shop) => shop.id !== props.data.id);
    await deleteShop(props.data.id);
    dispatch(shopArray_action(newShopArray));
    dispatch(shopQueryArray_action(newShopArray));
  };

  useEffect(() => {
    const cat = shopCategory;
    if (cat === "Food") {
      setCatIcon("bg-green-500");
    }
    if (cat === "Sports") {
      setCatIcon("bg-blue-500");
    }
    if (cat === "Fashion") {
      setCatIcon("bg-red-500");
    }
    if (cat === "Others") {
      setCatIcon("bg-yellow-500");
    }
    setTooltipBoughtVisibility(true);
    setTooltipTitleVisibility(true);
    setTooltipCommentVisibility(true);
    setTooltipNoCommentVisibility(true);
    setTooltipEditVisibility(true);
    setTooltipDeleteVisibility(true);
    setTooltipVisitVisibility(true);
  }, [shopCategory]);

  return (
    <div className="relative px-6 py-6 my-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      <div
        className={`absolute flex items-center px-3 py-3 ${catIcon} text-white rounded-full shadow-xl left-4 -top-6`}
      >
        {shopCategory == "Food" ? (
          <MdRestaurantMenu className={`text-white w-7 h-7 `} />
        ) : shopCategory == "Sports" ? (
          <BiRun className={`text-white w-7 h-7 `} />
        ) : shopCategory == "Fashion" ? (
          <GiClothes className={`text-white w-7 h-7`} />
        ) : shopCategory == "Others" ? (
          <BiQuestionMark className={`text-white w-7 h-7 `} />
        ) : (
          ""
        )}
      </div>
      <div className="absolute flex items-center text-black border-2 border-gray-200 rounded-full shadow-xl bg-gray-50 left-24 -top-4">
        {props.data.allShop.icon != "undefined" ? (
          <img
            src={props.data.allShop.icon}
            className="object-cover object-center w-8 h-8 rounded-full "
            onError={(e) => {
              e.target.src = "/images/shopping-bag.png";
            }}
          />
        ) : (
          <img
            src="/images/shopping-bag.png"
            className="object-cover object-center w-8 h-8 rounded-full"
          />
        )}
      </div>

      {shopThereBefore ? (
        <div
          className="absolute flex items-center text-black rounded-full bg-gray-50 phone:left-40 sm:left-96 md:left-56 lg:left-52 xl:left-68 xxl:left-60 -top-5 "
          data-tip="You bought on this Site"
          data-for="bought"
        >
          <button className="flex px-2 py-2 space-x-1 text-sm tracking-wider text-white bg-indigo-600 border-2 border-gray-200 rounded-full cursor-default md:px-2 xl:px-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="ml-1 text-sm font-bold">BOUGHT </p>
          </button>
          {isTooltipBoughtVisible && (
            <ReactTooltip
              delayShow={2000}
              effect="solid"
              type="dark"
              id="bought"
              place="bottom"
            />
          )}
        </div>
      ) : (
        ""
      )}

      <div className="mt-8">
        <div
          className={`w-100 text-lg font-bold h-14 text-gray-800 ${styles.title}`}
          data-tip={shopName}
          data-for="title"
        >
          {shopName}
          {isTooltipTitleVisible && (
            <ReactTooltip
              delayShow={1500}
              effect="solid"
              type="dark"
              id="title"
              place="top"
            />
          )}
        </div>
        <div className="overflow-x-auto">
          <div className="pt-6 pb-6 w-max">
            {subCat && subCat.length > 0 ? (
              subCat.map((data, i) => {
                return (
                  <span
                    className="px-3 py-2 mx-1 mt-1 mb-2 text-sm font-semibold text-gray-500 bg-gray-200 rounded-full hover:text-gray-600"
                    key={i}
                  >
                    # {data}
                  </span>
                );
              })
            ) : (
              <span className="invisible px-3 py-1 mx-1 mt-1 mb-2 text-sm font-semibold text-gray-300 rounded-full bg-gray-50 animate-pulse">
                {"No Hash-Tag"}
              </span>
            )}
          </div>
        </div>

        <div className="border-t-2"></div>
        <div className="grid grid-cols-4 mt-4 mb-0 phone:gap-8 sm:gap-2 justify-items-center">
          {shopComment !== "" ? (
            <button
              className="py-3 text-gray-800 bg-gray-100 rounded cursor-default md:px-6 xl:px-5 lg:px-5 phone:px-6 justify-self-auto hover:bg-gray-200"
              data-tip={`${shopComment}`}
              data-for="comment"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              {isTooltipCommentVisible && (
                <ReactTooltip
                  delayShow={700}
                  effect="solid"
                  type="dark"
                  id="comment"
                  html={true}
                />
              )}
            </button>
          ) : (
            <button
              className="py-3 text-red-600 bg-gray-300 rounded cursor-default md:px-6 xl:px-5 lg:px-5 phone:px-6 justify-self-auto"
              data-tip={"No Comment"}
              data-for="noComment"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              {isTooltipNoCommentVisible && (
                <ReactTooltip
                  delayShow={700}
                  effect="solid"
                  type="dark"
                  id="noComment"
                  html={true}
                />
              )}
            </button>
          )}
          <button
            className="py-3 text-gray-800 bg-gray-100 rounded md:px-6 xl:px-5 lg:px-5 phone:px-6 justify-self-auto hover:bg-gray-200"
            data-tip={"Edit Details"}
            data-for="edit"
            onClick={openModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            {isTooltipEditVisible && (
              <ReactTooltip
                delayShow={700}
                effect="solid"
                type="dark"
                id="edit"
              />
            )}
          </button>
          <button
            className="py-3 text-gray-800 bg-gray-100 rounded md:px-6 xl:px-5 lg:px-5 phone:px-6 justify-self-auto hover:bg-gray-200"
            data-tip={"Delete"}
            data-for="delete"
            onClick={handleClickOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {isTooltipDeleteVisible && (
              <ReactTooltip
                delayShow={700}
                effect="solid"
                type="dark"
                id="delete"
              />
            )}
          </button>
          <a href={shopLink} target="external">
            <button
              className="py-3 text-gray-800 bg-gray-100 rounded md:px-6 xl:px-5 lg:px-5 phone:px-6 justify-self-auto hover:bg-indigo-500 hover:text-white"
              data-tip={"Visit Site"}
              data-for="visit"
              onClick={visitSite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              {isTooltipVisitVisible && (
                <ReactTooltip
                  delayShow={700}
                  effect="solid"
                  type="dark"
                  id="visit"
                />
              )}
            </button>
          </a>
        </div>
      </div>
      {/* modal for edit */}
      <ShopDetailContext.Provider
        value={[
          shopName,
          setShopName,
          shopLink,
          setShopLink,
          shopCategory,
          setShopCategory,
          shopSubcategory,
          setShopSubcategory,
          shopComment,
          setShopComment,
          shopThereBefore,
          setShopThereBefore,
        ]}
      >
        {/* modal inside */}
        <ReactModal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          overlayClassName={`${styles.modalOverlay}`}
          className={`${styles.modalStyle}`}
        >
          <div>
            <button
              onClick={closeModal}
              className="px-4 py-2 -mt-2 font-bold text-white uppercase bg-indigo-500 rounded-md"
            >
              {" "}
              Close
            </button>
          </div>

          <ShopEditModal data={props.data} close={closeModal} />
        </ReactModal>
      </ShopDetailContext.Provider>

      {/* dialog for delete  */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`Delete Current Site: ${
          shopName === "none" ? `${props.data.nickname}` : `${shopName}`
        }?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            By clicking yes will remove this shop from your list permanently,
            are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No,please go back
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Yes, please delete from my list
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShopBox;
