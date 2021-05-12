import * as types from "../types";

export const shopQueryArray_action = (shopQueryArray) => async (dispatch) => {
  dispatch({
    type: types.GET_SHOP_QUERY_ARRAY,
    payload: shopQueryArray,
  });
};