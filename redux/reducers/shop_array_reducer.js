import * as types from "../types";

const initialState = {
  shopArray: [],
  post: {},
  loading: false,
  error: null,
};


export const shopArray_Reducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_SHOP_ARRAY:
        return { ...state, shopArray: action.payload, loading: false, error: null };
      default:
        return state;
    }
  };
  