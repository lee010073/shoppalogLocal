import { combineReducers } from "redux";
import { navbarIcon_Reducer } from "./navbar_icon_reducer";
import { navbarName_Reducer } from "./navbar_name_reducer";
import { userDescription_Reducer } from "./user_description_reducer";
import { shopArray_Reducer } from "./shop_array_reducer";
import { shop_Query_Array_Reducer } from "./shop_query_array_reducer";

export default combineReducers({
  navbar_icon: navbarIcon_Reducer,
  navbar_name: navbarName_Reducer,
  userDescription: userDescription_Reducer,
  shopArray: shopArray_Reducer,
  shopQueryArray: shop_Query_Array_Reducer,
});
