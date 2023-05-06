import authReducer from './auth.reducer';
import errorReducer from './errors.reducer';
import { combineReducers} from 'redux';
import profileReducer from './profile.reducer';
import archiveReducer from './archive.reducer';
import newsReduce from './news.reduce';
import absenceReducer from './absence.reducer';
import operationReducer from './operation.reducer';
import taskReducer from "./task.reducer";
import demandeReducer from './demande.reducer';
import notificationReducer from './notification.reducer';

const rootReducer = combineReducers({
    auth : authReducer,
    errors : errorReducer,
    profiles : profileReducer,
    archives : archiveReducer,
    news : newsReduce,
    absence : absenceReducer,
    operation : operationReducer,
    task : taskReducer,
    demande : demandeReducer,
    notification : notificationReducer
    

})

export default rootReducer;