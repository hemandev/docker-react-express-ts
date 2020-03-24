import React from 'react';
import { Link } from 'react-router-dom';

export const OtherPage: React.FC = () => {
    return (
        <div className="OtherPage">
            Some other page
            <Link to="/">Home</Link>
        </div>
    );
};
