import * as types from "../types";

export const navbarIcon_action = (icon) => async (dispatch) => {
  dispatch({
    type: types.GET_NAVBAR_ICON,
    payload: `${icon}`,
  });
};
