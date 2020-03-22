import { v4 } from 'uuid';

export default store => next => action => {
    if(!action.generateId) return next(action);
    next({
        ...action,
        randomId: v4()
    });
}