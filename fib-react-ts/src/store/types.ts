export const CHANGE_INDEX = 'CHANGE_INDEX';
export const SET_VALUES = 'SET_VALUES';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const SET_NEW_VALUE = 'SET_NEW_VALUE';

export const STATUS_ACTIVE = 'STATUS_ACTIVE';
export const STATUS_ERROR = 'STATUS_ERROR';
export const STATUS_LOADING = 'STATUS_LOADING';

export interface Action<T> {
    type: T;
    payload?: Object;
}

export interface IndexState {
    currentIndex: number | undefined;
}

export interface ChangeIndexAction extends Action<typeof CHANGE_INDEX> {
    payload: IndexState;
}

export type IndexValue = { index: string; value: string };

export interface ValueState {
    indices: number[];
    indexValues: IndexValue[];
}

export interface SetValuesAction extends Action<typeof SET_VALUES> {
    payload: ValueState;
}

export type STATUS =
    | typeof STATUS_ACTIVE
    | typeof STATUS_ERROR
    | typeof STATUS_LOADING;

export interface StatusState {
    status: STATUS;
}

export interface ChangeStatusAction extends Action<typeof CHANGE_STATUS> {
    payload: StatusState;
}

export interface SetNewValueAction extends Action<typeof SET_NEW_VALUE> {}

export type ActionTypes =
    | ChangeIndexAction
    | SetValuesAction
    | ChangeStatusAction
    | SetNewValueAction;

export type AppState = IndexState & ValueState & StatusState;
