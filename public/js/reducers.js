import {combineReducers} from 'redux';
import posts from './reducers/posts';
import catalogue from './reducers/catalogue';

export default combineReducers({
    catalogue,
    posts
});
