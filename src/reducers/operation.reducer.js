/* eslint-disable import/no-anonymous-default-export */
import { operaConstants } from "../actions/constantes";

const intitialState = {
    operation: [],
    absences:[],
    count: 0 ,
    countch:0,
};
export default function (state = intitialState, action) {

    switch (action.type) {

        case operaConstants.GET_MY_OPERA:
            return {
                ...state,
                operation: action.payload,
            };

        case operaConstants.OPERA_ERRORS:
            return {
                ...state,
                message: action.payload.message
            }
            
        case operaConstants.GET_MY_OPERA_ABSENCE:
            return {
                ...state,
                absences: action.payload,
            };

        case operaConstants.OPERA_ABSENCE_ERRORS:
            return {
                ...state,
                message: action.payload.message
            }
            case operaConstants.COUNT_OPERATION:
                return {
                  ...state,
                  count: action.payload,
      
                };
                case operaConstants.COUNT_CHALLENGE:
                    return {
                      ...state,
                      countch: action.payload,
          
                    };
        default:
            return state;
    }
}
