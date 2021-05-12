import * as types from "../types";

const initialState = {
  icon: [],
  post: {},
  loading: false,
  error: null,
};

export const navbarIcon_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NAVBAR_ICON:
      return { ...state, icon: action.payload, loading: false, error: null };
    default:
      return state;
  }
};
