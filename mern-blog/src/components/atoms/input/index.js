import React from 'react'
import './input.scss';

const index = ({label, ...rest}) => {
    return (
        <div className="input-wrapper">
            <p className="label">{label}</p>
            <input className="input" {...rest} />
        </div>
    )
}

export default index
