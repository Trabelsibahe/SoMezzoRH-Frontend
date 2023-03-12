import authReducer from './auth.reducer';
import errorReducer from './errors.reducer';
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth : authReducer,
    errors : errorReducer,
})

export default rootReducer;