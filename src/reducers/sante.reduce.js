import { santeConstants } from "../actions/constantes";

const initialState = {
};

export default function(state = initialState, action) {
  switch (action.type) {
    case santeConstants.GET_DATE:
      return {
        ...state,
        date: action.payload,
      };

    case santeConstants.GET_DATE_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };

    default:
      return state;
  }
}
