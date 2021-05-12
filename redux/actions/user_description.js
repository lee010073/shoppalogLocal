import * as types from "../types";

export const userDescription_action = (description) => async (dispatch) => {
  dispatch({
    type: types.GET_USER_DESCRIPTION,
    payload: `${description}`,
  });
};
