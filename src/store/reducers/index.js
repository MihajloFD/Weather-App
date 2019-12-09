import { combineReducers } from 'redux';

import weatherReducer from './weather';
import errorReducer from './error';

const rootReducer = combineReducers({
    weather: weatherReducer,
    errorMessage: errorReducer,
});

export default rootReducer;