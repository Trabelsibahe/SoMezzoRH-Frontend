import { demandeConstants } from "../actions/constantes";

const intitialState = {
 demandes: [],

};
export default function (state = intitialState, action) {
  switch (action.type) {
      case demandeConstants.DEMANDE_ERRORS : 
      state = {
        ...state,
        message : action.payload.message
      }
      case demandeConstants.GET_ALL_DEMANDE:
        return {
            ...state,
            demandes: action.payload,
          };

    default:
      return state;
  }
}
