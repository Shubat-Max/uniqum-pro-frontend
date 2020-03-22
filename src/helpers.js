import { OrderedMap, Map } from 'immutable'

export function arrToMap(arr, RecordModel = Map) {
    return arr.reduce((acc, item) =>
            acc.set(item._id, new RecordModel(item))
        , new OrderedMap({}));
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray();
}

export function sleep(ms) {
    let currentTime = new Date().getTime();

    while (currentTime + ms >= new Date().getTime()) {
    }
}