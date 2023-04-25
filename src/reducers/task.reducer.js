import { taskConstants } from "../actions/constantes";

const intitialState = {
 tasks: [],

};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = intitialState, action) {
  switch (action.type) {
    case taskConstants.GET_ALL_TASK:
        return {
            ...state,
            tasks: action.payload,
          };

      case taskConstants.TASK_ERRORS : 
      state = {
        ...state,
        message : action.payload.message
      }
    default:
      return state;
  }
}
