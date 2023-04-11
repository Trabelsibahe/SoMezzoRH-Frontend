/* eslint-disable import/no-anonymous-default-export */
import { absenceConstants } from "../actions/constantes";

const intitialState = {
 absences: [],

};
export default function (state = intitialState, action) {
  switch (action.type) {
    case absenceConstants.GET_ABSENCE:
        return {
            ...state,
            absence: action.payload,
          };

      case absenceConstants.GET_ABSENCE_FAILURE : 
      state = {
        ...state,
        message : action.payload.message
      }
      case absenceConstants.GET_ALL_ABSENCE:
        return {
            ...state,
            absences: action.payload,
          };

    default:
      return state;
  }
}
