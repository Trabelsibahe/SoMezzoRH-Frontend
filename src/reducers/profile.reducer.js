/* eslint-disable import/no-anonymous-default-export */
import { profileConstants } from "../actions/constantes";

const intitialState = {
  profiles: [],
  profile: {},
};
export default function (state = intitialState, action) {
  switch (action.type) {
    case profileConstants.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };


    case profileConstants.GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };


      case profileConstants.DELETE_PROFILE:
        return {
          ...state,
          profiles: state.profiles.filter(p =>p._id !== action.payload),
        };  

    default:
      return state;
  }
}
