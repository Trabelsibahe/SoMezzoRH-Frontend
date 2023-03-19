import authReducer from './auth.reducer';
import errorReducer from './errors.reducer';
import { combineReducers} from 'redux';
import profileReducer from './profile.reducer';
import archiveReducer from './archive.reducer';

const rootReducer = combineReducers({
    auth : authReducer,
    errors : errorReducer,
    profiles : profileReducer,
    archives : archiveReducer
})

export default rootReducer;