import { combineReducers } from 'redux';
import groups from './groups';
import users from './users';
import system from './system';

export default combineReducers({
    groups,
    users,
    system
});