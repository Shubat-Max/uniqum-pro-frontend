import { Record, OrderedMap } from 'immutable';
import {
    LOAD_ALL_GROUPS,
    ADD_GROUP,
    REMOVE_GROUP,
    LOAD_OWNED_GROUPS,
    LOAD_OWNED_GROUP,
    START,
    FAILED,
    SUCCESS,
    UPDATE_GROUP_COMMON, GET_GROUP_DETAILS, GET_MEMBERS_COUNT
} from "../configs/action_consts";
import {arrToMap} from "../helpers";



const GroupRecord = Record({
    _id: null,
    name: null,
    count: null,
    ownedBy: null,
    gameSettings: {
        flash: {
            n: {
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                7: true,
                8: true,
                9: true,
                0: true
            },
            ns: 2,
            pns: false,
            i: 2,
            pi: false,
            s: 1.8,
            ps: false,
            t: 1
        }
    }
});

const ReducerState = Record({
    entities: new OrderedMap(arrToMap([], GroupRecord )),
    loading: false,
    loaded: false
});

const defaultGroups = new ReducerState();



export default ( groups = defaultGroups, action) => {
    const { type, payload, randomId } = action;


    switch (type) {
        case LOAD_ALL_GROUPS:
            return groups;
            // return groups.update('entities', entities => entities.merge(arrToMap(templateGroups, GroupRecord )));

        case ADD_GROUP:
            return groups.setIn(['entities', randomId], new GroupRecord({id:randomId, ...payload}));

        case REMOVE_GROUP:
            return groups.removeIn(['entities', payload.groupId]);

        case LOAD_OWNED_GROUPS + START:
            return groups
                .set('loading', true)
                .set('loaded', false);

        case LOAD_OWNED_GROUPS + SUCCESS:
            return groups
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, GroupRecord)))
                .set('loading', false)
                .set('loaded', true);

        case LOAD_OWNED_GROUPS + FAILED:
            return groups;

        case LOAD_OWNED_GROUP + START:
            return groups
                .set('loading', true)
                .set('loaded', false);

        case LOAD_OWNED_GROUP + SUCCESS:
            return groups
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, GroupRecord)))
                .set('loading', false)
                .set('loaded', true);

        case LOAD_OWNED_GROUP + FAILED:
            return groups;

        case ADD_GROUP + START:
            return groups
                .set('loading', true)
                .set('loaded', false);

        case ADD_GROUP + SUCCESS:
            return groups
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, GroupRecord)))
                .set('loading', false)
                .set('loaded', true);

        case ADD_GROUP + FAILED:
            return groups;

        case UPDATE_GROUP_COMMON + START:
            return groups
                .set('loading', true)
                .set('loaded', false);

        case UPDATE_GROUP_COMMON + SUCCESS:
            return groups
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, GroupRecord)))
                .set('loading', false)
                .set('loaded', true);

        case UPDATE_GROUP_COMMON + FAILED:
            return groups;

        case GET_GROUP_DETAILS + START:
            return groups;

        case GET_GROUP_DETAILS + SUCCESS:
            return groups
                .update('entities', entities => entities.merge(arrToMap(payload.response.data, GroupRecord)));

        case GET_GROUP_DETAILS + FAILED:
            return groups;

        case GET_MEMBERS_COUNT + START:
            return groups;

        case GET_MEMBERS_COUNT + SUCCESS:
            return groups.setIn(['entities', payload.groupId, 'count'], payload.response.data[0]);

        case GET_MEMBERS_COUNT + FAILED:
            return groups;


        default: return groups;
    }
}