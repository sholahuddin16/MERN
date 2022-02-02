import React from 'react'
import './link.scss';

const Link = ({title, onClick}) => {
    return (
        <div>
            <p className="link" onClick={onClick}>{title}</p>
        </div>
    )
}

export default Link
