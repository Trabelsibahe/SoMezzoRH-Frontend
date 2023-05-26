import { ChallengeConstants } from "../actions/constantes";

const intitialState = {
 tasks: [],
 count:0

};
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = intitialState, action) {
  switch (action.type) {
    case ChallengeConstants.GET_ALL_Challenge:
      return {
        ...state,
        tasks: action.payload,
      };
    case ChallengeConstants.Challenge_ERRORS:
      return {
        ...state,
        message: action.payload.message,
      };
    case ChallengeConstants.COUNT_CHALLENGE:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}

