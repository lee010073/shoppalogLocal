import * as types from "../types";

export const shopArray_action = (shopArray) => async (dispatch) => {
  dispatch({
    type: types.GET_SHOP_ARRAY,
    payload: shopArray,
  }
  );
};