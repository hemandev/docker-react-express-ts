import {
    CHANGE_INDEX,
    AppState,
    ActionTypes,
    SET_VALUES,
    CHANGE_STATUS,
    STATUS_ACTIVE
} from './types';

export const reducer = (state: AppState, action: ActionTypes): AppState => {
    switch (action.type) {
        case CHANGE_INDEX:
            return { ...state, currentIndex: action.payload.currentIndex };

        case SET_VALUES:
            return {
                ...state,
                currentIndex: undefined,
                status: STATUS_ACTIVE,
                indices: action.payload.indices,
                indexValues: action.payload.indexValues
            };

        case CHANGE_STATUS:
            return {
                ...state,
                status: action.payload.status
            };

        default:
            return state;
    }
};
