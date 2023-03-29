import authReducer from './auth.reducer';
import errorReducer from './errors.reducer';
import { combineReducers} from 'redux';
import profileReducer from './profile.reducer';
import archiveReducer from './archive.reducer';
import newsReduce from './news.reduce';

const rootReducer = combineReducers({
    auth : authReducer,
    errors : errorReducer,
    profiles : profileReducer,
    archives : archiveReducer,
    news : newsReduce,

})

export default rootReducer;