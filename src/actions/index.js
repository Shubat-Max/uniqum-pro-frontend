import axios from 'axios';
import {
    LOAD_ALL_GROUPS,
    ADD_GROUP,
    UPDATE_GROUP_COMMON,
    SYSTEM_STARTUP,
    REMOVE_USER_GROUP,
    CHANGE_USER_GROUP,
    REMOVE_GROUP,
    AUTHORIZE,
    LOAD_USER,
    LOAD_CURRENT_USER,
    START,
    SUCCESS,
    FAILED,
    LOAD_ALL_USERS_3,
    CREATE_USER,
    LOAD_OWNED_GROUPS,
    LOAD_OWNED_GROUP,
    GET_MEMBERS_COUNT,
    GET_GROUP_DETAILS
} from "../configs/action_consts";



// const APIUrl = '/api';
const APIUrl = 'https://uniqum-pro.herokuapp.com/api';

// const APIUrlReal = '/api';
// APIUrl = APIUrlReal;




export function loadAllGroups() {
    return {
        type: LOAD_ALL_GROUPS
    }
}

export function loadOwnedGroups(userId) {
    return dispatch => {
        dispatch({
            type: LOAD_OWNED_GROUPS + START,
            payload: {
                userId
            }
        });

        axios.get(`${APIUrl}/groups/owned/${userId}`)
            .then(response => {
                dispatch({
                    type: LOAD_OWNED_GROUPS + SUCCESS,
                    payload: { response }
                })
            })
            .catch(error => {
                dispatch({
                    type: LOAD_OWNED_GROUPS + FAILED,
                    payload: { error }
                })
            })
    }
}

export function loadOwnedGroup(userId, groupId) {
    return dispatch => {
        dispatch({
            type: LOAD_OWNED_GROUP + START,
            payload: {
                userId,
                groupId
            }
        });

        axios.get(`${APIUrl}/groups/${groupId}`, {
            params: {
                userId
            }
            }).then(response => {
                dispatch({
                    type: LOAD_OWNED_GROUP + SUCCESS,
                    payload: { response }
                })
            })
            .catch(error => {
                dispatch({
                    type: LOAD_OWNED_GROUP + FAILED,
                    payload: { error }
                })
            })
    }
}

export function getDetails(groupId) {
    return dispatch => {
        dispatch({
            type: GET_GROUP_DETAILS + START,
            payload: {
                groupId
            }
        });

        axios.get(`${APIUrl}/groups/details/${groupId}`)
            .then(response => {
                dispatch({
                    type: GET_GROUP_DETAILS + SUCCESS,
                    payload: { response }
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_GROUP_DETAILS + FAILED,
                    payload: { error }
                })
            })
    }
}

export function getMembersCount(groupId) {
    return dispatch => {
        dispatch({
            type: GET_MEMBERS_COUNT + START,
            payload: {
                groupId
            }
        });

        axios.get(`${APIUrl}/users/count/${groupId}`)
            .then(response => {
                dispatch({
                    type: GET_MEMBERS_COUNT + SUCCESS,
                    payload: { groupId, response }
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_MEMBERS_COUNT + FAILED,
                    payload: { groupId, error }
                })
            })
    }
}

export function addGroup(groupName, userId) {
    return dispatch => {
        dispatch({
            type: ADD_GROUP + START,
            payload: { groupName, userId }
        });

        axios.post(`${APIUrl}/groups/create`, {
            name: groupName,
            userId
        })
            .then(response => dispatch({
                type: ADD_GROUP + SUCCESS,
                payload: {groupName, userId, response }
            }))
            .catch(error => dispatch({
                type: ADD_GROUP + FAILED,
                payload: { groupName, userId, error }
            }))
    }
}

export function updateGroupCommon(groupId, groupData) {
    return dispatch => {
        dispatch({
            type: UPDATE_GROUP_COMMON + START,
            payload: { groupId, groupData }
        });

        axios.post(`${APIUrl}/groups/update`, {
            groupId: groupId,
            name: groupData.name,
        })
            .then(response => dispatch({
                type: UPDATE_GROUP_COMMON + SUCCESS,
                payload: {groupId, groupData, response }
            }))
            .catch(error => dispatch({
                type: UPDATE_GROUP_COMMON + FAILED,
                payload: { groupId, groupData, error }
            }))
    };
}

export function systemStartup(id, role){
    return {
        type: SYSTEM_STARTUP,
        payload: {
            _id:id,
            role
        }
    }
}

export function removeUserGroup(userId){
    return dispatch => {
        dispatch({
            type: REMOVE_USER_GROUP + START,
            payload: { userId }
        });

        axios.post(`${APIUrl}/users/remove/group`, {
            userId
        })
            .then(response => dispatch({
                type: REMOVE_USER_GROUP + SUCCESS,
                payload: { userId, response }
            }))
            .catch(error => dispatch({
                type: REMOVE_USER_GROUP + FAILED,
                payload: { userId, error }
            }))
    };
}

export function changeUserGroup(userId, groupId){
    return dispatch => {
        dispatch({
            type: CHANGE_USER_GROUP + START,
            payload: { userId, groupId }
        });

        axios.post(`${APIUrl}/users/update/group`, {
            userId,
            groupId
        })
            .then(response => dispatch({
                type: CHANGE_USER_GROUP + SUCCESS,
                payload: { userId, groupId, response }
            }))
            .catch(error => dispatch({
                type: CHANGE_USER_GROUP + FAILED,
                payload: { userId, groupId, error }
            }))
    };
}

export function removeGroup(groupId){

    return dispatch => {
        dispatch({
            type: REMOVE_GROUP + START,
            payload: { groupId }
        });

        axios.post(`${APIUrl}/users/update/group`, {
            groupId
        })
            .then(response => dispatch({
                type: REMOVE_GROUP + SUCCESS,
                payload: { groupId, response }
            }))
            .catch(error => dispatch({
                type: REMOVE_GROUP + FAILED,
                payload: { groupId, error }
            }))
    };
    // return {
    //     type: REMOVE_GROUP,
    //     payload: {
    //         groupId
    //     }
    // }
}

export function authorize(data){
    return {
        type: AUTHORIZE,
        payload: {
            _id: data.id,
            response: data
        }
    }
}


export function loadAllUsers3() {
    return dispatch => {
        dispatch({
            type: LOAD_ALL_USERS_3 + START
        });

        axios.get(`${APIUrl}/users`)
            .then(response => {
                dispatch({
                    type: LOAD_ALL_USERS_3 + SUCCESS,
                    payload: { response }
                })
            })
            .catch(error => dispatch({
                type: LOAD_ALL_USERS_3 + FAILED,
                payload: {  error }
            }))
    }
}


export function loadCurrentUser(id){
    return dispatch => {
        dispatch({
            type: LOAD_CURRENT_USER + START,
            payload: { id }
        });

        axios.get(`${APIUrl}/users/${id}`)
            .then(response => dispatch({
                type: LOAD_CURRENT_USER + SUCCESS,
                payload: { id, response }
            }))
            .catch(error => dispatch({
                type: LOAD_CURRENT_USER + FAILED,
                payload: { id, error }
            }))
    }
}

export function loadUser(id){
    return dispatch => {
        dispatch({
            type: LOAD_USER + START,
            payload: { id }
        });

        axios.get(`${APIUrl}/users/${id}`)
            .then(response => dispatch({
                type: LOAD_USER + SUCCESS,
                payload: { id, response }
            }))
            .catch(error => dispatch({
                type: LOAD_USER + FAILED,
                payload: { id, error }
            }))
    }
}

export function createUser(data){
    return dispatch => {
        dispatch({
            type: CREATE_USER + START,
            payload: { data }
        });

        axios.post(`${APIUrl}/users/create`,  { name: data.name,
                                                email: data.email,
                                                role: data.role,
                                                pwd: data.pwd,
                                                invitedBy: data.invitedBy})
            .then(response => dispatch({
                type: CREATE_USER + SUCCESS,
                payload: { data, response }
            }))
            .catch(error => dispatch({
                type: LOAD_USER + FAILED,
                payload: { data, error }
            }))
    }
}