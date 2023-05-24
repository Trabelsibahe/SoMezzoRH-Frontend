import { santeConstants } from "../actions/constantes";

const initialState = {
  demandesrdv: [],
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
      case santeConstants.GET_ALL_DEMANDERDV:
        return {
            ...state,
            demandesrdv: action.payload,
          };
          case santeConstants.GET_MYRDV:
            return {
                ...state,
                demande: action.payload,
              };
    default:
      return state;
  }
}
