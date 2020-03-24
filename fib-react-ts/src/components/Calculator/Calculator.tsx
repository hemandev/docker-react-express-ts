import React from 'react';
import { ActionTypes, STATUS_LOADING } from '../../store/types';
import { changeIndex, changeStatus } from '../../store/actions';

interface CalcProps {
    dispatch: React.Dispatch<ActionTypes>;
}

export const Calculator: React.FC<CalcProps> = React.memo(({ dispatch }) => {
    return (
        <div className="Calculator">
            <label htmlFor="index-input">Enter your index</label>
            <input
                className="index-input"
                type="text"
                autoFocus
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    const value = evt.target.value;
                    console.log('Value', value);
                    if (value) {
                        dispatch(changeIndex(parseInt(value)));
                    }
                }}
            />
            <button
                onClick={() => {
                    dispatch(changeStatus(STATUS_LOADING));
                }}
            >
                Submit
            </button>
        </div>
    );
});
