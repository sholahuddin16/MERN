import React from 'react'
import './button.scss';

const Button = ({tittle, ...rest}) => {
    return (
            <button className="button" {...rest}>{tittle}</button>
    )
}

export default Button
