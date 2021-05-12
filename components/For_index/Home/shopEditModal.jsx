//importing library
import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import Data
import { categoryData } from "../../For_Add_shop/categoryData";

import { Switch } from "@material-ui/core";

//import context
import { ShopDetailContext } from "./shopBox_home";

// import function
import { editShop } from "../../../lib/function";

// import redux action
import { shopQueryArray_action } from "../../../redux/actions/shop_query_array";
import { shopArray_action } from ".../../../redux/actions/shop_array";

const ShopEditModal = (props) => {

//Processing Edit
const [editLoading,setEditLoading]=useState(false)

  const subCategoryData = [
    { value: "Bags", label: "Bags", color: "#00B8D9" },
    {
      value: "Electronic Devices",
      label: "Electronic Devices",
      color: "#0052CC",
    },
    { value: "Sneakers", label: "Sneakers", color: "#5243AA" },
    { value: "PUMA", label: "PUMA", color: "#FF5630" },
    { value: "NIKE", label: "NIKE", color: "#FF8B00" },
    { value: "Jackets", label: "Jackets", color: "#FFC400" },
    { value: "Bikes", label: "Bikes", color: "#36B37E" },
    { value: "Lululemon", label: "Lululemon", color: "#00875A" },
    { value: "Dogs Supplies", label: "Dogs Supplies", color: "#253858" },
    { value: "Furniture", label: "Furniture", color: "#666666" },
  ];

  //check if changed
  const [updated, setUpdated] = useState(false);
  const [
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
  ] = useContext(ShopDetailContext);

  //for toggle functionality
  const [checked, setChecked] = useState("none");
  const toggleChecked = () => {
    setChecked(!checked);
  };

  const objArray = function (value) {
    let x = [];
    value.map((data) => {
      x.push({ value: data, label: data });
    });
    return x;
  };

  const { register, handleSubmit, errors, control } = useForm();

  //submit data
  const onSubmit = async (data) => {
    setEditLoading(true)
    if (data.subcategory.length > 5) {
      toast.error("Sorry, Subcategory Maximum 5 tags !! ");
      setEditLoading(false);
    } else {
      (await data.category) && setShopCategory(data.category.value);
      await setShopLink(data.link);
      await setShopName(data.name);
      let length = (await data.subcategory) && data.subcategory.length;

      let subCatArrayValue = [];
      for (let i = 0; i < length; i++) {
        subCatArrayValue.push(
          (await data.subcategory) && data.subcategory[i].value
        );
      }
      await setShopSubcategory(subCatArrayValue);
      await setShopComment(data.comment);
      await setShopThereBefore(data.visited);

      const readyForEdit = {
        shopId: props.data.id,
        allData: data,
        subcategory: subCatArrayValue,
      };

      const result = await editShop(readyForEdit);

      if (result == "subcategory length unable") {
        toast.error("Sorry, Subcategory Maximum 5 tags !!");
        setEditLoading(false)
      } else {
        //for editing array individual items
        //https://stackoverflow.com/questions/45878147/how-to-update-an-object-in-an-array-of-objects-using-setstate
        const index = shopArray.findIndex(
          (obj) => obj.id === readyForEdit.shopId
        );
        //('index', shopArray[index])
        shopArray[index].category = data.category.value;
        shopArray[index].subCategory = JSON.stringify(subCatArrayValue);
        shopArray[index].nickname = data.name;
        shopArray[index].link = data.link;
        shopArray[index].bought = data.visited;
        shopArray[index].comment.shopDescription = data.comment;
        dispatch(shopArray_action(shopArray));
        dispatch(shopQueryArray_action(shopArray));
        setUpdated(!updated);
        setEditLoading(false);
        props.close();
      }
    }
  };

  useEffect(() => {
    setChecked(shopThereBefore);
  }, [updated]);

  // for redux
  const dispatch = useDispatch();
  const { shopArray } = useSelector((state) => state.shopArray);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2 mt-2 ">
          <label className="w-full ">Link(required)</label>
          <input
            type="text"
            id="link"
            name="link"
            className="w-full p-2 border-2 rounded-md hover:bg-gray-200"
            defaultValue={shopLink && shopLink}
            placeholder="Enter a new link"
            ref={register({ required: true })}
          />
          {errors.link && <p className="text-red-500">This field is required</p>}
        </div>

        <div className="py-2">
          <label className="w-full ">Name (required)</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border-2 rounded-md hover:bg-gray-200"
            defaultValue={shopName && shopName}
            placeholder="Enter a new name"
            ref={register({ required: true })}
          />
          {errors.name && <p className="text-red-500">This field is required</p>}
        </div>

        <div className="py-2">
          <label className="w-full ">Category(required)</label>
          <Controller
            name="category"
            instanceId="category"
            as={Select}
            defaultValue={{ value: shopCategory, label: shopCategory }}
            placeholder={`Please choose the cateogry`}
            options={categoryData}
            control={control}
            rules={{ required: true }}
          />
          {errors.category && <p className="text-red-500">This field is required</p>}
        </div>
        <div className="py-2">
          <label className="w-full ">Subcategory (optional)(Max: 5tags)</label>
          <Controller
            name="subcategory"
            id="subcategory"
            instanceId="subcategory"
            as={CreatableSelect}
            defaultValue={objArray(shopSubcategory && shopSubcategory)}
            isMulti
            options={subCategoryData}
            control={control}
          />
        </div>
        <div className="py-2">
          <label className="w-full ">Comment (optional)</label>
          <textarea
            id="comment"
            name="comment"
            className="w-full h-20 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
            ref={register}
            defaultValue={shopComment}
            placeholder="You experience while using this ecommerce website"
          ></textarea>
        </div>
        <div className="py-2">
          <label htmlFor="message" className="text-sm leading-7 text-gray-700">
            Did you buy from this website before?{" "}
            <span className="font-bold">{checked == "none" || !checked ? "No" : "Yes"}</span>
          </label>
          <ol className="">
            <li className="flex flex-wrap justify-between">
              <Switch
                name="visited"
                inputRef={register}
                onClick={toggleChecked}
                checked={checked == "none" ? shopThereBefore : checked}
              />
            </li>
          </ol>
        </div>
        {editLoading?
        <button
          type="submit"
          className="px-10 py-2 font-bold text-white uppercase bg-indigo-600 rounded-md cursor-not-allowed animate-pulse"
        >
          Processing...
        </button>
        :
       <button
          type="submit"
          className="px-10 py-2 font-bold text-white uppercase bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          Save
        </button>
        }
      </form>
    </div>
  );
};

export default ShopEditModal;
