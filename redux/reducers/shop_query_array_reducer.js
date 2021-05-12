import * as types from "../types";

const initialState = {
  shopQueryArray: [],
  post: {},
  loading: false,
  error: null,
};


export const shop_Query_Array_Reducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_SHOP_QUERY_ARRAY:
        return { ...state, shopQueryArray: action.payload, loading: false, error: null };
      default:
        return state;
    }
  };
  