/* eslint-disable import/no-anonymous-default-export */
import { profileConstants } from "../actions/constantes";

const intitialState = {
  profiles: [],
  profile: {},
  count: 0 
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
      case profileConstants.MODIFIER_CONTACT_SUCCESS:
        return {
          ...state,
         message : action.payload.message
        }
        case profileConstants.COUNT_PROFILE:
          return {
            ...state,
            count: action.payload,

          };
    default:
      return state;
  }
}
