import { Record, OrderedMap } from 'immutable';
import {LOAD_CURRENT_USER, START, SUCCESS, SYSTEM_STARTUP} from "../configs/action_consts";
import {arrToMap} from "../helpers";


const SystemRecord = Record({
    _id: null,
    role: null,
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
    entities: new OrderedMap(arrToMap([], SystemRecord )),
    loading: false,
    loaded: false
});

const defaultSystem = new ReducerState();


export default ( system = defaultSystem, action) => {
    const { type, payload } = action;

    switch (type) {
        case SYSTEM_STARTUP:
            return system.setIn(['entities', 0], new SystemRecord({ ...payload }));

        case LOAD_CURRENT_USER + START:
            return system
                .set('loading', true);

        case LOAD_CURRENT_USER + SUCCESS:
            return system
                .set('loading', false)
                .set('loaded', true);

        default: return system;
    }
}