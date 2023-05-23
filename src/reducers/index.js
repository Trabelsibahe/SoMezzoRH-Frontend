import authReducer from './auth.reducer';
import errorReducer from './errors.reducer';
import { combineReducers} from 'redux';
import profileReducer from './profile.reducer';
import archiveReducer from './archive.reducer';
import newsReduce from './news.reduce';
import absenceReducer from './absence.reducer';
import operationReducer from './operation.reducer';
import taskReducer from "./Challenge.reducer";
import demandeReducer from './demande.reducer';
import notificationReducer from './notification.reducer';
import santeReduce from './sante.reduce';

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
    notification : notificationReducer,
    sante: santeReduce,
    

})

export default rootReducer;