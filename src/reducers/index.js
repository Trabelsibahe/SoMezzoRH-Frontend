import contactReducer from './contact.reducer';
import authReducer from './auth.reducer';
import errorReducer from './errors.reducer';
import profileReducer from './profile.reducer';
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    contact : contactReducer,
    auth : authReducer,
    errors : errorReducer,
    profiles : profileReducer,
})

export default rootReducer;