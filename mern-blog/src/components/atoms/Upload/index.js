import React from 'react'
import { LoginBG } from '../../../assets';
import './upload.scss';

const Upload = ({img, ...rest}) => {
    return (
        <div className="upload">
            {img && <img className="prefiew" src={img} alt="prefiew" />}
            <input type="file" {...rest} />
        </div>
    )
}

export default Upload
