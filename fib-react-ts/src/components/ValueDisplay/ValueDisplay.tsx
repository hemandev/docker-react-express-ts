import React from 'react';
import {IndexValue} from '../../store/types';

interface ValueDisplayProps {
    label: string;
    indexValues: IndexValue[];
}

const renderIndexValue = (indexValue: IndexValue) => {
    return (
        <div key={indexValue.index} className="list-child">
            <span>For index {indexValue.index}</span>
            <span>|</span>
            <span>calculated {indexValue.value}</span>
        </div>
    );
};

export const ValueDisplay: React.FC<ValueDisplayProps> = props => {
    return (
        <div className="ValueDisplay">
            <h4>{props.label}</h4>
            {props.indexValues.map(renderIndexValue)}
        </div>
    );
};
