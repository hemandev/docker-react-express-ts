import {
    CHANGE_INDEX,
    ChangeIndexAction,
    SetValuesAction,
    ValueState,
    SET_VALUES,
    STATUS,
    ChangeStatusAction,
    CHANGE_STATUS
} from './types';

export const changeIndex = (currentIndex: number): ChangeIndexAction => {
    return {
        type: CHANGE_INDEX,
        payload: {
            currentIndex
        }
    };
};

export const setValues = (payload: ValueState): SetValuesAction => {
    return {
        type: SET_VALUES,
        payload: payload
    };
};

export const changeStatus = (status: STATUS): ChangeStatusAction => {
    return {
        type: CHANGE_STATUS,
        payload: {
            status
        }
    };
};

export const setNewValue = () => {};
