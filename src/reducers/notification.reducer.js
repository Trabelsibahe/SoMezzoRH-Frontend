/* eslint-disable import/no-anonymous-default-export */
import { notificationConstants } from "../actions/constantes";

const intitialState = {
  notifications: [],
};
export default function (state = intitialState, action) {
  switch (action.type) {
    case notificationConstants.GET_MY_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
      };
    case notificationConstants.GET_ONE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case notificationConstants.NOTIFICATION_ERRORS:
      return {
        ...state,
        message: action.payload.message
      }
    case notificationConstants.GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      }

    default:
      return state;
  }
}
