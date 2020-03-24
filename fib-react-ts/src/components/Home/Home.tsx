import React from 'react';
import { Calculator } from '../Calculator/Calculator';
import { IndexDisplay } from '../IndexDisplay/IndexDisplay';
import { ValueDisplay } from '../ValueDisplay/ValueDisplay';
import { ActionTypes, ValueState } from '../../store/types';

interface HomeProps extends ValueState {
    dispatch: React.Dispatch<ActionTypes>;
}

export const Home: React.FC<HomeProps> = props => {
    return (
        <>
            <Calculator dispatch={props.dispatch} />
            <IndexDisplay label="Indices I have seen" indices={props.indices} />
            <ValueDisplay
                label="Calculated Values"
                indexValues={props.indexValues}
            />
        </>
    );
};
