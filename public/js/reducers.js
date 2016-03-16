import { combineReducers } from 'redux';
import options from './reducers/options';
import catalogue from './reducers/catalogue';
import loading from './reducers/loading';

export default combineReducers({
    options,
    loading,
    catalogue
});
