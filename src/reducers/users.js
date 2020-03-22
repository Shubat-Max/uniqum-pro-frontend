import { Record, OrderedMap } from 'immutable';
import {
    LOAD_ALL_USERS_3,
    REMOVE_USER_GROUP,
    CHANGE_USER_GROUP,
    AUTHORIZE,
    LOAD_CURRENT_USER,
    LOAD_USER,
    SUCCESS, FAILED, START,
    CREATE_USER
} from "../configs/action_consts";
import {arrToMap} from "../helpers";



const UserRecord = Record({
    _id: null,
    name: '',
    groupId: null,
    email: null,
    avatar: null,
    role: null,
    active: true,
    memberOf: null,
    invitedBy: null,
    loading: false
});

const ReducerState = Record({
    entities: new OrderedMap(arrToMap([], UserRecord )),
    loading: false,
    loaded: false
});

const defaultUsers = new ReducerState();


export default ( users = defaultUsers, action) => {
    const { type, payload } = action;


    switch (type) {
        case AUTHORIZE:
            return users
                .setIn(['entities', payload.response._id], new UserRecord(payload.response))
                .set('loaded', true);



        case LOAD_CURRENT_USER + START:
            return users;

        case LOAD_CURRENT_USER + SUCCESS:
            return users
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, UserRecord)));
                // .setIn(['entities', payload.id], new UserRecord(payload.response.data));



        case LOAD_USER + START:
            return users
                .set('loading', true);

        case LOAD_USER + SUCCESS:
            return users
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, UserRecord)))
                // .setIn(['entities', payload.id], new UserRecord(payload.response.data))
                .set('loading', false)
                .set('loaded', true);



        case LOAD_ALL_USERS_3 + START:
            return users
                .set('loaded', false)
                .set('loading', true);

        case LOAD_ALL_USERS_3 + SUCCESS:
            return users
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, UserRecord)))
                .set('loading', false)
                .set('loaded', true);



        case CREATE_USER + START:
            return users;

        case CREATE_USER + SUCCESS:
            console.log(payload.response);
            return users;



        case CHANGE_USER_GROUP + START:
            return users;

        case CHANGE_USER_GROUP + SUCCESS:
            return users.update('entities', entities => entities.merge(arrToMap(payload.response.data, UserRecord)));

        case CHANGE_USER_GROUP + FAILED:
            return users;



        case REMOVE_USER_GROUP + START:
            return users;

        case REMOVE_USER_GROUP + SUCCESS:
            return users.update('entities', entities => entities.merge(arrToMap(payload.response.data, UserRecord)));

        case REMOVE_USER_GROUP + FAILED:
            return users;



        default: return users;
    }
}