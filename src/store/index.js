import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from "../reducers";

// wassim staaml "createStore"

const initialState = {}
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store;
