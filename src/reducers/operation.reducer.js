/* eslint-disable import/no-anonymous-default-export */
import { operaConstants } from "../actions/constantes";

const intitialState = {
    operation: [],
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


        default:
            return state;
    }
}
