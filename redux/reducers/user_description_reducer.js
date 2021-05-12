import * as types from "../types";

const initialState = {
  description: [],
  post: {},
  loading: false,
  error: null,
};

export const userDescription_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
