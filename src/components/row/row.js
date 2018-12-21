import React from 'react';

import './row.css'

const Row = ({left,right, center}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
            <div className="col-md-6">
                {center}
            </div>
        </div>
    )
};

export default Row;