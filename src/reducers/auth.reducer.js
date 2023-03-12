/* eslint-disable import/no-anonymous-default-export */
import { authConstants } from "../actions/constantes";
import isEmpty from "../util/isEmpty";

const initialState = {
  isConnected: false,
  user: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case authConstants.SET_USER:
      return {
        ...state,
        isConnected: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
}

