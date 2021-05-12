import * as types from "../types";

export const navbarName_action = (name) => async (dispatch) => {
  dispatch({
    type: types.GET_NAVBAR_NAME,
    payload: `${name}`,
  });
};
