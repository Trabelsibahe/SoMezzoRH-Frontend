/* eslint-disable import/no-anonymous-default-export */
import { authConstants, profileConstants } from "../actions/constantes";


const initialState = {};


export default function (state = initialState, action) {
    
  switch (action.type) {
    
    case profileConstants.PROFILE_ERRORS:
      return action.payload;
    case authConstants.ERRORS:
      return action.payload;

    default:
      return state;
  }
} 