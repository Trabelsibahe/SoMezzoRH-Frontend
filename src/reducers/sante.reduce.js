import { santeConstants } from "../actions/constantes";

const initialState = {
  demandesrdv: [],
  info : {},
  archiverdv: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case santeConstants.GET_DATE:
      return {
        ...state,
        info: action.payload,
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
               case santeConstants.GET_ALL_ARCHIVERDV:
            return {
                ...state,
                archiverdv: action.payload,
              };
    default:
      return state;
  }
}
