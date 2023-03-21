/* eslint-disable import/no-anonymous-default-export */
import { archiveConstants } from "../actions/constantes";

const intitialState = {
  archives: [],
};
export default function (state = intitialState, action) {
  switch (action.type) {
    case archiveConstants.GET_ALL_ARCHIVES:
        return {
            ...state,
            archives: action.payload,
          };

      case archiveConstants.ARCHIVES_ERRORS : 
      state = {
        ...state,
        message : action.payload.message
      }
      
    default:
      return state;
  }
}
