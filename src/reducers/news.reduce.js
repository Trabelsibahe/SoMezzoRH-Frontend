/* eslint-disable import/no-anonymous-default-export */
import { newsConstants } from "../actions/constantes";

const intitialState = {
  news: [],
};
export default function (state = intitialState, action) {
  switch (action.type) {
    case newsConstants.GET_ALL_NEWS:
        return {
            ...state,
            news: action.payload,
          };

      case newsConstants.NEWS_ERRORS : 
      return {
        ...state,
        message : action.payload.message
      }
      //ADD news
      case newsConstants.ADD_NEWS_REQUEST : 
      return {
        ...state,
      }
    
      case newsConstants.ADD_NEWS_SUCCESS : 
      return {
        ...state,
        createdN : action.payload.creatednews
      }
      case newsConstants.ADD_NEWS_FAILURE : 
      return{
        ...state,
        error : action.payload.error
      }
    
    default:
      return state;
  }
}
