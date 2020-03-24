import React from 'react';

interface IndexDisplayProps {
    label: string;
    indices: number[];
}

export const IndexDisplay: React.FC<IndexDisplayProps> = React.memo(props => {
    return (
        <div className="IndexDisplay">
            <h4>{props.label}</h4>
            {props.indices.join(',')}
        </div>
    );
});
