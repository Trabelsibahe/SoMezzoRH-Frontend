/* eslint-disable import/no-anonymous-default-export */
import { authConstants, profileConstants, absenceConstants, operaConstants, demandeConstants, newsConstants,ChallengeConstants } from "../actions/constantes";


const initialState = {};


export default function (state = initialState, action) {

  switch (action.type) {

    case profileConstants.PROFILE_ERRORS:
      return action.payload;
    case authConstants.ERRORS:
      return action.payload;
    case absenceConstants.ADD_ABSENCE_FAILURE:
      return action.payload;
    case operaConstants.OPERA_ERRORS:
      return action.payload;
    case demandeConstants.ADD_DEMANDE_FAILURE:
      return action.payload;
      case newsConstants.ADD_NEWS_FAILURE:
      return action.payload;
      case ChallengeConstants.ADD_Challenge_FAILURE:
      return action.payload;
      case authConstants.SEND_EMAIL_FAILURE:
        return action.payload;
        case authConstants.RESET_PASSWORD_FAILURE:
          return action.payload;
    default:
      return state;
  }
} 