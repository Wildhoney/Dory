import { combineReducers } from 'redux';
import options from './reducers/options';
import catalogue from './reducers/catalogue';

export default combineReducers({
    options,
    catalogue
});
