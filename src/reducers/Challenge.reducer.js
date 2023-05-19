import { ChallengeConstants } from "../actions/constantes";

const intitialState = {
 tasks: [],

};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = intitialState, action) {
  switch (action.type) {
    case ChallengeConstants.GET_ALL_Challenge:
        return {
            ...state,
            tasks: action.payload,
          };

      case ChallengeConstants.Challenge_ERRORS : 
      state = {
        ...state,
        message : action.payload.message
      }
      case ChallengeConstants.ADD_Challenge_FAILURE : 
      state = {
        ...state,
        message : action.payload.message
      }
    default:
      return state;
  }
}
