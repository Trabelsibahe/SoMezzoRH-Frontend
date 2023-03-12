/* eslint-disable import/no-anonymous-default-export */
import { authConstants } from "../actions/constantes";



const initialState = {};


export default function (state = initialState, action) {
    
  switch (action.type) {
    case authConstants.ERRORS:
      return action.payload;

    default:
      return state;
  }
} 