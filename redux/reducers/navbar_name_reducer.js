import * as types from "../types";

const initialState = {
  name: [],
  post: {},
  loading: false,
  error: null,
};

export const navbarName_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NAVBAR_NAME:
      return { ...state, name: action.payload, loading: false, error: null };
    default:
      return state;
  }
};
