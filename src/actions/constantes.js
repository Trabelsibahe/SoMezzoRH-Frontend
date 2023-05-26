export const contactConstants = {
  GET_ALL_CONTACTS_REQUEST: "GET_ALL_CONTACTS_REQUEST",
  GET_ALL_CONTACTS_SUCCESS: "GET_ALL_CONTACTS_SUCCESS",
  GET_ALL_CONTACTS_FAILURE: "GET_ALL_CONTACTS_FAILURE",

  ADD_CONTACT_REQUEST: "ADD_CONTACT_REQUEST",
  ADD_CONTACT_SUCCESS: "ADD_CONTACT_SUCCESS",
  ADD_CONTACT_FAILURE: "ADD_CONTACT_FAILURE",

  DELETE_CONTACT_REQUEST: "DELETE_CONTACT_REQUEST",
  DELETE_CONTACT_SUCCESS: "DELETE_CONTACT_SUCCESS",
  DELETE_CONTACT_FAILURE: "DELETE_CONTACT_FAILURE",

  UPDATE_CONTACT_REQUEST: "UPDATE_CONTACT_REQUEST",
  UPDATE_CONTACT_SUCCESS: "UPDATE_CONTACT_SUCCESS",
  UPDATE_CONTACT_FAILURE: "UPDATE_CONTACT_FAILURE",
};

export const authConstants = {
  SET_USER: "SET_USER",
  GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
  GET_ALL_PROFILES: "GET_ALL_PROFILES",
  GET_ALL_ARCHIVES: ' GET_ALL_ARCHIVES',
  ERRORS: "ERRORS",
};

export const profileConstants = {
  SET_PROFILE: "SET_PROFILE",
  GET_ALL_PROFILES: "GET_ALL_PROFILES",
  DELETE_PROFILE: "DELETE_PROFILE",
  PROFILE_ERRORS: "PROFILE_ERRORS",
  SEARCH_PROFILES_SUCCESS: " SEARCH_PROFILES_SUCCESS",
  SEARCH_PROFILES_FAILURE: "SEARCH_PROFILES_FAILURE",
  DELETE_PROFILE_SUCCESS: "DELETE_PROFILE_SUCCESS",
  DELETE_PROFILE_FAILURE: "DELETE_PROFILE_FAILURE",
  MODIFIER_CONTACT_SUCCESS: "MODIFIER_CONTACT_SUCCESS",
  MODIFIER_CONTACT_FAILURE: "MODIFIER_CONTACT_FAILURE",
  PROFILE_REQUEST: "PROFILE_REQUEST",
  MODIFIER_PROFILE_SUCCESS: "MODIFIER_PROFILE_SUCCESS",
  MODIFIER_PROFILE_FAILURE: "MODIFIER_PROFILE_FAILURE",
  COUNT_PROFILE: "COUNT_PROFILE",
  COUNT_PROFILE_ERREUR: "COUNT_PROFILE_ERREUR",
};
export const archiveConstants = {
  ARCHIVE_REQUEST: "ARCHIVE_REQUEST",
  GET_ALL_ARCHIVES: ' GET_ALL_ARCHIVES',
  ARCHIVES_ERRORS: 'ARCHIVES_ERRORS',
  DELETE_ARCHIVE_SUCCESS: "DELETE_ARCHIVE_SUCCESS",
  DELETE_ARCHIVE_FAILURE: "DELETE_ARCHIVE_FAILURE",
  COUNT_ARCHIVE: "COUNT_ARCHIVE",
  COUNT_ARCHIVE_ERREUR: "COUNT_ARCHIVE_ERREUR",
  MODIFIER_ARCHIVE_SUCCESS: "MODIFIER_ARCHIVE_SUCCESS",
  MODIFIER_ARCHIVE_FAILURE: "MODIFIER_ARCHIVE_FAILURE",
};
export const newsConstants = {
  GET_ALL_NEWS_REQUEST: 'GET_ALL_NEWS_REQUEST',
  GET_ALL_NEWS: ' GET_ALL_NEWS',
  NEWS_ERRORS: 'NEWS_ERRORS',
  ADD_NEWS_REQUEST: 'ADD_NEWS_REQUEST',
  ADD_NEWS_SUCCESS: 'ADD_NEWS_SUCCESS',
  ADD_NEWS_FAILURE: 'ADD_NEWS_FAILURE',
  DELETE_NEWS: 'DELETE_NEWS',
  DELETE_DATE_NEWS: 'DELETE_DATE_NEWS',

};
export const absenceConstants = {
  ADD_ABSENCE_REQUEST: 'ADD_ABSENCE_REQUEST',
  ADD_ABSENCE_SUCCESS: 'ADD_ABSENCE_SUCCESS',
  ADD_ABSENCE_FAILURE: 'ADD_ABSENCE_FAILURE',
  GET_ABSENCE_FAILURE: 'GET_ABSENCE_FAILURE',
  GET_ABSENCE: ' GET_ABSENCE',
  GET_ALL_ABSENCE_REQUEST: ' GET_ALL_ABSENCE_REQUEST',
  GET_ALL_ABSENCE: ' GET_ALL_ABSENCE',
  ABSENCE_ERRORS: 'ABSENCE_ERRORS',
  UPDATE_ABSENCE_SUCCESS: 'UPDATE_ABSENCE_SUCCESS',
  UPDATE_ABSENCE_FAILURE: 'UPDATE_ABSENCE_FAILURE',
  GET_ALL_ABSENCE_ATTENTE_REQUEST: 'GET_ALL_ABSENCE_ATTENTE_REQUEST',
  GET_ALL_ABSENCE_ATTENTE: 'GET_ALL_ABSENCE_ATTENTE',
}
export const operaConstants = {
  GET_MY_OPERA: 'GET_MY_OPERA',
  OPERA_ERRORS: 'OPERA_ERRORS',
  GET_MY_OPERA_ABSENCE: 'GET_MY_OPERA_ABSENCE',
  OPERA_ABSENCE_ERRORS: 'OPERA_ABSENCE_ERRORS',
  GET_MY_OPERA_ABSENCE_ATTEND: 'GET_MY_OPERA_ABSENCE_ATTEND',
  OPERA_ABSENCE_ATTEND_ERRORS: 'OPERA_ABSENCE_ATTEND_ERRORS',
  OPERATION_REQUEST: 'OPERATION_REQUEST',
  COUNT_OPERATION: 'COUNT_OPERATION',
  COUNT_OPERATION_ERREUR: 'COUNT_OPERATION_ERREUR',
  CHALLENGE_REQUEST: 'CHALLENGE_REQUEST',
  COUNT_CHALLENGE: 'COUNT_CHALLENGE',
  COUNT_CHALLENGE_ERREUR: 'COUNT_CHALLENGE_ERREUR',
  GET_MY_PRIME:'GET_MY_PRIME',
  PRIME_ERRORS:'PRIME_ERRORS',
};
export const ChallengeConstants = {
  ADD_Challenge_REQUEST: 'ADD_Challenge_REQUEST',
  ADD_Challenge_SUCCESS: 'ADD_Challenge_SUCCESS',
  ADD_Challenge_FAILURE: 'ADD_Challenge_FAILURE',
  GET_ALL_Challenge_REQUEST: 'GET_ALL_Challenge_REQUEST',
  GET_ALL_Challenge: 'GET_ALL_Challenge',
  Challenge_ERRORS: 'Challenge_ERRORS',
  DELETE_DATE_Challenge: 'DELETE_DATE_Challenge',
  PARTICIPER_Challenge_REQUEST: 'PARTICIPER_Challenge_REQUEST',
  PARTICIPER_Challenge_SUCCESS: 'PARTICIPER_Challenge_SUCCESS',
  PARTICIPER_Challenge_FAILURE: 'PARTICIPER_Challenge_FAILURE',
  GET_ALL_PARTICIPANT_REQUEST: "GET_ALL_PARTICIPANT_REQUEST",
  GET_ALL_PARTICIPANT_SUCCESS: "GET_ALL_PARTICIPANT_SUCCESS",
  GET_ALL_PARTICIPANT_FAILURE: "GET_ALL_PARTICIPANT_FAILURE",
  CHALLENGE_REQUEST: 'CHALLENGE_REQUEST',
  COUNT_CHALLENGE: 'COUNT_CHALLENGE',
  COUNT_CHALLENGE_ERREUR: 'COUNT_CHALLENGE_ERREUR',
  SET_CHALLENGE: 'SET_CHALLENGE',
  SET_CHALLENGE_ERROR:'SET_CHALLENGE_ERROR',
  SET_TOTAL:'SET_TOTAL',
  SET_TOTAL_ERROR:'SET_TOTAL_ERROR',
}
export const demandeConstants = {
  ADD_DEMANDE_REQUEST: 'ADD_DEMANDE_REQUEST',
  ADD_DEMANDE_SUCCESS: 'ADD_DEMANDE_SUCCESS',
  ADD_DEMANDE_FAILURE: 'ADD_DEMANDE_FAILURE',
  GET_ALL_DEMANDE_REQUEST: 'GET_ALL_DEMANDE_REQUEST',
  GET_ALL_DEMANDE: 'GET_ALL_DEMANDE',
  DEMANDE_ERRORS: 'DEMANDE_ERRORS',
  UPDATE_DEMANDE_SUCCESS: 'UPDATE_DEMANDE_SUCCESS',
  UPDATE_DEMANDE_FAILURE: 'UPDATE_DEMANDE_FAILURE',
  UPDATE_IMAGE_SUCCES: 'UPDATE_IMAGE_SUCCES',
  UPDATE_IMAGE_FAILURE: 'UPDATE_IMAGE_FAILURE',
}
export const notificationConstants = {
  GET_MY_NOTIFICATION: 'GET_MY_NOTIFICATION',
  NOTIFICATION_ERRORS: 'NOTIFICATION_ERRORS',
  GET_ONE_NOTIFICATION: 'GET_ONE_NOTIFICATION',
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
  GET_TRUE_NOTIFICATION: 'GET_TRUE_NOTIFICATION',
  GET_ALL_NOTIFICATIONS: 'GET_ALL_NOTIFICATIONS',
  CREATE_JOURNAL: 'CREATE_JOURNAL',
  JOURNAL_ERRORS: 'JOURNAL_ERRORS',
  GET_ALL_JOURANL: 'GET_ALL_JOURANL',
}
export const santeConstants = {
GET_DATE:'GET_DATE',
GET_DATE_FAILURE:'GET_DATE_FAILURE',
ADD_DEMANDE_REQUEST:'ADD_DEMANDE_REQUEST',
ADD_ADEMANDE_SUCCESS:'ADD_ADEMANDE_SUCCESS',
ADD_DEMANDE_FAILURE:'ADD_DEMANDE_FAILURE',
ADD_DATE_REQUEST:'ADD_DATE_REQUEST',
ADD_DATE_SUCCESS:'ADD_DATE_SUCCESS',
ADD_DATE_FAILURE:'ADD_DATE_FAILURE',
GET_ALL_DEMANDERDV_REQUEST:'GET_ALL_DEMANDE_REQUEST',
GET_ALL_DEMANDERDV:'GET_ALL_DEMANDERDV',
DEMANDE_ERRORS:'DEMANDE_ERRORS',
UPDATE_DEMANDE_SUCCESS:'UPDATE_DEMANDE_SUCCESS',
UPDATE_DEMANDE_FAILURE:'UPDATE_DEMANDE_FAILURE',
GET_MYRDV:'GET_MYRDV',
GET_MYRDV_FAILURE:'GET_MYRDV_FAILURE',
GET_ALL_ARCHIVERDV_REQUEST:'GET_ALL_ARCHIVERDV_REQUEST',
GET_ALL_ARCHIVERDV:'GET_ALL_ARCHIVERDV',
ARCHIVERDV_ERRORS:'ARCHIVERDV_ERRORS',
ARCHIVE_PAR_DATE_NEWS:'ARCHIVE_PAR_DATE_NEWS',
}